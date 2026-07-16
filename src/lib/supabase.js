import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jxbviayjptjrlymzjhzt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4YnZpYXlqcHRqcmx5bXpqaHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzg1NTAsImV4cCI6MjA5OTcxNDU1MH0.M4N5loMPg_owi3FOwcMNMIRDdo7a_9TatqXlAk227KM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
