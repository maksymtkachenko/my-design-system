import { test, expect } from '@playwright/test';

test('Storybook navigation, controls, docs and icon catalog are available', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/?path=/story/components-icon-button--default');
  const frame = page.frameLocator('#storybook-preview-iframe');
  await expect(frame.getByRole('button', { name: 'Cast', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Controls/ })).toBeVisible();
  await page.getByRole('tab', { name: /Controls/ }).click();
  const picker = page.getByRole('combobox', { name: 'iconId', exact: true });
  await expect(picker).toBeVisible();
  await expect(picker.locator('option')).toHaveCount(871);
  const cast16 = await picker.locator('option').filter({ hasText: '444-4237' }).getAttribute('value');
  await picker.selectOption(cast16);
  await expect(frame.locator('.mds-icon-button img')).toHaveCSS('width', '16px');
  await page.screenshot({ path: 'test-results/storybook-reference.png' });
  await page.goto('/?path=/docs/components-play-pause--docs');
  await expect(frame.getByRole('heading', { name: 'Play Pause', exact: true })).toBeVisible();
  await expect(frame.getByText(/200 ms reversible/)).toBeVisible();
  await page.goto('/iframe.html?id=foundations-design-tokens--reference&viewMode=story');
  await expect(page.getByText('--mds-color-background-brand', { exact: true })).toBeVisible();
  await page.goto('/iframe.html?id=foundations-icons--catalog&viewMode=story');
  await page.getByRole('searchbox', { name: 'Search icons' }).fill('Cast');
  await expect(page.getByText('3 matching icons', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('background contrast and moving pattern remain selectable per story', async ({ page }) => {
  await page.goto('/iframe.html?id=components-icon-button--default&viewMode=story&globals=surface:white');
  const icon = page.locator('.mds-icon-button img');
  await expect(icon).toBeVisible();
  expect(decodeURIComponent(await icon.getAttribute('src'))).toContain('stroke="#000"');
  await page.goto('/iframe.html?id=components-icon-button--default&viewMode=story&globals=surface:moving');
  await expect(page.locator('.testing-pattern')).toHaveCSS('animation-play-state', 'running');
  await expect(icon).toBeVisible();
  expect(decodeURIComponent(await icon.getAttribute('src'))).toContain('stroke="#fff"');
  await page.goto('/iframe.html?id=components-icon-button--default&viewMode=story&globals=surface:colorful');
  await expect(page.locator('.testing-pattern')).toHaveCSS('animation-play-state', 'paused');
});

 test('PlayPause circle blur can be adjusted over a colorful background', async ({ page }) => {
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story&globals=surface:colorful');
  await expect(page.locator('.mds-play-pause')).toHaveCSS('backdrop-filter', 'blur(6px)');
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story&globals=surface:colorful&args=backgroundBlur:16');
  await expect(page.locator('.mds-play-pause')).toHaveCSS('backdrop-filter', 'blur(16px)');
  await page.screenshot({path: 'test-results/colorful-blur.png'});
});
