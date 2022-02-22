<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';
import decodeHtmlEntities from '../util/decodeHtmlEntities';

interface SummaryProps {
	question: string;
	questionIdx: number;
	correct_answer: string;
}

defineProps<SummaryProps>();

const store = useStore();

const userAnswers = computed(() => store.state.userAnswers);
</script>

<template>
	<p class="text-lg text-blue-100 font-semibold">{{ decodeHtmlEntities(question) }}</p>
	<div
		class="bg-blue-700 border-2 border-blue-600 rounded-sm text-blue-100 mt-3 py-2 transition-colors"
	>
		<p>
			Correct answer:
			<span class="font-semibold"> {{ decodeHtmlEntities(correct_answer) }}</span>
		</p>
	</div>
	<div
		class="bg-gray-700 border-2 border-gray-600 rounded-sm mt-2 py-2 transition-colors"
		:class="[correct_answer === userAnswers[questionIdx] ? 'text-green-400' : 'text-red-400']"
	>
		<p>
			User answer:
			<span class="font-semibold">{{ decodeHtmlEntities(userAnswers[questionIdx]) }}</span>
		</p>
	</div>
</template>
