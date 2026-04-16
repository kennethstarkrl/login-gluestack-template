import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, gotoPath, loginAsDemo } from './fixtures/app';

test.describe('auth guard behavior', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.title.includes('unauthenticated')) {
      await gotoPath(page, '/explore');
      return;
    }

    await loginAsDemo(page);
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('shows auth error for unauthenticated users on protected screen', async ({ page }) => {
    await expect(page.getByText('You must be logged in to access this content.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
  });

  test('shows explore content after user logs in', async ({ page }) => {
    await expect(page).toHaveURL(/\/explore$/);
    await expect(page.getByRole('heading', { name: 'Quick Summary' })).toBeVisible();
  });
});
