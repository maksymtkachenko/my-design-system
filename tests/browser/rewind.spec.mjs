import { test, expect } from '@playwright/test';

test('Rewind uses authored icons and plays the press timeline once per activation', async ({ page }) => {
  const button = page.locator('.mds-rewind');
  for (const [variant, diameter, iconSize] of [
    ['forward', 40, 24], ['forward-large', 54, 32],
    ['backward', 40, 24], ['backward-large', 54, 32],
  ]) {
    await page.goto(`/iframe.html?id=components-rewind--${variant}&viewMode=story&globals=surface:colorful`);
    await expect(button).toHaveAccessibleName(variant.startsWith('forward') ? 'Skip forward' : 'Skip backward');
    await expect(button).toHaveCSS('width', `${diameter}px`);
    await expect(button).toHaveCSS('height', `${diameter}px`);
    await expect(button).toHaveCSS('backdrop-filter', 'blur(6px)');
    await expect.poll(() => button.locator('img').evaluate(img => img.naturalWidth)).toBe(iconSize);
    const tracks = await button.evaluate(element => {
      element.click();
      return element.getAnimations().map(animation => ({
        duration: animation.effect.getTiming().duration,
        iterations: animation.effect.getTiming().iterations,
        frames: animation.effect.getKeyframes(),
      }));
    });
    expect(tracks.map(track => [track.duration, track.iterations])).toEqual([[400, 1], [400, 1]]);
    expect(tracks[0].frames.map(frame => frame.offset)).toEqual([0, .9973, 1]);
    expect(tracks[0].frames[1].transform.startsWith(variant.startsWith('backward') ? 'rotate(-' : 'rotate(')).toBe(true);
    expect(tracks[1].frames.map(frame => frame.offset)).toEqual([0, .25, .5, 1]);
    await expect.poll(() => button.evaluate(element => element.getAnimations().length)).toBe(0);
  }
  await button.press('Space');
  await expect.poll(() => button.evaluate(element => element.getAnimations().length)).toBe(2);
  await expect.poll(() => button.evaluate(element => element.getAnimations().length)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await button.press('Space');
  expect(await button.evaluate(element => element.getAnimations().length)).toBe(0);
});
