import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test('Correct new register', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page
      .getByRole('button', { name: "Don't have an account yet?" })
      .click();

    const emailReg = page.locator('input[name=emailReg]');
    await emailReg.waitFor();
    await emailReg.fill('new@example.com');

    const passwordReg = page.locator('input[name=passwordReg]');
    await passwordReg.waitFor();
    await passwordReg.fill('password');

    const nameReg = page.locator('input[name=nameReg]');
    await nameReg.waitFor();
    await nameReg.fill('New');

    const registerButton = page.locator(
      'button[name="_action"][value="signUp"]',
    );
    await registerButton.click();

    await page.goto('http://localhost:5173/');

    const emailInput = page.locator('input[name="emailLog"]');
    await emailInput.waitFor();
    await emailInput.fill('new@example.com');

    const passwordInput = page.locator('input[name="passwordLog"]');
    await passwordInput.waitFor();
    await passwordInput.fill('password');

    const loginButton = page.locator('button[name="_action"][value="logIn"]');
    await loginButton.click();

    await expect(page).toHaveURL('http://localhost:5173/home/main');
  });

  test('Incorrect new register', async ({ page }) => {});

  //test('Register user already existing');
});
