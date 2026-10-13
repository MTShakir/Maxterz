import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Publishable key (D33): safe in the browser, row level security applies.
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// No login on this site, so no session to store or refresh.
const customSupabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export default customSupabaseClient;

export {
    customSupabaseClient,
    customSupabaseClient as supabase,
};
