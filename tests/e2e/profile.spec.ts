import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, gotoPath } from './fixtures/app';

test.describe('profile page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await gotoPath(page, '/profile');
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('shows auth guard when opening profile unauthenticated', async ({ page }) => {
    await expect(page).toHaveURL(/\/profile$/);
    await expect(page.getByText('You must be logged in to access this content.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();
  });
});
