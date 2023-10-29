import { createClient } from '@supabase/supabase-js';
import type { Database } from './__database.types__';

import { SUPABASE_INSTANCE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export const supabase = createClient<Database>(SUPABASE_INSTANCE_URL, SUPABASE_ANON_KEY);
