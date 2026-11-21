import type { Preview } from '@storybook/html-vite';

import '../src/styles/global.css';

// Light/Dark mode of the "Sandra · Semantic" collection, switchable from the toolbar
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Semantic color mode (Figma: Sandra · Semantic)',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme ?? 'light';
      return story();
    },
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    options: {
      storySort: { order: ['Design system', ['Introduction', 'Colors', 'Typography', 'Spacing and layout']] },
    },
  },
};

export default preview;
