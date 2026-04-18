import type { StorybookConfig } from '@analogjs/storybook-angular';
import remarkGfm from 'remark-gfm';
import { loadEnv, mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@analogjs/storybook-angular',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (viteConfig, options) => {
    const mode = options.configType === 'PRODUCTION' ? 'production' : 'development';
    const env = loadEnv(mode, process.cwd(), '');

    return mergeConfig(viteConfig, {
      define: {
        SYNCFUSION_LICENSE: JSON.stringify(
          env['SYNCFUSION_LICENSE'] ?? process.env['SYNCFUSION_LICENSE'] ?? '',
        ),
      },
    });
  },
};

export default config;
