import { mkdir, readFile, readdir, writeFile, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const tokens = JSON.parse(await readFile('packages/tokens/tokens.json', 'utf8'));
await mkdir('packages/tokens/dist', { recursive: true });
await writeFile('packages/tokens/dist/index.js', `export const tokens = ${JSON.stringify(tokens, null, 2)};\n`);
function typeOf(value) {
  if (typeof value !== 'object') return typeof value;
  return `{ ${Object.entries(value).map(([key, val]) => `${key}: ${typeOf(val)}`).join('; ')} }`;
}
await writeFile('packages/tokens/dist/index.d.ts', `export declare const tokens: ${typeOf(tokens)};\n`);
const css = [];
const kebab = s => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
function flatten(obj, segments = []) {
  for (const [key, value] of Object.entries(obj)) {
    const next = [...segments, kebab(key)];
    if (typeof value === 'object') flatten(value, next);
    else {
      const unit = typeof value === 'number' && key !== 'weight' ? 'px' : '';
      css.push(`  --mds-${next.join('-')}: ${value}${unit};`);
    }
  }
}
flatten(tokens);
await writeFile('packages/tokens/dist/styles.css', `/* Generated from tokens.json. */\n:root {\n${css.join('\n')}\n}\n`);
await mkdir('packages/icons/dist', { recursive: true });
const assets = {};
for (const filename of (await readdir('packages/icons/assets')).filter(n => n.endsWith('.svg')).sort()) {
  const svg = await readFile(path.join('packages/icons/assets', filename), 'utf8');
  if (!svg.includes('<svg')) throw new Error(`Invalid SVG: ${filename}`);
  assets[filename.replace('.svg', '')] = svg;
}
await writeFile('packages/icons/dist/index.js', `export const assets = ${JSON.stringify(assets)};\n`);
await writeFile('packages/icons/dist/index.d.ts', `export declare const assets: { ${Object.keys(assets).map(k => `${JSON.stringify(k)}: string`).join('; ')} };\n`);
for (const platform of ['react', 'react-native']) {
  const result = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', `packages/${platform}/tsconfig.json`], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
await copyFile('packages/react/src/styles.css', 'packages/react/dist/styles.css');
const vite = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', 'apps/docs'], { stdio: 'inherit' });
if (vite.status !== 0) process.exit(vite.status ?? 1);
