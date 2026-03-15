import type { Preview } from '@storybook/angular';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Customize accessibility rules if needed
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    // Disable page reloads between stories
    layout: 'fullscreen',
  },
  // Disable automatic page reloads
  globalTypes: {},
};

export default preview;
