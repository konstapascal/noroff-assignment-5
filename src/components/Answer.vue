<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';
import decodeHtmlEntities from '../util/decodeHtmlEntities';

interface AnswerProps {
	answer: string;
	questionIdx: number;
}

defineProps<AnswerProps>();

const store = useStore();

const questions = computed(() => store.state.questions);
const userAnswers = computed(() => store.state.userAnswers);

function onAnswerChange() {
	// Save user answers in global state
	store.commit('setUserAnswers', userAnswers.value);

	// If user answers count is the same as the number of questions, after filtering out undefined
	const actualAnswers = userAnswers.value.filter(answer => answer !== undefined);

	if (actualAnswers.length === questions.value.length) {
		// State for submit button visibility
		store.commit('setAllAnswersPicked', true);
	}
}
</script>

<template>
	<input
		class="peer hidden"
		type="radio"
		:id="`${questions[questionIdx]}${answer}`"
		:value="answer"
		v-model="userAnswers[questionIdx]"
		@change="onAnswerChange()"
	/>
	<label
		class="block bg-gray-700 border-2 rounded-sm border-gray-600 py-2 peer-checked:bg-blue-600 peer-checked:border-blue-500 hover:cursor-pointer hover:bg-blue-600 hover:border-blue-500 active:bg-blue-700 transition-colors"
		:for="`${questions[questionIdx]}${answer}`"
		>{{ decodeHtmlEntities(answer) }}</label
	>
</template>
