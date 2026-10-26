import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { MyAccountPage } from '../pages/MyAccount.page';
import { CustomWorld } from '../support/world';

Given('I am on the QA Masters my account page', async function (this: CustomWorld) {
  const myAccountPage = new MyAccountPage(this.page);
  await myAccountPage.navigate();
});

Then('I should see the my account page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  await expect(this.page.getByText(expectedHeading, { exact: false }).first()).toBeVisible();
});

Then('I should see the login form fields', async function (this: CustomWorld) {
  const myAccountPage = new MyAccountPage(this.page);
  await expect(myAccountPage.emailInput).toBeVisible();
  await expect(myAccountPage.passwordInput).toBeVisible();
  await expect(myAccountPage.loginButton).toBeVisible();
});

When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const myAccountPage = new MyAccountPage(this.page);
  await myAccountPage.login(username, password);
});

Then('I should see the register form fields', async function (this: CustomWorld) {
  const myAccountPage = new MyAccountPage(this.page);
  await expect(myAccountPage.registerUsernameInput).toBeVisible();
  await expect(myAccountPage.registerEmailInput).toBeVisible();
  await expect(myAccountPage.registerPasswordInput).toBeVisible();
});
