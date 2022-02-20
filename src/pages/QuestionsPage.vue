<script setup lang="ts">
import { FormattedQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed, ref, reactive } from 'vue';
import { useStore } from '../store';
import router from '../router';
import ErrorMessage from '../components/ErrorMessage.vue';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
const allAnswersPicked = false;
const picked = reactive([]);

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
		<div
			class="mt-4 max-w-lg"
			v-for="({ question, answers, correct_answer }, idx) in questions"
			:key="question"
		>
			<h2 class="text-lg font-semibold">{{ question }}</h2>
			<div v-for="answer in answers">
				<input type="radio" id="question-{{idx}}" value="{{answer}}" v-model="picked" />
				<label for="question-{{idx}}">{{ answer }}</label>
			</div>
			<p class="text-green-700">Correct answer: {{ correct_answer }}</p>
		</div>
		<button
			@click="onSubmitQuestionsClick()"
			class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
		>
			Submit
		</button>
		<ErrorMessage />
	</section>
</template>
