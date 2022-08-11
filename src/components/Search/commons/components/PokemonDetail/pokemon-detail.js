export default {
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
					get() {
							return this.value;
					},
					set(value) {
							this.$emit("input", value);
					},
			},
	},
	methods: {
			copyClipboard() {
					var clipboard =
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
};