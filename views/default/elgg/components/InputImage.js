define(function (require) {

	var elgg = require('elgg');
	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputImage.html');

	Vue.component('elgg-input-image', {
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
						elgg.register_error('Invalid file format');
					}
				}, false);

				reader.readAsDataURL(file);
			}
		}
	});

});
