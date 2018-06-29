define(function (require) {

	var $ = require('jquery');
	require('jquery-ui');

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputSlider.html');

	Vue.component('elgg-input-slider', {
		template: template,
		extends: Input,
		props: {
			options: {
				type: Object,
				default: function () {
					return {};
				}
			}
		},
		data: function () {
			return {
				fillValue: this.value
			};
		},
		methods: {
			setInputValue: function (event, ui) {
				this.inputValue = ui.value;
			},
			setFillValue: function (event, ui) {
				this.fillValue = ui.value;
			}
		},
		mounted: function () {
			var options = this.options;
			options.value = this.value;
			options.change = this.setInputValue;
			options.slide = this.setFillValue;

			$(this.$refs.slider).slider(options);
		}
	});

});
