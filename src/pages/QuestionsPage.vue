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
const pickedAnswers = reactive([]);

function onAnswerChange() {
	// If picked answers count is the same as the number of questions
	if (pickedAnswers.length === questions.value.length) allAnswersPicked.value = true;
}

onMounted(async () => {
	// If user has not chosen an username, redirect to /
	if (!username.value) return router.push('/');

	const _questions: FormattedQuestion[] = await getQuestions();
	store.commit('setQuestions', _questions);
});

function onSubmitQuestionsClick() {
	// Store user answers to store, redirect to /results
	store.commit('setUserAnswers', pickedAnswers);
	router.push('/results');
}
</script>

<template>
	<section class="container mx-auto my-14 flex flex-col items-center">
		<h1 class="text-4xl">Questions Page</h1>
		<div class="max-w-md">
			<div
				class="mt-8 text-center"
				v-for="({ question, answers }, idx) in questions"
				:key="question"
			>
				<h2 class="text-lg font-semibold">{{ question }}</h2>
				<div class="mt-6">
					<div class="" v-for="answer in answers">
						<input
							class="peer hidden"
							type="radio"
							:id="answer"
							:value="answer"
							v-model="pickedAnswers[idx]"
							@change="onAnswerChange()"
						/>
						<label
							class="block bg-gray-700 mt-2 py-2 peer-checked:bg-yellow-600 hover:cursor-pointer transition-colors"
							:for="answer"
							>{{ answer }}</label
						>
					</div>
				</div>
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
