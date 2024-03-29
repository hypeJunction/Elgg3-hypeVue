define(function (require) {

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputContentEditable.html');

	return Vue.component('elgg-input-contenteditable', {
		template: template,
		extends: Input,
		props: {
			component: {
				type: String,
				default: 'div'
			},
		},
		data: function () {
			return {
				inputValue: this.value,
				editableValue: this.value
			};
		},
		methods: {
			onInput: function (event) {
				this.inputValue = event.target.innerText;
			},
			onFocus: function (event) {
				if (!this.inputValue) {
					event.target.innerText = '';
				}
			},
			onBlur: function (event) {
				if (!this.inputValue) {
					event.target.innerText = this.placeholder;
				}
			}
		},
		updated: function() {
			if (this.$refs.editable.innerText !== this.inputValue) {
				// If the value is update from a parent component,
				// we want to replace the inner text with the new value
				this.$refs.editable.innerText = this.inputValue;
			}
		},
		mounted: function () {
			var innerText = this.editableValue || this.placeholder || '';
			this.$refs.editable.innerText = innerText;
		}
	});

});
