import notify from 'elgg/notify';
import Vue from 'elgg/Vue';
import Input from 'elgg/components/Input';

const template = `<elgg-field :class="fieldClasses" :id="id" :required="required" :label="label" :help="help" :error="error">
    <label slot="control" class="control"
           :for="id"
           :class="inputClasses"
           :style="{
                'background-image': 'url(' + imgSrc + ')'
           }"
    >
        <input type="file"
               :required="required"
               :name="name"
               :id="id"
               :placeholder="placeholder"
               class="hidden"
               @input="updateImgSrc"
        />
    </label>
</elgg-field>`;

Vue.component('elgg-input-background-image', {
	template: template,
	extends: Input,
	props: ['src'],
	data: function() {
		return {
			readImgSrc: this.src
		};
	},
	computed: {
		imgSrc: function() {
			if (this.readImgSrc) {
				return this.readImgSrc;
			}

			if (this.value instanceof File) {
				return this.readFileSrc(this.value);
			}

			return this.value;
		}
	},
	methods: {
		updateImgSrc: function(event) {
			var file = event.target.files[0];
			this.readFileSrc(file);
		},
		readFileSrc: function(file) {
			if (!(file instanceof File)) {
				return;
			}

			var self = this;

			var reader = new FileReader();

			reader.addEventListener("load", function () {
				if (/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
					self.readImgSrc = reader.result;
					self.inputValue = file;
				} else {
					notify.error('Invalid format');
				}
			}, false);

			reader.readAsDataURL(file);
		}
	}
});
