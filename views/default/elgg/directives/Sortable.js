define(function(require) {

	var Vue = require('elgg/Vue');
	var Sortable = require('Sortable');

	return Vue.directive('sortable', {
		inserted: function (el, binding) {
			new Sortable(el, binding.value || {});
		}
	});
});