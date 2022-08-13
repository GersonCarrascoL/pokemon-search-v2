import Vue from 'vue';
import Vuex from 'vuex';
import { ItemSearch, Type } from '../components/Search/commons/interface';

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const PokemonRepository = RepositoryFactory.get("pokemon");

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		pokemonList: [] as ItemSearch[],
		favorites: [] as ItemSearch[],
		isLoading: true,
		alertSuccess: false,
		alertError: false,
		successMessage: "",
		errorMessage: "",
		showPokemonDetail: false,
		objectPassModal: null,
		btnSelectBottom: "all",
	},
	getters: {
		getPokemonList(state) {
			return state.pokemonList;
		},
		getFavorites(state) {
			return state.favorites;
		},
		// getInputSearch(state) {
		// 	return state.inputSearch;
		// },
		getIsLoading(state) {
			return state.isLoading;
		},
		getAlertSuccess(state) {
			return state.alertSuccess;
		},
		getAlertError(state) {
			return state.alertError;
		},
		getSuccessMessage(state) {
			return state.successMessage;
		},
		getErrorMessage(state) {
			return state.errorMessage;
		},
		getShowPokemonDetail(state) {
			return state.showPokemonDetail;
		},
		getObjectPassModal(state) {
			return state.objectPassModal;
		},
		getBtnSelectBottom(state) {
			return state.btnSelectBottom;
		},
	},
	mutations: {
		FETCH_LIST_POKEMON_LOAD(state) {
			state.pokemonList = [];
			state.isLoading = true;
			state.successMessage = '';
			state.errorMessage = '';
			state.alertSuccess = false;
			state.alertError = false;
		},
		FETCH_LIST_POKEMON_SUCCESS(state, pokemonList) {
			state.pokemonList = pokemonList;
			state.pokemonList.forEach((pokemon: ItemSearch) => {
				const find = state.favorites.find(
					(pokemonFav: ItemSearch) => pokemonFav.name == pokemon.name
				);
				find
					? (pokemon["favorite"] = true)
					: (pokemon["favorite"] = false);

				pokemon["nameUpper"] =
					pokemon.name.charAt(0).toUpperCase() +
					pokemon.name.slice(1);
			});
			state.isLoading = false;
			state.successMessage = 'Successfull search!.';
			state.errorMessage = '';
			state.alertSuccess = true;
			state.alertError = false;
			setTimeout(() => {
				state.alertSuccess = false;
			}, 2000);
		},
		FETCH_LIST_POKEMON_SUCCESS_NOTHING(state) {
			state.pokemonList = [];
			state.isLoading = false;
			state.successMessage = "Nothing found";
			state.errorMessage = '';
			state.alertSuccess = true;
			state.alertError = false;
		},
		FETCH_LIST_POKEMON_ERROR(state, error) {
			state.pokemonList = [];
			state.isLoading = false;
			state.successMessage = "";
			if (error instanceof Error) {
				state.errorMessage = error.message;
			}
			state.alertSuccess = false;
			state.alertError = true;
			setTimeout(() => {
				state.alertError = false;
			}, 2000);
		},
		FETCH_DETAIL_POKEMON_SUCCESS(state, { data, pokemon }) {
			data["nameUpper"] =
				data.name.charAt(0).toUpperCase() + data.name.slice(1);

			data.types.forEach((type: Type, index: number) => {
				data["typesList"] = "";
				index + 1 == data.types.length
					? (data["typesList"] += type.type.name + "")
					: (data["typesList"] += type.type.name + ",");
			});
			data["favorite"] = pokemon.favorite;
			state.objectPassModal = data;
			state.showPokemonDetail = true;
		},
		CHANGE_STATE_SELECTED(state, value) {
			state.btnSelectBottom = value;
		},
		FETCH_LIST_FAVORITE(state) {
			state.pokemonList = state.favorites;
		},
		FETCH_ADD_FAVORITE(state, pokemon: ItemSearch) {
			state.favorites.push(pokemon);
		},
		FETCH_DELETE_FAVORITE(state, pokemon: ItemSearch) {
			console.log(pokemon)
			const index = state.favorites.findIndex(item => item.name === pokemon.name);
			state.favorites.splice(index, 1);
		},
		EDIT_POKEMON(state, { index }) {
			const item = state.pokemonList[index];
			Vue.set(state.pokemonList, index, { nameUpper: item.nameUpper, favorite: !item.favorite, name: item.name, url: item.url });
		},
		CLOSE_MODAL_DETAIL(state) {
			state.showPokemonDetail = false;
		},
		FETCH_DETAIL_POKEMON_SEARCH_LOAD(state) {
			state.pokemonList = [];
			state.isLoading = true;
			state.successMessage = '';
			state.errorMessage = '';
			state.alertSuccess = false;
			state.alertError = false;
		},
		FETCH_DETAIL_POKEMON_SEARCH_SUCCESS(state, data) {
			state.pokemonList = [];
			state.pokemonList.push({
				name: data.name,
				nameUpper:
					data.name.charAt(0).toUpperCase() +
					data.name.slice(1),
				url: data.url,
				favorite: false
			});
			state.isLoading = false;
			state.successMessage = 'Successfull search!.';
			state.errorMessage = '';
			state.alertSuccess = true;
			state.alertError = false;
			setTimeout(() => {
				state.alertSuccess = false;
			}, 2000);
		},
		FETCH_DETAIL_POKEMON_SEARCH_SUCCESS_NOTHING(state) {
			state.pokemonList = [];
			state.isLoading = false;
			state.successMessage = "Nothing found";
			state.errorMessage = '';
			state.alertSuccess = true;
			state.alertError = false;
			setTimeout(() => {
				state.alertSuccess = false;
			}, 2000);
		},
		FETCH_DETAIL_POKEMON_SEARCH_ERROR(state, error) {
			state.pokemonList = [];
			state.isLoading = false;
			state.successMessage = "";
			if (error instanceof Error) {
				state.errorMessage = error.message;
			}
			state.alertSuccess = false;
			state.alertError = true;
			setTimeout(() => {
				state.alertError = false;
			}, 2000);
		}
	},
	actions: {
		getListFavorites(context) {
			context.commit('FETCH_LIST_FAVORITE');
		},
		showPokemonDetailModal(context, pokemon) {
			PokemonRepository.getPokemon(pokemon.name)
				.then((response) => {
					context.commit('FETCH_DETAIL_POKEMON_SUCCESS', {
						data: response.data,
						pokemon: pokemon
					});
				})
		},
		getListPokemon(context) {
			context.commit('FETCH_LIST_POKEMON_LOAD');
			PokemonRepository.getListPokemon()
				.then(result => {
					if (result.data != undefined) {
						context.commit('FETCH_LIST_POKEMON_SUCCESS', result.data.results);
					} else {
						context.commit('FETCH_LIST_POKEMON_SUCCESS_NOTHING');
					}
				})
				.catch((err) => {
					context.commit('FETCH_LIST_POKEMON_ERROR', err);
				});
		},
		changeSelected(context, value) {
			context.commit('CHANGE_STATE_SELECTED', value);
			switch (value) {
				case "fav":
					this.dispatch('getListFavorites');
					break;
				case "all":
					this.dispatch('getListPokemon');
					break;
			}
		},
		changeFavorite(context, { pokemon, index }) {
			context.commit('EDIT_POKEMON', { index: index });
			const pokemonIndex = context.state.pokemonList[index];
			if (pokemonIndex.favorite) {
				context.commit('FETCH_ADD_FAVORITE', {
					name: pokemonIndex.name,
					favorite: pokemonIndex.favorite,
					nameUpper: pokemonIndex.nameUpper,
					url: pokemonIndex.url
				});
			} else {
				context.commit('FETCH_DELETE_FAVORITE', pokemon);
			}
		},
		closeModalDetail(context) {
			context.commit('CLOSE_MODAL_DETAIL')
		},
		onSearchPokemon(context, inputSearch) {
			context.commit('FETCH_DETAIL_POKEMON_SEARCH_LOAD');
			PokemonRepository.getPokemon(inputSearch.toLowerCase().trim())
				.then((result) => {
					console.log(result)
					if (result.data != undefined) {
						context.commit('FETCH_DETAIL_POKEMON_SEARCH_SUCCESS', result.data);
					} else {
						context.commit('FETCH_DETAIL_POKEMON_SEARCH_SUCCESS_NOTHING');
					}
				})
				.catch(error => {
					context.commit('FETCH_DETAIL_POKEMON_SEARCH_ERROR', error)
				})
		}
	}
})