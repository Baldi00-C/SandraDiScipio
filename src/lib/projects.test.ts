import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { locales } from "../i18n/config";
import {
  galleryRows,
  nextProject,
  parseProjectId,
  projectDetails,
  sectionNumber,
  sortProjects,
  type ProjectSummary,
} from "./projects";

const project = (overrides: Partial<ProjectSummary>): ProjectSummary => ({
  slug: "villa",
  group: "professional",
  order: 1,
  title: "Villa",
  year: "2020",
  ...overrides,
});

describe("parseProjectId", () => {
  it("reads locale and slug from the file path", () => {
    expect(parseProjectId("it/villa-castana-pavia")).toEqual({ locale: "it", slug: "villa-castana-pavia" });
  });

  it("rejects files outside a locale folder", () => {
    expect(() => parseProjectId("villa-castana-pavia")).toThrow();
    expect(() => parseProjectId("fr/villa")).toThrow();
    expect(() => parseProjectId("it/2024/villa")).toThrow();
  });
});

describe("sortProjects", () => {
  it("orders by `order`, then by title, without changing the input", () => {
    const input = [
      project({ slug: "c", order: 2, title: "Caracas" }),
      project({ slug: "b", order: 1, title: "Milano" }),
      project({ slug: "a", order: 1, title: "Castana" }),
    ];
    expect(sortProjects(input).map((item) => item.slug)).toEqual(["a", "b", "c"]);
    expect(input[0].slug).toBe("c");
  });
});

describe("nextProject", () => {
  const projects = [
    project({ slug: "one", order: 1 }),
    project({ slug: "two", order: 2 }),
    project({ slug: "three", order: 3 }),
    project({ slug: "uni", group: "university", order: 1 }),
  ];

  it("returns the following project of the same group", () => {
    expect(nextProject(projects, projects[0])?.slug).toBe("two");
  });

  it("starts again from the first after the last one", () => {
    expect(nextProject(projects, projects[2])?.slug).toBe("one");
  });

  it("returns nothing when the group has a single project", () => {
    expect(nextProject(projects, projects[3])).toBeUndefined();
  });
});

describe("projectDetails", () => {
  it("shows type, place and year of a professional project", () => {
    expect(
      projectDetails({ group: "professional", type: "Interior design", location: "Caracas, Venezuela", year: "2019" })
    ).toBe("Interior design · Caracas, Venezuela, 2019");
  });

  it("shows course and year of a university project", () => {
    expect(projectDetails({ group: "university", course: "[Corso]", year: "[anno]" })).toBe("[Corso] · [anno]");
  });

  it("skips missing details", () => {
    expect(projectDetails({ group: "professional", year: "2024" })).toBe("2024");
  });
});

describe("sectionNumber", () => {
  it("pads to two digits", () => {
    expect(sectionNumber(0)).toBe("01");
    expect(sectionNumber(11)).toBe("12");
  });
});

describe("galleryRows", () => {
  it("gives 8 columns to a photo and 4 to a drawing next to it", () => {
    const rows = galleryRows([{ kind: "render" }, { kind: "plan" }]);
    expect(rows.map((row) => row.map((cell) => cell.span))).toEqual([[8, 4]]);
  });

  it("splits two images of the same nature in half and a lone image full width", () => {
    const rows = galleryRows([{ kind: "plan" }, { kind: "concept" }, { kind: "photo" }]);
    expect(rows.map((row) => row.map((cell) => cell.span))).toEqual([[6, 6], [12]]);
  });
});

describe("projects collection files", () => {
  const root = join(process.cwd(), "src/content/projects");
  const slugsOf = (locale: string) =>
    readdirSync(join(root, locale))
      .filter((file) => file.endsWith(".md"))
      .sort();
  /** Lines that must not change between translations: group, order, images. */
  const sharedLines = (locale: string, file: string) =>
    readFileSync(join(root, locale, file), "utf8")
      .split("\n")
      .filter((line) => /^\s*(group|order|placeholder|year|kind):|src:/.test(line));

  it("has the same projects in every locale (D-021, D-084)", () => {
    for (const locale of locales) {
      expect(slugsOf(locale)).toEqual(slugsOf("it"));
    }
  });

  it("keeps group, order, year and images identical across translations", () => {
    for (const file of slugsOf("it")) {
      for (const locale of locales) {
        if (file.includes("universitario")) continue; // placeholder: year is a translated "[anno]"
        expect(sharedLines(locale, file), `${locale}/${file}`).toEqual(sharedLines("it", file));
      }
    }
  });
});
