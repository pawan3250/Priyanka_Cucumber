import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ContactPage } from '../pages/Contact.page';
import { PlaywrightUtils } from '../support/PlaywrightUtils';
import { CustomWorld } from '../support/world';

let contactPage: ContactPage;

Given('I am on the SDET Unicorns contact page', async function (this: CustomWorld) {
  contactPage = new ContactPage(this.page);
  await contactPage.navigate();
});

Then('I should see the contact page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const heading = contactPage.getPageHeading(expectedHeading);
  await PlaywrightUtils.waitForLocatorVisible(heading);
  await expect(heading).toBeVisible();
});

Then('I should see the contact form fields', async function (this: CustomWorld) {
  await PlaywrightUtils.waitForLocatorVisible(contactPage.nameField);
  await PlaywrightUtils.waitForLocatorVisible(contactPage.emailField);
  await PlaywrightUtils.waitForLocatorVisible(contactPage.phoneField);
  await PlaywrightUtils.waitForLocatorVisible(contactPage.messageField);

  await expect(contactPage.nameField).toBeVisible();
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.phoneField).toBeVisible();
  await expect(contactPage.messageField).toBeVisible();
});

When('I fill the contact form with valid details', async function (this: CustomWorld) {
  await contactPage.fillForm({
    name: 'Test User',
    email: 'testuser@example.com',
    phone: '1234567890',
    message: 'This is a test message from automation.'
  });
});

When('I submit the contact form', async function (this: CustomWorld) {
  await contactPage.submit();
});
