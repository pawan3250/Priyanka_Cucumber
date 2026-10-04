import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const SHOP_URL = 'https://practice.sdetunicorns.com/shop/';

export class ShopPage extends BasePage {
  readonly pageTitle: Locator;
  readonly productTitles: Locator;
  readonly categoryLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
    this.productTitles = page.locator('ul.products li.product .woocommerce-loop-product__title');
    this.categoryLinks = page.locator('.widget_product_categories a');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(SHOP_URL);
  }

  async getProductTitles(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  getCategoryLink(categoryName: string): Locator {
    return this.categoryLinks.filter({ hasText: new RegExp(categoryName, 'i') }).first();
  }

  getProductLink(productName: string): Locator {
    return this.productTitles.filter({ hasText: new RegExp(productName, 'i') }).first();
  }
}
