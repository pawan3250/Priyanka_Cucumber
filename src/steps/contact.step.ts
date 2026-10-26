import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ContactPage } from '../pages/Contact.page';
import { CustomWorld } from '../support/world';

Given('I am on the QA Masters contact page', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.navigate();
});

Then('I should see the contact page heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const contactPage = new ContactPage(this.page);
  await expect(contactPage.getPageHeading(expectedHeading)).toBeVisible();
});

Then('I should see the contact form fields', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await expect(contactPage.nameField).toBeVisible();
  await expect(contactPage.emailField).toBeVisible();
  await expect(contactPage.phoneField).toBeVisible();
  await expect(contactPage.messageField).toBeVisible();
});

When('I fill the contact form with valid details', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.fillForm({
    name: 'Test User',
    email: 'testuser@example.com',
    phone: '+1 (512) 555-1234',
    message: 'This is a test message from automation.'
  });
});

When('I submit the contact form', async function (this: CustomWorld) {
  const contactPage = new ContactPage(this.page);
  await contactPage.submit();
});
