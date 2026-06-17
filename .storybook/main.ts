import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [],
  viteFinal(config) {
    // Remove vite-plugin-dts — it's for library builds only, not Storybook
    config.plugins = (config.plugins ?? []).filter(
      (p) => !p || !('name' in p) || !(p as { name: string }).name.includes('dts'),
    );
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 2000,
    };
    return config;
  },
};

export default config;
