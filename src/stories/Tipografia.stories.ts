import type { Meta, StoryObj } from "@storybook/html-vite";
import { fillComputedValues, html, pageHeader } from "./helpers";

// Figma: stili di testo Sandra/* (12) e collezione "Sandra · Typography"
const styles = [
  { figma: "Display/Hero", cls: "type-display-hero", sample: "Progettiamo spazi." },
  { figma: "Display/Large", cls: "type-display-large", sample: "Spaces with identity." },
  { figma: "Heading/H1", cls: "type-h1", sample: "Ogni spazio ha una storia" },
  { figma: "Heading/H2", cls: "type-h2", sample: "Warm neutrals. A deliberate accent." },
  { figma: "Heading/H3", cls: "type-h3", sample: "Interior Design" },
  { figma: "Body/Large", cls: "type-body-large", sample: "Un sistema editoriale per architettura, interni ed esperienze digitali curate." },
  { figma: "Body/Default", cls: "type-body", sample: "Diamo forma alle idee, trasformandole in ambienti unici." },
  { figma: "Body/Small", cls: "type-body-small", sample: "Superfici avorio, accenti rosa antico e ampi spazi vuoti." },
  { figma: "Label/Eyebrow", cls: "type-eyebrow", sample: "01 / COLOR" },
  { figma: "Label/Link", cls: "type-link", sample: "RICHIEDI UN PREVENTIVO" },
  { figma: "Label/Control", cls: "type-control", sample: "Invia la richiesta" },
  { figma: "Label/Caption", cls: "type-caption", sample: "#1D1D1B · ink" },
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
  title: "Design system/Tipografia",
  parameters: {
    docs: {
      description: {
        component:
          "Titoli in Cormorant Garamond, testo in Gothic A1, ospitati sul sito. Ogni stile Figma è una utility `type-*` (famiglia, dimensione, interlinea, spaziatura, peso).",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Famiglie: Story = {
  render: () =>
    page(`
      ${pageHeader("02 / TYPOGRAPHY", "Due famiglie", "Collezione Figma <em>Sandra · Typography</em>: font/display e font/body.")}
      <div class="grid gap-12 tablet:grid-cols-2">
        <section>
          <p class="type-eyebrow text-text-secondary">FONT/DISPLAY · <code>font-display</code></p>
          <p class="mt-4 font-display text-[4rem] leading-none">Cormorant Garamond</p>
          <p class="type-body-small mt-4 text-text-secondary">Serif raffinato per i titoli espressivi. Pesi: 400, 500, 700.</p>
          <p class="mt-4 font-display text-2xl">Aa Bb Cc Dd Ee Ff Gg 0123456789 àèéìòù</p>
        </section>
        <section>
          <p class="type-eyebrow text-text-secondary">FONT/BODY · <code>font-body</code></p>
          <p class="mt-4 font-body text-[3rem] leading-none">Gothic A1</p>
          <p class="type-body-small mt-4 text-text-secondary">Sans-serif chiaro per tutto ciò che aiuta ad agire. Pesi: 400, 500, 600.</p>
          <p class="mt-4 font-body text-xl">Aa Bb Cc Dd Ee Ff Gg 0123456789 àèéìòù</p>
        </section>
      </div>`),
};

export const ScalaTipografica: Story = {
  name: "Scala tipografica",
  render: () =>
    page(`
      ${pageHeader("02 / TYPOGRAPHY", "Scala tipografica", "I 12 stili di testo Sandra/* del file Figma, ai valori desktop (1440 px). Le misure sotto ogni nome sono lette dal CSS.")}
      <ul class="divide-y divide-border-default">
        ${styles
          .map(
            (s) => `
          <li data-sample class="grid gap-4 py-8 tablet:grid-cols-[16rem_1fr] tablet:items-baseline">
            <div>
              <p class="type-control">${s.figma}</p>
              <code class="type-caption block text-text-label">${s.cls}</code>
              <p data-read="type" class="type-caption mt-1 text-text-secondary"></p>
            </div>
            <p data-probe class="${s.cls} break-words">${s.sample}</p>
          </li>`,
          )
          .join("")}
      </ul>`),
};
