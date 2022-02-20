import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import StartPage from './pages/StartPage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import QuestionsPage from './pages/QuestionsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

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
