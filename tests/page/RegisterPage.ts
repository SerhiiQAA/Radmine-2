import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly userLogin: Locator;
  readonly userPassword: Locator;
  readonly userPasswordConfirmation: Locator;
  readonly userFirstName: Locator;
  readonly userLastName: Locator;
  readonly userEmail: Locator;
  readonly organization: Locator;
  readonly location: Locator;
  readonly ircNick: Locator;
  readonly registerButton: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userLogin = page.locator('#user_login');
    this.userPassword = page.locator('#user_password');
    this.userPasswordConfirmation = page.locator('#user_password_confirmation');
    this.userFirstName = page.locator('#user_firstname');
    this.userLastName = page.locator('#user_lastname');
    this.userEmail = page.locator('#user_mail');
    this.organization = page.locator('#user_custom_field_values_5');
    this.location = page.locator('#user_custom_field_values_6');
    this.ircNick = page.locator('#user_custom_field_values_3');
    this.registerButton = page.locator('//input[@type="submit"]');
    this.errorMessages = page.locator('//div[@id="errorExplanation"]//li');
  }

  async goto() {
    await this.page.goto('account/register');
  }

  async fillRegisterForm(data: Partial<Record<string, string>>) {
    if (data.login) await this.userLogin.fill(data.login);
    if (data.password) await this.userPassword.fill(data.password);
    if (data.confirmPassword) await this.userPasswordConfirmation.fill(data.confirmPassword);
    if (data.firstName) await this.userFirstName.fill(data.firstName);
    if (data.lastName) await this.userLastName.fill(data.lastName);
    if (data.email) await this.userEmail.fill(data.email);
    if (data.organization) await this.organization.fill(data.organization);
    if (data.location) await this.location.fill(data.location);
    if (data.ircNick) await this.ircNick.fill(data.ircNick);
  }

  async clickSubmitButton() {
    await this.registerButton.click();
  }

  async getErrorMessages() {
    return this.errorMessages.allTextContents();
  }
}
