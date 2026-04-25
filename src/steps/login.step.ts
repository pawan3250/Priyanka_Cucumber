import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { CustomWorld } from '../support/world';

// chromium.launch context , page

let loginPage: LoginPage;

Given('I am on the login page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate(); //page
});

When('I enter username {string}', async function (this: CustomWorld, username: string) {
  await loginPage.enterUsername(username); //page context 
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await loginPage.enterPassword(password);
});

When('I click the login button', async function (this: CustomWorld) {
  await loginPage.clickLogin();
});

Then('I should see inventory page', async function (this: CustomWorld) {
  const isInventoryVisible = await loginPage.isInventoryVisible();
  expect(isInventoryVisible).toBeTruthy();
});

Then('I should see error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const actualMessage = await loginPage.getErrorMessage();
  expect(actualMessage).toBe(expectedMessage);
});

Then('I should see {string}', async function (this: CustomWorld, expectedResult: string) {
  if (expectedResult === 'inventory page') {
    await expect(loginPage.productsTitle).toBeVisible();
    return;
  }

  const actualMessage = await loginPage.getErrorMessage();
  expect(actualMessage).toBe(expectedResult);
});
