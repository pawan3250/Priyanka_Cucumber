import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const CONTACT_URL = 'https://practice.sdetunicorns.com/contact/';

export class ContactPage extends BasePage {
  readonly pageTitle: Locator;
  readonly heading: Locator;
  readonly form: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly messageField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h1');
    this.heading = page.getByRole('heading', { name: /Let's talk|Send Us Message/i }).first();
    this.form = page.locator('form').filter({ has: page.locator('input[name*="everest_forms[form_fields]"]') }).first();
    this.nameField = page.locator('input[name*="ys0GeZISRs-1"]').first();
    this.emailField = page.locator('input[name*="LbH5NxasXM-2"]').first();
    this.phoneField = page.locator('input[name*="66FR384cge-3"]').first();
    this.messageField = page.locator('textarea[name*="yhGx3FOwr2-4"]').first();
    this.submitButton = page.locator('form input[name="everest_forms[submit]"], form button[name="everest_forms[submit]"]').first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(CONTACT_URL);
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  getField(labelText: string): Locator {
    return this.page.getByLabel(new RegExp(labelText, 'i')).first();
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
