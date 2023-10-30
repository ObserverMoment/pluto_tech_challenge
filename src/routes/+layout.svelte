<script lang="ts">
	import Header from '../components/Header.svelte';
	import './styles.css';
	import '../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { BasketData, GlobalAppData } from '$lib/supabase/types_extended';
	import { BASKET_DATA_CONTEXT_NAME, GLOBAL_APP_DATA_CONTEXT_NAME } from '../constants';

	export let data;
	// Create a store for the global DATA
	setContext(GLOBAL_APP_DATA_CONTEXT_NAME, data);

	// Create a store for the basket state
	const basket = writable<BasketData>({ order_lines: [] });
	setContext(BASKET_DATA_CONTEXT_NAME, basket);
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<footer>
		<p>Pluto's Pizza Shop: London's Finest Digital Pizzeria</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
