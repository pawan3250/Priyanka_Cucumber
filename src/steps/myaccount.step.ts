import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccount.page';
import { PlaywrightUtils } from '../support/PlaywrightUtils';
import { CustomWorld } from '../support/world';

let myAccountPage: MyAccountPage;

Given('I am on the SDET Unicorns my account page', async function (this: CustomWorld) {
  myAccountPage = new MyAccountPage(this.page);
  await myAccountPage.navigate();
});

Then('I should see the my account page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const heading = myAccountPage.getPageHeading(expectedHeading);
  await PlaywrightUtils.waitForLocatorVisible(heading);
  await expect(heading).toBeVisible();
});

Then('I should see the login form fields', async function (this: CustomWorld) {
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.usernameInput);
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.passwordInput);
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.loginButton);

  await expect(myAccountPage.usernameInput).toBeVisible();
  await expect(myAccountPage.passwordInput).toBeVisible();
  await expect(myAccountPage.loginButton).toBeVisible();
});

When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  await myAccountPage.login(username, password);
});

Then('I should see the register form fields', async function (this: CustomWorld) {
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.registerUsernameInput);
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.registerEmailInput);
  await PlaywrightUtils.waitForLocatorVisible(myAccountPage.registerPasswordInput);

  await expect(myAccountPage.registerUsernameInput).toBeVisible();
  await expect(myAccountPage.registerEmailInput).toBeVisible();
  await expect(myAccountPage.registerPasswordInput).toBeVisible();
});
