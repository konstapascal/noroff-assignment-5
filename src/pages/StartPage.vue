<script setup lang="ts">
import router from '../router';
import { useStore } from '../store';

const store = useStore();

function onButtonClicked() {
	const inputElement: HTMLInputElement | null = document.querySelector('#username');

	// Setting username in state, redirecting user to questions
	store.commit('setUsername', inputElement?.value);
	router.push('/questions');
}
</script>

<template>
	<section class="flex flex-col items-center">
		<h1 class="text-4xl">Start Page</h1>
		<label for="username">Choose your username</label>
		<input
			class="border-2 block px-2 py-1 mt-4 text-gray-900 rounded-sm"
			type="text"
			name="username"
			id="username"
		/>
		<button
			@click="onButtonClicked()"
			class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
		>
			Choose name
		</button>
	</section>
</template>
