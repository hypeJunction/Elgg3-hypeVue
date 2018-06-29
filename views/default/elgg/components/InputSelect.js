define(function (require) {

	var $ = require('jquery');

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputSelect.html');

	Vue.component('elgg-input-select', {
		template: template,
		extends: Input,
		props: {
			options: {
				type: Array,
				required: true
			},
		},
		computed: {
			filteredOptions: function () {
				var self = this;
				var options = this.options;
				options = options.map(function (option) {
					if (typeof option === 'string') {
						return {
							value: option,
							label: option
						};
					}
					return option;
				});
				if (this.placeholder) {
					options.unshift({
						disabled: true,
						label: this.placeholder,
						placeholder: true,
						value: null
					});
				}

				options.forEach(function (option) {
					if (typeof self.inputValue === 'undefined') {
						option.selected = option.placeholder === true;
					} else {
						option.selected = self.inputValue === option.value;
					}
				});

				return options;
			},
		}
	});

});
