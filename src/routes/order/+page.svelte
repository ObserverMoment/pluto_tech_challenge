<script lang="ts">
	import ChevronRight from '~icons/mdi/chevron-right';
	import { roundToDecimalPlaces, snakeCaseToDisplayString } from '$lib/utils';
	import PizzaSizeSelector from '../../components/pizza_size_selector/PizzaSizeSelector.svelte';
	import ToppingSelector from '../../components/topping_selector/ToppingSelector.svelte';
	import type { PizzaSizeOption } from '../../components/pizza_size_selector/types';
	import type { SelectedToppings } from '../../components/topping_selector/types';
	import { convertSelectionToOrderData } from './utils';

	export let data;
	let { pizza_sizes, pizza_toppings, price_list } = data;

	let selectedSizeId = pizza_sizes.find((p) => p.name === 'medium_pizza')!.id;
	$: selectedPizzaSize = pizza_sizes.find((p) => p.id === selectedSizeId)!;
	$: includedFreeToppings = selectedPizzaSize.included_toppings;

	let selectedToppings: SelectedToppings = pizza_toppings.reduce<SelectedToppings>((acum, next) => {
		acum[next.id] = 0;
		return acum;
	}, {});
	$: usedToppings = Object.values(selectedToppings).reduce((acum, next) => acum + next, 0);

	$: totalOrderPrice = () => {
		const pizzaPrice = price_list.find((p) => p.name === selectedPizzaSize.name)!.price;
		const singleToppingPrice = price_list.find((p) => p.name === 'extra_topping')!.price;

		const paidToppings = Math.max(0, usedToppings - selectedPizzaSize.included_toppings);
		const usedToppingsPrice = paidToppings * singleToppingPrice;
		return roundToDecimalPlaces(pizzaPrice + usedToppingsPrice, 2);
	};

	function pizzaSizeOptions(): PizzaSizeOption[] {
		return pizza_sizes.map(({ id, name, included_toppings }) => ({
			id: id,
			label: snakeCaseToDisplayString(name),
			price: price_list.find((p) => p.name === name)!.price,
			toppings: included_toppings
		}));
	}

	function addToBasket() {
		const orderLine = convertSelectionToOrderData({
			lineTotal: totalOrderPrice(),
			pizzaSize: selectedPizzaSize,
			selectedToppings: selectedToppings,
			allToppings: pizza_toppings
		});
		console.log(orderLine);
	}
</script>

<svelte:head>
	<title>Order Online</title>
	<meta name="description" content="Order Online" />
</svelte:head>

<div>
	<div class="flex justify-between py-3">
		<h1 class="text-4xl">Easy Ordering</h1>
		<div class="flex gap-4">
			<div class="px-4 py-2 rounded-md text-lg border-slate-900 border-2">
				Order Total: £{totalOrderPrice()}
			</div>
			<button
				on:click={addToBasket}
				class="flex text-lg px-4 py-2 bg-slate-900 text-white rounded-md items-center"
			>
				<span class="text-justify">Add to Basket</span>
				<span><ChevronRight /></span>
			</button>
		</div>
	</div>

	<div class="py-2">
		<h2 class="text-2xl">1. Choose Your Pizza Size</h2>
		<PizzaSizeSelector options={pizzaSizeOptions()} bind:selected={selectedSizeId} />
	</div>

	<div class="py-2">
		<h2 class="text-2xl">2. Choose Your Toppings</h2>
		<p>
			{Math.min(usedToppings, selectedPizzaSize.included_toppings)} of {includedFreeToppings} free topping
			used
		</p>

		<ToppingSelector options={pizza_toppings} bind:selected={selectedToppings} />
	</div>
</div>
