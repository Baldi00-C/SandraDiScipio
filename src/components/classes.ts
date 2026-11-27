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

/**
 * Form fields (D-069): visible label, 52 px control (textarea 136 px), help
 * under it, replaced by the error. Focus = 2 px rose-deep border.
 */
export const fieldClasses = {
  root: "flex flex-col gap-2",
  label: "type-control text-text-primary",
  control:
    "type-control h-13 w-full rounded-square border border-border-default bg-surface-default px-4 text-text-primary transition-colors duration-fast ease-editorial placeholder:text-text-secondary focus-visible:border-focus-ring focus-visible:shadow-[inset_0_0_0_1px_var(--color-focus-ring)] focus-visible:outline-none aria-invalid:border-feedback-error",
  textarea:
    "type-control min-h-34 w-full resize-y rounded-square border border-border-default bg-surface-default px-4 py-3 text-text-primary transition-colors duration-fast ease-editorial placeholder:text-text-secondary focus-visible:border-focus-ring focus-visible:shadow-[inset_0_0_0_1px_var(--color-focus-ring)] focus-visible:outline-none aria-invalid:border-feedback-error",
  help: "type-caption text-text-secondary",
  error: "type-caption text-feedback-error",
};

/**
 * Answer card of the quote builder (D-095, Figma `Option card`): a real radio
 * or checkbox hidden inside a label; chosen = 2 px ink border and check mark.
 */
export const optionCardClasses = {
  root: "group relative flex cursor-pointer gap-4 border border-border-default bg-surface-default p-4 transition-[border-color,box-shadow] duration-fast ease-editorial hover:border-border-strong has-checked:border-border-strong has-checked:shadow-[inset_0_0_0_1px_var(--color-border-strong)] has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-focus-ring tablet:p-6",
  /** With an icon: icon and check on top, label at the bottom. */
  stacked: "min-h-24 flex-col justify-between",
  /** Text only: label and check on one line. */
  inline: "flex-row-reverse items-center justify-between",
  input: "sr-only",
  top: "flex items-start justify-between gap-3",
  icon: "size-8 text-text-primary",
  check:
    "grid size-6 shrink-0 place-items-center rounded-pill border border-border-default text-action-label transition-colors duration-fast ease-editorial group-has-checked:border-action-default group-has-checked:bg-action-default",
  checkIcon: "size-3.5 opacity-0 transition-opacity duration-fast group-has-checked:opacity-100",
  label: "type-control text-text-primary",
};

/** Pill choice of the quote builder (materials, short answers): chosen = ink fill. */
export const choicePillClasses = {
  root: "group inline-flex h-11 cursor-pointer items-center gap-2 rounded-pill border border-border-strong px-5 transition-colors duration-fast ease-editorial hover:text-action-hover has-checked:bg-action-default has-checked:text-action-label has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-focus-ring",
  input: "sr-only",
  checkIcon: "hidden size-3.5 group-has-checked:block",
  label: "type-control",
};

/** Atmosphere card of the moodboard (D-099): full-bleed sample image, label under it. */
export const moodCardClasses = {
  root: "group relative flex cursor-pointer flex-col overflow-hidden border border-border-default bg-surface-default transition-[border-color,box-shadow] duration-fast ease-editorial hover:border-border-strong has-checked:border-border-strong has-checked:shadow-[inset_0_0_0_1px_var(--color-border-strong)] has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-focus-ring",
  media: "relative block aspect-[11/10] overflow-hidden bg-background-subtle",
  image: "size-full object-cover transition-transform duration-base ease-editorial group-hover:scale-104",
  label: "type-control px-3 py-3 tablet:px-4",
};
