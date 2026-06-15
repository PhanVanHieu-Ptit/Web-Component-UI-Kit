import { test, expect } from '@playwright/test';

test.describe('ui-input', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html>
        <head><script type="module" src="/src/index.ts"></script></head>
        <body style="padding: 2rem;">
          <ui-input id="text-input" label="Name" placeholder="Enter name"></ui-input>
          <ui-input id="error-input" label="Email" error error-message="Invalid email"></ui-input>
          <ui-input id="disabled-input" label="Disabled" disabled></ui-input>
          <div id="event-log"></div>
          <script>
            document.getElementById('text-input').addEventListener('ui-input', (e) => {
              document.getElementById('event-log').textContent = e.detail;
            });
          </script>
        </body>
      </html>
    `);
  });

  test('renders label text', async ({ page }) => {
    const label = page.locator('ui-input#text-input').locator('label');
    await expect(label).toHaveText('Name');
  });

  test('renders placeholder on inner input', async ({ page }) => {
    const input = page.locator('ui-input#text-input').locator('input');
    await expect(input).toHaveAttribute('placeholder', 'Enter name');
  });

  test('typing fires ui-input event with value', async ({ page }) => {
    const input = page.locator('ui-input#text-input').locator('input');
    await input.fill('Hello');
    await expect(page.locator('#event-log')).toHaveText('Hello');
  });

  test('error state renders error message', async ({ page }) => {
    const helper = page.locator('ui-input#error-input').locator('.helper');
    await expect(helper).toHaveText('Invalid email');
    await expect(helper).toHaveClass(/error/);
  });

  test('disabled input is not editable', async ({ page }) => {
    const input = page.locator('ui-input#disabled-input').locator('input');
    await expect(input).toBeDisabled();
  });
});
