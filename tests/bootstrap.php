<?php
/**
 * PHPUnit bootstrap for hypevue plugin tests.
 * Plugin must be installed at {elgg_root}/mod/hypevue/
 */

$elggRoot = dirname(__DIR__, 3);

require_once $elggRoot . '/vendor/autoload.php';

$testClassesDir = $elggRoot . '/vendor/elgg/elgg/engine/tests/classes';
spl_autoload_register(function ($class) use ($testClassesDir) {
	$file = $testClassesDir . '/' . str_replace('\\', '/', $class) . '.php';
	if (file_exists($file)) {
		require_once $file;
	}
});

\Elgg\Application::loadCore();
