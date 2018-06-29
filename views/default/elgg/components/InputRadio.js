define(function (require) {

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputRadio.html');

	Vue.component('elgg-input-radio', {
		template: template,
		extends: Input,
		data: function () {
			return {
				inputValue: typeof this.value === 'undefined' ? [] : this.value
			}
		},
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

				options.forEach(function (option) {
					var inputValue = self.inputValue || [];
					option.selected = inputValue.indexOf(option.value) >= 0;
				});

				return options;
			}
		}
	});

});
