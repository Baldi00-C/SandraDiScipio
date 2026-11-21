import type { Meta, StoryObj } from "@storybook/html-vite";
import { page, pageHeader } from "./helpers";

// Figma: "Sandra · Primitives" collection, color/* group.
// Class names are written in full so Tailwind can detect them.
const primitives = [
  { figma: "color/ink", name: "Ink", cls: "bg-ink" },
  { figma: "color/rose", name: "Rose", cls: "bg-rose" },
  { figma: "color/rose-deep", name: "Deep rose", cls: "bg-rose-deep" },
  { figma: "color/blush", name: "Blush", cls: "bg-blush" },
  { figma: "color/paper", name: "Paper", cls: "bg-paper" },
  { figma: "color/line", name: "Line", cls: "bg-line" },
  { figma: "color/white", name: "White", cls: "bg-white" },
  { figma: "color/muted", name: "Muted", cls: "bg-muted" },
  { figma: "color/label", name: "Label", cls: "bg-label" },
  { figma: "color/error", name: "Error", cls: "bg-error" },
  { figma: "color/success", name: "Success", cls: "bg-success" },
  { figma: "color/disabled", name: "Disabled", cls: "bg-disabled" },
];

// Figma: "Sandra · Semantic" collection, Light and Dark modes
const semantic = [
  { figma: "background/canvas", cls: "bg-background-canvas", light: "paper", dark: "ink" },
  { figma: "background/subtle", cls: "bg-background-subtle", light: "blush", dark: "label" },
  { figma: "surface/default", cls: "bg-surface-default", light: "white", dark: "ink" },
  { figma: "text/primary", cls: "bg-text-primary", light: "ink", dark: "paper" },
  { figma: "text/secondary", cls: "bg-text-secondary", light: "muted", dark: "blush" },
  { figma: "text/label", cls: "bg-text-label", light: "label", dark: "blush" },
  { figma: "text/inverse", cls: "bg-text-inverse", light: "white", dark: "ink" },
  { figma: "border/default", cls: "bg-border-default", light: "line", dark: "muted" },
  { figma: "border/strong", cls: "bg-border-strong", light: "ink", dark: "paper" },
  { figma: "action/default", cls: "bg-action-default", light: "ink", dark: "paper" },
  { figma: "action/hover", cls: "bg-action-hover", light: "rose-deep", dark: "blush" },
  { figma: "action/label", cls: "bg-action-label", light: "white", dark: "ink" },
  { figma: "focus/ring", cls: "bg-focus-ring", light: "rose-deep", dark: "rose" },
  { figma: "feedback/error", cls: "bg-feedback-error", light: "error", dark: "rose" },
  { figma: "feedback/success", cls: "bg-feedback-success", light: "success", dark: "blush" },
  { figma: "state/disabled", cls: "bg-state-disabled", light: "disabled", dark: "label" },
];

const meta: Meta = {
  title: "Design system/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Colors from the SandraDiScipio Figma file. Primitives: `bg-<name>`, `text-<name>` utilities. Semantic colors switch between Light and Dark (Mode selector in the toolbar).",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primitives: Story = {
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Warm neutrals. A deliberate accent.", "Figma collection <em>Sandra · Primitives</em>. The hex value under each swatch is read from the token CSS.")}
      <div class="grid grid-cols-2 gap-6 mobile:grid-cols-3 tablet:grid-cols-6">
        ${primitives
          .map(
            (c) => `
          <figure data-sample>
            <div data-probe class="h-20 border border-border-default ${c.cls}"></div>
            <figcaption class="mt-3">
              <span class="type-h3 block">${c.name}</span>
              <span class="type-caption block text-text-secondary"><span data-read="bg"></span> · ${c.figma}</span>
              <code class="type-caption block text-text-label">${c.cls}</code>
            </figcaption>
          </figure>`,
          )
          .join("")}
      </div>
      <p class="type-caption mt-10 text-text-secondary">
        Text: Ink on Paper · Muted for secondary copy · Rose is decorative, not for small body text.
      </p>`),
};

function semanticPanel(mode: "light" | "dark"): string {
  return `
    <section data-theme="${mode}" class="bg-background-canvas p-6 text-text-primary">
      <h2 class="type-h2">${mode === "light" ? "Light" : "Dark"}</h2>
      <ul class="mt-6 divide-y divide-border-default">
        ${semantic
          .map(
            (s) => `
          <li data-sample class="flex items-center gap-4 py-3">
            <span data-probe class="size-10 shrink-0 border border-border-default ${s.cls}"></span>
            <span class="min-w-0 flex-1">
              <span class="type-control block">${s.figma}</span>
              <code class="type-caption block text-text-secondary">${s.cls} · text-/border-…</code>
            </span>
            <span class="type-caption text-right text-text-label">
              → color/${mode === "light" ? s.light : s.dark}<br /><span data-read="bg"></span>
            </span>
          </li>`,
          )
          .join("")}
      </ul>
    </section>`;
}

export const Semantic: Story = {
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Semantic colors", "Figma collection <em>Sandra · Semantic</em>: each role points to a different primitive in Light and Dark mode. Code uses these names, not the primitives.")}
      <div class="grid gap-6 tablet:grid-cols-2">
        ${semanticPanel("light")}
        ${semanticPanel("dark")}
      </div>`),
};

export const InUse: Story = {
  name: "In use",
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Colors in use", "Example built with semantic colors only: switch mode from the Storybook toolbar to see Light and Dark.")}
      <div class="grid gap-6 tablet:grid-cols-2">
        <article class="border border-border-default bg-surface-default p-8">
          <p class="type-eyebrow text-text-secondary">INTERIOR DESIGN</p>
          <h2 class="type-h2 mt-3">Every space has a story</h2>
          <p class="type-body mt-4 text-text-secondary">We give shape to ideas, turning them into unique spaces.</p>
          <a href="#" class="type-link mt-6 inline-flex h-11 items-center rounded-pill bg-action-default px-6 text-action-label transition-colors duration-(--duration-fast) ease-editorial hover:bg-action-hover">
            REQUEST A QUOTE
          </a>
        </article>
        <div class="flex flex-col gap-4 bg-background-subtle p-8">
          <p class="type-body-small border-l-2 border-feedback-success pl-4">Message sent: we will get back to you soon.</p>
          <p class="type-body-small border-l-2 border-feedback-error pl-4">Please check the email address.</p>
          <p class="type-control bg-state-disabled px-4 py-2 text-text-secondary">Disabled field</p>
          <hr class="border-border-strong" />
        </div>
      </div>`),
};
