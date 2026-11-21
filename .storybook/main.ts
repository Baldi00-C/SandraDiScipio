import type { StorybookConfig } from "@storybook/html-vite";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";

// Storybook con framework HTML + Vite (D-050): i componenti Astro non hanno
// un renderer ufficiale di Storybook, quindi le storie mostrano HTML con le
// stesse classi Tailwind e gli stessi token usati dal sito.
const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.ts"],
  addons: [
    {
      name: "@storybook/addon-docs",
      // Tabelle Markdown (GFM) nelle pagine .mdx
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
