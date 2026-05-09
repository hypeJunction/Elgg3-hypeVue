<?php

namespace hypeJunction\Vue;

use Elgg\Event;

/**
 * ConfigureVue class.
 */
class ConfigureVue {

	/**
	 * Set some config parameters for vue
	 *
	 * @param Event $event Event
	 * @return array
	 */
	public function __invoke(Event $event) {

		$value = $event->getValue();

		$value['vue'] = [
			'dev' => elgg_get_config('environment') === 'development',
		];

		return $value;
	}
}
