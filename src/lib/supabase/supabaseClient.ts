import { createClient } from '@supabase/supabase-js';
import type { Database } from './__database.types__';
import { PUBLIC_SUPABASE_INSTANCE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient<Database>(
	PUBLIC_SUPABASE_INSTANCE_URL,
	PUBLIC_SUPABASE_ANON_KEY
);
