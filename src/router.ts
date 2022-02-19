import { createRouter, createWebHistory } from 'vue-router';

import QuestionsPage from './pages/QuestionsPage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import StartPage from './pages/StartPage.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: StartPage
		},
		{
			path: '/questions',
			component: QuestionsPage
		},
		{
			path: '/results',
			component: ResultsPage
		}
	]
});
