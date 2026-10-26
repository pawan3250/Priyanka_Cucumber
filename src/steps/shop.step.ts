import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ShopPage } from '../pages/Shop.page';
import { CustomWorld } from '../support/world';

Given('I am on the QA Masters shop page', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  await shopPage.navigate();
});

Then('I should see the shop page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(this.page.getByText(expectedHeading, { exact: false }).first()).toBeVisible();
});

Then('I should see the following products:', async function (this: CustomWorld, dataTable: { hashes: () => { productName: string }[] }) {
  const shopPage = new ShopPage(this.page);
  const expectedProducts = dataTable.hashes().map((row) => row.productName.trim());
  expect(await shopPage.getProductCount()).toBeGreaterThan(0);

  for (const expectedProduct of expectedProducts) {
    await expect(this.page.getByText(expectedProduct, { exact: false })).toBeVisible();
  }
});

Then('I should see the shop product category {string}', async function (this: CustomWorld, categoryName: string) {
  await expect(this.page.getByText(categoryName, { exact: false })).toBeVisible();
});

When('I click the first product add to cart button', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  await shopPage.clickFirstAddToCart();
});
