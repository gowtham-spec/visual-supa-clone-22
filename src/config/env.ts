
// Environment configuration with fallbacks for local development
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://uogpaqssqqneedxppzm.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZ3BhcXNzcXFuZWVkenhwcHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTI3NjIsImV4cCI6MjA2NTYyODc2Mn0.xR-osBnsCphhYFNfOjUOF66LU1CvAeRaEtcWQUsKFiY'
  }
};

// Log configuration for debugging
console.log('Environment configuration:', {
  hasSupabaseUrl: !!config.supabase.url,
  hasSupabaseKey: !!config.supabase.anonKey,
  nodeEnv: import.meta.env.MODE
});
