<script lang="ts">
	import clsx from 'clsx';
	import { capitalizeString } from '$lib/utils';
	import AddIcon from '~icons/mdi/plus';
	import DeleteIcon from '~icons/mdi/trash-can-outline';
	import MinusIcon from '~icons/mdi/minus';
	import type { PizzaTopping } from '$lib/supabase/types_extended';
	import type { SelectedToppings } from './types';

	export let options: PizzaTopping[] = [];
	export let selected: SelectedToppings = {};

	const uniqueID = Math.floor(Math.random() * 100);

	function handleAddItem(topping_id: number) {
		const prev = selected[topping_id];
		selected = {
			...selected,
			[topping_id]: prev === undefined ? 1 : prev + 1
		};
	}

	function handleRemoveItem(topping_id: number) {
		const prev = selected[topping_id];
		if (prev === undefined || prev === 0) {
			return;
		}
		selected = {
			...selected,
			[topping_id]: prev - 1
		};
	}
</script>

<div
	role="radiogroup"
	class="group-container text-xl flex gap-5 my-6 flex-wrap justify-center"
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
>
	{#each options as { id, name }}
		<div
			class={clsx(
				'shadow p-4 rounded-md border-4 transition-colors duration-200 w-[180px]',
				!!selected[id] && selected[id] >= 1
					? 'border-transparent border-b-yellow-200'
					: 'border-transparent'
			)}
		>
			<div>
				<span>{capitalizeString(name)}</span>
				<span
					class={clsx(
						selected[id] >= 1 ? 'opacity-100' : 'opacity-0',
						'transition-opacity duration-20 text-red-500'
					)}>x {selected[id]}</span
				>
			</div>

			<div class="flex justify-center gap-1 mt-3">
				{#if selected[id] >= 1}
					<div
						on:click={() => handleRemoveItem(id)}
						on:keyup={() => handleRemoveItem(id)}
						class="shadow p-1 rounded-md hover:cursor-pointer flex flex-grow justify-center"
						role="button"
						tabindex={0}
					>
						{#if selected[id] === 1}
							<DeleteIcon />
						{:else}
							<MinusIcon />
						{/if}
					</div>
				{/if}
				<div
					on:click={() => handleAddItem(id)}
					on:keyup={() => handleAddItem(id)}
					class="shadow p-1 rounded-md hover:cursor-pointer flex flex-grow justify-center"
					role="button"
					tabindex={1}
				>
					<AddIcon />
				</div>
			</div>
		</div>
	{/each}
</div>
