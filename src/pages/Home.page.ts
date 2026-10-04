import { Locator, Page } from '@playwright/test';

const HOME_URL = 'https://practice.sdetunicorns.com/';

export class HomePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly specialSaleHeading: Locator;
  readonly learnMoreLink: Locator;
  readonly learnMoreButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole('heading', { name: 'Think different. Make different.' });
    this.specialSaleHeading = page.getByText('Special Sale: Elevate Your SDET Skills!');
    this.learnMoreLink = page.getByRole('link', { name: 'Learn more' }).first();
    this.learnMoreButton = page.locator('span.elementor-button-text', { hasText: 'Learn more' }).first();
  }

  async navigate(): Promise<void> {
    await this.page.goto(HOME_URL, { waitUntil: 'domcontentloaded' });
  }

  getNavigationLink(linkName: string): Locator {
    return this.page.locator('#zak-masthead').getByRole('link', { name: linkName, exact: true });
  }

  getCourseLink(courseName: string): Locator {
    return this.page.getByRole('link', { name: courseName });
  }

  async clickLearnMore(): Promise<void> {
    await this.learnMoreLink.click();
  }

  async isLearnMoreOpeningNewTab(): Promise<boolean> {
    const target = await this.learnMoreLink.getAttribute('target');
    return target === '_blank';
  }

  getRedirectedPageText(expectedText: string): Locator {
    return this.page.getByText(expectedText, { exact: true });
  }

  getPricingPlan(planName: string): Locator {
    return this.page.getByRole('heading', { name: planName, exact: true });
  }
}
