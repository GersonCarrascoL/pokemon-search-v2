import home from '@/components/Home/home';
import { shallowMount } from '@vue/test-utils';
describe('Home.vue', () => {
	let wrapper: any;
	beforeEach(() => {
		wrapper = shallowMount(home);
	})

	afterEach(() => {
		wrapper.destroy();
	})

	it('should render Home.vue', () => {
		expect(wrapper.exists()).toBe(true);
	})

	it('should text title', () => {
		const title = 'Welcome to Pokedex';
		const titleContainer = wrapper.find('.home-title');

		expect(titleContainer.exists()).toBeTruthy();
		expect(titleContainer.text()).toBe(title);
	})
})