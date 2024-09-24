import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jfvlwcykndyxvxqsnttj.supabase.co';
const supabaseAnonKey = import.meta.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
