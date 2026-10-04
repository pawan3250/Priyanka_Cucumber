import { DataTable, Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ShopPage } from '../pages/Shop.page';
import { PlaywrightUtils } from '../support/PlaywrightUtils';
import { CustomWorld } from '../support/world';

let shopPage: ShopPage;

Given('I am on the SDET Unicorns shop page', async function (this: CustomWorld) {
  shopPage = new ShopPage(this.page);
  await shopPage.navigate();
});

Then('I should see the shop page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const heading = shopPage.getPageHeading(expectedHeading);
  await PlaywrightUtils.waitForLocatorVisible(heading);
  await expect(heading).toBeVisible();
});

Then('I should see the following products:', async function (this: CustomWorld, dataTable: DataTable) {
  const expectedProducts = dataTable.hashes().map((row) => row.productName.trim());
  const actualProducts = (await shopPage.getProductTitles()).map((title) => title.trim());

  for (const expectedProduct of expectedProducts) {
    expect(actualProducts).toContain(expectedProduct);
  }
});

Then('I should see the shop product category {string}', async function (this: CustomWorld, categoryName: string) {
  const category = shopPage.getCategoryLink(categoryName);
  await PlaywrightUtils.waitForLocatorVisible(category);
  await expect(category).toBeVisible();
});
