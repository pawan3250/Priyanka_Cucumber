import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const HOME_URL = 'https://qamasters-automationpractise.netlify.app/';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;
  readonly heroHeading: Locator;
  readonly navLinks: Locator;
  readonly enrollNowLink: Locator;
  readonly curriculumLink: Locator;
  readonly cartLink: Locator;
  readonly addToCartButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly topicSelect: Locator;
  readonly experienceSelect: Locator;
  readonly messageTextArea: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heroHeading = page.getByRole('heading', { name: /Train With QA Masters/i }).first();
    this.mainHeading = this.heroHeading;
    this.navLinks = page.locator('nav a, header a');
    this.enrollNowLink = page.getByRole('link', { name: /Enroll Now/i }).first();
    this.curriculumLink = page.getByRole('link', { name: /View Curriculum/i }).first();
    this.cartLink = page.locator('#qam-cart-link').first();
    this.addToCartButton = page.locator('button:has-text("Add to Cart"):visible').first();
    this.nameInput = page.locator('#qam-name').first();
    this.emailInput = page.locator('#qam-email').first();
    this.phoneInput = page.locator('#qam-phone').first();
    this.topicSelect = page.locator('select').nth(0);
    this.experienceSelect = page.locator('select').nth(1);
    this.messageTextArea = page.locator('#qam-message').first();
    this.submitButton = page.locator('button:has-text("Send Message")').first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(HOME_URL);
  }

  getNavigationLink(linkName: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${linkName}$`, 'i') }).first();
  }

  getHeading(headingText: string): Locator {
    return this.page.getByRole('heading', { name: new RegExp(headingText, 'i') }).first();
  }

  async clickAddToCart(): Promise<void> {
    for (let attempt = 0; attempt < 6; attempt++) {
      const visibleButton = this.page.locator('button:has-text("Add to Cart"):visible').first();
      if (await visibleButton.count()) {
        await visibleButton.waitFor({ state: 'visible', timeout: 8000 }).catch(() => undefined);
        await visibleButton.click({ force: true });
        return;
      }

      const shopLink = this.page.locator('#qam-shop-link').first();
      if (await shopLink.count()) {
        await shopLink.click({ force: true });
        await this.page.waitForTimeout(1000);
        continue;
      }

      await this.page.goto(HOME_URL, { waitUntil: 'networkidle' });
      await this.page.waitForTimeout(500);
    }

    throw new Error('Add to Cart button was not found after retrying the live Shop flow.');
  }

  async clickEnrollNow(): Promise<void> {
    await this.enrollNowLink.click();
  }

  getRedirectedPageText(expectedText: string): Locator {
    return this.page.getByText(expectedText, { exact: false }).first();
  }
}
