import { setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
  scenarioName = '';
}

setDefaultTimeout(30000);
setWorldConstructor(CustomWorld);
