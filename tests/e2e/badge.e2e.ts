import { test, expect } from '@playwright/test';

test.describe('ui-badge', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html>
        <head><script type="module" src="/src/index.ts"></script></head>
        <body style="padding: 2rem;">
          <ui-badge id="default-badge" variant="default">Default</ui-badge>
          <ui-badge id="success-badge" variant="success">Success</ui-badge>
          <ui-badge id="danger-badge" variant="danger" shape="pill">Danger</ui-badge>
          <ui-badge id="sm-badge" size="sm">Small</ui-badge>
          <ui-badge id="lg-badge" size="lg">Large</ui-badge>
        </body>
      </html>
    `);
  });

  test('renders badge with default variant', async ({ page }) => {
    const badge = page.locator('ui-badge#default-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('variant', 'default');
  });

  test('renders badge content text', async ({ page }) => {
    await expect(page.locator('ui-badge#default-badge')).toContainText('Default');
  });

  test('success variant has correct attribute', async ({ page }) => {
    await expect(page.locator('ui-badge#success-badge')).toHaveAttribute('variant', 'success');
  });

  test('pill shape is applied', async ({ page }) => {
    await expect(page.locator('ui-badge#danger-badge')).toHaveAttribute('shape', 'pill');
  });

  test('small size badge is visible', async ({ page }) => {
    await expect(page.locator('ui-badge#sm-badge')).toBeVisible();
    await expect(page.locator('ui-badge#sm-badge')).toHaveAttribute('size', 'sm');
  });

  test('large size badge is visible', async ({ page }) => {
    await expect(page.locator('ui-badge#lg-badge')).toBeVisible();
    await expect(page.locator('ui-badge#lg-badge')).toHaveAttribute('size', 'lg');
  });
});
