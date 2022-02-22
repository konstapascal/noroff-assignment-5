import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from './enums/routes';

import NotFoundPage from './pages/NotFoundPage.vue';
import QuestionsPage from './pages/QuestionsPage.vue';
import ResultsPage from './pages/ResultsPage.vue';
import StartPage from './pages/StartPage.vue';

const routes: RouteRecordRaw[] = [
	{
		path: Routes.Home,
		component: StartPage,
		alias: ['/home', '/start']
	},
	{
		path: Routes.Questions,
		component: QuestionsPage
	},
	{
		path: Routes.Results,
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
