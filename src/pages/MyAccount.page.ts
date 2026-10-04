import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const MY_ACCOUNT_URL = 'https://practice.sdetunicorns.com/my-account/';

export class MyAccountPage extends BasePage {
  readonly heading: Locator;
  readonly loginTab: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly registerUsernameInput: Locator;
  readonly registerEmailInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /My account/i }).first();
    this.loginTab = page.getByRole('link', { name: /Log in/i }).first();
    this.usernameInput = page.locator('input[name*="username"], input[id="user_login"]').first();
    this.passwordInput = page.locator('input[name*="password"], input[id="user_pass"]').first();
    this.rememberMeCheckbox = page.locator('input[name="rememberme"]').first();
    this.loginButton = page.locator('button[name="login"], input[name="login"]').first();
    this.registerUsernameInput = page.locator('form.register input[name="username"]').first();
    this.registerEmailInput = page.locator('form.register input[name="email"]').first();
    this.registerPasswordInput = page.locator('form.register input[name="password"]').first();
    this.registerButton = page.locator('form.register button[name="register"], form.register input[name="register"]').first();
  }

  async navigate(): Promise<void> {
    await this.navigateTo(MY_ACCOUNT_URL);
  }

  getPageHeading(headingText: string): Locator {
    return this.getHeading(headingText);
  }

  getLoginFormLabel(labelText: string): Locator {
    return this.page.getByText(labelText, { exact: false }).first();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
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
