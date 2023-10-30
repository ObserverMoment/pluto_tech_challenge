import { supabase } from '$lib/supabase/supabaseClient';

export async function load() {
	const [{ data: pizza_toppings }, { data: pizza_sizes }, { data: price_list }] = await Promise.all(
		[
			supabase.from('pizza_toppings').select(),
			supabase.from('pizza_sizes').select(),
			supabase.from('price_list').select()
		]
	);
	return {
		pizza_toppings: pizza_toppings ?? [],
		pizza_sizes: pizza_sizes ?? [],
		price_list: price_list ?? []
	};
}
