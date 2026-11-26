import type { Meta, StoryObj } from "@storybook/html-vite";

import { page, pageHeader } from "./helpers";

// Figma: Sandra/* text styles (12) and the "Sandra · Typography" collection
const styles = [
  { figma: "Display/Hero", cls: "type-display-hero", sample: "We design spaces." },
  { figma: "Display/Large", cls: "type-display-large", sample: "Spaces with identity." },
  { figma: "Heading/H1", cls: "type-h1", sample: "Every space has a story" },
  { figma: "Heading/H2", cls: "type-h2", sample: "Warm neutrals. A deliberate accent." },
  { figma: "Heading/H3", cls: "type-h3", sample: "Interior Design" },
  {
    figma: "Body/Large",
    cls: "type-body-large",
    sample: "An editorial system for architecture, interiors and considered digital experiences.",
  },
  {
    figma: "Body/Default",
    cls: "type-body",
    sample: "We give shape to ideas, turning them into unique spaces.",
  },
  {
    figma: "Body/Small",
    cls: "type-body-small",
    sample: "Ivory surfaces, dusty rose accents and generous negative space.",
  },
  { figma: "Label/Eyebrow", cls: "type-eyebrow", sample: "01 / COLOR" },
  { figma: "Label/Link", cls: "type-link", sample: "REQUEST A QUOTE" },
  { figma: "Label/Control", cls: "type-control", sample: "Send request" },
  { figma: "Label/Caption", cls: "type-caption", sample: "#1D1D1B · ink" },
];

const meta: Meta = {
  title: "Design system/Typography",
  parameters: {
    docs: {
      description: {
        component:
          "Headings in Cormorant Garamond, body text in Gothic A1, both self-hosted. Each Figma text style is a `type-*` utility (family, size, line height, letter spacing, weight).",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Families: Story = {
  render: () =>
    page(`
      ${pageHeader("02 / TYPOGRAPHY", "Two families", "Figma collection <em>Sandra · Typography</em>: font/display and font/body.")}
      <div class="grid gap-12 tablet:grid-cols-2">
        <section>
          <p class="type-eyebrow text-text-secondary">FONT/DISPLAY · <code>font-display</code></p>
          <p class="mt-4 font-display text-[4rem] leading-none">Cormorant Garamond</p>
          <p class="type-body-small mt-4 text-text-secondary">A refined serif for expressive titles. Weights: 400, 500, 700.</p>
          <p class="mt-4 font-display text-2xl">Aa Bb Cc Dd Ee Ff Gg 0123456789 àèéìòù</p>
        </section>
        <section>
          <p class="type-eyebrow text-text-secondary">FONT/BODY · <code>font-body</code></p>
          <p class="mt-4 font-body text-[3rem] leading-none">Gothic A1</p>
          <p class="type-body-small mt-4 text-text-secondary">A clear sans-serif for everything that helps people act. Weights: 400, 500, 600.</p>
          <p class="mt-4 font-body text-xl">Aa Bb Cc Dd Ee Ff Gg 0123456789 àèéìòù</p>
        </section>
      </div>`),
};

export const TypeScale: Story = {
  name: "Type scale",
  render: () =>
    page(`
      ${pageHeader("02 / TYPOGRAPHY", "Type scale", "The 12 Sandra/* text styles from the Figma file: mobile values below 860 px, desktop values from 860 px (D-058). Resize the canvas to switch. The measurements under each name are read from the CSS.")}
      <ul class="divide-y divide-border-default">
        ${styles
          .map(
            (textStyle) => `
          <li data-sample class="grid gap-4 py-8 tablet:grid-cols-[16rem_1fr] tablet:items-baseline">
            <div>
              <p class="type-control">${textStyle.figma}</p>
              <code class="type-caption block text-text-label">${textStyle.cls}</code>
              <p data-read="type" class="type-caption mt-1 text-text-secondary"></p>
            </div>
            <p data-probe class="${textStyle.cls} break-words">${textStyle.sample}</p>
          </li>`
          )
          .join("")}
      </ul>`),
};
