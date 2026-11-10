import { test, expect } from '@playwright/test';

test('Figma geometry, platform interactions, focus, and loading behavior', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/iframe.html?id=components-button--default&viewMode=story');
  await page.evaluate(() => document.fonts.ready);
  const button = page.getByRole('region', { name: 'Component preview' })
    .getByRole('button', { name: 'Test action', exact: true });
  await expect(button).toHaveCSS('background-color', 'rgb(51, 85, 255)');
  await expect(button).toHaveCSS('height', '48px');
  await expect(button).toHaveCSS('border-radius', '12px');
  await expect(button).toHaveCSS('font-family', 'Inter, sans-serif');
  await button.screenshot({ path: 'test-results/button-primary-large.png' });
  await button.hover();
  await expect(button).toHaveCSS('background-color', 'rgb(41, 68, 204)');
  await page.mouse.down();
  await expect(button).toHaveCSS('background-color', 'rgb(31, 51, 153)');
  await page.mouse.up();
  await expect(button).toBeEnabled();
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toBeEnabled();
  await expect(button).toHaveCSS('outline-style', 'solid');
  await page.goto('/iframe.html?id=components-button--loading&viewMode=story');
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute('aria-busy', 'true');
  const localAssets = await page.locator('img').evaluateAll(images => images.every(i => i.complete && i.naturalWidth > 0));
  expect(localAssets).toBe(true);
  await page.screenshot({ path: 'test-results/component-preview.png', fullPage: true });
  expect(errors).toEqual([]);
});
