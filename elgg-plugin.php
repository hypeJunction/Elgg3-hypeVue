<?php

return [
	'plugin' => [
		'name' => 'hypeVue',
		'version' => '4.0.0',
	],

	'bootstrap' => \hypeJunction\Vue\Bootstrap::class,

	'views' => [
		'default' => [
			'moment.js' => __DIR__ . '/vendor/bower-asset/moment/min/moment.min.js',
		],
	],
];
