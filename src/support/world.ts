import { setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { config } from '../config/config';

export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;
}

setDefaultTimeout(config.timeout.default);
setWorldConstructor(CustomWorld);
