import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
	'https://znflpmyhzcnzfozxogpr.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZmxwbXloemNuemZvenhvZ3ByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjU2MTksImV4cCI6MjA1OTcwMTYxOX0.4irSnxwiSgnR5FsLE5ws3hskMQdlQRmm-X8kj0xtlas';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
