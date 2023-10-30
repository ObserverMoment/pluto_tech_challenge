<svelte:head>
	<title>Order History</title>
	<meta name="description" content="Order History" />
</svelte:head>

<script>
	export let data;
</script>

<div>
	<h1>Order History</h1>
    {#each data.orders as { customer_name }}
		<li><p>{customer_name}</p></li>
	{/each}
</div>