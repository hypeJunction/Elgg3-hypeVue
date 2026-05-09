import $ from 'jquery';
import 'jquery-ui';
import moment from 'moment';
import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <slot name="input">
            <input :required="required"
                   :id="id"
                   :placeholder="placeholder"
                   class="input elgg-input-date"
                   :class="inputClasses"
                   ref="datepicker"
            />
            <input type="hidden" :name="name" :value="inputValue" />
        </slot>
        <elgg-icon
                v-if="leftIcon"
                :name="leftIcon"
                :size="size"
                position="left"
        ></elgg-icon>
        <elgg-icon
                v-if="rightIcon"
                :name="rightIcon"
                :size="size"
                position="right"
        ></elgg-icon>
    </div>
</elgg-field>`;

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
