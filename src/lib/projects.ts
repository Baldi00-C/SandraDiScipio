/**
 * Pure helpers for the projects collection (D-021, D-071, D-072, D-084).
 * No `astro:content` import here, so they can be unit tested directly;
 * reading the collection lives in `project-entries.ts`.
 */
import { isLocale, type Locale } from "../i18n/config";

export const projectGroups = ["professional", "university"] as const;
export type ProjectGroup = (typeof projectGroups)[number];

export const projectImageKinds = ["photo", "render", "plan", "concept"] as const;
export type ProjectImageKind = (typeof projectImageKinds)[number];

/** Fields the helpers need: a subset of the collection schema. */
export interface ProjectSummary {
  slug: string;
  group: ProjectGroup;
  order: number;
  title: string;
  type?: string;
  location?: string;
  year: string;
  course?: string;
}

/**
 * Splits a collection id (`it/villa-castana-pavia`) into locale and slug.
 * Throws on files outside a locale folder: they would never be shown.
 */
export function parseProjectId(id: string): { locale: Locale; slug: string } {
  const [locale, slug, ...rest] = id.split("/");
  if (!isLocale(locale) || !slug || rest.length > 0) {
    throw new Error(`Project "${id}" must live in src/content/projects/<it|en|es>/<slug>.md`);
  }
  return { locale, slug };
}

/** Projects in display order: `order` first, then title. */
export function sortProjects<T extends Pick<ProjectSummary, "order" | "title">>(projects: readonly T[]): T[] {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/**
 * The project shown in "Next project" (D-072): the following one in the same
 * group, starting again from the first. None when the group has one project.
 */
export function nextProject<T extends Pick<ProjectSummary, "slug" | "group" | "order" | "title">>(
  projects: readonly T[],
  current: T
): T | undefined {
  const group = sortProjects(projects.filter((project) => project.group === current.group));
  if (group.length < 2) return undefined;
  const index = group.findIndex((project) => project.slug === current.slug);
  return group[(index + 1) % group.length];
}

/**
 * One line of details under the card title (REQ-PROG-2, Figma `Project card`):
 * professional = "type · place, year", university = "course · year".
 */
export function projectDetails(project: Omit<ProjectSummary, "slug" | "order" | "title">): string {
  if (project.group === "university") {
    return [project.course, project.year].filter(Boolean).join(" · ");
  }
  const placeAndYear = [project.location, project.year].filter(Boolean).join(", ");
  return [project.type, placeAndYear].filter(Boolean).join(" · ");
}

/** Two-digit section number: 1 → "01". */
export function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** Plans and concept boards are shown whole, on white, with a thin border. */
export function isDrawing(kind: ProjectImageKind): boolean {
  return kind === "plan" || kind === "concept";
}

/**
 * Desktop layout of a gallery (Figma `Digital part`, `Interior part`): images
 * two by two on the 12-column grid. A photo next to a drawing takes 8 columns
 * and the drawing 4; two images of the same nature take 6 each; a lone image
 * takes the full width. On mobile every image is full width.
 */
export function galleryRows<T extends { kind: ProjectImageKind }>(
  images: readonly T[]
): { image: T; span: 4 | 6 | 8 | 12 }[][] {
  const rows: { image: T; span: 4 | 6 | 8 | 12 }[][] = [];
  for (let index = 0; index < images.length; index += 2) {
    const first = images[index];
    const second = images[index + 1];
    if (!second) {
      rows.push([{ image: first, span: 12 }]);
    } else if (isDrawing(first.kind) === isDrawing(second.kind)) {
      rows.push([
        { image: first, span: 6 },
        { image: second, span: 6 },
      ]);
    } else {
      rows.push([
        { image: first, span: isDrawing(first.kind) ? 4 : 8 },
        { image: second, span: isDrawing(second.kind) ? 4 : 8 },
      ]);
    }
  }
  return rows;
}

/**
 * Aspect ratio of an image box (Figma `05 · Progetto`): photos 4:3, drawings
 * 7:8; a full-width image is 16:9 from the tablet breakpoint; a drawing next
 * to a photo (4 of 12 columns) matches the photo height.
 */
export function mediaAspect(kind: ProjectImageKind, span: 4 | 6 | 8 | 12): string {
  if (span === 12) return "aspect-4/3 tablet:aspect-[1180/664]";
  if (!isDrawing(kind)) return "aspect-4/3";
  return span === 4 ? "aspect-7/8 tablet:aspect-[377/584]" : "aspect-7/8";
}
