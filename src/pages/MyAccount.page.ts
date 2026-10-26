import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const MY_ACCOUNT_URL = 'https://qamasters-automationpractise.netlify.app/';

export class MyAccountPage extends BasePage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerUsernameInput: Locator;
  readonly registerEmailInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /My Account/i }).first();
    this.emailInput = page.locator('#qam-username').first();
    this.passwordInput = page.locator('#qam-password').first();
    this.loginButton = page.locator('button:has-text("Log In")').first();
    this.registerUsernameInput = page.locator('#qam-reg-username').first();
    this.registerEmailInput = page.locator('#qam-reg-email').first();
    this.registerPasswordInput = page.locator('#qam-reg-password').first();
    this.registerButton = page.locator('button:has-text("Register")').first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(MY_ACCOUNT_URL);
    await this.page.getByRole('link', { name: /^My Account$/i }).first().click();
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  async login(username: string, password: string): Promise<void> {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async register(username: string, email: string, password: string): Promise<void> {
    await this.registerUsernameInput.fill(username);
    await this.registerEmailInput.fill(email);
    await this.registerPasswordInput.fill(password);
    await this.registerButton.click();
  }
}
