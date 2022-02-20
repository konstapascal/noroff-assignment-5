<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();
const username = ref('');
const storeUsername = computed(() => store.state.username);

onMounted(() => {
	// If user has set his username from before, reset it
	// This can be the case when user is redirected back here
	if (storeUsername.value) store.commit('setUsername', '');
});

const onButtonClick = () => {
	// Set the username in state and redirect to questions
	store.commit('setUsername', username.value);
	router.push('/questions');
};
</script>

<template>
	<section class="flex flex-col items-center">
		<h1 class="text-4xl">Start Page</h1>
		<label for="username">Choose your username</label>
		<input
			v-model.trim="username"
			class="border-2 block px-2 py-1 mt-4 text-gray-900 rounded-sm"
			type="text"
			name="username"
			id="username"
		/>
		<button
			@click="onButtonClick()"
			class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
		>
			Play now
		</button>
	</section>
</template>
