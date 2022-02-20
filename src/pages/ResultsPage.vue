<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();
const username = computed(() => store.state.username);
const userScore = computed(() => store.getters.userScore);

onMounted(() => {
	// If user has not chosen username
	if (!username.value) return router.push('/');
});
</script>

<template>
	<section>
		<h1 class="text-4xl">Results page</h1>
		<p class="text-lg">Username: {{ username }}</p>
		<p class="text-lg">Points: {{ userScore }}/100</p>
		<div class="">
			<button
				@click="router.push('/questions')"
				class="bg-blue-600 block hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
			>
				Try new questions
			</button>
			<button
				@click="router.push('/')"
				class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-2"
			>
				Choose new username
			</button>
		</div>
	</section>
</template>
