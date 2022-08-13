import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes/router';
import { store } from './store';

Vue.config.productionTip = false;

new Vue({
	router: router,
	vuetify,
	store,
	render: (h) => h(App),
}).$mount('#app');
