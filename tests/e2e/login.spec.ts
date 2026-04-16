import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, gotoPath } from './fixtures/app';

test.describe('login screen', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await gotoPath(page, '/login');
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Login with Email Address' }).click();

    await expect(page.getByText('Username is invalid.')).toBeVisible();
    await expect(page.getByText('At least 6 characters are required.')).toBeVisible();
  });

  test('logs in and redirects to explore', async ({ page }) => {
    await page.getByPlaceholder('na@example.com', { exact: true }).fill('demo@na.com');
    await page.getByPlaceholder('password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Login with Email Address' }).click();

    await expect(page).toHaveURL(/\/explore$/);
    await expect(page.getByText('Welcome back, demo@na.com')).toBeVisible();
  });

  test('shows test login shortcut in test environment', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Continue as Test User' })).toBeVisible();
  });
});
