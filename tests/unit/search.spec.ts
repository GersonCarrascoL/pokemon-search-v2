import { ItemSearch } from '@/components/Search/commons/interface';
import search from '@/components/Search/search';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

describe('Search.vue', () => {
	let wrapper: any;
	beforeEach(() => {
		wrapper = shallowMount(search);
		wrapper.setData({
			inputSearch: "",
			isLoading: true,
			alertSuccess: false,
			alertError: false,
			successMessage: "",
			errorMessage: "",
			showPokemonDetail: false,
			objectPassModal: null,
			btnSelectBottom: "all",
			pokemonList: [
				{
					name: 'Pikachu',
					favorite: true
				},
				{
					name: 'Bullbasur',
					favorite: true
				},
				{
					name: 'Charmander',
					favorite: false
				}
			]
		});
		mock.reset();
	})

	afterEach(() => {
		wrapper.destroy();
	})

	afterAll(() => {
		mock.restore();
	});

	it('should render Search.vue', () => {
		expect(wrapper.exists()).toBe(true);
	})

	it('should get favorites', () => {
		wrapper.vm.getFavorites();
		expect(wrapper.vm.pokemonList.length).toEqual(2);
	})

	it('should change favorites', () => {
		wrapper.vm.changeFavorite(wrapper.vm.pokemonList[1]);
		expect(wrapper.vm.pokemonList[1].favorite).toEqual(false);
	})

	it('should change selected - fav', () => {
		const spy = jest.spyOn(wrapper.vm, 'getFavorites');
		wrapper.vm.changeSelected('fav');
		expect(wrapper.vm.btnSelectBottom).toEqual('fav');
		expect(spy).toHaveBeenCalled();
	})

	it('should change selected - all', () => {
		const spy = jest.spyOn(wrapper.vm, 'getListPokemon');
		wrapper.vm.changeSelected('all');
		expect(wrapper.vm.btnSelectBottom).toEqual('all');
		expect(spy).toHaveBeenCalled();
	})

	it('should clear clicked', async () => {
		const spy = jest.spyOn(wrapper.vm, 'getListPokemon');
		wrapper.vm.onClearClicked();
		expect(spy).toHaveBeenCalled();
	})

	// it('should call getListPokemon', async () => {

	// 	mock.onGet('/pokemon')
	// 		.reply(200, {
	// 			results: [
	// 				{
	// 					"name": "bulbasaur",
	// 					"url": "https://pokeapi.co/api/v2/pokemon/1/"
	// 				}
	// 			],
	// 		})

	// 	await wrapper.vm.getListPokemon();
	// 	console.log(wrapper.vm.pokemonList);
	// 	// expect(axios.get).toHaveBeenCalledTimes(1)
	// 	// expect(axios.get).toHaveBeenCalledWith('/pokemon')
	// })
})