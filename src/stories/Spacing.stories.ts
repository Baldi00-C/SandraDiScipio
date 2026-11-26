import type { Meta, StoryObj } from "@storybook/html-vite";

import { page, pageHeader } from "./helpers";

// Figma: "Sandra · Primitives" collection, space/*, radius/* and layout/* groups.
// Tailwind scale with a 4 px step: class = Figma value / 4
const spaces = [4, 8, 10, 12, 14, 16, 18, 20, 24, 28, 30, 32, 40, 44, 48, 56, 64, 72, 76, 96, 120];

const layout = [
  ["layout/max-width", "1180 px", "max-w-site"],
  ["layout/columns", "12", "grid-cols-12"],
  ["layout/gutter", "24 px", "gap-6 / px-6"],
  ["layout/gutter-mobile", "20 px", "gap-5 / px-5"],
  ["layout/breakpoint-mobile", "480 px", "mobile:"],
  ["layout/breakpoint-tablet", "860 px", "tablet:"],
  ["size/target", "44 px", "h-11 / min-h-11"],
  ["border/thin", "1 px", "border"],
  ["border/focus", "2 px", "outline-2 (focus-visible)"],
  ["radius/square", "0", "rounded-square"],
  ["radius/pill", "999 px", "rounded-pill"],
  ["duration/fast · base · reveal", "0.25 · 0.4 · 1.1 s", "duration-(--duration-fast)…"],
  ["easing/editorial", "cubic-bezier(0.2, 0.7, 0.1, 1)", "ease-editorial"],
];

const meta: Meta = { title: "Design system/Spacing and layout" };
export default meta;

export const Spacing: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("03 / SPACE & STRUCTURE", "Room to breathe.", "Figma group <em>space/*</em>. Tailwind uses a 4 px step: space/16 = <code>p-4</code>, space/10 = <code>p-2.5</code>.")}
      <ul class="flex flex-col gap-3">
        ${spaces
          .map(
            (spacing) => `
          <li data-sample class="grid grid-cols-[6rem_8rem_1fr] items-center gap-4">
            <span class="type-control">space/${spacing}</span>
            <code class="type-caption text-text-label">*-${spacing / 4}</code>
            <span class="flex items-center gap-3">
              <span data-probe class="block h-5 bg-rose-deep" style="width: calc(var(--spacing) * ${spacing / 4})"></span>
              <span data-read="width" class="type-caption text-text-secondary"></span>
            </span>
          </li>`
          )
          .join("")}
      </ul>
      <h2 class="type-h2 mt-16">Layout, shapes and motion</h2>
      <table class="type-body-small mt-6 w-full text-left">
        <thead class="type-eyebrow text-text-secondary">
          <tr class="border-b border-border-default"><th class="py-3 pr-4">FIGMA</th><th class="py-3 pr-4">VALUE</th><th class="py-3">TAILWIND</th></tr>
        </thead>
        <tbody class="divide-y divide-border-default">
          ${layout.map(([figmaName, value, className]) => `<tr><td class="py-3 pr-4">${figmaName}</td><td class="py-3 pr-4">${value}</td><td class="py-3"><code>${className}</code></td></tr>`).join("")}
        </tbody>
      </table>
      <div class="mt-10 flex flex-wrap gap-6">
        <span class="type-link inline-flex h-11 items-center rounded-pill bg-action-default px-6 text-action-label">PILL · RADIUS/PILL</span>
        <span class="type-control inline-flex h-11 items-center rounded-square border border-border-strong px-6">Square · radius/square</span>
      </div>`),
};
