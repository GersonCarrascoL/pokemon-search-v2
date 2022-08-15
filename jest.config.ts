import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	transformIgnorePatterns: ['/node_modules/(?!lib-to-transform|other-lib)'],
	moduleFileExtensions: ['vue', 'ts', 'js', 'json'],
	transform: {
		".*\\.(vue)$": "vue-jest",
		"^.+\\.tsx?$": "ts-jest"
	},
	testURL: "http://localhost/",
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	setupFiles: ["<rootDir>/tests/unit/index.ts"]
};
export default config;