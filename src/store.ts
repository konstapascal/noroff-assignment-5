import { InjectionKey } from 'vue';
import { useStore as baseUseStore, createStore, Store } from 'vuex';

import { FormattedQuestion } from './interfaces/questions';

export interface State {
	username: string;
	questions: FormattedQuestion[];
	userAnswers: string[];
	allAnswersPicked: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
	state: {
		username: '',
		allAnswersPicked: false,
		questions: [],
		userAnswers: []
	},
	mutations: {
		setUsername: (state: State, payload: string) => {
			state.username = payload;
		},
		setQuestions: (state: State, payload: FormattedQuestion[]) => {
			state.questions = payload;
		},
		setUserAnswers: (state: State, payload: string[]) => {
			state.userAnswers = payload;
		},
		setAllAnswersPicked: (state: State, payload: boolean) => {
			state.allAnswersPicked = payload;
		}
	},
	getters: {
		userScore: (state: State) => {
			const correctAnswers = state.questions.map(question => question.correct_answer);
			const userAnswers = state.userAnswers;

			// Calculating score by comparing user answers to correct answers
			const score = userAnswers.reduce(
				(acc, curr, idx) => (curr === correctAnswers[idx] ? (acc += 10) : acc),
				0
			);

			return score;
		}
	}
});

export function useStore() {
	return baseUseStore(key);
}
