import { expect, test } from '@playwright/test';
import { assertDrawerVisibleForProject, gotoPath } from './fixtures/app';

test.describe('signup screen', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await gotoPath(page, '/signup');
    await assertDrawerVisibleForProject(page, testInfo.project.name);
  });

  test('shows validation errors when submit is invalid', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Username is invalid.')).toBeVisible();
    await expect(page.getByText('Email Address is invalid.')).toBeVisible();
    await expect(page.getByText('At least 6 characters are required.')).toBeVisible();
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
    await expect(
      page.getByText('You must agree to the terms of service and privacy policy.')
    ).toBeVisible();
  });

  test('submits successfully and opens verify-email page', async ({ page }) => {
    await page.getByPlaceholder('username', { exact: true }).fill('playwright-user');
    await page.getByPlaceholder('na@example.com', { exact: true }).fill('playwright@example.com');
    await page.getByPlaceholder('password', { exact: true }).fill('password');
    await page.getByPlaceholder('confirm password', { exact: true }).fill('password');
    await page.getByText('I agree to the').click();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/\/verify-email\?email=playwright%40example\.com$/);
    await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    await expect(page.getByText('We sent a verification email to playwright@example.com.')).toBeVisible();
  });
});
