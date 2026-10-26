import { After, Before, setDefaultTimeout, setWorldConstructor, Status, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const browserMap = {
  chromium,
  firefox,
  webkit,
};

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  scenarioName = '';
}

Before(async function (this: CustomWorld) {
  const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
  const selectedBrowser = browserMap[browserName as keyof typeof browserMap];

  if (!selectedBrowser) {
    throw new Error(`Unsupported browser: ${browserName}. Use chromium, firefox or webkit`);
  }

  this.browser = await selectedBrowser.launch({
    headless: false,
    slowMo: 150
  });

  this.context = await this.browser.newContext({ viewport: { width: 1440, height: 1200 } });

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: any) {
  const traceDir = path.resolve(__dirname, '../../reports/traces');
  fs.mkdirSync(traceDir, { recursive: true });

  const tracePath = path.join(traceDir, `${Date.now()}_${scenario.pickle?.name || 'trace'}.zip`);

  try {
    await this.context.tracing.stop({ path: tracePath });
    console.log(`Trace saved: ${tracePath}`);

    if (scenario.result?.status === Status.FAILED) {
      this.attach(fs.readFileSync(tracePath), 'application/zip');
    }
  } catch (error) {
    console.log('Trace not captured:', error);
  }

  if (scenario.result?.status === Status.FAILED) {
    const screenshotDir = path.resolve(__dirname, '../../reports/screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });

    const fileName = `${Date.now()}_${scenario.pickle?.name || 'failed'}.png`;
    const filePath = path.join(screenshotDir, fileName);

    await this.page.screenshot({ path: filePath, fullPage: true });
    this.attach(fs.readFileSync(filePath), 'image/png');
    console.log(`Screenshot saved: ${filePath}`);
  }

  await this.context?.close();
  await this.browser?.close();
});

setDefaultTimeout(30000);
setWorldConstructor(CustomWorld);
