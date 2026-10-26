import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const BLOG_URL = 'https://qamasters-automationpractise.netlify.app/';

export class BlogPage extends BasePage {
  readonly pageTitle: Locator;
  readonly blogLink: Locator;
  readonly featuredBlogLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: /Train With QA Masters|Blog/i }).first();
    this.blogLink = page.locator('#qam-blog-link').first();
    this.featuredBlogLink = page.getByRole('link', { name: /Playwright Auto-Waiting Explained|Migrating from Selenium to Playwright|API Testing with Playwright/i }).first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(BLOG_URL);
  }

  getNavigationLink(linkName: string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${linkName}$`, 'i') }).first();
  }

  async openBlogSection(): Promise<void> {
    await this.blogLink.waitFor({ state: 'visible' });
    await this.blogLink.click();
  }
}
