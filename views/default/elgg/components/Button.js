define(function(require) {

    var Vue = require('elgg/Vue');

    var template = require('text!elgg/components/Button.html');

    Vue.component('elgg-button', {
        template: template,
        props: {
            tag: {
                type: String,
                default: 'a'
            },
            icon: {
                type: String,
            },
            text: {
                type: String
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
            state: {
                type: String
            },
	        role: {
            	type: String
	        },
            loading: {
                type: Boolean,
                default: false
            },
            outlined: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            static: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            buttonClass: function() {
                var selectors = [];
                if (this.size) {
                    selectors.push('is-' + this.size);
                }
                if (this.color) {
                    selectors.push('is-' + this.color);
                }
                if (this.state) {
                    selectors.push('is-' + this.state);
                    selectors.push('elgg-state-' + this.state);
                }
	            if (this.role) {
		            selectors.push('elgg-button-' + this.role);
	            }
                if (this.loading) {
                    selectors.push('is-loading');
                }
                if (this.disabled) {
                    selectors.push('is-disabled');
                }
                if (this.static) {
                    selectors.push('is-static');
                }
                return selectors;
            }
        }
    });

});
