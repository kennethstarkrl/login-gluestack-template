import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_WEB_PORT ?? 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari-emulation',
      use: { ...devices['iPhone 14'], browserName: 'chromium' },
    },
  ],
  webServer: {
    command: `CI=1 EXPO_PUBLIC_APP_ENV=test npx expo start --web --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
});
