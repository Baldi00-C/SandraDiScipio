import type { Meta, StoryObj } from "@storybook/html-vite";

import villaCover from "../assets/projects/villa-castana-pavia/villa-castana-pavia-render-soggiorno.jpg?url";
import {
  buttonClasses,
  contactCtaClasses,
  editorialLinkClasses,
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
