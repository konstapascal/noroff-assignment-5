import { createWebHistory, createRouter } from 'vue-router';

import StartPage from './pages/StartPage.vue';
import QuestionsPage from './pages/QuestionsPage.vue';
import ResultsPage from './pages/ResultsPage.vue';

const routes = [
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
];

export default createRouter({
	history: createWebHistory(),
	routes
});
