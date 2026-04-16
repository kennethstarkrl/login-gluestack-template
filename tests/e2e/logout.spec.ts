import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, loginAsDemo } from './fixtures/app';

test.describe('logout flow', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await loginAsDemo(page);
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('logs out from profile menu and returns to public route', async ({ page }) => {
    await page.getByRole('button', { name: 'Open profile menu' }).first().click();
    await page.getByTestId('profile-menu-signout').focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText('Lorem Ipsum App Hero')).toBeVisible();
  });
});
