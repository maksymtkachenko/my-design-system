import { test, expect } from '@playwright/test';

test('PlayPause preserves geometry, exact timeline, keyboard and disabled behavior', async ({ page }) => {
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story');
  const stage = page.getByRole('region', { name: 'Component preview' });
  const button = stage.locator('.mds-play-pause');
  for (const [size, width] of [['x-small',32],['small',52],['large',84]]) {
    await page.goto(`/iframe.html?id=components-play-pause--default&viewMode=story&args=size:${size}`);
    await expect(button).toHaveCSS('width', `${width}px`);
    expect(await button.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  }
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story');
  await expect(button).toHaveAccessibleName('Play');
  const tracks = await button.evaluate(element => element.getAnimations({ subtree: true }).map(animation => ({
    duration: animation.effect.getTiming().duration,
    frames: animation.effect.getKeyframes().map(frame => ({ offset: frame.offset, opacity: frame.opacity, transform: frame.transform })),
  })));
  expect(tracks).toHaveLength(3);
  expect(tracks.every(track => track.duration === 200)).toBe(true);
  expect(tracks[1].frames.map(frame => frame.offset)).toEqual([0,.625,1]);
  expect(tracks[2].frames.map(frame => frame.offset)).toEqual([0,.375,1]);
  await button.click();
  await expect(button).toHaveAccessibleName('Pause');
  await expect(button.locator('.mds-play-pause__pause .mds-play-pause__motion')).toHaveCSS('opacity', '1');
  await button.press('Space');
  await expect(button).toHaveAccessibleName('Play');
  await expect(button.locator('.mds-play-pause__play .mds-play-pause__motion')).toHaveCSS('opacity', '1');
  await button.screenshot({ path: 'test-results/play-pause-default.png' });
  await page.goto('/iframe.html?id=components-play-pause--disabled&viewMode=story');
  await expect(button).toBeDisabled();
});

test('PlayPause reverses in flight and respects reduced motion independently of background', async ({ page }) => {
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story');
  const button = page.locator('.mds-play-pause');
  await page.goto('/iframe.html?id=components-play-pause--default&viewMode=story&globals=surface:moving');
  await expect(button).toHaveAccessibleName('Play');
  await button.evaluate(element => element.click());
  await expect(button).toHaveAccessibleName('Pause');
  await button.evaluate(element => element.click());
  await expect(button).toHaveAccessibleName('Play');
  await expect(button.locator('.mds-play-pause__play .mds-play-pause__motion')).toHaveCSS('opacity', '1');
  await expect(page.locator('.testing-pattern')).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await button.click();
  await expect.poll(() => button.evaluate(element => element.getAnimations({ subtree: true }).every(animation => animation.currentTime === 200 && animation.playState === 'paused'))).toBe(true);
  await expect(button).toHaveAccessibleName('Pause');
  await page.screenshot({ path: 'test-results/play-pause-reference.png' });
});
