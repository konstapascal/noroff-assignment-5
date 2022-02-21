<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();
const username = ref('');

const onButtonClick = () => {
	// Set the username in state and redirect to questions
	store.commit('setUsername', username.value);
	router.push('/questions');
};
</script>

<template>
	<section class="container mx-auto flex flex-col items-center">
		<h1 class="text-4xl">Start Page</h1>
		<div class="mt-4">
			<label class="text-left" for="username">Choose your username</label>
			<input
				v-model.trim="username"
				class="border-2 block px-2 py-1 mt-2 text-gray-900 rounded-sm"
				type="text"
				name="username"
				id="username"
			/>
			<div class="flex justify-center mt-4">
				<button
					@click="onButtonClick()"
					class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4"
				>
					Play now
				</button>
			</div>
		</div>
	</section>
</template>
