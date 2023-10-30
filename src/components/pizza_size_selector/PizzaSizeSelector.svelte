<script lang="ts">
	import clsx from 'clsx';
	import type { PizzaSizeOption } from './types';

	export let options: PizzaSizeOption[];
	export let selected = options[0].id;

	const uniqueID = Math.floor(Math.random() * 100);
	const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
</script>

<div
	role="radiogroup"
	class="group-container text-xl flex flex-wrap justify-center gap-5 my-6"
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
>
	{#each options as { id, label, price, toppings }}
		<input
			class="sr-only"
			type="radio"
			id={slugify(label)}
			value={id.toString()}
			bind:group={selected}
		/>
		<label for={slugify(label)}
			><div
				class={clsx(
					selected === id && 'bg-yellow-200',
					'relative shadow p-10 rounded-md hover:cursor-pointer transition-colors duration-200'
				)}
			>
				<div class="absolute top-2 right-2 text-xl">£{price}</div>
				<div class="">{label}</div>
				<div class="text-sm">Includes {toppings} toppings!</div>
			</div>
		</label>
	{/each}
</div>
