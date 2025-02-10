import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByRole('button', { name: 'Back Door' }).click();

  await page.getByRole('link', { name: 'Games' }).click();
  await page.locator('.gallery > div > button').first().click();

  await page.getByRole('link', { name: 'Favorites' }).click();
  await page.getByRole('main').getByRole('button').click();

  await page.getByRole('link', { name: 'Games' }).click();
  const SVGFill = await page
    .locator('.gallery > div > button')
    .first()
    .locator('svg')
    .getAttribute('fill');

  expect(SVGFill).toBe('none');
});
