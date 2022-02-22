<script setup lang="ts">
import { FormattedQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed, ref } from 'vue';
import { useStore } from '../store';
import router from '../router';
import Question from '../components/Question.vue';
import scrollToTop from '../util/scrollToTop';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { Routes } from '../enums/routes';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
const allAnswersPicked = computed(() => store.state.allAnswersPicked);

const isLoading = ref(true);

onMounted(async () => {
	// If user has not chosen an username, redirect to /
	if (!username.value) return router.push(Routes.Home);

	const _questions: FormattedQuestion[] = await getQuestions();
	isLoading.value = false;
	store.commit('setQuestions', _questions);
});

function onSubmitQuestionsClick() {
	// Store user answers to store, redirect to /results
	scrollToTop();
	router.push(Routes.Results);
}
</script>

<template>
	<section class="container mx-auto my-20 flex flex-col items-center">
		<h1 class="text-5xl font-bold">Questions</h1>
		<p class="text-md mt-2 text-blue-400 italic">
			Playing as <span class="font-semibold not-italic">{{ username }}</span>
		</p>
		<div class="max-w-md mx-4 lg:mx-0">
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
		<PulseLoader color="#63A4F6" :loading="isLoading" />
	</section>
</template>
