import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,      // ⭐ make sure auth is remembered
      autoRefreshToken: true,    // ⭐ refresh JWT automatically
      detectSessionInUrl: true,  // ⭐ needed for magic link flows
    },
  }
);
