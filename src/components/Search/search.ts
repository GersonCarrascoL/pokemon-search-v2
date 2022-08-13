import Vue from 'vue';

import LoadingScreen from "../../commons/components/LoadingScreen.vue";
import PokemonEmptyList from "./commons/components/PokemonEmptyList/PokemonEmptyList.vue";
import PokemonDetail from "./commons/components/PokemonDetail/PokemonDetail.vue";
import { ItemSearch } from './commons/interface';
import { mapGetters } from 'vuex';
export default Vue.extend({
	data() {
		return {
			inputSearch: ''
		}
	},
	components: {
		LoadingScreen,
		PokemonEmptyList,
		PokemonDetail,
	},
	beforeMount() {
		this.$store.state.btnSelectBottom = 'all';
		this.getListPokemon();
	},
	mounted() {
		setTimeout(() => {
			this.$store.state.isLoading = false;
		}, 2000);
	},
	computed: {
		...mapGetters({
			pokemonList: 'getPokemonList',
			favorites: 'getFavorites',
			isLoading: 'getIsLoading',
			alertSuccess: 'getAlertSuccess',
			alertError: 'getAlertError',
			successMessage: 'getSuccessMessage',
			errorMessage: 'getErrorMessage',
			showPokemonDetail: 'getShowPokemonDetail',
			objectPassModal: 'getObjectPassModal',
			btnSelectBottom: 'getBtnSelectBottom',
		})
	},
	methods: {
		showPokemonDetailModal(item: ItemSearch) {
			this.$store.dispatch('showPokemonDetailModal', item);
		},
		changeFavorite: function (pokemon: ItemSearch, index: number) {
			this.$store.dispatch('changeFavorite', {
				pokemon: pokemon,
				index: index
			});
			this.$forceUpdate();
		},
		onClearClicked() {
			this.inputSearch = '';
			this.$store.dispatch('getListPokemon');
		},
		changeSelected(value: string) {
			this.$store.dispatch('changeSelected', value);
		},
		getListPokemon() {
			this.$store.dispatch('getListPokemon');
		},
		async onSearchPokemon() {
			this.$store.dispatch('onSearchPokemon', this.inputSearch);
		},
	},
});