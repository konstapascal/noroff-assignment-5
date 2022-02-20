import { InjectionKey } from 'vue';
import { useStore as baseUseStore, createStore, Store } from 'vuex';

import { FormattedQuestion } from './interfaces/questions';

export interface State {
	username: string;
	questions: FormattedQuestion[];
	userAnswers: (string | boolean)[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
	state: {
		username: '',
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
		setUserAnswers: (state: State, payload: (string | boolean)[]) => {
			state.userAnswers = payload;
		}
	},
	getters: {
		userScore: (state: State) => {
			const correctAnswers = state.questions.map(question => question.correct_answer);
			const userAnswers = state.userAnswers;

			let score = 0;

			for (let i = 0; i < userAnswers.length; i++) {
				if (state.userAnswers[i] === correctAnswers[i]) score += 10;
			}

			return score;
		}
	}
});

export function useStore() {
	return baseUseStore(key);
}
