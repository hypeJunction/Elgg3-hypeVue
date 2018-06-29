define(function (require) {

	var Vue = require('elgg/Vue');

	require('elgg/components/Field');

	return Vue.component('elgg-input', {
		template: '',
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			value: {},
			name: {
				type: String
			},
			color: {
				type: String
			},
			size: {
				type: String
			},
			required: {
				type: Boolean,
				default: false
			},
			id: {
				type: String,
				default: function () {
					return 'elgg-field-vue' + this._uid;
				}
			},
			label: {
				type: String
			},
			help: {
				type: String
			},
			placeholder: {
				type: String
			},
			error: {
				type: String
			},
			leftIcon: {
				type: String
			},
			rightIcon: {
				type: String
			},
			loading: {
				type: Boolean,
				default: false
			},
			states: {
				type: Object,
				default: function () {
					return {};
				}
			},
			inputClass: {
				type: String,
			},
			controlClass: {
				type: String,
			},
			fieldClass: {
				type: String,
			}
		},
		data: function () {
			return {
				inputValue: typeof this.value === 'undefined' ? null : this.value
			}
		},
		computed: {
			fieldClasses: function () {
				var selectors = [this.fieldClass];
				if (this.required) {
					selectors.push('elgg-field-required');
					selectors.push('is-required');
				}
				return selectors;
			},
			inputClasses: function () {
				var selectors = [this.inputClass];
				if (this.color) {
					selectors.push('is-' + this.color);
				}
				if (this.size) {
					selectors.push('is-' + this.size);
				}
				if (this.error) {
					selectors.push('elgg-state-error');
				}
				return selectors;
			},
			controlClasses: function () {
				var selectors = [this.controlClass];
				if (this.leftIcon) {
					selectors.push('has-icons-left');
				}
				if (this.rightIcon) {
					selectors.push('has-icons-right');
				}
				if (this.size) {
					selectors.push('is-' + this.size);
				}
				if (this.loading) {
					selectors.push('is-loading');
				}
				if (this.states) {
					for (var state in this.states) {
						if (this.states[state]) {
							selectors.push('elgg-state-' + state);
							selectors.push('is-' + state);
						}
					}
				}
				return selectors;
			}
		},
		watch: {
			value: function (value) {
				this.inputValue = typeof value !== 'undefined' ? value : null;
			},
			inputValue: function (value) {
				if (typeof value !== 'undefined') {
					this.$emit('input', value);
				}
			}
		},
	});

});
