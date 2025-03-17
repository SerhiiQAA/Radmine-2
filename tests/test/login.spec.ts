import { test, expect } from '@playwright/test';
import { MainPage } from '../page/MainPage';
import { LoginPage } from '../page/LoginPage';
import fs from 'fs';

test('Login with a valid data, but without an activated account / TC 004', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);

  await mainPage.goto();
  await mainPage.navigateToLogin();

  const userData = JSON.parse(fs.readFileSync('./data/user_data.json', 'utf-8'));

  await loginPage.fillLoginForm(userData.login, userData.password);
  await loginPage.clickLoginButton();

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toMatch(
    /If you want to receive a new activation email, please click this link./i
  );
});
