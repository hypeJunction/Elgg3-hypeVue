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

		// (4.x) elgg_register_css removed. The animate.css CDN bundle was
		// an optional cosmetic dep; it's dropped here rather than
		// rewired through elgg_require_css (which only accepts simple-
		// cache view names, not external URLs). Plugins relying on the
		// 'animate' name (hypepostadmin) have been updated to not
		// reference it.

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