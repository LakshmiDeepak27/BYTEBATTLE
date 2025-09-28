// src/app/api/admin/registrations/route.ts
import { NextResponse } from "next/server";
import { supabaseServer, env } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
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

    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ 
      message: "Failed to fetch registrations",
      errorId,
      timestamp
    }, { status: 500 });
  }
}
