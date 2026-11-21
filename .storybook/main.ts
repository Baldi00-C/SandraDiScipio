import type { StorybookConfig } from "@storybook/html-vite";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";

// Storybook with the HTML + Vite framework (D-050): Astro components have no
// official Storybook renderer, so stories render plain HTML using the same
// Tailwind classes and tokens as the website.
const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.ts"],
  addons: [
    {
      name: "@storybook/addon-docs",
      // GitHub-flavored Markdown tables in .mdx pages
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
