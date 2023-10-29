import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const { data } = await supabase.from('pizza_toppings').select();
	console.log(data);
	return {
		pizza_topppings: data ?? []
	};
}
