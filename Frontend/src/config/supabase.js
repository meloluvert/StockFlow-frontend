import { createClient } from '@supabase/supabase-js';

// No Vite, as variáveis de ambiente usam VITE_ em vez de EXPO_PUBLIC_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://flcvhifcuwxvyhbcnxwz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_fSWg-GeEL4j0rYym9xih0A_CToln8ZT';

console.log('[SUPABASE] Inicializando cliente com URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);