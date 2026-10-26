import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  protected async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  protected getHeading(headingText: string): Locator {
    return this.page.getByRole('heading', 
        { name: new RegExp(headingText, 'i') }).first();

    //aBOUT US ABOUT US aboutus
  }

  protected getLink(linkText: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(linkText, 'i') }).first();
  }
}
