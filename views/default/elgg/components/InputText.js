define(function (require) {

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputText.html');

	Vue.component('elgg-input-text', {
		template: template,
		extends: Input,
		props: {
			type: {
				type: String,
				default: 'text'
			}
		}
	});

});
