/**
 * Pure helpers for the Home page (D-090).
 */
import { isDrawing, sortProjects, type ProjectGroup, type ProjectImageKind } from "./projects";

interface FeaturedCandidate {
  group: ProjectGroup;
  order: number;
  title: string;
  placeholder: boolean;
}

/**
 * Projects shown in the Home slider (D-012, D-090): professional projects
 * with real material, in display order. Placeholders never appear.
 */
export function featuredProjects<T extends FeaturedCandidate>(projects: readonly T[]): T[] {
  return sortProjects(projects.filter((project) => project.group === "professional" && !project.placeholder));
}

interface CandidateImage<Src> {
  src: Src;
  alt: string;
  kind: ProjectImageKind;
}

/**
 * Small second image of a featured project: the first photo or render that is
 * not the cover, looking at the realisation first, then the digital part,
 * then the "after" images. Plans and concepts are skipped: they would be
 * cropped. None when the project has no other picture.
 */
export function detailImage<Src>(
  cover: CandidateImage<Src> | undefined,
  groups: readonly (readonly CandidateImage<Src>[])[]
): CandidateImage<Src> | undefined {
  return groups.flat().find((image) => !isDrawing(image.kind) && image.src !== cover?.src);
}

/** Slider counter, e.g. "01 / 03". */
export function slideCounter(index: number, total: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(index + 1)} / ${pad(total)}`;
}
