import { test, expect } from '@playwright/test';
import { iconCatalog } from '../../packages/icons/dist/library.js';

test('Icon Button uses distinct press and release timings and supports keyboard activation', async ({ page }) => {
  await page.goto('/iframe.html?id=components-icon-button--default&viewMode=story');
  const stage = page.getByRole('region', { name: 'Component preview' });
  const button = stage.getByRole('button', { name: 'Cast', exact: true });
  await expect(stage).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(button).toHaveCSS('width', '44px');
  await expect(button).toHaveCSS('height', '44px');
  await expect(button).toHaveCSS('backdrop-filter', 'none');
  await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  const icon = button.locator('img');
  await expect(icon).toHaveCSS('width', '24px');
  await expect(icon).toHaveCSS('height', '24px');
  expect(await icon.evaluate(img => img.complete && img.naturalWidth === 24)).toBe(true);
  await button.screenshot({ path: 'test-results/icon-button-default.png' });

  await button.hover();
  await page.mouse.down();
  await expect(button).toHaveCSS('transition-duration', '0.1s');
  await expect(button).toHaveCSS('background-color', 'rgba(255, 255, 255, 0.08)');
  await expect(button).toHaveCSS('backdrop-filter', 'none');
  await button.screenshot({ path: 'test-results/icon-button-pressed.png' });
  await page.mouse.up();
  await expect(button).toHaveCSS('transition-duration', '0.15s');
  await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await button.press('Space');
  await expect(button).toHaveCSS('outline-style', 'solid');
});
