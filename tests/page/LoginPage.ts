import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly lostPasswordLink: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.lostPasswordLink = page.locator('.lost_password');
    this.loginButton = page.locator('#login-submit');
    this.errorMessage = page.locator('#flash_error');
    this.successMessage = page.locator('#flash_notice');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillLoginForm(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click({ force: true });
  }

  async clickLostPassword() {
    await this.lostPasswordLink.click();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
}
