import { Path } from '@/commons/enum';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: Path.HOME,
			name: 'home',
			component: () => import('../components/Home/Home.vue'),
		},
		{
			path: Path.SEARCH,
			name: 'search',
			component: () => import('../components/Search/Search.vue'),
		},
	],
});
