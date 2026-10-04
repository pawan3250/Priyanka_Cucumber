import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const BLOG_URL = 'https://practice.sdetunicorns.com/blog/';

export class BlogPage extends BasePage {
  readonly pageTitle: Locator;
  readonly articleTitle: Locator;
  readonly posts: Locator;
  readonly postTitles: Locator;
  readonly searchBox: Locator;
  readonly recentPosts: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
    this.articleTitle = page.locator('h1').first();
    this.posts = page.locator('main article');
    this.postTitles = page.locator('main article h2 a');
    this.searchBox = page.getByRole('searchbox', { name: 'Search for:' });
    this.recentPosts = page.locator('aside').getByRole('link');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(BLOG_URL);
  }

  getNavigationLink(linkName: string): Locator {
    return this.page.locator('#zak-masthead').getByRole('link', { name: linkName, exact: true });
  }

  async getPostCount(): Promise<number> {
    return this.posts.count();
  }

  async getPostTitles(): Promise<string[]> {
    return this.postTitles.allTextContents();
  }

  async openPost(postTitle: string): Promise<void> {
    await this.postTitles.filter({ hasText: postTitle }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(keyword: string): Promise<void> {
    await this.searchBox.fill(keyword);
    await this.searchBox.press('Enter');
  }

  async getRecentPostTitles(): Promise<string[]> {
    return this.recentPosts.allTextContents();
  }
}
