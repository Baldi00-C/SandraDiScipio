import type { Meta, StoryObj } from "@storybook/html-vite";
import { fillComputedValues, html, pageHeader } from "./helpers";

// Figma: collezione "Sandra · Primitives", gruppo color/*
const primitives = [
  { figma: "color/ink", name: "Ink", token: "ink", cls: "bg-ink" },
  { figma: "color/rose", name: "Rose", token: "rose", cls: "bg-rose" },
  { figma: "color/rose-deep", name: "Deep rose", token: "rose-deep", cls: "bg-rose-deep" },
  { figma: "color/blush", name: "Blush", token: "blush", cls: "bg-blush" },
  { figma: "color/paper", name: "Paper", token: "paper", cls: "bg-paper" },
  { figma: "color/line", name: "Line", token: "line", cls: "bg-line" },
  { figma: "color/white", name: "White", token: "white", cls: "bg-white" },
  { figma: "color/muted", name: "Muted", token: "muted", cls: "bg-muted" },
  { figma: "color/label", name: "Label", token: "label", cls: "bg-label" },
  { figma: "color/error", name: "Error", token: "error", cls: "bg-error" },
  { figma: "color/success", name: "Success", token: "success", cls: "bg-success" },
  { figma: "color/disabled", name: "Disabled", token: "disabled", cls: "bg-disabled" },
];

// Figma: collezione "Sandra · Semantic", modi Light e Dark
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


function page(body: string): HTMLElement {
  const root = html(
    `<div class="min-h-screen bg-background-canvas px-6 py-12 text-text-primary tablet:px-12">
      <div class="mx-auto max-w-site">${body}</div>
    </div>`,
  );
  fillComputedValues(root);
  return root;
}

const meta: Meta = {
  title: "Design system/Colori",
  parameters: {
    docs: {
      description: {
        component:
          "Colori del file Figma SandraDiScipio. Primitivi: utility `bg-<nome>`, `text-<nome>`. Semantici: cambiano tra Light e Dark (selettore Modo nella barra).",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primitivi: Story = {
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Warm neutrals. A deliberate accent.", "Collezione Figma <em>Sandra · Primitives</em>. Il valore esadecimale sotto ogni campione è letto dal CSS dei token.")}
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
        Testo: Ink su Paper · Muted per il testo secondario · Rose è decorativo, non per testo piccolo.
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

export const Semantici: Story = {
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Colori semantici", "Collezione Figma <em>Sandra · Semantic</em>: ogni ruolo punta a un primitivo diverso nel modo Light e nel modo Dark. Nel codice si usano questi nomi, non i primitivi.")}
      <div class="grid gap-6 tablet:grid-cols-2">
        ${semanticPanel("light")}
        ${semanticPanel("dark")}
      </div>`),
};

export const InUso: Story = {
  name: "In uso",
  render: () =>
    page(`
      ${pageHeader("01 / COLOR", "Colori in uso", "Esempio con i soli colori semantici: cambia modo dalla barra di Storybook per vedere Light e Dark.")}
      <div class="grid gap-6 tablet:grid-cols-2">
        <article class="border border-border-default bg-surface-default p-8">
          <p class="type-eyebrow text-text-secondary">INTERIOR DESIGN</p>
          <h2 class="type-h2 mt-3">Ogni spazio ha una storia</h2>
          <p class="type-body mt-4 text-text-secondary">Diamo forma alle idee, trasformandole in ambienti unici.</p>
          <a href="#" class="type-link mt-6 inline-flex h-11 items-center rounded-pill bg-action-default px-6 text-action-label transition-colors duration-(--duration-fast) ease-editorial hover:bg-action-hover">
            RICHIEDI UN PREVENTIVO
          </a>
        </article>
        <div class="flex flex-col gap-4 bg-background-subtle p-8">
          <p class="type-body-small border-l-2 border-feedback-success pl-4">Messaggio inviato: ti rispondiamo presto.</p>
          <p class="type-body-small border-l-2 border-feedback-error pl-4">Controlla l'indirizzo email.</p>
          <p class="type-control bg-state-disabled px-4 py-2 text-text-secondary">Campo disattivato</p>
          <hr class="border-border-strong" />
        </div>
      </div>`),
};
