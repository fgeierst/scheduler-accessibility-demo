import type { StorybookConfig } from '@analogjs/storybook-angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@analogjs/storybook-angular',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {},
};

export default config;
