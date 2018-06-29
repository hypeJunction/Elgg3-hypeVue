define(function (require) {

    var Vue = require('elgg/Vue');

    var template = require('text!elgg/components/Field.html');

    return Vue.component('elgg-field', {
        template: template,
        props: ['id', 'label', 'help', 'error', 'required']
    });

});
