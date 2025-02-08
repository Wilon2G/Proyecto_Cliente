import { expect, test } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home/settings');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('RetroFrog');
  });

  test('can select background', async ({ page }) => {
    const backgrounds = page.locator('input[name="background"]');

    const count = await backgrounds.count();
    if (count === 0) throw new Error('No se encontraron inputs de background');

    await backgrounds
      .first()
      .evaluate((el) => (el as HTMLInputElement).click());
    await expect(backgrounds.first()).toBeChecked();
  });
});
