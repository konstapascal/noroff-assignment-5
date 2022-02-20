<script setup lang="ts">
import { FormattedQuestion, ResponseQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
const allAnswersPicked = true;

onMounted(async () => {
	// If user has not chosen an username, redirect to home
	if (!username.value) return router.push('/');

	const _questions: FormattedQuestion[] = await getQuestions();
	store.commit('setQuestions', _questions);
});

function onSubmitQuestionsClick() {
	// If not all answered, display error
	if (!allAnswersPicked) return console.error('Not all answers picked!');
	// Otherwise, redirect to /results
	router.push('/results');
}
</script>

<template>
	<section>
		<h1 class="text-4xl">Questions Page</h1>
		<div class="mt-4 max-w-lg" v-for="question in questions" :key="question.question">
			<h2 class="text-lg font-semibold">{{ question.question }}</h2>
			<ul>
				<li v-for="answer in question.answers">{{ answer }}</li>
			</ul>
			<p class="text-green-700">Correct answer: {{ question.correct_answer }}</p>
		</div>
		<button
			@click="onSubmitQuestionsClick()"
			class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
		>
			Submit
		</button>
	</section>
</template>
