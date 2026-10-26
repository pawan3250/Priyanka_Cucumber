import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/Home.page';
import { CustomWorld } from '../support/world';

Given('I am on the QA Masters home page', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.navigate();
});

Then('I should see the home page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(this.page.getByText(expectedHeading, { exact: false }).first()).toBeVisible();
});

Then('I should see the home navigation link {string}', async function (this: CustomWorld, linkName: string) {
  const homePage = new HomePage(this.page);
  await expect(homePage.getNavigationLink(linkName)).toBeVisible();
});

Then('I should see the redirected page text {string}', async function (this: CustomWorld, expectedText: string) {
  const homePage = new HomePage(this.page);
  await expect(homePage.getRedirectedPageText(expectedText)).toBeVisible();
});

Then('I should see the following navigation links:', async function (this: CustomWorld, dataTable: { hashes: () => { linkName: string }[] }) {
  const homePage = new HomePage(this.page);
  const links = dataTable.hashes().map((row) => row.linkName.trim());
  for (const link of links) {
    await expect(homePage.getNavigationLink(link)).toBeVisible();
  }
});

When('I click on the {string} button', async function (this: CustomWorld, buttonText: string) {
  const homePage = new HomePage(this.page);
  if (buttonText === 'Enroll Now') {
    await homePage.clickEnrollNow();
    return;
  }

  if (buttonText === 'Shop') {
    await this.page.locator('#qam-shop-link').first().click({ force: true });
    return;
  }

  if (buttonText === 'Add to Cart') {
    await homePage.clickAddToCart();
    return;
  }

  throw new Error(`Button not implemented: ${buttonText}`);
});

Then('I should see the cart link {string}', async function (this: CustomWorld, linkName: string) {
  const homePage = new HomePage(this.page);
  await expect(homePage.getNavigationLink(linkName)).toBeVisible();
});

Then('I should see the add to cart button', async function (this: CustomWorld) {
  await expect(this.page.locator('button:has-text("Add to Cart"):visible').first()).toBeVisible();
});
 
