const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const binDir = path.join(rootDir, 'node_modules', '.bin');
const cucumberCommand = path.join(binDir, process.platform === 'win32' ? 'cucumber-js.cmd' : 'cucumber-js');
const allureCommand = path.join(binDir, process.platform === 'win32' ? 'allure.cmd' : 'allure');
const cucumberJsonPath = path.join(rootDir, 'reports', 'cucumber-results.json');

const args = process.argv.slice(2);
const generateAllureReport = args.includes('--allure');
const separatorIndex = args.indexOf('--');
const cucumberArgs = separatorIndex >= 0 ? args.slice(separatorIndex + 1) : args.filter((arg) => arg !== '--allure');

fs.rmSync(cucumberJsonPath, { force: true });

const cucumber = spawnSync(cucumberCommand, ['-c', 'cucumber.json', ...cucumberArgs], {
  cwd: rootDir,
  stdio: 'pipe',
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

if (cucumber.stdout) process.stdout.write(cucumber.stdout);
if (cucumber.stderr) process.stderr.write(cucumber.stderr);

const cucumberExitCode = cucumber.status ?? 1;
const cucumberRunError = [cucumber.error?.message, cucumber.stderr, cucumber.stdout].filter(Boolean).join('\n');

const converter = spawnSync(process.execPath, [path.join(rootDir, 'scripts', 'generate-allure-results.js')], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: false,
  env: {
    ...process.env,
    CUCUMBER_RUN_ERROR: cucumberExitCode === 0 ? '' : cucumberRunError,
  },
});

if (converter.status !== 0) {
  process.exit(converter.status ?? 1);
}

if (generateAllureReport) {
  const allure = spawnSync(allureCommand, ['generate', 'reports/allure-results', '-o', 'reports/allure-report', '--clean'], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true,
  });

  if (allure.status !== 0) {
    process.exit(allure.status ?? 1);
  }
}

process.exit(cucumberExitCode);
