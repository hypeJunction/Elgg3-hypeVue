define(function(require) {
	var Vue = require('elgg/Vue');

	var VueDraggable = require('vue/draggable');

	return Vue.component('draggable', VueDraggable);
});