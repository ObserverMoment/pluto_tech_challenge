<script lang="ts">
	import { goto } from '$app/navigation';
	import { BarLoader } from 'svelte-loading-spinners';
	import { getContext } from 'svelte';
	import { BASKET_DATA_CONTEXT_NAME } from '../../constants';
	import { calculateOrderTotal } from '../order/utils';
	import BasketOrderLine from '../../components/basket_order_line/BasketOrderLine.svelte';
	import { supabase } from '$lib/supabase/supabaseClient';
	import type { BasketData } from '$lib/supabase/types_extended';
	import type { Writable } from 'svelte/store';

	const basket = getContext<Writable<BasketData>>(BASKET_DATA_CONTEXT_NAME);
	$: processingOrder = false;

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
					pizza_size_id: line.pizza_size_id,
					toppings: line.toppings
				}))
			);
		}

		processingOrder = false;

		/// Clear the basket.
		basket.set({ order_lines: [] });

		/// TODO. Go to congfirmation screen
		goto('/confirmation');
	}
</script>

<svelte:head>
	<title>Order Basket</title>
	<meta name="description" content="Order Basket" />
</svelte:head>

<div class="p-2">
	<h1 class="text-4xl">Your Basket</h1>
	<div class="bg-yellow-50 p-8 shadow-sm rounded-lg m-5">
		{#if $basket.order_lines.length > 0}
			{#each $basket.order_lines as line}
				<BasketOrderLine orderLine={line} />
			{/each}
		{:else}
			<div>No pizzas added yet...</div>
		{/if}
	</div>
	<div>
		<h2 class="flex justify-end px-8 font-bold">
			Order Total: {calculateOrderTotal($basket.order_lines)}
		</h2>
	</div>
	{#if $basket.order_lines.length > 0}
		<div class="flex justify-center p-4">
			<button
				on:click={postOrderToDatabase}
				class="flex justify-center w-[90%] bg-red-400 rounded-full px-5 py-3 font-semibold"
				disabled={processingOrder}
			>
				{#if processingOrder}
					<BarLoader color="#ffffff" />
				{:else}
					<div>Confirm and Place Your Order</div>
				{/if}
			</button>
		</div>
	{/if}
</div>
