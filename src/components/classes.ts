/**
 * Tailwind class lists shared by the Astro components and the Storybook
 * stories (D-055), so the catalogue cannot drift from the website.
 */

export type ButtonKind = "primary" | "secondary";
export type ButtonSize = "default" | "small";

/** Pill button (D-067): Primary = ink, Secondary = outline; 52 or 44 px. */
export function buttonClasses(kind: ButtonKind = "primary", size: ButtonSize = "default", block = false): string {
  return [
    "type-control inline-flex shrink-0 items-center justify-center rounded-pill text-center transition-colors duration-fast ease-editorial",
    size === "small" ? "h-11 px-6" : "h-13 px-8",
    kind === "primary"
      ? "bg-action-default text-action-label hover:bg-action-hover"
      : "border border-border-strong text-text-primary hover:border-action-hover hover:text-action-hover",
    block ? "w-full tablet:w-auto" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Project card (D-068): 3:4 photo, zoom 4 % and rose-deep title on hover. */
export const projectCardClasses = {
  root: "group flex flex-col",
  media: "aspect-3/4 overflow-hidden bg-background-subtle",
  image: "size-full object-cover transition-transform duration-base ease-editorial group-hover:scale-104",
  text: "flex flex-col gap-1 pt-4",
  title:
    "type-h3 decoration-1 underline-offset-[0.2em] transition-colors duration-fast ease-editorial group-hover:text-action-hover group-hover:underline",
  details: "type-body-small text-text-secondary",
};

/** Section heading of the content pages: eyebrow, H2, description. */
export const sectionHeadingClasses = {
  root: "flex flex-col gap-2",
  eyebrow: "type-eyebrow text-text-label uppercase",
  title: "type-h2",
  description: "type-body text-text-secondary",
};

/** Invitation to the quote (Figma `Contact CTA`). */
export const contactCtaClasses = {
  root: "bg-background-subtle py-12 tablet:py-16",
  container: "container-site flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between",
  text: "flex flex-col gap-2",
  title: "type-h2",
  body: "type-body",
};

/** Editorial link (Figma `Editorial link`): uppercase label, ink underline. */
export const editorialLinkClasses =
  "type-link inline-flex items-center gap-3 self-start border-b border-border-strong pt-3 pb-2 uppercase transition-colors duration-fast ease-editorial hover:border-action-hover hover:text-action-hover";

/** Round icon button of the image viewer, on the dark background (D-073). */
export const viewerButtonClasses =
  "grid size-12 shrink-0 place-items-center rounded-pill bg-white/12 text-white transition-colors duration-fast ease-editorial hover:bg-white/24";
