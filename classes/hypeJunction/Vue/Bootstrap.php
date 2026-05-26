<?php

namespace hypeJunction\Vue;

use Elgg\Includer;
use Elgg\PluginBootstrap;

/**
 * Bootstrap class.
 */
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
		\elgg_register_event_handler('elgg.data', 'page', ConfigureVue::class);

		// (6.x) AMD/RequireJS removed entirely. elgg_define_js() no longer exists.
		// Vue, SortableJS, VueDraggable, and moment are now consumed as ES modules
		// via import statements in JS view files. CDN sources are referenced
		// directly in elgg-plugin.php view_extensions or via importmap if needed.

		// CSS view extension is now declared in elgg-plugin.php view_extensions.
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
