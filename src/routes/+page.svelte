<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		console.log(data)

	})
	let searchString = '';

	let books: any[] = [];

	async function handleSubmit() {
		const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes');
		const json = await res.json();
		books = json.items;
		books.forEach((book) => console.log(book.volumeInfo));
	}
</script>

<main class="w-fit h-fit">
	<div class="flex flex-col gap-4 items-center inset-x-0 mx-auto absolute">
		<div class="w-fit h-fit mx-auto inset-x-0 pt-4">
			<input type="text" bind:value={searchString} />
			<button
				class="w-fit h-fit p-2 bg-slate-700 hover:bg-slate-600 rounded-md"
				type="submit"
				on:click={handleSubmit}>Submit</button
			>
		</div>

		<div class="flex flex-col gap-4">
			{#each books as book, index}
				<form method="POST">
					<input name="json" type="hidden" value={JSON.stringify(book)}>
					<div class="w-full h-full bg-slate-900 flex rounded-xl">
						{#if book.volumeInfo.imageLinks !== undefined}
							<img
								src={book.volumeInfo.imageLinks.thumbnail}
								alt=""
								class="rounded-bl-xl rounded-tl-xl"
							/>
						{:else}
							<div class="w-[128px] h-[184px] bg-white rounded-bl-xl rounded-tl-xl">
								<h1 class="text-center">No Cover Found</h1>
							</div>
						{/if}
						<div>
							<h1 class="text-white">Title : {book.volumeInfo.title}</h1>
							<h1 class="text-white">Subtitle : {book.volumeInfo?.subtitle}</h1>
							<h1 class="text-white">
								Pages : {book.volumeInfo?.pageCount ? book.volumeInfo.pageCount : 'N/A'}
							</h1>
							<h1 class="text-white">
								Rating : {book.volumeInfo?.averageRating ? book.volumeInfo.averageRating : 'N/A'}
							</h1>
							<h1 class="text-white">
								Rating Count : {book.volumeInfo?.ratingsCount
									? book.volumeInfo.ratingsCount
									: 'N/A'}
							</h1>
							<h1 class="text-white">Authors: {book.volumeInfo.authors.join(' , ')}</h1>
							<h1 class="text-white">
								Categories: {book.volumeInfo.categories ? book.volumeInfo.categories : 'unkown'}
							</h1>
							{#if book.volumeInfo.description}
								<button
									type="button"
									on:click={() => alert(book.volumeInfo.description)}
									class="text-white w-fit h-fit bg-gray-600 hover:bg-gray-500 p-2 rounded-md"
									>Description</button
								>
							{/if}
							<button
								type="submit"
								class="text-white w-fit h-fit bg-green-600 hover:bg-green-500 p-2 rounded-md"
								>submit</button
							>
						</div>
					</div>
				</form>
			{/each}
		</div>
	</div>
</main>
