import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const ABOUT_URL = 'https://practice.sdetunicorns.com/about/';

export class AboutPage extends BasePage {
  readonly pageTitle: Locator;
  readonly primaryHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
    this.primaryHeading = page.getByRole('heading', { name: 'About', exact: true }).first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(ABOUT_URL);
  }

  getHeading(headingText: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(headingText, 'i') }).first();
  }

  getSection(sectionName: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(sectionName, 'i') }).first();
  }

  getLink(linkName: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(linkName, 'i') }).first();
  }
}
