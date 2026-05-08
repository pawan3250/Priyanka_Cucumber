const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const cucumberJsonPath = path.join(rootDir, 'reports', 'cucumber-results.json');
const allureResultsDir = path.join(rootDir, 'reports', 'allure-results');

function ensureCleanDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function hash(value) {
  return crypto.createHash('sha1').update(value).digest('hex');
}

function uuid() {
  return crypto.randomUUID();
}

function mapStatus(status) {
  switch (status) {
    case 'passed':
      return 'passed';
    case 'failed':
      return 'failed';
    case 'skipped':
      return 'skipped';
    case 'undefined':
    case 'ambiguous':
    case 'pending':
      return 'broken';
    default:
      return 'unknown';
  }
}

function durationMs(step) {
  return Math.round((step.result?.duration || 0) / 1000000);
}

function writeAttachment(embedding, scenarioUuid, index) {
  const mimeType = embedding.mime_type || embedding.media?.type || 'text/plain';
  const extension = mimeType.includes('png') ? 'png' : mimeType.includes('jpeg') ? 'jpg' : 'txt';
  const source = `${scenarioUuid}-attachment-${index}.${extension}`;
  const filePath = path.join(allureResultsDir, source);
  const data = embedding.data || '';

  if (mimeType.startsWith('image/') || embedding.data) {
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  } else {
    fs.writeFileSync(filePath, String(data));
  }

  return {
    name: embedding.name || `Attachment ${index + 1}`,
    source,
    type: mimeType,
  };
}

function writeMetadata() {
  fs.writeFileSync(
    path.join(allureResultsDir, 'executor.json'),
    JSON.stringify(
      {
        name: 'Local Cucumber Playwright',
        type: 'local',
        buildName: 'Last local execution',
        reportName: 'Cucumber Playwright Allure Report',
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(allureResultsDir, 'environment.properties'),
    [`Node=${process.version}`, `OS=${os.type()} ${os.release()}`, `Host=${os.hostname()}`].join('\n')
  );
}

function writeSyntheticFailure(message) {
  ensureCleanDir(allureResultsDir);

  const resultUuid = uuid();
  const now = Date.now();
  const result = {
    uuid: resultUuid,
    historyId: hash('cucumber-before-all-failure'),
    testCaseId: hash('Cucumber setup failure'),
    fullName: 'Cucumber setup failure',
    name: 'Cucumber setup failure before scenario execution',
    status: 'broken',
    stage: 'finished',
    start: now,
    stop: now,
    statusDetails: {
      message: message.split('\n')[0],
      trace: message,
    },
    labels: [
      { name: 'framework', value: 'cucumberjs' },
      { name: 'language', value: 'typescript' },
      { name: 'host', value: os.hostname() },
      { name: 'thread', value: process.pid.toString() },
      { name: 'suite', value: 'Cucumber setup' },
    ],
  };

  fs.writeFileSync(path.join(allureResultsDir, `${resultUuid}-result.json`), JSON.stringify(result, null, 2));
  writeMetadata();
  console.log('Generated Allure result for Cucumber setup failure.');
}

function scenarioStatus(steps) {
  const statuses = steps.map((step) => mapStatus(step.result?.status));
  if (statuses.includes('failed')) return 'failed';
  if (statuses.includes('broken')) return 'broken';
  if (statuses.includes('skipped')) return 'skipped';
  if (statuses.every((status) => status === 'passed')) return 'passed';
  return 'unknown';
}

function convert() {
  const syntheticError = process.env.CUCUMBER_RUN_ERROR || '';

  if (!fs.existsSync(cucumberJsonPath) || fs.statSync(cucumberJsonPath).size === 0) {
    if (syntheticError) {
      writeSyntheticFailure(syntheticError);
      return;
    }

    throw new Error(`Cucumber JSON report not found or empty: ${cucumberJsonPath}`);
  }

  const features = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));
  ensureCleanDir(allureResultsDir);

  const conversionTime = Date.now();
  let scenarioIndex = 0;

  for (const feature of features) {
    const scenarios = (feature.elements || []).filter((element) => element.type === 'scenario');

    for (const scenario of scenarios) {
      const scenarioUuid = uuid();
      const steps = scenario.steps || [];
      const totalDuration = steps.reduce((sum, step) => sum + durationMs(step), 0);
      const start = conversionTime + scenarioIndex;
      let cursor = start;

      const allureSteps = steps.map((step, index) => {
        const stepStart = cursor;
        const stepStop = stepStart + durationMs(step);
        cursor = stepStop;

        const attachments = (step.embeddings || []).map((embedding, attachmentIndex) =>
          writeAttachment(embedding, scenarioUuid, index + attachmentIndex)
        );

        const result = {
          name: `${(step.keyword || '').trim()} ${step.name || ''}`.trim() || step.keyword || `Step ${index + 1}`,
          status: mapStatus(step.result?.status),
          stage: 'finished',
          start: stepStart,
          stop: stepStop,
          attachments,
        };

        if (step.result?.error_message) {
          result.statusDetails = {
            message: step.result.error_message.split('\n')[0],
            trace: step.result.error_message,
          };
        }

        return result;
      });

      const fullName = `${feature.name}: ${scenario.name}`;
      const status = scenarioStatus(steps);
      const result = {
        uuid: scenarioUuid,
        historyId: hash(`${feature.uri}:${scenario.line}:${scenario.name}`),
        testCaseId: hash(fullName),
        fullName,
        name: scenario.name,
        status,
        stage: 'finished',
        start,
        stop: start + totalDuration,
        steps: allureSteps,
        labels: [
          { name: 'framework', value: 'cucumberjs' },
          { name: 'language', value: 'typescript' },
          { name: 'host', value: os.hostname() },
          { name: 'thread', value: process.pid.toString() },
          { name: 'suite', value: feature.name },
          { name: 'feature', value: feature.name },
          ...(scenario.tags || []).map((tag) => ({ name: 'tag', value: tag.name })),
        ],
        parameters: [
          { name: 'feature file', value: feature.uri || '' },
          { name: 'scenario line', value: String(scenario.line || '') },
        ],
      };

      fs.writeFileSync(path.join(allureResultsDir, `${scenarioUuid}-result.json`), JSON.stringify(result, null, 2));
      scenarioIndex += 1;
    }
  }

  writeMetadata();

  console.log(`Generated Allure results for ${scenarioIndex} scenario(s).`);
}

convert();
