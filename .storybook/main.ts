import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../apps/docs/src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../apps/docs/public'],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, { base: './', resolve: { alias: [
      { find: /^@mds\/react$/, replacement: fileURLToPath(new URL('../packages/react/src/index.ts', import.meta.url)) },
      { find: '@mds/react/styles.css', replacement: fileURLToPath(new URL('../packages/react/src/styles.css', import.meta.url)) },
    ] } });
  },
};
export default config;
