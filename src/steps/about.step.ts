import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AboutPage } from '../pages/About.page';
import { PlaywrightUtils } from '../support/PlaywrightUtils';
import { CustomWorld } from '../support/world';

let aboutPage: AboutPage;

Given('I am on the SDET Unicorns about page', async function (this: CustomWorld) {
  aboutPage = new AboutPage(this.page);
  await aboutPage.navigate();
});

Then('I should see the about page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await PlaywrightUtils.waitForLocatorVisible(aboutPage.getHeading(expectedHeading));
  await expect(aboutPage.getHeading(expectedHeading)).toBeVisible();
});

Then('I should see the about page section {string}', async function (this: CustomWorld, sectionName: string) {
  await PlaywrightUtils.waitForLocatorVisible(aboutPage.getSection(sectionName));
  await expect(aboutPage.getSection(sectionName)).toBeVisible();
});

Then('I should see the about page link {string}', async function (this: CustomWorld, linkName: string) {
  await PlaywrightUtils.waitForLocatorVisible(aboutPage.getLink(linkName));
  await expect(aboutPage.getLink(linkName)).toBeVisible();
});

When('I click the about page link {string}', async function (this: CustomWorld, linkName: string) {
  const link = aboutPage.getLink(linkName);
  await PlaywrightUtils.clickIfVisible(link);
});
