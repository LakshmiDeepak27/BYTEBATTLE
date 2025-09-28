// src/app/api/admin/registrations/route.ts
import { NextResponse } from "next/server";
import { supabaseServer, env } from "@/lib/supabase";

// Rate limiting for admin endpoint
const adminRateLimit = new Map<string, { count: number; resetTime: number }>();
const ADMIN_RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_ADMIN_REQUESTS = 20; // 20 admin requests per minute per IP

function checkAdminRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = adminRateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    adminRateLimit.set(ip, { count: 1, resetTime: now + ADMIN_RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= MAX_ADMIN_REQUESTS) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function GET(req: Request) {
  try {
    // Rate limiting check for admin endpoint
    const ip = req.headers.get("x-forwarded-for") || 
               req.headers.get("x-real-ip") || 
               "unknown";
    
    if (!checkAdminRateLimit(ip)) {
      return NextResponse.json(
        { 
          message: "Too many admin requests. Please try again in a minute.",
          timestamp: new Date().toISOString()
        }, 
        { status: 429 }
      );
    }

    // Enhanced admin authentication
    const adminKey = req.headers.get("x-admin-key") ?? "";
    const expected = env.ADMIN_KEY;

    if (!adminKey || adminKey !== expected) {
      console.warn("Unauthorized admin access attempt:", {
        ip: req.headers.get("x-forwarded-for") || "unknown",
        userAgent: req.headers.get("user-agent") || "unknown",
        timestamp: new Date().toISOString()
      });
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100); // Max 100 per page
    const offset = (page - 1) * limit;

    // Enhanced query with better error handling
    const { data, error, count } = await supabaseServer
      .from("registrations")
      .select("id, name, usn, branch, language, phone, email, created_at, paid, code, payment_screenshot_url", { count: 'exact' })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Admin fetch error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    // Calculate pagination info
    const totalPages = count ? Math.ceil(count / limit) : 1;
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({ 
      registrations: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (err) {
    const timestamp = new Date().toISOString();
    const errorId = Math.random().toString(36).substring(2, 8);
    
    console.error(`[${timestamp}] Admin API Error [${errorId}]:`, {
      error: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
      ip: req.headers.get("x-forwarded-for") || "unknown"
    });

    return NextResponse.json({ 
      message: "Failed to fetch registrations",
      errorId,
      timestamp
    }, { status: 500 });
  }
}
