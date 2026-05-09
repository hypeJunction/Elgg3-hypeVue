<?php

return [
	'plugin' => [
		'name' => 'hypeVue',
		'version' => '4.0.0',
	],

	'bootstrap' => \hypeJunction\Vue\Bootstrap::class,

	'view_extensions' => [
		'elements/helpers.css' => [
			'elements/modifiers.css' => [],
		],
	],
];
