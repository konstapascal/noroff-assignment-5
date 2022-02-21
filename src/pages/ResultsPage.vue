<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();

const username = computed(() => store.state.username);
const userScore = computed(() => store.getters.userScore);
const questions = computed(() => store.state.questions);
const userAnswers = computed(() => store.state.userAnswers);

onMounted(() => {
	// If user has not chosen username
	if (!username.value) return router.push('/');
});
</script>

<template>
	<section class="container mx-auto flex flex-col items-center">
		<h1 class="text-4xl">Results page</h1>
		<div class="max-w-md">
			<div class="flex flex-col mt-2 items-center">
				<p class="text-lg">Username: {{ username }}</p>
				<p class="text-lg">Score: {{ userScore }}/100</p>
			</div>

			<div v-for="({ question, correct_answer }, idx) in questions" class="mt-6">
				<p class="font-semibold">{{ question }}</p>
				<p class="text-sm">Correct answer: {{ correct_answer }}</p>
				<p
					class="text-sm"
					:class="[correct_answer === userAnswers[idx] ? 'text-green-400' : 'text-red-400']"
				>
					User answer: {{ userAnswers[idx] }}
				</p>
			</div>

			<div class="flex flex-col items-center">
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
		</div>
	</section>
</template>
