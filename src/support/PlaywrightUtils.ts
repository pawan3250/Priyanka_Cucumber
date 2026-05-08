import { BrowserContext, Locator, Page } from '@playwright/test';

export class PlaywrightUtils {
  static async checkCheckbox(locator: Locator): Promise<void> {
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  static async uncheckCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  static async setCheckbox(locator: Locator, checked: boolean): Promise<void> {
    if (checked) {
      await this.checkCheckbox(locator);
      return;
    }

    await this.uncheckCheckbox(locator);
  }

  static async selectByvalue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  static async selectByindex(locator: Locator, index: number): Promise<void> {
    await locator.selectOption({ index });
  }

  static async selectBylabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  static async switchTowindow(context: BrowserContext, index: number): Promise<Page> {
    const pages = context.pages();

    if (index < 0 || index >= pages.length) {
      throw new Error(`Invalid page index: ${index}`);
    }

    return pages[index];
  }

  static async closeAllOtherWindows(page: Page): Promise<void> {
    const pages = page.context().pages();
    await Promise.all(pages.filter((contextPage) => contextPage !== page).map((contextPage) => contextPage.close()));
  }

  static async goback(page: Page): Promise<void> {
    await page.goBack();
  }

  static async switchtoparentPage(context: BrowserContext, currentPage: Page): Promise<Page> {
    const pages = context.pages();

    if (pages.length <= 1) {
      return currentPage;
    }

    const parentPage = pages[0];
    await parentPage.bringToFront();
    return parentPage;
  }
}
