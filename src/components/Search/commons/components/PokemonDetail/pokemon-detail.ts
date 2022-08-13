import { mapGetters } from 'vuex';
import Vue from 'vue';
export default Vue.extend({
	data: () => ({
		snackbar: false,
		text: `Text  copied!`,
	}),
	computed: {
		...mapGetters({
			showPokemonDetail: 'getShowPokemonDetail',
			objectPassModal: 'getObjectPassModal',
		}),
	},
	methods: {
		copyClipboard() {
			const clipboard =
				"name: " +
				this.objectPassModal.name +
				", weight: " +
				this.objectPassModal.weight +
				", height: " +
				this.objectPassModal.height +
				", types: " +
				this.objectPassModal.typesList;
			navigator.clipboard.writeText(clipboard);
			this.snackbar = true;
		},
		closeModalDetail() {
			this.$store.dispatch('closeModalDetail');
		}
	},
});