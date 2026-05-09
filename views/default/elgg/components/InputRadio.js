import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <div class="elgg-input-radio" :class="inputClasses">
            <slot name="input">
                <template v-for="(option, index) in filteredOptions">
                    <label class="radio" :class="{'elgg-state-selected': option.selected}" :id="id">
                        <input type="radio"
                               v-model="inputValue"
                               :key="index"
                               :name="name"
                               :value="option.value"
                               :disabled="option.disabled"
                        />
                        <slot v-if="option.slot" :name="option.slot"></slot>
                        <template v-if="!option.slot">
                            <span class="radio-box">
                                <elgg-icon v-if="option.selected" name="circle" color="primary"/>
                            </span>
                            <span class="radio-label" v-html="option.label"></span>
                        </template>
                    </label>
                </template>
            </slot>
        </div>
    </div>
</elgg-field>`;

Vue.component('elgg-input-radio', {
	template: template,
	extends: Input,
	data: function () {
		return {
			inputValue: typeof this.value === 'undefined' ? [] : this.value
		}
	},
	props: {
		options: {
			type: Array,
			required: true
		},
	},
	computed: {
		filteredOptions: function () {
			var self = this;
			var options = this.options;
			options = options.map(function (option) {
				if (typeof option === 'string') {
					return {
						value: option,
						label: option
					};
				}

				return option;
			});

			options.forEach(function (option) {
				var inputValue = self.inputValue || [];
				option.selected = inputValue.indexOf(option.value) >= 0;
			});

			return options;
		}
	}
});
