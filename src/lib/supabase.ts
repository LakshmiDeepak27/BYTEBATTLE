// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Environment variable validation
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_PAYMENT_BUCKET = process.env.SUPABASE_PAYMENT_BUCKET;
const ADMIN_KEY = process.env.ADMIN_KEY;

// Validate required environment variables (only in production)
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_PAYMENT_BUCKET: SUPABASE_PAYMENT_BUCKET,
    ADMIN_KEY: ADMIN_KEY,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    console.error('❌ Environment Configuration Error:', errorMessage);
    throw new Error(errorMessage);
  }
} else {
  // In development, just warn about missing variables
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_PAYMENT_BUCKET || !ADMIN_KEY) {
    console.warn('⚠️  Some environment variables are missing in development mode');
  }
}

// Validate Supabase URL format
if (SUPABASE_URL && !SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('localhost')) {
  console.warn('⚠️  Warning: SUPABASE_URL does not appear to be a valid Supabase URL');
}

// Server-only client using service role key with enhanced configuration
export const supabaseServer = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co', 
  SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key', 
  {
    auth: { 
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'X-Client-Info': 'byte-battle-contest'
      }
    }
  }
);

// Export environment variables for use in other files
export const env = {
  SUPABASE_URL: SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_PAYMENT_BUCKET: SUPABASE_PAYMENT_BUCKET || 'payment-screenshots',
  ADMIN_KEY: ADMIN_KEY || 'placeholder-admin-key',
} as const;

// Health check function
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabaseServer
      .from('registrations')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection check failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection healthy');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection check error:', err);
    return false;
  }
}
