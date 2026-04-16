import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, gotoPath } from './fixtures/app';

test.describe('landing page', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await gotoPath(page, '/');
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('renders and links to login/signup routes', async ({ page }) => {
    await expect(page.getByText('Lorem Ipsum App Hero')).toBeVisible();

    await page.getByText('Get Started').first().click();
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/');
    await page.getByText('Create Account').first().click();
    await expect(page).toHaveURL(/\/signup$/);
  });
});
