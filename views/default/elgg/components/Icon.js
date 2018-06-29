define(function(require) {

    var Vue = require('elgg/Vue');

    var template = require('text!elgg/components/Icon.html');

    return Vue.component('elgg-icon', {
        template: template,
        props: {
            name: {
                type: String,
                required: true
            },
            color: {
                type: String
            },
            size: {
                type: String,
                default: 'small'
            },
            state: {
                type: String
            },
            position: {
                type: String
            }
        },
        computed: {
            wrapperClass: function() {
                var selectors = [];
                if (this.size) {
                    selectors.push('is-' + this.size);
                }
                if (this.color) {
                    selectors.push('has-text-' + this.color);
                }
                if (this.position) {
                    selectors.push('is-' + this.position);
                }
                return selectors;
            },
            iconClass: function() {
                var selectors = [];

                selectors.push('fa-' + this.name);

                if (this.state) {
                    selectors.push('elgg-icon-' + this.state);
                }

                return selectors;
            }
        }
    });

});
