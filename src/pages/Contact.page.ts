import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const CONTACT_URL = 'https://qamasters-automationpractise.netlify.app/';

export class ContactPage extends BasePage {
  readonly pageTitle: Locator;
  readonly heading: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly topicSelect: Locator;
  readonly experienceSelect: Locator;
  readonly messageField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: /Send Us a Message|Let's Talk Automation/i }).first();
    this.heading = this.pageTitle;
    this.nameField = page.locator('#qam-name').first();
    this.emailField = page.locator('#qam-email').first();
    this.phoneField = page.locator('#qam-phone').first();
    this.topicSelect = page.locator('select').nth(0);
    this.experienceSelect = page.locator('select').nth(1);
    this.messageField = page.locator('#qam-message').first();
    this.submitButton = page.locator('button:has-text("Send Message")').first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(CONTACT_URL);
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  async fillForm(data: { name: string; email: string; phone: string; message: string }): Promise<void> {
    await this.nameField.fill(data.name);
    await this.emailField.fill(data.email);
    await this.phoneField.fill(data.phone);
    await this.messageField.fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click({ force: true });
  }
}
