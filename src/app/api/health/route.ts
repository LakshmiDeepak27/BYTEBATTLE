// src/app/api/health/route.ts
import { NextResponse } from "next/server";
import { checkSupabaseConnection } from "@/lib/supabase";

export async function GET() {
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
