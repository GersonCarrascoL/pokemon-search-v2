import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './routes/router';
Vue.config.productionTip = false;

new Vue({
    router: router,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
