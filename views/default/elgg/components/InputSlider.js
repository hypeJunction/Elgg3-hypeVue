import $ from 'jquery';
import 'jquery-ui';
import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <div slot="control" class="control" :class="controlClasses">
        <slot name="input">
            <div :id="id"
                 class="elgg-input-slider"
                 :class="inputClasses"
                 ref="slider"
            >
                <span class="elgg-input-slider-fill" :style="{width: fillValue + '%'}"></span>
                <slot name="axis"></slot>
            </div>
            <input type="hidden" :name="name" :value="inputValue"/>
        </slot>
    </div>
</elgg-field>`;

Vue.component('elgg-input-slider', {
	template: template,
	extends: Input,
	props: {
		options: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},
	data: function () {
		return {
			fillValue: this.value
		};
	},
	methods: {
		setInputValue: function (event, ui) {
			this.inputValue = ui.value;
		},
		setFillValue: function (event, ui) {
			this.fillValue = ui.value;
		}
	},
	mounted: function () {
		var options = this.options;
		options.value = this.value;
		options.change = this.setInputValue;
		options.slide = this.setFillValue;

		$(this.$refs.slider).slider(options);
	}
});
