<script setup lang="ts">
import decodeHtmlEntities from '../util/decodeHtmlEntities';
import Answer from './Answer.vue';

interface QuestionProps {
	question: string;
	questionIdx: number;
	answers: string[];
}

defineProps<QuestionProps>();
</script>

<template>
	<p class="text-lg text-blue-100 font-semibold">
		{{ decodeHtmlEntities(question) }}
	</p>
	<div class="mt-3">
		<div class="mt-2" v-for="answer in answers">
			<Answer :questionIdx="questionIdx" :answer="answer" />
		</div>
	</div>
</template>
