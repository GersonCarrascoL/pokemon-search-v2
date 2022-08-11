import Vue from 'vue';
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const PokemonRepository = RepositoryFactory.get("pokemon");

import LoadingScreen from "../../commons/components/LoadingScreen.vue";
import PokemonEmptyList from "./commons/components/PokemonEmptyList/PokemonEmptyList.vue";
import PokemonDetail from "./commons/components/PokemonDetail/PokemonDetail.vue";
import { ItemSearch } from './commons/interface/item-search';
import { Type } from './commons/interface/pokemon';

export default Vue.extend({
	data: () => ({
		inputSearch: "",
		isLoading: true,
		alertSuccess: false,
		alertError: false,
		successMessage: "",
		errorMessage: "",
		pokemonList: [] as ItemSearch[],
		showPokemonDetail: false,
		objectPassModal: null,
		btnSelectBottom: "all",
	}),
	components: {
		LoadingScreen,
		PokemonEmptyList,
		PokemonDetail,
	},
	beforeMount() {
		this.getListPokemon();
	},
	mounted() {
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	},
	methods: {
		async showPokemonDetailModal(item: ItemSearch) {
			const { data } = await PokemonRepository.getPokemon(item.name);
			data["nameUpper"] =
				data.name.charAt(0).toUpperCase() + data.name.slice(1);

			console.log(data)
			data.types.forEach((type: Type, index: number) => {
				data["typesList"] = "";
				index + 1 == data.types.length
					? (data["typesList"] += type.type.name + "")
					: (data["typesList"] += type.type.name + ",");
			});
			data["favorite"] = item.favorite;
			this.objectPassModal = data;
			this.showPokemonDetail = true;
		},
		getFavorites() {
			const favorites = this.pokemonList.filter(
				(pokemon) => pokemon.favorite == true
			);
			this.pokemonList = favorites;
		},
		changeFavorite: function (pokemon: ItemSearch) {
			pokemon.favorite = !pokemon.favorite;
			const favorites = JSON.parse(
				localStorage.getItem("favorites") || "[]"
			);
			if (pokemon.favorite) {
				if (favorites) {
					favorites.push({
						name: pokemon.name,
					});
				}
			} else {
				favorites.forEach((pokemonFav: ItemSearch, index: number, object: []) => {
					if (pokemonFav.name == pokemon.name) {
						object.splice(index, 1);
					}
				});
			}
			localStorage.setItem("favorites", JSON.stringify(favorites));
			this.$forceUpdate();
		},
		onClearClicked() {
			this.getListPokemon();
		},
		changeSelected(value: string) {
			this.btnSelectBottom = value;
			this.inputSearch = "";
			switch (value) {
				case "fav":
					this.getFavorites();
					break;
				case "all":
					this.getListPokemon();
					break;
			}
		},
		async getListPokemon() {
			try {
				const { data } = await PokemonRepository.getListPokemon();
				if (data != undefined) {
					this.successMessage = "Successfull search!.";
					this.pokemonList = data.results;

					const favorites = JSON.parse(
						localStorage.getItem("favorites") || "[]"
					);
					this.pokemonList.forEach((pokemon) => {
						const find = favorites.find(
							(pokemonFav: ItemSearch) => pokemonFav.name == pokemon.name
						);
						find
							? (pokemon["favorite"] = true)
							: (pokemon["favorite"] = false);

						pokemon["nameUpper"] =
							pokemon.name.charAt(0).toUpperCase() +
							pokemon.name.slice(1);
					});
				} else {
					this.successMessage = "Nothing found";
					this.pokemonList = [];
				}
			} catch (error) {
				if (error instanceof Error) {
					this.errorMessage = error.message;
				}
				this.isLoading = false;
				this.alertSuccess = false;
				this.alertError = true;
				setTimeout(() => {
					this.alertError = false;
				}, 2000);
			}
		},
		async onSearchPokemon() {
			try {
				this.isLoading = true;

				const data = await PokemonRepository.getPokemon(
					this.inputSearch.toLowerCase().trim()
				);
				this.isLoading = false;
				this.alertSuccess = true;
				this.alertError = false;
				if (data != undefined) {
					this.successMessage = "Successfull search!.";
					this.pokemonList = [
						{
							name: data.data.name,
							nameUpper:
								data.data.name.charAt(0).toUpperCase() +
								data.data.name.slice(1),
						},
					];
				} else {
					this.successMessage = "Nothing found";
					this.pokemonList = [];
				}
				setTimeout(() => {
					this.alertSuccess = false;
				}, 2000);
			} catch (error) {
				if (error instanceof Error) {
					this.errorMessage = error.message;
				}
				this.pokemonList = [];
				this.isLoading = false;
				this.alertSuccess = false;
				this.alertError = true;
				setTimeout(() => {
					this.alertError = false;
				}, 5000);
			}
		},
	},
});