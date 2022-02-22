<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '../store';
import router from '../router';
import { getUser, postUser, patchUser } from '../api/users';
import QuizSummary from '../components/QuizSummary.vue';
import AnswerSummary from '../components/AnswerSummary.vue';
import scrollToTop from '../util/scrollToTop';
import { Routes } from '../enums/routes';

const store = useStore();

const username = computed(() => store.state.username);
const userScore = computed(() => store.getters.userScore);
const questions = computed(() => store.state.questions);

const hasNewScore = ref(false);
const hasNewHighScore = ref(false);
const keepsOldScore = ref(false);

onMounted(async () => {
	// If user has not chosen username
	if (!username.value) return router.push(Routes.Home);

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
			return;
		}

		keepsOldScore.value = true;
	} catch (error) {
		console.log(error);
	}
});

function onButtonClick(route: string) {
	// Reset state locally and globally
	hasNewScore.value = false;
	hasNewHighScore.value = false;
	keepsOldScore.value = false;

	store.commit('setAllAnswersPicked', false);
	store.commit('setUserAnswers', []);
	store.commit('setQuestions', []);

	// Redirect to route
	scrollToTop();
	router.push(route);
}
</script>

<template>
	<section class="container mx-auto flex my-20 flex-col items-center">
		<h1 class="text-5xl font-bold text-center">Results page</h1>
		<div class="max-w-md mx-4 lg:mx-0">
			<div class="flex flex-col mt-6 text-blue-100">
				<div class="text-sm text-center font-semibold" v-if="hasNewScore">
					Added a new user to the database with the score of {{ userScore }}.
				</div>
				<div class="text-sm text-center" v-if="hasNewHighScore">
					You have a new highscore! Updated database score to {{ userScore }}.
				</div>
				<div class="text-sm text-center" v-if="keepsOldScore">
					You did not earn more than your highest score, score not updated!
				</div>
			</div>

			<QuizSummary :username="username" :userScore="userScore" />

			<div v-for="({ question, correct_answer }, idx) in questions" class="text-center mt-8">
				<AnswerSummary
					:question="question"
					:questionIdx="idx"
					:correct_answer="correct_answer"
				/>
			</div>

			<div class="flex flex-col items-center mt-12">
				<button
					@click="onButtonClick(Routes.Home)"
					class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4"
				>
					Choose a new username
				</button>
				<button
					@click="onButtonClick(Routes.Questions)"
					class="bg-blue-600 block hover:bg-blue-700 active:bg-blue-800 rounded-sm mt-2.5 transition-colors py-2 px-4"
				>
					Try new questions
				</button>
			</div>
		</div>
	</section>
</template>
