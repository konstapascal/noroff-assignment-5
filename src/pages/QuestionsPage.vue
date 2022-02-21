<script setup lang="ts">
import { FormattedQuestion } from '../interfaces/questions';
import getQuestions from '../api/questions';
import { onMounted, computed, ref, reactive } from 'vue';
import { useStore } from '../store';
import router from '../router';
import decodeHtmlEntities from '../util/decodeHtmlEntities';

const store = useStore();

const username = computed(() => store.state.username);
const questions = computed(() => store.state.questions);
let allAnswersPicked = ref(false);
const pickedAnswers = reactive([]);

function onAnswerChange() {
	// If picked answers count is the same as the number of questions
	// Filtering undefined entries, can occur when picking answers out of order
	const actualAnswers = pickedAnswers.filter(answer => answer !== undefined);
	if (actualAnswers.length === questions.value.length) allAnswersPicked.value = true;
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
	<section class="container mx-auto my-20 flex flex-col items-center">
		<h1 class="text-4xl font-bold">Questions</h1>
		<p class="text-md mt-2 text-blue-400 italic">
			Playing as <span class="font-semibold not-italic">{{ username }}</span>
		</p>
		<div class="max-w-md">
			<div
				class="mt-8 text-center"
				v-for="({ question, answers }, idx) in questions"
				:key="question"
			>
				<p class="text-lg text-blue-100 font-semibold">{{ decodeHtmlEntities(question) }}</p>
				<div class="mt-3">
					<div class="mt-2" v-for="answer in answers">
						<input
							class="peer hidden"
							type="radio"
							:id="answer"
							:value="answer"
							v-model="pickedAnswers[idx]"
							@change="onAnswerChange()"
						/>
						<label
							class="block bg-gray-700 border-2 rounded-sm border-gray-600 py-2 peer-checked:bg-blue-600 peer-checked:border-blue-500 hover:cursor-pointer transition-colors"
							:for="answer"
							>{{ decodeHtmlEntities(answer) }}</label
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
