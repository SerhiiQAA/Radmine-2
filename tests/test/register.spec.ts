import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage';
import { RegisterPage } from '../page/RegisterPage';
import { LoginPage } from '../page/LoginPage';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

let mainPage: MainPage;
let registerPage: RegisterPage;
let loginPage: LoginPage;
let userData = {
  login: '',
  email: '',
  password: ''
};

test.describe('Register', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
  });

  test('Registration with valid data / TC 1', async () => {
    await mainPage.goto();
    await mainPage.navigateToRegister();

    userData.password = faker.internet.password({ length: 10 });
    userData.email = faker.internet.email();
    userData.login = faker.internet.displayName();

    const newUser = {
      login: userData.login,
      password: userData.password,
      confirmPassword: userData.password,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: userData.email,
      organization: faker.company.name(),
      location: faker.location.city(),
      ircNick: faker.internet.displayName(),
    };

    await registerPage.fillRegisterForm(newUser);
    await registerPage.clickSubmitButton();
    await expect(registerPage.page).toHaveURL('/login');

    const successMessage = await loginPage.getSuccessMessage();
    expect(successMessage).toMatch(
      new RegExp(`Account was successfully created.*${userData.email}`, 'i')
    );

    const dataPath = path.resolve(__dirname, '../../data/user_data.json');
    fs.writeFileSync(dataPath, JSON.stringify({ login: userData.login, email: userData.email, password: userData.password }));
  });

  test('Registration with empty fields / TC 2', async () => {
    await mainPage.goto();
    await mainPage.navigateToRegister();
    await registerPage.clickSubmitButton();
    await expect(registerPage.errorMessages).toContainText([
      'Email cannot be blank',
      'Login cannot be blank',
      'First name cannot be blank',
      'Last name cannot be blank',
      'Password is too short (minimum is 8 characters)',
    ]);
  });

  test('Registration with valid data but different passwords / TC 3', async () => {
    await mainPage.goto();
    await mainPage.navigateToRegister();
    await registerPage.clickSubmitButton();

    const newUser = {
      login: faker.internet.displayName(),
      password: faker.internet.password({ length: 10 }),
      confirmPassword: faker.internet.password({ length: 8 }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      organization: faker.company.name(),
      location: faker.location.city(),
      ircNick: faker.internet.displayName(),
    };

    await registerPage.fillRegisterForm(newUser);
    await registerPage.clickSubmitButton();
    await expect(registerPage.errorMessages).toContainText([
      "Password doesn't match confirmation",
    ]);
  });
});

