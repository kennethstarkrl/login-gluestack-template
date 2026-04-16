import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, loginAsDemo } from './fixtures/app';

test.describe('settings navigation', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await loginAsDemo(page);
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('opens settings from avatar submenu and shows settings sections', async ({ page }) => {
    await page.getByRole('button', { name: 'Open profile menu' }).first().click();
    await page.getByRole('button', { name: 'Open settings' }).first().focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByRole('heading', { name: 'Edit profile' })).toBeVisible();
    await expect(page.getByText('Name', { exact: true })).toBeVisible();
    await expect(page.getByText('Username', { exact: true })).toBeVisible();
    await expect(page.getByText('Bio', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save profile changes' })).toBeVisible();
  });
});
