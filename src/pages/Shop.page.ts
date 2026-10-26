import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const SHOP_URL = 'https://qamasters-automationpractise.netlify.app/';

export class ShopPage extends BasePage {
  readonly pageTitle: Locator;
  readonly addToCartButtons: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: /Home|Train With QA Masters/i }).first();
    this.addToCartButtons = page.locator('button:has-text("Add to Cart"):visible');
    this.cartLink = page.getByRole('link', { name: /Cart/i }).first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(SHOP_URL);
    await this.page.getByRole('link', { name: /^Shop$/i }).first().click();
    await this.addToCartButtons.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async getProductCount(): Promise<number> {
    return this.addToCartButtons.count();
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  getCartLink(): Locator {
    return this.cartLink;
  }

  async clickFirstAddToCart(): Promise<void> {
    const button = this.addToCartButtons.first();
    await button.waitFor({ state: 'visible', timeout: 15000 });
    await button.click({ force: true });
  }
}
