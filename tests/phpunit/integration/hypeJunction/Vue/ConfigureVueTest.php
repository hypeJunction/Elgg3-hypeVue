<?php

namespace hypeJunction\Vue;

use Elgg\HooksRegistrationService\Hook;
use Elgg\IntegrationTestCase;

/**
 * ConfigureVue is the elgg.data:page hook handler that exposes the
 * `vue.dev` flag to client-side code based on the Elgg environment.
 */
class ConfigureVueTest extends IntegrationTestCase {

	private $original_environment;

	public function getPluginID(): string {
		return 'hypevue';
	}

	public function up(): void {
		$this->original_environment = elgg_get_config('environment');
	}

	public function down(): void {
		elgg_set_config('environment', $this->original_environment);
	}

	public function testHandlerInvokeReturnsArray(): void {
		$handler = new ConfigureVue();
		$hook = new Hook(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($hook);
		$this->assertIsArray($result);
	}

	public function testHandlerAddsVueKey(): void {
		$handler = new ConfigureVue();
		$hook = new Hook(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($hook);
		$this->assertArrayHasKey('vue', $result);
		$this->assertArrayHasKey('dev', $result['vue']);
	}

	public function testVueDevFlagFalseInProduction(): void {
		elgg_set_config('environment', 'production');
		$handler = new ConfigureVue();
		$hook = new Hook(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($hook);
		$this->assertFalse($result['vue']['dev']);
	}

	public function testVueDevFlagTrueInDevelopment(): void {
		elgg_set_config('environment', 'development');
		$handler = new ConfigureVue();
		$hook = new Hook(elgg(), 'elgg.data', 'page', null, []);
		$result = $handler($hook);
		$this->assertTrue($result['vue']['dev']);
	}

	public function testHandlerPreservesExistingHookValue(): void {
		$handler = new ConfigureVue();
		$hook = new Hook(elgg(), 'elgg.data', 'page', ['existing' => 'kept'], []);
		$result = $handler($hook);
		$this->assertSame('kept', $result['existing']);
	}
}
