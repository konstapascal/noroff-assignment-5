<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store';
import router from '../router';
import { getUser, postUser, patchUser } from '../api/users';

const store = useStore();

const username = computed(() => store.state.username);
const userScore = computed(() => store.getters.userScore);
const questions = computed(() => store.state.questions);
const userAnswers = computed(() => store.state.userAnswers);

const newScore = ref(false);
const newHighScore = ref(false);
const keepOldScore = ref(false);

onMounted(async () => {
	// If user has not chosen username
	if (!username.value) return router.push('/');

	try {
		const user = await getUser(username.value);

		// If user doesn't exist, create a new one with the score
		if (!user) {
			postUser(username.value, userScore.value);
			newScore.value = true;
			return;
		}
		// Check if score is higher than saved score, then update it
		if (userScore.value > user.score) {
			patchUser(user.id, userScore.value);
			newHighScore.value = true;
		}

		keepOldScore.value = true;
	} catch (error) {
		console.log(error);
	}
});
</script>

<template>
	<section class="container mx-auto flex flex-col items-center">
		<h1 class="text-4xl">Results page</h1>
		<div class="max-w-md">
			<div class="flex flex-col mt-2 items-center">
				<p class="text-lg">Username: {{ username }}</p>
				<p class="text-lg">Score: {{ userScore }}/100</p>
			</div>

			<div v-for="({ question, correct_answer }, idx) in questions" class="mt-6">
				<p class="font-semibold">{{ question }}</p>
				<p class="text-sm">Correct answer: {{ correct_answer }}</p>
				<p
					class="text-sm"
					:class="[correct_answer === userAnswers[idx] ? 'text-green-400' : 'text-red-400']"
				>
					User answer: {{ userAnswers[idx] }}
				</p>
			</div>

			<div class="flex flex-col items-center">
				<button
					@click="router.push('/questions')"
					class="bg-blue-600 block hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-4"
				>
					Try new questions
				</button>
				<button
					@click="router.push('/')"
					class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4 mt-2"
				>
					Choose new username
				</button>
			</div>
		</div>
	</section>
</template>
