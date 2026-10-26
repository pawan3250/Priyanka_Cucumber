import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BlogPage } from '../pages/Blog.page';
import { CustomWorld } from '../support/world';

Given('I am on the QA Masters blog page', async function (this: CustomWorld) {
  const blogPage = new BlogPage(this.page);
  await blogPage.navigate();
});

Then('I should see the blog page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const blogPage = new BlogPage(this.page);
  await expect(blogPage.pageTitle).toHaveText(new RegExp(expectedHeading, 'i'));
});

Then('I should see the blog navigation link {string}', async function (this: CustomWorld, linkName: string) {
  const blogPage = new BlogPage(this.page);
  await expect(blogPage.getNavigationLink(linkName)).toBeVisible();
});

When('I open the blog section', async function (this: CustomWorld) {
  const blogPage = new BlogPage(this.page);
  await blogPage.openBlogSection();
});

Then('I should see the blog content section', async function (this: CustomWorld) {
  const blogContent = this.page.getByText(/Playwright Auto-Waiting Explained|Migrating from Selenium to Playwright|API Testing with Playwright/i).first();
  await expect(blogContent).toBeVisible();
});

