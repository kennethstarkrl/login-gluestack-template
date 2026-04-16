import { expect, Page } from '@playwright/test';

export async function gotoPath(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

export async function assertDrawerVisibleForProject(
  page: Page,
  projectName: string
): Promise<void> {
  if (projectName !== 'desktop-chromium') {
    return;
  }

  const visibleDrawerTitles = await page.getByText('APPNAME').evaluateAll((nodes) => {
    return nodes.filter((node) => {
      const element = node as HTMLElement;
      const style = window.getComputedStyle(element);
      const hasVisibleStyle = style.display !== 'none' && style.visibility !== 'hidden';
      return hasVisibleStyle && element.offsetParent !== null;
    }).length;
  });

  expect(visibleDrawerTitles).toBeGreaterThan(0);
}

export async function loginAsDemo(page: Page): Promise<void> {
  await gotoPath(page, '/login');

  await page.getByPlaceholder('na@example.com', { exact: true }).fill('demo@na.com');
  await page.getByPlaceholder('password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Login with Email Address' }).click();

  await expect(page).toHaveURL(/\/explore$/);
  await expect(page.getByText('Welcome back, demo@na.com')).toBeVisible();
}
