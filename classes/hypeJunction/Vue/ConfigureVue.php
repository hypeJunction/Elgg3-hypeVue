<?php

namespace hypeJunction\Vue;

use Elgg\Hook;

class ConfigureVue {

	/**
	 * Set some config parameters for vue
	 *
	 * @param Hook $hook Hook
	 * @return array
	 */
	public function __invoke(Hook $hook) {

		$value = $hook->getValue();

		$value['vue'] = [
			'dev' => elgg_get_config('environment') === 'development',
		];

		return $value;
	}
}