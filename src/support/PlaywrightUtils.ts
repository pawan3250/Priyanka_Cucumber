import { BrowserContext, Locator, Page } from '@playwright/test';

export class PlaywrightUtils {
  static async checkCheckbox(locator: Locator): Promise<void> {
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  static async UncheckCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  static async waitForLocatorVisible(locator: Locator, timeout = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  static async waitForAnyVisible(locators: Locator[], timeout = 30000): Promise<void> {
    const result = await Promise.race(
      locators.map((locator) => 
        
        locator.waitFor({ state: 'visible', timeout }).
        then(() => locator))
    ).catch(() => undefined);

    if (!result) {
      throw new Error('None of the provided locators became visible within the timeout');
    }
  }

  static async clickIfVisible(locator: Locator): Promise<void> {
    if (await locator.isVisible().catch(() => false)) {
      await locator.click();
    }
  }

  static async fillVisibleField(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  static async switchtoparentPage(context: BrowserContext, currentPage: Page): Promise<Page> {
    const pages = context.pages();

    if (pages.length <= 1) {
      return currentPage;
    }

    const parentpage = pages[0];
    await parentpage.bringToFront();
    return parentpage;
  }
}

