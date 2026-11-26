/**
 * Reads the projects collection for one locale (D-021, D-084).
 */
import { getCollection, type CollectionEntry } from "astro:content";

import type { Locale } from "../i18n/config";
import { parseProjectId, sortProjects, type ProjectSummary } from "./projects";

export type ProjectEntry = CollectionEntry<"projects">;

/** A project entry plus the fields the helpers in `projects.ts` work on. */
export interface LocalizedProject extends ProjectSummary {
  locale: Locale;
  entry: ProjectEntry;
}

/** All projects of a locale, in display order. */
export async function getProjects(locale: Locale): Promise<LocalizedProject[]> {
  const entries = await getCollection("projects");
  const projects = entries
    .map((entry): LocalizedProject => {
      const { locale: entryLocale, slug } = parseProjectId(entry.id);
      const { group, order, title, type, location, year, course } = entry.data;
      return { locale: entryLocale, slug, group, order, title, type, location, year, course, entry };
    })
    .filter((project) => project.locale === locale);
  return sortProjects(projects);
}
