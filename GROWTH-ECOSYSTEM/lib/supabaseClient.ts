"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if environment variables are provided. During static builds
// these may be undefined — return `null` to avoid throwing at module load time.
export const supabase: ReturnType<typeof createClient> | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
