<script setup lang="ts">
import { FormattedQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed, ref, reactive } from 'vue';
import { useStore } from '../store';
import router from '../router';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
let allAnswersPicked = ref(false);
const picked = reactive([]);

function onAnswerChange() {
	if (picked.length === 10) allAnswersPicked.value = true;
}

onMounted(async () => {
	// If user has not chosen an username, redirect to /
	if (!username.value) return router.push('/');

	const _questions: FormattedQuestion[] = await getQuestions();
	store.commit('setQuestions', _questions);
});

function onSubmitQuestionsClick() {
	// Store user answers to store, redirect to /results
	store.commit('setUserAnswers', picked);
	router.push('/results');
}
</script>

<template>
	<section>
		<h1 class="text-4xl">Questions Page</h1>
		<div class="mt-4 max-w-lg" v-for="({ question, answers }, idx) in questions" :key="question">
			<h2 class="text-lg font-semibold">{{ question }}</h2>
			<div v-for="answer in answers">
				<input
					type="radio"
					:id="answer"
					:value="answer"
					v-model="picked[idx]"
					@change="onAnswerChange()"
				/>
				<label :for="answer">{{ answer }}</label>
			</div>
		</div>
		<button
			v-if="allAnswersPicked"
			@click="onSubmitQuestionsClick()"
			class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
		>
			Submit
		</button>
		<ErrorMessage />
	</section>
</template>
