<?php

namespace hypeJunction\Vue;

use Elgg\Includer;
use Elgg\PluginBootstrap;

class Bootstrap extends PluginBootstrap {

	/**
	 * Get plugin root
	 * @return string
	 */
	protected function getRoot() {
		return $this->plugin->getPath();
	}

	/**
	 * {@inheritdoc}
	 */
	public function load() {
		Includer::requireFileOnce($this->getRoot() . '/autoloader.php');
	}

	/**
	 * {@inheritdoc}
	 */
	public function boot() {

	}

	/**
	 * {@inheritdoc}
	 */
	public function init() {
		elgg_register_plugin_hook_handler('elgg.data', 'page', ConfigureVue::class);

		if (elgg_get_config('environment') === 'development') {
			elgg_define_js('vue', [
				'src' => '//cdn.jsdelivr.net/npm/vue/dist/vue.js',
				'exports' => 'Vue',
			]);
		} else {
			elgg_define_js('vue', [
				'src' => '//cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
				'exports' => 'Vue',
			]);
		}

		elgg_define_js('sortablejs', [
			'src' => '//cdn.jsdelivr.net/npm/sortablejs@1.7.0/Sortable.min.js',
			'exports' => 'Sortable',
		]);

		elgg_define_js('vue/draggable', [
			'src' => '//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.16.0/vuedraggable.min.js',
			'exports' => 'VueDraggable',
			'deps' => ['sortablejs'],
		]);

		elgg_define_js('moment', [
			'src' => elgg_get_simplecache_url('moment.js'),
			'exports' => 'moment',
		]);

		elgg_register_css('animate', '//cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css');

		elgg_extend_view('elements/helpers.css', 'elements/modifiers.css');
	}

	/**
	 * {@inheritdoc}
	 */
	public function ready() {

	}

	/**
	 * {@inheritdoc}
	 */
	public function shutdown() {

	}

	/**
	 * {@inheritdoc}
	 */
	public function activate() {

	}

	/**
	 * {@inheritdoc}
	 */
	public function deactivate() {

	}

	/**
	 * {@inheritdoc}
	 */
	public function upgrade() {

	}

}