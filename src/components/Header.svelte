<script>
	import { page } from '$app/stores';
	import BasketIcon from '~icons/mdi/basket';
	import logo from '$lib/images/pluto_logo.webp';
</script>

<header
	class="flex justify-between mx-auto relative w-[1000px] gap-4 bg-gray-200 rounded-br-md rounded-bl-md shadow-md px-8"
>
	<div class="flex items-center left-1 gap-2">
		<img src={logo} alt="Pluto's Logo" width={50} />
		<span class="text-xl font-semibold">Pluto's Pizza</span>
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
		<a href="/basket" class="flex items-center align-middle gap-3">
			<span>0 Pizzas!</span>
			<span><BasketIcon /></span>
		</a>
	</div>
</header>
