import { type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('.login');
    this.registerButton = page.locator('.register');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToLogin() {
    await this.loginButton.click();
  }

  async navigateToRegister() {
    await this.registerButton.click();
  }
}
