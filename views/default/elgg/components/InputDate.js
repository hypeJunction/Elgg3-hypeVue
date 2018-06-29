define(function (require) {

	var $ = require('jquery');
	require('jquery-ui');

	var moment = require('moment');

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputDate.html');

	Vue.component('elgg-input-date', {
		template: template,
		extends: Input,
		props: {
			options: {
				type: Object,
				default: function () {
					return {};
				}
			},
			isTimestamp: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			setInputValue: function (dateText, instance) {
				if (this.isTimestamp) {
					var timestamp = Date.UTC(instance.selectedYear, instance.selectedMonth, instance.selectedDay);
					this.inputValue = timestamp / 1000;
				} else {
					this.inputValue = dateText;
				}
			}
		},
		mounted: function () {
			var options = this.options;

			options.onSelect = this.setInputValue;

			$(this.$refs.datepicker).datepicker(options);

			if (this.value) {
				var date = this.value;

				if (typeof date === 'number' && this.isTimestamp) {
					date = moment.unix(this.value).toDate();
				}

				$(this.$refs.datepicker).datepicker('setDate', date);
			}
		}
	});

});
