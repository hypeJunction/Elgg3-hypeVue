import elgg from 'elgg';
import i18n from 'elgg/i18n';
import Vue from 'vue';

window.Vue = Vue;

Vue.config.devtools = elgg.data.vue.dev;

const VuePlugin = {
	install: function (Vue) {
		Vue.mixin({
			methods: {
				elgg: function () {
					return elgg;
				},
				echo: function (key, argv, language) {
					return i18n.echo(key, argv, language);
				},
				debounce: function (func, wait, immediate) {
					// https://davidwalsh.name/javascript-debounce-function
					var timeout;
					return function () {
						var context = this, args = arguments;
						var later = function () {
							timeout = null;
							if (!immediate) {
								func.apply(context, args);
							}
						};
						var callNow = immediate && !timeout;
						clearTimeout(timeout);
						timeout = setTimeout(later, wait);
						if (callNow) {
							func.apply(context, args);
						}
					};
				},
				getValueFromDotNotation: function (object, notation) {
					return notation.split(".").reduce(function (o, x) {
						return o[x];
					}, object);
				}
			}
		});
	}
};

Vue.use(VuePlugin);

export default Vue;
