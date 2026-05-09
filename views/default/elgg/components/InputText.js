import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <slot name="input">
            <input v-model="inputValue"
                   :type="type"
                   :required="required"
                   :name="name"
                   :id="id"
                   :placeholder="placeholder"
                   class="input elgg-input-text"
                   :class="inputClasses"
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
</elgg-field>`;

Vue.component('elgg-input-text', {
	template: template,
	extends: Input,
	props: {
		type: {
			type: String,
			default: 'text'
		}
	}
});
