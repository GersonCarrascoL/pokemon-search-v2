import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			title: process.env.VUE_APP_TITLE,
		};
	},
});