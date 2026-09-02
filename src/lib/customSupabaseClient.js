import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcsflpsyzvigswlotepz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjc2ZscHN5enZpZ3N3bG90ZXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NDA5OTIsImV4cCI6MjA4MTMxNjk5Mn0.Swi5Fszt8Fn6ibBDvwQZogzZgwJd8doRCzb_ZTat_8k';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
