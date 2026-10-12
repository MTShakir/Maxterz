import { createClient } from '@supabase/supabase-js';

const serverOptions = {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
};

/**
 * Server-only Supabase client with the secret key (D33). It bypasses row level security,
 * so use it only for writes (leads) and scripts. Never import it into client components.
 * @returns {import('@supabase/supabase-js').SupabaseClient | null} null when the key is not set
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, serverOptions);
}

/**
 * Server-side Supabase client with the publishable key. Row level security applies,
 * so it sees only what the public may see. Use it for page data: prices, slides, reviews.
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function createPublicServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    serverOptions,
  );
}
