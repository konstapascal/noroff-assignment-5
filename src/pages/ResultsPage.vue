<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store';
import router from '../router';
import { getUser, postUser, patchUser } from '../api/users';
import decodeHtmlEntities from '../util/decodeHtmlEntities';

const store = useStore();

const username = computed(() => store.state.username);
const userScore = computed(() => store.getters.userScore);
const questions = computed(() => store.state.questions);
const userAnswers = computed(() => store.state.userAnswers);

const hasNewScore = ref(false);
const hasNewHighScore = ref(false);
const keepsOldScore = ref(false);

onMounted(async () => {
	// If user has not chosen username
	if (!username.value) return router.push('/');

	try {
		const user = await getUser(username.value);

		// If user doesn't exist, create a new one with the score
		if (!user) {
			postUser(username.value, userScore.value);
			hasNewScore.value = true;
			return;
		}
		// Check if score is higher than saved score, then update it
		if (userScore.value > user.score) {
			patchUser(user.id, userScore.value);
			hasNewHighScore.value = true;
		}

		keepsOldScore.value = true;
	} catch (error) {
		console.log(error);
	}
});

function toQuestionsButtonClick() {
	// Reset state
	hasNewScore.value = false;
	hasNewHighScore.value = false;
	keepsOldScore.value = false;

	// Redirect to /questions
	router.push('/questions');
}
</script>

<template>
	<section class="container mx-auto flex my-20 flex-col items-center">
		<h1 class="text-4xl font-bold">Results page</h1>
		<div class="max-w-md">
			<div class="flex flex-col mt-6">
				<div class="text-sm text-center text-yellow-400 font-semibold" v-if="hasNewScore">
					Added a new user to the database with the score of {{ userScore }}.
				</div>
				<div class="text-sm text-center text-yellow-400" v-if="hasNewHighScore">
					You have a new highscore! Updated database score to {{ userScore }}.
				</div>
				<div class="text-sm text-center text-yellow-400" v-if="keepsOldScore">
					You did not earn more than your highest score, score not updated!
				</div>
			</div>

			<div class="text-center text-blue-400 italic text-md mt-2 items-center">
				<p>
					Played as <span class="font-semibold not-italic">{{ username }}</span>
				</p>
				<p>
					Scored <span class="font-semibold not-italic">{{ userScore }}/100</span>
				</p>
			</div>

			<div v-for="({ question, correct_answer }, idx) in questions" class="text-center mt-8">
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
					:class="[correct_answer === userAnswers[idx] ? 'text-green-400' : 'text-red-400']"
				>
					<p>
						User answer:
						<span class="font-semibold">{{ decodeHtmlEntities(userAnswers[idx]) }}</span>
					</p>
				</div>
			</div>

			<div class="flex flex-col items-center mt-12">
				<button
					@click="router.push('/')"
					class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4"
				>
					Choose a new username
				</button>
				<button
					@click="toQuestionsButtonClick()"
					class="bg-blue-600 block hover:bg-blue-700 active:bg-blue-800 rounded-sm mt-2.5 transition-colors py-2 px-4"
				>
					Try new questions
				</button>
			</div>
		</div>
	</section>
</template>
