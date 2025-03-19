import { type Locator, type Page } from '@playwright/test';

export class LostPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#mail');
    this.submitButton = page.locator('[type="submit"]');
    this.errorMessage = page.locator('#flash_error');
  }

  async goto() {
    await this.page.goto('/account/lost_password');
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
}