import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import NotFoundPage from './pages/NotFoundPage.vue';
import QuestionsPage from './pages/QuestionsPage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import StartPage from './pages/StartPage.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: StartPage,
		alias: ['/home', '/start']
	},
	{
		path: '/questions',
		component: QuestionsPage
	},
	{
		path: '/results',
		component: ResultsPage
	},
	{
		path: '/:catchAll(.*)',
		component: NotFoundPage
	}
];

export default createRouter({
	history: createWebHistory(),
	routes
});
