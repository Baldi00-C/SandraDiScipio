import type { Preview } from "@storybook/html-vite";
import "../src/styles/design-system.css";

// Modo Light/Dark della collezione "Sandra · Semantic", dalla barra di Storybook
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Modo dei colori semantici (Figma: Sandra · Semantic)",
      toolbar: {
        title: "Modo",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme ?? "light";
      return story();
    },
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    options: {
      storySort: { order: ["Design system", ["Introduzione", "Colori", "Tipografia", "Spaziature e layout"]] },
    },
  },
};

export default preview;
