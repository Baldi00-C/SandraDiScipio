import type { Meta, StoryObj } from "@storybook/html-vite";

import villaCover from "../assets/projects/villa-castana-pavia/villa-castana-pavia-render-soggiorno.jpg?url";
import warmSample from "../assets/quote/warm-sample.jpg?url";
import {
  buttonClasses,
  choicePillClasses,
  contactCtaClasses,
  editorialLinkClasses,
  fieldClasses,
  moodCardClasses,
  optionCardClasses,
  projectCardClasses,
  sectionHeadingClasses,
  viewerButtonClasses,
} from "../components/classes";
import { page, pageHeader } from "./helpers";

// Figma: page "Page 1", board "02 · Components" (T-02.4). Class lists come
// from src/components/classes.ts, the same module used by the Astro components.

const meta: Meta = { title: "Design system/Components" };
export default meta;

export const Buttons: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Buttons.", "Figma <em>Button</em> (D-067): Primary and Secondary, sizes 52 and 44 px. Hover = rose-deep. On mobile the page buttons fill the width.")}
      <div class="flex flex-wrap items-center gap-6">
        <a href="#" class="${buttonClasses("primary")}">Richiedi un preventivo</a>
        <a href="#" class="${buttonClasses("secondary")}">Scopri i servizi</a>
        <a href="#" class="${buttonClasses("primary", "small")}">Small</a>
        <a href="#" class="${buttonClasses("secondary", "small")}">Small</a>
      </div>
      <div class="mt-10 max-w-sm">
        <p class="type-caption mb-3 text-text-secondary">Mobile, full width</p>
        <a href="#" class="${buttonClasses("primary", "default", true)}">Richiedi un preventivo</a>
      </div>`),
};

const card = (title: string, details: string, image?: string) => `
  <a href="#" class="${projectCardClasses.root}">
    <div class="${projectCardClasses.media}">
      ${image ? `<img src="${image}" alt="" class="${projectCardClasses.image}" />` : ""}
    </div>
    <div class="${projectCardClasses.text}">
      <h3 class="${projectCardClasses.title}">${title}</h3>
      <p class="${projectCardClasses.details}">${details}</p>
    </div>
  </a>`;

export const ProjectCard: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Project card.", "Figma <em>Project card</em> (D-068): 3:4 photo, H3 title, one line of details. Hover: photo zoom 4 %, title rose-deep underlined. Without material: blush placeholder (D-085).")}
      <div class="grid grid-cols-1 gap-10 tablet:grid-cols-3 tablet:gap-gutter">
        ${card("Villa privata a Castana", "Arredamento chiavi in mano · Castana (Pavia), 2020", villaCover)}
        ${card("[Titolo progetto universitario]", "[Corso] · [anno]")}
      </div>`),
};

export const SectionHeading: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Section heading.", "Eyebrow, H2 title and one line of description, as in the Figma page mockups.")}
      <div class="${sectionHeadingClasses.root}">
        <p class="${sectionHeadingClasses.eyebrow}">01 · 3 progetti</p>
        <h2 class="${sectionHeadingClasses.title}">Progetti professionali</h2>
        <p class="${sectionHeadingClasses.description}">Proposte, render e lavori realizzati per clienti privati e aziende.</p>
      </div>`),
};

export const ContactCta: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Contact CTA.", "Figma <em>Contact CTA</em>: blush band at the end of the content pages. Mobile: stacked, button full width.")}
      <section class="${contactCtaClasses.root}">
        <div class="${contactCtaClasses.container}">
          <div class="${contactCtaClasses.text}">
            <h2 class="${contactCtaClasses.title}">Hai un progetto da realizzare?</h2>
            <p class="${contactCtaClasses.body}">Ogni grande progetto nasce da una prima idea e da una conversazione.</p>
          </div>
          <a href="#" class="${buttonClasses("primary", "default", true)}">Richiedi un preventivo</a>
        </div>
      </section>`),
};

export const EditorialLink: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Editorial link.", "Figma <em>Editorial link</em>: uppercase label with an ink underline. Hover = rose-deep.")}
      <div class="flex flex-col gap-8">
        <a href="#" class="${editorialLinkClasses}"><span aria-hidden="true">←</span>Tutti i progetti</a>
        <a href="#" class="${editorialLinkClasses}">Scopri i servizi<span aria-hidden="true">→</span></a>
      </div>`),
};

export const ViewerButtons: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Image viewer buttons.", "Figma <em>05 · Progetto · Visore</em> (D-073): round 48 px buttons, white 12 % on ink 96 %.")}
      <div class="flex items-center gap-8 p-10" style="background: rgb(29 29 27 / 0.96)">
        ${["M14.5 5.5L8 12L14.5 18.5", "M9.5 5.5L16 12L9.5 18.5", "M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"]
          .map(
            (path) =>
              `<button type="button" class="${viewerButtonClasses}"><svg viewBox="0 0 24 24" fill="none" class="size-6"><path d="${path}" stroke="currentColor" stroke-width="1.25"></path></svg></button>`
          )
          .join("")}
      </div>`),
};

const check = (className: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${className}"><path d="M5 12l5 5L20 7"></path></svg>`;

const sofaIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${optionCardClasses.icon}"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3 M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2z M5 18v2 M19 18v2"></path></svg>`;

const optionCard = (label: string, checked: boolean, icon: boolean) => `
  <label class="${optionCardClasses.root} ${icon ? optionCardClasses.stacked : optionCardClasses.inline}">
    <input type="checkbox" class="${optionCardClasses.input}" ${checked ? "checked" : ""} />
    ${
      icon
        ? `<span class="${optionCardClasses.top}">${sofaIcon}<span class="${optionCardClasses.check}">${check(optionCardClasses.checkIcon)}</span></span>`
        : `<span class="${optionCardClasses.check}">${check(optionCardClasses.checkIcon)}</span>`
    }
    <span class="${optionCardClasses.label}">${label}</span>
  </label>`;

export const QuoteAnswers: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Quote answers.", "Figma <em>T-08.2 · Preventivatore</em> (D-095, D-099): answer cards with or without icon, pills, atmosphere card. Real radio and checkbox inputs: click to choose, keyboard focus on the whole card.")}
      <div class="grid max-w-3xl grid-cols-2 gap-4 tablet:grid-cols-3">
        ${optionCard("Soggiorno", true, true)}
        ${optionCard("Cucina", false, true)}
        ${optionCard("Ristrutturazione completa", true, false)}
      </div>
      <div class="mt-10 flex flex-wrap gap-3">
        ${["Legno", "Pietra", "Mattone"]
          .map(
            (label, index) => `
          <label class="${choicePillClasses.root}">
            <input type="checkbox" class="${choicePillClasses.input}" ${index === 0 ? "checked" : ""} />
            ${check(choicePillClasses.checkIcon)}
            <span class="${choicePillClasses.label}">${label}</span>
          </label>`
          )
          .join("")}
      </div>
      <div class="mt-10 grid max-w-sm grid-cols-2 gap-4">
        <label class="${moodCardClasses.root}">
          <input type="checkbox" class="sr-only" checked />
          <span class="${moodCardClasses.media}"><img src="${warmSample}" alt="" class="${moodCardClasses.image}" /></span>
          <span class="${moodCardClasses.label}">Calda e accogliente</span>
        </label>
      </div>`),
};

export const FormFields: StoryObj = {
  render: () =>
    page(`
      ${pageHeader("04 / COMPONENTS", "Form fields.", 'Figma <em>Text field</em> (D-069): visible label, 52 px control, help under it, replaced by the error that starts with "Errore:". Focus = 2 px rose-deep border.')}
      <div class="flex max-w-md flex-col gap-8">
        <div class="${fieldClasses.root}">
          <label for="story-name" class="${fieldClasses.label}">Nome</label>
          <input id="story-name" class="${fieldClasses.control}" placeholder="Il tuo nome" />
          <p class="${fieldClasses.help}">Campo obbligatorio.</p>
        </div>
        <div class="${fieldClasses.root}">
          <label for="story-email" class="${fieldClasses.label}">Email</label>
          <input id="story-email" class="${fieldClasses.control}" value="nome@" aria-invalid="true" />
          <p class="${fieldClasses.error}">Errore: inserisci un indirizzo email valido.</p>
        </div>
        <div class="${fieldClasses.root}">
          <label for="story-notes" class="${fieldClasses.label}">Note</label>
          <textarea id="story-notes" class="${fieldClasses.textarea}" placeholder="Scrivi qui"></textarea>
        </div>
      </div>`),
};
