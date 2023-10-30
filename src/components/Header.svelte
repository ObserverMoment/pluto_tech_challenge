<script lang="ts">
	import { page } from '$app/stores';
	import BasketIcon from '~icons/mdi/basket';
	import logo from '$lib/images/pluto_logo.webp';
	import { getContext } from 'svelte';
	import { BASKET_DATA_CONTEXT_NAME } from '../constants';
	import type { BasketData, OrderLineData } from '$lib/supabase/types_extended';
	import type { Writable } from 'svelte/store';
	import { roundToDecimalPlaces } from '$lib/utils';
	import { calculateOrderTotal } from '../routes/order/utils';

	// Retrieve basket store.
	const basket = getContext<Writable<BasketData>>(BASKET_DATA_CONTEXT_NAME);
</script>

<header
	class="flex justify-between mx-auto relative max-w-[1000px] lg:w-[1000px] gap-20 bg-gray-200 rounded-br-md rounded-bl-md shadow-md px-8"
>
	<div class="flex items-center left-1 gap-2">
		<img src={logo} alt="Pluto's Logo" width={30} />
		<span class="font-semibold hidden md:flex">Pluto's Pizza</span>
		<nav class="flex justify-center px-5 py-1">
			<ul class="flex [&>*]:p-4">
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">About Us</a>
				</li>
				<li aria-current={$page.url.pathname === '/order' ? 'page' : undefined}>
					<a href="/order">Order</a>
				</li>
			</ul>
		</nav>
	</div>

	<div class="flex items-center align-middle">
		<a href="/basket" class="flex items-center gap-3">
			<span class="font-bold text-purple-500">£{calculateOrderTotal($basket.order_lines)}</span>
			<span>{$basket.order_lines.length} Pizzas!</span>
			<span><BasketIcon /></span>
		</a>
	</div>
</header>
