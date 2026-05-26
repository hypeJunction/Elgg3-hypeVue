<?php

namespace hypeJunction\Vue;

use Elgg\Event;
use Elgg\IntegrationTestCase;

/**
 * ConfigureVue is the elgg.data:page event handler that exposes the
 * `vue.dev` flag to client-side code based on the Elgg environment.
 */
class ConfigureVueTest extends IntegrationTestCase {

	private $original_environment;

	public function getPluginID(): string {
		return 'hypevue';
	}

	public function up(): void {
		$this->original_environment = \elgg_get_config('environment');
	}

	public function down(): void {
		\elgg_set_config('environment', $this->original_environment);
	}

	public function testHandlerInvokeReturnsArray(): void {
		$handler = new ConfigureVue();
		$event = new Event(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($event);
		$this->assertIsArray($result);
	}

	public function testHandlerAddsVueKey(): void {
		$handler = new ConfigureVue();
		$event = new Event(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($event);
		$this->assertArrayHasKey('vue', $result);
		$this->assertArrayHasKey('dev', $result['vue']);
	}

	public function testVueDevFlagFalseInProduction(): void {
		\elgg_set_config('environment', 'production');
		$handler = new ConfigureVue();
		$event = new Event(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($event);
		$this->assertFalse($result['vue']['dev']);
	}

	public function testVueDevFlagTrueInDevelopment(): void {
		\elgg_set_config('environment', 'development');
		$handler = new ConfigureVue();
		$event = new Event(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($event);
		$this->assertTrue($result['vue']['dev']);
	}

	public function testHandlerPreservesExistingHookValue(): void {
		$handler = new ConfigureVue();
		$event = new Event(elgg(), 'elgg.data', 'page', ['existing' => 'kept'], []);
		$result = $handler($event);
		$this->assertSame('kept', $result['existing']);
	}
}
