// src/app/api/health/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkSupabaseConnection } from "@/lib/supabase";

// Rate limiting for health endpoint
const healthRateLimit = new Map<string, { count: number; resetTime: number }>();
const HEALTH_RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_HEALTH_REQUESTS = 10; // 10 health checks per minute per IP

function checkHealthRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = healthRateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    healthRateLimit.set(ip, { count: 1, resetTime: now + HEALTH_RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= MAX_HEALTH_REQUESTS) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function GET(req: NextRequest) {
  // Rate limiting check for health endpoint
  const ip = req.headers.get("x-forwarded-for") || 
             req.headers.get("x-real-ip") || 
             "unknown";
  
  if (!checkHealthRateLimit(ip)) {
    return NextResponse.json(
      { 
        status: "rate_limited",
        message: "Too many health check requests. Please try again in a minute.",
        timestamp: new Date().toISOString()
      }, 
      { status: 429 }
    );
  }
  try {
    const startTime = Date.now();
    
    // Check Supabase connection
    const dbHealthy = await checkSupabaseConnection();
    
    const responseTime = Date.now() - startTime;
    
    const health = {
      status: dbHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      services: {
        database: dbHealthy ? "up" : "down",
        api: "up"
      },
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    };

    return NextResponse.json(health, { 
      status: dbHealthy ? 200 : 503 
    });
  } catch (error) {
    console.error("Health check failed:", error);
    
    return NextResponse.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
      services: {
        database: "down",
        api: "up"
      }
    }, { status: 503 });
  }
}
