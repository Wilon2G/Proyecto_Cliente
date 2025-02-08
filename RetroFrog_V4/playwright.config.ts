import { defineConfig, devices } from '@playwright/test';
//import dotenv from 'dotenv';
//import path from 'path';

//dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  //Si quieres capturas de pantalla y videos de las pruebas fallidas, puedes agregar estas opciones en la sección use
  use: {
    /*Si todas tus pruebas comienzan navegando a la misma URL base (por ejemplo, http://127.0.0.1:3000), puedes configurar baseURL en la sección use. Esto simplifica las llamadas a page.goto('/')
    // Luego, en tus pruebas, puedes usar rutas relativas:
    // await page.goto('/about'); // Navega a http://127.0.0.1:3000/about*/
    baseURL: 'http://127.0.0.1:5174',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  //Si tu aplicación es responsive, puedes descomentar las configuraciones de dispositivos móviles en la sección projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */
  ],
  //configurar la sección webServer para que Playwright inicie automáticamente tu servidor de desarrollo antes de ejecutar las pruebas.
  //LO HE COMENTADO PQ NO FUNCIONABA
  /* webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5174',
    reuseExistingServer: !process.env.CI,
  }, */
});
