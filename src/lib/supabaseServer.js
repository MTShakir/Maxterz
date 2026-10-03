import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the service role key.
 * Never import this into client components — it uses a secret key.
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
