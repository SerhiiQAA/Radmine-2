import { test, expect } from '@playwright/test';
import { LostPasswordPage } from '../page/LostPasswordPage';
import fs from 'fs';

test('Password recovery with a valid email but without an activated account / TC 005', async ({ page }) => {
  const lostPasswordPage = new LostPasswordPage(page);
  await lostPasswordPage.goto();

  const { email } = JSON.parse(fs.readFileSync('./data/user_data.json', 'utf-8'));
  await lostPasswordPage.fillEmail(email);
  await lostPasswordPage.clickSubmitButton();

  expect(await lostPasswordPage.getErrorMessage()).toMatch(
    /You haven't activated your account yet. If you want to receive a new activation email, please click this link/i
  );
});
