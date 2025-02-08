import { expect, test } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/home/settings');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('RetroFrog');
  });

  test('can select background', async ({ page }) => {
    // Obtenemos todos los inputs de background
    const backgrounds = page.locator('input[name="background"]');

    // Asegurar que al menos un fondo existe antes de probar
    const count = await backgrounds.count();
    if (count === 0) throw new Error('No se encontraron inputs de background');

    // Seleccionar el primer fondo visible
    await backgrounds
      .first()
      .evaluate((el) => (el as HTMLInputElement).click());

    // Verificar que el input está marcado
    await expect(backgrounds.first()).toBeChecked();
  });
});
