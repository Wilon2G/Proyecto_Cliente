import { expect, test } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const emailInput = page.locator('input[name="emailLog"]');
    await emailInput.waitFor();
    await emailInput.fill('admin@example.com');

    const passwordInput = page.locator('input[name="passwordLog"]');
    await passwordInput.waitFor();
    await passwordInput.fill('securepassword');

    const loginButton = page.locator('button[name="_action"][value="logIn"]');
    await loginButton.click();

    await page.waitForURL('http://localhost:5173/home/main');
    await page.goto('http://localhost:5173/home/settings');
  });

  test('has correct URL', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/home/settings');
  });

  test('can select background', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:5173/home/settings');

    const backgrounds = page.locator('label[for="bg2"]');

    await backgrounds.check();
    console.log(backgrounds);

    const settingButton = page.locator(
      'button[type="submit"]:has-text("Save Changes")',
    );
    console.log(settingButton);

    await settingButton.click();

    const root = page.locator(':root');

    const bgImageValue = await root.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--bgImage').trim(),
    );

    expect(bgImageValue).toBe('url(/assets/background/2-bg.avif)');
  });
});
