import { createClient } from '@supabase/supabase-js';

const agSupabaseUrl = process.env.NEXT_PUBLIC_AG_SUPABASE_URL!;
const agSupabaseAnonKey = process.env.NEXT_PUBLIC_AG_SUPABASE_ANON_KEY!;

export const agSupabase = createClient(agSupabaseUrl, agSupabaseAnonKey);