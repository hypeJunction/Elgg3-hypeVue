import Vue from 'elgg/Vue';
import Sortable from 'Sortable';

export default Vue.directive('sortable', {
	inserted: function (el, binding) {
		new Sortable(el, binding.value || {});
	}
});
