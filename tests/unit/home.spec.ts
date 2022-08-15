import home from '@/components/Home/home';
import { shallowMount } from '@vue/test-utils';
describe('Home.vue', () => {
	let wrapper: any;
	const OLD_ENV = process.env;
	beforeEach(() => {
		jest.resetModules()
		wrapper = shallowMount(home);
		process.env = { ...OLD_ENV };
	})

	afterAll(() => {
		process.env = OLD_ENV; // Restore old environment
	});

	afterEach(() => {
		wrapper.destroy();
	})

	it('should render Home.vue', () => {
		process.env.VUE_APP_TITLE = 'Welcome to Pokedex';
		expect(wrapper.exists()).toBe(true);
	})

	it('should text title', () => {
		const title = 'Welcome to Pokedex';
		const titleContainer = wrapper.find('.home-title');

		expect(titleContainer.exists()).toBeTruthy();
		expect(titleContainer.text()).toBe(title);
	})
})