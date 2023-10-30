<script lang="ts">
	import { getContext } from 'svelte';
	import { GLOBAL_APP_DATA_CONTEXT_NAME } from '../../constants';
	import { capitalizeString, roundToDecimalPlaces, snakeCaseToDisplayString } from '$lib/utils';
	import type { GlobalAppData, OrderLineData } from '$lib/supabase/types_extended';

	export let orderLine: OrderLineData;

	const globalAppData = getContext<GlobalAppData>(GLOBAL_APP_DATA_CONTEXT_NAME);
	const { pizza_sizes } = globalAppData;

	$: pizzaSizeName = pizza_sizes.find((s) => s.id === orderLine.pizza_size_id)?.name;
	$: toppingsList = Object.entries(orderLine.toppings);
</script>

<div class="p-2">
	<div class="flex justify-between">
		<div>{snakeCaseToDisplayString(pizzaSizeName ?? '')}</div>
		<div class="font-semibold">£{roundToDecimalPlaces(orderLine.line_total, 2)}</div>
	</div>
	<div class="text-sm text-gray-500 flex gap-3 flex-wrap">
		{#if toppingsList.length > 0}
			{#each toppingsList as [toppingName, quantity]}
				<span>{capitalizeString(toppingName)} x {quantity}</span>
			{/each}
		{:else}
			<div>No toppings...</div>
		{/if}
	</div>
</div>
