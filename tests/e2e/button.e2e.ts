import { test, expect } from '@playwright/test';

test.describe('ui-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html>
        <head><script type="module" src="/src/index.ts"></script></head>
        <body style="padding: 2rem;">
          <ui-button id="btn" variant="primary">Click Me</ui-button>
          <ui-button id="disabled-btn" disabled>Disabled</ui-button>
          <ui-button id="loading-btn" loading>Loading</ui-button>
          <ui-button id="outline-btn" variant="outline">Outline</ui-button>
          <div id="event-log"></div>
          <script>
            document.getElementById('btn').addEventListener('ui-click', () => {
              document.getElementById('event-log').textContent = 'clicked';
            });
          </script>
        </body>
      </html>
    `);
  });

  test('renders with primary variant', async ({ page }) => {
    const btn = page.locator('ui-button#btn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('variant', 'primary');
  });

  test('fires ui-click event on click', async ({ page }) => {
    await page.locator('ui-button#btn').click();
    await expect(page.locator('#event-log')).toHaveText('clicked');
  });

  test('disabled button is not interactive', async ({ page }) => {
    const innerBtn = page.locator('ui-button#disabled-btn').locator('button');
    await expect(innerBtn).toBeDisabled();
  });

  test('loading button shows spinner', async ({ page }) => {
    const spinner = page.locator('ui-button#loading-btn').locator('.spinner');
    await expect(spinner).toBeVisible();
  });

  test('outline variant is rendered', async ({ page }) => {
    const btn = page.locator('ui-button#outline-btn');
    await expect(btn).toHaveAttribute('variant', 'outline');
  });
});
