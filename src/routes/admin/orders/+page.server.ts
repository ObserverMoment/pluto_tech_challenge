import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data } = await supabase.from('orders').select();
	console.log(data);
	return {
		orders: data ?? []
	};
}
