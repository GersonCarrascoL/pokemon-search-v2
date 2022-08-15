import { ItemSearch } from '@/components/Search/commons/interface';
import Search from '@/components/Search/search';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import Vuetify from 'vuetify';
import Vue from 'vue';
import storeFactory from '../store/factory';

Vue.use(Vuex);
Vue.use(Vuetify);
const localVue = createLocalVue()
const vuetify = new Vuetify()

const store = new Vuex.Store({
	state: storeFactory.state,
	actions: storeFactory.actions,
	getters: storeFactory.getters,
	mutations: storeFactory.mutations
});

const factory = (values = {}) => {
	return shallowMount(Search, {
		data() {
			return {
				...values,
				inputSearch: ''
			}
		},
		localVue,
		vuetify,
		store
	})
}
describe('Search.vue', () => {
	let wrapper: any;
	beforeEach(() => {
		wrapper = factory();
	})

	afterEach(() => {
		wrapper.destroy();
	})

	test('should render Search.vue', () => {
		expect(wrapper.exists()).toBe(true);
	})

	it('should get modal pokemon', () => {
		wrapper.vm.showPokemonDetailModal();
		expect(storeFactory.actions.showPokemonDetailModal).toHaveBeenCalled();
	})

	it('should change pokemon favorite', () => {
		wrapper.vm.changeFavorite();
		expect(storeFactory.actions.changeFavorite).toHaveBeenCalled();
	})

	it('should clear clicked', () => {
		wrapper.vm.onClearClicked();
		expect(storeFactory.actions.getListPokemon).toHaveBeenCalled();
		expect(wrapper.vm.inputSearch).toBe('');
	})

	it('should change selected to All', () => {
		storeFactory.state.btnSelectBottom = 'all';
		wrapper.vm.changeSelected();
		expect(storeFactory.actions.changeSelected).toHaveBeenCalled();
	})

	it('should change selected to Favorites', () => {
		storeFactory.state.btnSelectBottom = "fav";
		wrapper.vm.changeSelected("fav");
		expect(storeFactory.actions.changeSelected).toHaveBeenCalled();
	})

	it('should get list pokemon', () => {
		wrapper.vm.getListPokemon();
		expect(storeFactory.actions.getListPokemon).toHaveBeenCalled();
	})

	it('should search pokemon', () => {
		wrapper.vm.onSearchPokemon();
		expect(storeFactory.actions.onSearchPokemon).toHaveBeenCalled();
	})
})