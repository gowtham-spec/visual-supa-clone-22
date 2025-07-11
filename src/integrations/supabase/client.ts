// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uogpaqssqqneedzxppzm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZ3BhcXNzcXFuZWVkenhwcHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTI3NjIsImV4cCI6MjA2NTYyODc2Mn0.xR-osBnsCphhYFNfOjUOF66LU1CvAeRaEtcWQUsKFiY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});