import { test, expect } from '@playwright/test';

test.describe('ui-modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html>
        <head><script type="module" src="/src/index.ts"></script></head>
        <body style="padding: 2rem;">
          <button id="open-btn" onclick="document.getElementById('modal').open = true">Open</button>
          <ui-modal id="modal" size="md">
            <span slot="header">Modal Title</span>
            <p>Modal body content.</p>
            <button slot="footer" id="close-action"
              onclick="document.getElementById('modal').open = false">Close</button>
          </ui-modal>
          <div id="event-log"></div>
          <script>
            const modal = document.getElementById('modal');
            modal.addEventListener('ui-open', () => {
              document.getElementById('event-log').textContent = 'opened';
            });
            modal.addEventListener('ui-close', () => {
              document.getElementById('event-log').textContent = 'closed';
            });
          </script>
        </body>
      </html>
    `);
  });

  test('modal is hidden by default', async ({ page }) => {
    const overlay = page.locator('ui-modal#modal').locator('.overlay');
    await expect(overlay).toBeHidden();
  });

  test('modal opens when open attribute is set', async ({ page }) => {
    await page.click('#open-btn');
    await page.waitForTimeout(100);
    const overlay = page.locator('ui-modal#modal').locator('.overlay');
    await expect(overlay).toBeVisible();
  });

  test('fires ui-open event when opened', async ({ page }) => {
    await page.click('#open-btn');
    await expect(page.locator('#event-log')).toHaveText('opened');
  });

  test('close button closes the modal', async ({ page }) => {
    await page.click('#open-btn');
    await page.waitForTimeout(100);
    const closeBtn = page.locator('ui-modal#modal').locator('.close-btn');
    await closeBtn.click();
    await page.waitForTimeout(100);
    const overlay = page.locator('ui-modal#modal').locator('.overlay');
    await expect(overlay).toBeHidden();
  });

  test('fires ui-close event when closed', async ({ page }) => {
    await page.click('#open-btn');
    await page.waitForTimeout(100);
    await page.locator('ui-modal#modal').locator('.close-btn').click();
    await expect(page.locator('#event-log')).toHaveText('closed');
  });

  test('pressing Escape closes the modal', async ({ page }) => {
    await page.click('#open-btn');
    await page.waitForTimeout(100);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    const overlay = page.locator('ui-modal#modal').locator('.overlay');
    await expect(overlay).toBeHidden();
  });
});
