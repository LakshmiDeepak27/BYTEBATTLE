// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { rateLimiters, getClientIP } from "@/lib/rate-limit";
import { 
  validateRegistrationInput, 
  isValidFileType, 
  isValidFileSize,
  sanitizeInput,
  SECURITY_HEADERS 
} from "@/lib/security";

// Improved unique code generation with timestamp-based approach
async function generateUniqueCode(): Promise<number> {
  const maxAttempts = 50; // Increased attempts
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Use timestamp + random for better uniqueness
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const baseCode = (timestamp % 10000) + random;
    const code = Math.floor(baseCode % 9000) + 1000; // Ensure 4-digit (1000-9999)
    
    // Check if code exists
    const { data, error } = await supabaseServer
      .from("registrations")
      .select("id")
      .eq("code", code)
      .limit(1);

    if (error) throw error;
    if (!data || data.length === 0) return code;
    
    // Small delay to prevent rapid-fire requests
    if (attempt > 10) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  throw new Error("Failed to generate unique code after 50 attempts");
}

export async function POST(req: NextRequest) {
  try {
    // Enhanced rate limiting with new system
    const ip = getClientIP(req);
    const rateLimitResult = rateLimiters.registration(ip);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: rateLimitResult.message }, 
        { 
          status: 429,
          headers: SECURITY_HEADERS
        }
      );
    }

    // Check request size
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json(
        { message: "Request too large. Maximum size is 10MB." },
        { 
          status: 413,
          headers: SECURITY_HEADERS
        }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let name: string, usn: string, branch: string, language: "C" | "C++" | "Python" | "Java";
    let phone: string, email: string, notes: string | null = null;
    let paymentScreenshot: File | null = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      ({ name, usn, branch, language, phone, email } = body);
      notes = body.notes ?? null;
    } else {
      const formData = await req.formData();
      name = formData.get("name") as string;
      usn = formData.get("usn") as string;
      branch = formData.get("branch") as string;
      language = formData.get("language") as "C" | "C++" | "Python" | "Java";
      phone = formData.get("phone") as string;
      email = formData.get("email") as string;
      notes = (formData.get("notes") as string) || null;
      paymentScreenshot = (formData.get("paymentScreenshot") as File) || null;
    }

    // Enhanced input validation using security library
    const validation = validateRegistrationInput({
      name,
      usn,
      email,
      phone,
      language,
      branch,
      notes: notes || undefined
    });

    if (!validation.valid) {
      return NextResponse.json(
        { 
          message: "Validation failed", 
          errors: validation.errors 
        }, 
        { 
          status: 400,
          headers: SECURITY_HEADERS
        }
      );
    }

    // Sanitize inputs
    name = sanitizeInput(name);
    usn = sanitizeInput(usn).toUpperCase();
    email = sanitizeInput(email).toLowerCase();
    phone = sanitizeInput(phone);
    notes = notes ? sanitizeInput(notes) : null;

    // Check duplicates with better error handling
    const { data: existing, error: checkErr } = await supabaseServer
      .from("registrations")
      .select("id, email, usn")
      .or(`email.eq.${email},usn.eq.${usn}`)
      .limit(1);

    if (checkErr) {
      console.error("Duplicate check error:", checkErr);
      throw new Error("Database error during duplicate check");
    }
    
    if (existing && existing.length > 0) {
      const existingRecord = existing[0];
      const duplicateField = existingRecord.email === email ? "email" : "USN";
      return NextResponse.json({ 
        message: `User with this ${duplicateField} is already registered` 
      }, { status: 400 });
    }

    // Optimized file upload with better error handling
    let screenshotUrl: string | null = null;
    if (paymentScreenshot) {
      try {
        console.log("Payment screenshot provided, uploading...");
        
        // Enhanced file validation using security library
        if (!isValidFileSize(paymentScreenshot.size)) {
          return NextResponse.json({ 
            message: "File too large. Maximum size is 3MB." 
          }, { 
            status: 400,
            headers: SECURITY_HEADERS
          });
        }

        if (!isValidFileType(paymentScreenshot.type)) {
          return NextResponse.json({ 
            message: "Invalid file type. Only JPG and PNG files are allowed." 
          }, { 
            status: 400,
            headers: SECURITY_HEADERS
          });
        }

        const fileBuffer = Buffer.from(await paymentScreenshot.arrayBuffer());
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const fileName = `payments/${timestamp}-${randomId}-${paymentScreenshot.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const bucket = process.env.SUPABASE_PAYMENT_BUCKET || "payment-screenshots";

        const { error: uploadError } = await supabaseServer.storage
          .from(bucket)
          .upload(fileName, fileBuffer, { 
            contentType: paymentScreenshot.type,
            upsert: false // Don't overwrite existing files
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          const hint = uploadError.message?.toLowerCase().includes("not found")
            ? `Storage bucket '${bucket}' not found. Create it in Supabase Storage and set it to Public.`
            : uploadError.message?.toLowerCase().includes("already exists")
            ? "File with this name already exists. Please try again."
            : "File upload failed. Please try again.";
          throw new Error(hint);
        }

        screenshotUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
        console.log("Screenshot uploaded successfully:", screenshotUrl);
      } catch (uploadErr) {
        console.error("File upload error:", uploadErr);
        return NextResponse.json({ 
          message: uploadErr instanceof Error ? uploadErr.message : "File upload failed" 
        }, { status: 500 });
      }
    } else {
      console.log("No payment screenshot provided");
    }

    // Generate unique 4-digit code
    const code = await generateUniqueCode();

    // Insert into DB with transaction-like approach
    const paidStatus = !!screenshotUrl;
    console.log("Setting paid status to:", paidStatus, "for screenshot URL:", screenshotUrl);
    
    try {
      const { data, error: insertErr } = await supabaseServer
        .from("registrations")
        .insert({
          name: name.trim(),
          usn: usn.trim().toUpperCase(),
          branch,
          language,
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          notes: notes?.trim() || null,
          payment_screenshot_url: screenshotUrl,
          code,
          paid: paidStatus,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertErr) {
        console.error("Database insert error:", insertErr);
        
        // Handle specific database errors
        if (insertErr.code === '23505') { // Unique constraint violation
          return NextResponse.json({ 
            message: "Registration failed: Duplicate entry detected. Please try again." 
          }, { status: 409 });
        }
        
        throw new Error(`Database error: ${insertErr.message}`);
      }

      // Log successful registration
      console.log(`✅ Registration successful: ${name} (${usn}) - Code: ${code}`);
      
      return NextResponse.json({ 
        message: "Registered successfully!", 
        user: data,
        code: code // Include code in response for success page
      }, { 
        status: 201,
        headers: SECURITY_HEADERS
      });

    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      throw dbError;
    }

  } catch (error) {
    // Enhanced error logging
    const timestamp = new Date().toISOString();
    const errorId = Math.random().toString(36).substring(2, 8);
    
    console.error(`[${timestamp}] Registration Error [${errorId}]:`, {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      ip: req.headers.get("x-forwarded-for") || "unknown"
    });

    // Return user-friendly error messages
    const err = error instanceof Error ? error.message : "Unknown error";
    
    // Don't expose internal errors to users
    const userMessage = err.includes("Database error") || err.includes("Failed to generate")
      ? "Registration temporarily unavailable. Please try again in a few moments."
      : err;

    return NextResponse.json({ 
      message: userMessage,
      errorId: errorId // Include error ID for support
    }, { 
      status: 500,
      headers: SECURITY_HEADERS
    });
  }
}
