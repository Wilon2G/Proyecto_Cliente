import { expect, test } from '@playwright/test';

test.describe('Favorites Button Test', () => {
  test('should toggle favorite status in Games page', async ({ page }) => {
    await test.step('Navigate to login and bypass authentication', async () => {
      await page.goto('http://localhost:5173/login');
      await page.getByRole('button', { name: 'Back Door' }).click();
    });

    await test.step('Navigate to Games', async () => {
      await page.getByRole('link', { name: 'Games' }).click();
      await page.waitForURL('http://localhost:5173/home/library');
    });

    let initialFavoriteState: string | null;

    await test.step('Check initial favorite state', async () => {
      const favoriteButton = page
        .locator('.gallery > div > button')
        .first()
        .locator('svg');

      initialFavoriteState = await favoriteButton.getAttribute('fill');
    });

    await test.step('Toggle favorite state', async () => {
      await page.locator('.gallery > div > button').first().click();
    });

    await test.step('Navigate to Favorites and toggle again', async () => {
      await page.getByRole('link', { name: 'Favorites' }).click();
      await page.waitForURL(
        'http://localhost:5173/home/library?filter=favorites',
      );
      await page.locator('#cm6krqv5a0003nisd6ulgz1qd').click();
    });

    await test.step('Verify the favorite button has returned to its initial state', async () => {
      await page.getByRole('link', { name: 'Games' }).click();
      await page.waitForURL('http://localhost:5173/home/library');

      const favoriteButton = page
        .locator('.gallery > div > button')
        .first()
        .locator('svg');

      const expectedState = initialFavoriteState === 'none' ? 'none' : 'red';
      await expect(favoriteButton).toHaveAttribute('fill', expectedState);
    });
  });
});
