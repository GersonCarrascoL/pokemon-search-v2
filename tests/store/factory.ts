import { ItemSearch } from "@/components/Search/commons/interface"

const state = {
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
}

const actions = {
	getListFavorites: jest.fn(),
	showPokemonDetailModal: jest.fn(),
	getListPokemon: jest.fn(),
	changeSelected: jest.fn(),
	changeFavorite: jest.fn(),
	closeModalDetail: jest.fn(),
	onSearchPokemon: jest.fn(),
}

const getters = {
	getPokemonList: jest.fn(),
	getFavorites: jest.fn(),
	getIsLoading: jest.fn(),
	getAlertSuccess: jest.fn(),
	getAlertError: jest.fn(),
	getSuccessMessage: jest.fn(),
	getErrorMessage: jest.fn(),
	getShowPokemonDetail: jest.fn(),
	getObjectPassModal: jest.fn(),
	getBtnSelectBottom: jest.fn()
}

const mutations = {
	FETCH_LIST_POKEMON_LOAD: jest.fn(),
	FETCH_LIST_POKEMON_SUCCESS: jest.fn(),
	FETCH_LIST_POKEMON_SUCCESS_NOTHING: jest.fn(),
	FETCH_LIST_POKEMON_ERROR: jest.fn(),
	FETCH_DETAIL_POKEMON_SUCCESS: jest.fn(),
	CHANGE_STATE_SELECTED: jest.fn(),
	FETCH_LIST_FAVORITE: jest.fn(),
	FETCH_ADD_FAVORITE: jest.fn(),
	FETCH_DELETE_FAVORITE: jest.fn(),
	EDIT_POKEMON: jest.fn(),
	CLOSE_MODAL_DETAIL: jest.fn(),
	FETCH_DETAIL_POKEMON_SEARCH_LOAD: jest.fn(),
	FETCH_DETAIL_POKEMON_SEARCH_SUCCESS: jest.fn(),
	FETCH_DETAIL_POKEMON_SEARCH_SUCCESS_NOTHING: jest.fn(),
	FETCH_DETAIL_POKEMON_SEARCH_ERROR: jest.fn()
}

export default {
	state,
	actions,
	getters,
	mutations
}