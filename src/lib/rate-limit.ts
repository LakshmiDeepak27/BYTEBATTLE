// src/lib/rate-limit.ts
// Global rate limiting utility

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Global rate limit storage
const globalRateLimit = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of globalRateLimit.entries()) {
    if (now > entry.resetTime) {
      globalRateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function createRateLimit(config: RateLimitConfig) {
  return function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
    const now = Date.now();
    const key = `${ip}:${config.windowMs}:${config.maxRequests}`;
    const entry = globalRateLimit.get(key);
    
    if (!entry || now > entry.resetTime) {
      globalRateLimit.set(key, { 
        count: 1, 
        resetTime: now + config.windowMs 
      });
      return { allowed: true };
    }
    
    if (entry.count >= config.maxRequests) {
      return { 
        allowed: false, 
        message: config.message || "Too many requests. Please try again later." 
      };
    }
    
    entry.count++;
    return { allowed: true };
  };
}

// Predefined rate limiters
export const rateLimiters = {
  // Strict rate limiting for registration
  registration: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    message: "Too many registration attempts. Please try again in a minute."
  }),
  
  // Moderate rate limiting for admin
  admin: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    message: "Too many admin requests. Please try again in a minute."
  }),
  
  // Light rate limiting for health checks
  health: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: "Too many health check requests. Please try again in a minute."
  }),
  
  // General API rate limiting
  api: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: "Too many API requests. Please try again in a minute."
  })
};

// Utility function to get client IP
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const cfConnectingIP = req.headers.get("cf-connecting-ip"); // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return "unknown";
}

// Rate limit middleware for Next.js API routes
export function withRateLimit(
  rateLimiter: ReturnType<typeof createRateLimit>,
  req: Request
): { allowed: boolean; response?: Response } {
  const ip = getClientIP(req);
  const result = rateLimiter(ip);
  
  if (!result.allowed) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({ 
          message: result.message,
          timestamp: new Date().toISOString()
        }),
        { 
          status: 429,
          headers: { "Content-Type": "application/json" }
        }
      )
    };
  }
  
  return { allowed: true };
}
