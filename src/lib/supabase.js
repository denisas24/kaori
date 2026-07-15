import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jxbviayjptjrlymzjhzt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_U_bo3K-AKKNkVQ6-KHZXaw_tydwAWOE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
