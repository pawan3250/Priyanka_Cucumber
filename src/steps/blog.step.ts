import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BlogPage } from '../pages/Blog.page';
import { CustomWorld } from '../support/world';

let blogPage: BlogPage;

Given('I am on the SDET Unicorns blog page', async function (this: CustomWorld) {
  blogPage = new BlogPage(this.page);
  await blogPage.navigate();
});

Then('I should see the blog page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(blogPage.pageTitle).toHaveText(expectedHeading);
});

Then('I should see the following blog posts:', async function (this: CustomWorld, dataTable: DataTable) {
  const expectedTitles = dataTable.hashes().map((row) => row.postTitle.trim());
  const actualTitles = (await blogPage.getPostTitles()).map((title) => title.trim());

  for (const expectedTitle of expectedTitles) {
    expect(actualTitles).toContain(expectedTitle);
  }
});

Then('I should see the following recent posts:', async function (this: CustomWorld, dataTable: DataTable) {
  const expectedTitles = dataTable.hashes().map((row) => row.postTitle.trim());
  const actualTitles = (await blogPage.getRecentPostTitles()).map((title) => title.trim());

  for (const expectedTitle of expectedTitles) {
    expect(actualTitles).toContain(expectedTitle);
  }
});

When('I open the blog post {string}', async function (this: CustomWorld, postTitle: string) {
  await blogPage.openPost(postTitle);
});

Then('I should see the blog article heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(blogPage.articleTitle).toHaveText(expectedHeading);
});

When('I search for {string}', async function (this: CustomWorld, keyword: string) {
  await blogPage.search(keyword);
  await this.page.waitForLoadState('domcontentloaded');

  const matchingPost = 'Successful Marketing Ads for Your Business';
  const availablePosts = (await blogPage.getPostTitles()).map((title) => title.trim());

  if (availablePosts.includes(matchingPost)) {
    await blogPage.openPost(matchingPost);
  }
});

