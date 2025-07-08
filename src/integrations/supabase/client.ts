
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { config } from '@/config/env';

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.anonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  throw new Error('Missing Supabase URL or anonymous key');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

console.log('Supabase client initialized successfully');
