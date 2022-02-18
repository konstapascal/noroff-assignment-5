import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
	username: string;
	// questions: Question[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
	state: {
		username: ''
		// questions: []
	},
	mutations: {
		setUsername: (state: State, payload: string) => {
			state.username = payload;
		}
		// setQuestions: (state: State, payload: Question[]) => {
		// 	state.questions = payload;
		// }
	}
});

export function useStore() {
	return baseUseStore(key);
}
