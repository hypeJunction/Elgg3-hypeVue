define(function (require) {

	var $ = require('jquery');

	var Vue = require('elgg/Vue');

	var Input = require('elgg/components/Input');

	var template = require('text!elgg/components/InputLocation.html');

	Vue.component('elgg-input-location', {
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
				autocomplete: null,
				geocode: {}
			};
		},
		methods: {
			setInputValue: function (event) {
				this.inputValue = event.target.value;
			},
			setGeocode: function () {
				var self = this;

				var parts = {
					location: function () {
						return self.inputValue;
					},
					formatted_address: function (data) {
						return data.formatted_address;
					},
					street_address: function (data) {
						var house = '';
						var street = '';
						$.each(data.address_components, function (key, value) {
							if (value.types[0] === 'street_number') {
								house = value.short_name;
							} else if (value.types[0] === 'route') {
								street = value.short_name;
							}
						});
						return [street, house].join(' ');
					},
					extended_address: function (data) {
						return '';
					},
					locality: function (data) {
						var locality = '';
						$.each(data.address_components, function (key, value) {
							if (value.types[0] === 'locality') {
								locality = value.long_name;
							}
						});
						return locality;
					},
					region: function (data) {
						var region = '';
						$.each(data.address_components, function (key, value) {
							if (value.types[0] === 'administrative_area_level_1') {
								region = value.short_name;
							}
						});
						return region;
					},
					country_code: function (data) {
						var country_code = '';
						$.each(data.address_components, function (key, value) {
							if (value.types[0] === 'country') {
								country_code = value.short_name;
							}
						});
						return country_code;
					},
					postal_code: function (data) {
						var postal_code = '';
						$.each(data.address_components, function (key, value) {
							if (value.types[0] === 'postal_code') {
								postal_code = value.short_name;
							}
						});
						return postal_code;
					},
					utc_offset: function (data) {
						return data.utc_offset;
					},
					'latitude': function (data) {
						return data.geometry.location.lat();
					},
					'longitude': function (data) {
						return data.geometry.location.lng();
					}
				};

				var data = this.autocomplete.getPlace();

				for (var part in parts) {
					Vue.set(self.geocode, part, parts[part].call(this, data));
				}

				self.$emit('geocode', self.geocode);
			}
		},
		mounted: function () {
			if (typeof google.maps.places.Autocomplete === 'undefined') {
				return;
			}

			this.autocomplete = new google.maps.places.Autocomplete(this.$refs.autocomplete, this.options);
			this.autocomplete.addListener('place_changed', this.setGeocode);
		}
	});

});
