import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/Home.page';
import { PlaywrightUtils } from '../support/PlaywrightUtils';
import { CustomWorld } from '../support/world';

let homePage: HomePage;

Given('I am on the SDET Unicorns home Page', async function (this: CustomWorld) {
  homePage = new HomePage(this.page);
  await homePage.navigate();
});

Then('I should see the home page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(homePage.mainHeading).toHaveText(expectedHeading);
});

Then('I should see the special sale heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(homePage.specialSaleHeading).toHaveText(expectedHeading);
});

Then('I should see the home navigation link {string}', async function (this: CustomWorld, linkName: string) {
  await expect(homePage.getNavigationLink(linkName)).toBeVisible();
});

Then('I should see the following pricing plans:', async function (this: CustomWorld, dataTable: DataTable) {
  const plans = dataTable.hashes().map((row) => row.planName);

  for (const plan of plans) {
    await expect(homePage.getPricingPlan(plan)).toBeVisible();
  }
});

When('I click on the {string} button', async function (this: CustomWorld, buttonText: string) {
  if (buttonText !== 'Learn more') {
    throw new Error(`Button not implemented: ${buttonText}`);
  }

  const opensNewTab = await homePage.isLearnMoreOpeningNewTab();

  if (opensNewTab) {
    const newPagePromise = this.context.waitForEvent('page');
    await homePage.clickLearnMore();

    this.page = await newPagePromise;
    homePage = new HomePage(this.page);
    await this.page.waitForLoadState('domcontentloaded');
    return;
  }

  await homePage.clickLearnMore();
});

Then('I should see the redirected page text {string}', async function (this: CustomWorld, expectedText: string) {
  await expect(homePage.getRedirectedPageText(expectedText)).toBeVisible();
});

When('I return to the parent website', async function (this: CustomWorld) {
  this.page = await PlaywrightUtils.switchtoparentPage(this.context, this.page);
  homePage = new HomePage(this.page);
  await this.page.waitForLoadState('domcontentloaded');
});
