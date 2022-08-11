import Vue from 'vue';
export default Vue.extend({
	data: () => ({
		snackbar: false,
		text: `Text  copied!`,
	}),
	props: {
		value: Boolean,
		passedObject: Object,
	},
	computed: {
		show: {
			get(): boolean {
				return this.value;
			},
			set(value: boolean): void {
				this.$emit("input", value);
			},
		},
	},
	methods: {
		copyClipboard() {
			const clipboard =
				"name: " +
				this.passedObject.name +
				", weight: " +
				this.passedObject.weight +
				", height: " +
				this.passedObject.height +
				", types: " +
				this.passedObject.typesList;
			navigator.clipboard.writeText(clipboard);
			this.snackbar = true;
		},
	},
});