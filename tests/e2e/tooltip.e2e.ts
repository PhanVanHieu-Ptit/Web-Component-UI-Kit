import { test, expect } from '@playwright/test';

test.describe('ui-tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!doctype html>
      <html>
        <head><script type="module" src="/src/index.ts"></script></head>
        <body style="padding: 4rem;">
          <ui-tooltip id="hover-tip" content="Hover tooltip" trigger="hover">
            <button id="hover-btn">Hover me</button>
          </ui-tooltip>
          <ui-tooltip id="click-tip" content="Click tooltip" trigger="click">
            <button id="click-btn">Click me</button>
          </ui-tooltip>
          <ui-tooltip id="bottom-tip" content="Bottom" placement="bottom" trigger="hover">
            <button id="bottom-btn">Bottom</button>
          </ui-tooltip>
          <div id="event-log"></div>
          <script>
            document.getElementById('hover-tip').addEventListener('ui-show', () => {
              document.getElementById('event-log').textContent = 'shown';
            });
            document.getElementById('hover-tip').addEventListener('ui-hide', () => {
              document.getElementById('event-log').textContent = 'hidden';
            });
          </script>
        </body>
      </html>
    `);
  });

  test('tooltip is not visible by default', async ({ page }) => {
    const tooltip = page.locator('ui-tooltip#hover-tip').locator('.tooltip');
    await expect(tooltip).not.toHaveClass(/visible/);
  });

  test('tooltip becomes visible on hover', async ({ page }) => {
    const trigger = page.locator('ui-tooltip#hover-tip').locator('div').first();
    await trigger.hover();
    await page.waitForTimeout(50);
    const tooltip = page.locator('ui-tooltip#hover-tip').locator('.tooltip');
    await expect(tooltip).toHaveClass(/visible/);
  });

  test('tooltip hides on mouse leave', async ({ page }) => {
    const trigger = page.locator('ui-tooltip#hover-tip').locator('div').first();
    await trigger.hover();
    await page.waitForTimeout(50);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(50);
    const tooltip = page.locator('ui-tooltip#hover-tip').locator('.tooltip');
    await expect(tooltip).not.toHaveClass(/visible/);
  });

  test('click trigger toggles tooltip', async ({ page }) => {
    const trigger = page.locator('ui-tooltip#click-tip').locator('div').first();
    await trigger.click();
    await page.waitForTimeout(50);
    const tooltip = page.locator('ui-tooltip#click-tip').locator('.tooltip');
    await expect(tooltip).toHaveClass(/visible/);
    await trigger.click();
    await page.waitForTimeout(50);
    await expect(tooltip).not.toHaveClass(/visible/);
  });

  test('bottom placement class is applied', async ({ page }) => {
    const tooltip = page.locator('ui-tooltip#bottom-tip').locator('.tooltip');
    await expect(tooltip).toHaveClass(/bottom/);
  });

  test('fires ui-show on hover', async ({ page }) => {
    const trigger = page.locator('ui-tooltip#hover-tip').locator('div').first();
    await trigger.hover();
    await expect(page.locator('#event-log')).toHaveText('shown');
  });

  test('fires ui-hide on mouse leave', async ({ page }) => {
    const trigger = page.locator('ui-tooltip#hover-tip').locator('div').first();
    await trigger.hover();
    await page.waitForTimeout(50);
    await page.mouse.move(0, 0);
    await expect(page.locator('#event-log')).toHaveText('hidden');
  });
});
