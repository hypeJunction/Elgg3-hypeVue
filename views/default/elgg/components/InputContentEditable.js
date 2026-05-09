import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <slot name="input">
            <component
                    :is="component"
                    ref="editable"
                    contenteditable
                    @input="onInput"
                    :class="inputClasses"
                    @focus="onFocus"
                    @blur="onBlur"
                    :id="id"
            >
            </component>
            <input hidden
                   v-model="inputValue"
                   type="text"
                   :required="required"
                   :name="name"
            />
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

    <div slot="help"
         v-if="help"
         class="help elgg-field-help elgg-text-help"
    >
        {{ help }}
    </div>

</elgg-field>`;

export default Vue.component('elgg-input-contenteditable', {
	template: template,
	extends: Input,
	props: {
		component: {
			type: String,
			default: 'div'
		},
	},
	data: function () {
		return {
			inputValue: this.value,
			editableValue: this.value
		};
	},
	methods: {
		onInput: function (event) {
			this.inputValue = event.target.innerText;
		},
		onFocus: function (event) {
			if (!this.inputValue) {
				event.target.innerText = '';
			}
		},
		onBlur: function (event) {
			if (!this.inputValue) {
				event.target.innerText = this.placeholder;
			}
		}
	},
	updated: function() {
		if (this.$refs.editable.innerText !== this.inputValue) {
			// If the value is update from a parent component,
			// we want to replace the inner text with the new value
			this.$refs.editable.innerText = this.inputValue;
		}
	},
	mounted: function () {
		var innerText = this.editableValue || this.placeholder || '';
		this.$refs.editable.innerText = innerText;
	}
});
