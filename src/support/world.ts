import { After, Before, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  scenarioName = '';
}

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.context?.close();
  await this.browser?.close();
});

setDefaultTimeout(30000);
setWorldConstructor(CustomWorld);
