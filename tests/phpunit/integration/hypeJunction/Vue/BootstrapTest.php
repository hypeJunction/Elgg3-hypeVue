<?php

namespace hypeJunction\Vue;

use Elgg\IntegrationTestCase;

/**
 * Plugin lifecycle, class autoload, and Bootstrap::init wiring for hypevue.
 *
 * The plugin's only PHP-side responsibilities are:
 *   - register an `elgg.data:page` hook that exposes the dev flag
 *   - register four AMD modules (vue, sortablejs, vue/draggable, moment)
 *   - extend elements/helpers.css with elements/modifiers.css
 *   - register the moment.js view via elgg-plugin.php
 *
 * These tests pin all four so a regression in any of them surfaces here.
 */
class BootstrapTest extends IntegrationTestCase {

	public function getPluginID(): string {
		return 'hypevue';
	}

	public function up(): void {}

	public function down(): void {}

	public function testPluginIsRegistered(): void {
		$this->assertInstanceOf(\ElggPlugin::class, elgg_get_plugin_from_id('hypevue'));
	}

	public function testPluginIsActive(): void {
		$this->assertTrue(elgg_get_plugin_from_id('hypevue')->isActive());
	}

	public function testNoStartPhpPresent(): void {
		// Elgg 4.x fatals on plugin activation if start.php is present.
		// The 3.x migration removed it — pin its absence.
		$pluginPath = elgg_get_plugin_from_id('hypevue')->getPath();
		$this->assertFileDoesNotExist($pluginPath . 'start.php');
	}

	public function testBootstrapRegisteredInPluginManifest(): void {
		$plugin = elgg_get_plugin_from_id('hypevue');
		$data = include $plugin->getPath() . 'elgg-plugin.php';
		$this->assertArrayHasKey('bootstrap', $data);
		$this->assertSame(Bootstrap::class, $data['bootstrap']);
	}

	public function testBootstrapClassLoads(): void {
		$this->assertTrue(class_exists(Bootstrap::class));
	}

	public function testBootstrapExtendsPluginBootstrap(): void {
		$r = new \ReflectionClass(Bootstrap::class);
		$this->assertTrue($r->isSubclassOf(\Elgg\PluginBootstrap::class));
	}

	public function testConfigureVueClassLoads(): void {
		$this->assertTrue(class_exists(ConfigureVue::class));
	}

	public function testElggDataPageHookWired(): void {
		$handlers = _elgg_services()->hooks->getAllHandlers();
		$this->assertArrayHasKey('elgg.data', $handlers);
		$this->assertArrayHasKey('page', $handlers['elgg.data']);
	}

	public function testMomentViewIsRegistered(): void {
		$this->assertTrue(elgg_view_exists('moment.js'));
	}

	public function testHelpersCssExtendedWithModifiers(): void {
		$css = elgg_view('elements/helpers.css');
		$expected = elgg_view('elements/modifiers.css');
		$this->assertNotEmpty($expected, 'modifiers.css must render content');
		$this->assertStringContainsString($expected, $css);
	}

	public function testMomentAmdModuleDefined(): void {
		$this->assertTrue(_elgg_services()->amdConfig->hasModule('moment'));
	}

	public function testVueAmdModuleDefined(): void {
		$this->assertTrue(_elgg_services()->amdConfig->hasModule('vue'));
	}

	public function testSortableJsAmdModuleDefined(): void {
		$this->assertTrue(_elgg_services()->amdConfig->hasModule('sortablejs'));
	}

	public function testVueDraggableAmdModuleDefined(): void {
		$this->assertTrue(_elgg_services()->amdConfig->hasModule('vue/draggable'));
	}
}
