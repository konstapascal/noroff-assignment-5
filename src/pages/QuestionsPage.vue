<script setup lang="ts">
import { FormattedQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed } from 'vue';
import { useStore } from '../store';
import router from '../router';
import Question from '../components/Question.vue';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
const allAnswersPicked = computed(() => store.state.allAnswersPicked);

onMounted(async () => {
	// If user has not chosen an username, redirect to /
	if (!username.value) return router.push('/');

	const _questions: FormattedQuestion[] = await getQuestions();
	store.commit('setQuestions', _questions);
});

function onSubmitQuestionsClick() {
	// Store user answers to store, redirect to /results
	router.push('/results');
}
</script>

<template>
	<section class="container mx-auto my-20 flex flex-col items-center">
		<h1 class="text-4xl font-bold">Questions</h1>
		<p class="text-md mt-2 text-blue-400 italic">
			Playing as <span class="font-semibold not-italic">{{ username }}</span>
		</p>
		<div class="max-w-md">
			<div class="mt-8 text-center" v-for="({ question, answers }, idx) in questions" :key="idx">
				<Question :question="question" :questionIdx="idx" :answers="answers" />
			</div>
			<div class="flex justify-center mt-12">
				<button
					v-if="allAnswersPicked"
					@click="onSubmitQuestionsClick()"
					class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4"
				>
					Submit
				</button>
			</div>
		</div>
	</section>
</template>
