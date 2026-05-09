import $ from 'jquery';
import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <div class="select" :class="inputClasses">
            <slot name="input">
                <select v-model="inputValue"
                        :required="required"
                        :name="name"
                        :id="id"
                        class="elgg-input-select"
                        ref="select"
                >
                    <template v-for="(option, index) in filteredOptions">
                        <option
                            :key="index"
                            :value="option.value"
                            :selected="option.selected"
                            :disabled="option.disabled"
                        >
                            {{ option.label }}
                        </option>
                    </template>
                </select>
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
    </div>
</elgg-field>`;

Vue.component('elgg-input-select', {
	template: template,
	extends: Input,
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
			if (this.placeholder) {
				options.unshift({
					disabled: true,
					label: this.placeholder,
					placeholder: true,
					value: null
				});
			}

			options.forEach(function (option) {
				if (typeof self.inputValue === 'undefined') {
					option.selected = option.placeholder === true;
				} else {
					option.selected = self.inputValue === option.value;
				}
			});

			return options;
		},
	}
});
