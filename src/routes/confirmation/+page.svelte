<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { BASKET_DATA_CONTEXT_NAME } from '../../constants';
	import { supabase } from '$lib/supabase/supabaseClient';
	import type { BasketData } from '$lib/supabase/types_extended';
	import type { Writable } from 'svelte/store';

	const basket = getContext<Writable<BasketData>>(BASKET_DATA_CONTEXT_NAME);
	let processingOrder = false;

	async function postOrderToDatabase() {
		processingOrder = true;
		/// Create order.
		const { data, error: orderOrder } = await supabase
			.from('orders')
			.insert({ customer_name: 'Test Order', allergies: 'test allergies', notes: 'test notes' })
			.select('*')
			.single();

		if (data) {
			/// Create the child order lines.
			const { error: orderLineOrder } = await supabase.from('order_lines').insert(
				$basket.order_lines.map((line) => ({
					order_id: data!.id,
					line_total: line.line_total,
					pizza_size_id: line.pizza_size_id
				}))
			);
		}

		processingOrder = false;

		/// TODO. Go to congfirmation screen
		goto('/confirmation');
	}
</script>

<svelte:head>
	<title>Order Confirmation</title>
	<meta name="description" content="Order Confirmation" />
</svelte:head>

<div>
	<h1>Order Confirmed</h1>

	<div>Congratulations, your order is on it's way!</div>
</div>
