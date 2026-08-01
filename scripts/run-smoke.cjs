'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const smokeDir = path.join(projectRoot, 'tests', 'smoke');

function listSmokeTests() {
  if (!fs.existsSync(smokeDir)) return [];
  return fs.readdirSync(smokeDir)
    .filter((name) => name.endsWith('.cjs'))
    .sort();
}

function runTest(filePath) {
  const result = spawnSync(process.execPath, [filePath], {
    cwd: projectRoot,
    encoding: 'utf8',
    timeout: 120000,
  });
  return {
    file: path.basename(filePath),
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
  };
}

function main() {
  const only = process.argv.slice(2)[0];
  const tests = listSmokeTests().filter((name) => !only || name.includes(only));

  if (!tests.length) {
    console.log('No smoke tests found in tests/smoke/');
    process.exit(0);
  }

  const results = tests.map((name) => runTest(path.join(smokeDir, name)));
  const failed = results.filter((item) => !item.ok);

  for (const item of results) {
    const label = item.ok ? 'PASS' : 'FAIL';
    console.log(`${label} ${item.file}`);
    if (!item.ok && item.stderr.trim()) console.error(item.stderr.trim());
  }

  console.log(JSON.stringify({
    total: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
  }, null, 2));

  process.exit(failed.length ? 1 : 0);
}

main();
