import { describe, expect, it } from "vitest";

import { defaultLocale, isLocale, locales } from "./config";
import { routeLabels } from "./labels";
import { alternatesFor, mainNav, pathFor, placeholderPages, routes, type RouteKey } from "./routes";
import { en } from "./ui/en";
import { es } from "./ui/es";
import { it as itUi } from "./ui/it";

describe("pathFor", () => {
  it("returns the locale home with a trailing slash", () => {
    expect(pathFor("home", "it")).toBe("/it/");
    expect(pathFor("home", "en")).toBe("/en/");
    expect(pathFor("home", "es")).toBe("/es/");
  });

  it("uses the translated slug of each locale", () => {
    expect(pathFor("about", "it")).toBe("/it/chi-sono/");
    expect(pathFor("about", "en")).toBe("/en/about/");
    expect(pathFor("quote", "es")).toBe("/es/presupuesto/");
  });

  it("adds a page below the route with the same slug in every locale (D-084)", () => {
    expect(pathFor("projects", "it", "villa-castana-pavia")).toBe("/it/progetti/villa-castana-pavia/");
    expect(pathFor("projects", "es", "villa-castana-pavia")).toBe("/es/proyectos/villa-castana-pavia/");
  });
});

describe("routes", () => {
  const keys = Object.keys(routes) as RouteKey[];

  it("have URL-safe slugs, unique within each locale", () => {
    for (const locale of locales) {
      const slugs = keys.map((key) => routes[key][locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^([a-z0-9]+(-[a-z0-9]+)*)?$/);
    }
  });

  it("list the 6 menu entries in the order of D-062", () => {
    expect(mainNav).toEqual(["home", "about", "services", "projects", "quote", "contact"]);
  });

  it("never use a placeholder for the home page", () => {
    expect(placeholderPages).not.toContain("home");
  });

  it("have a label in every locale", () => {
    for (const key of keys) {
      for (const dictionary of [itUi, en, es]) expect(dictionary[routeLabels[key]]).toBeTruthy();
    }
  });
});

describe("alternatesFor", () => {
  it("lists every locale plus x-default pointing to English", () => {
    const alternates = alternatesFor("home");
    expect(alternates.map((alternate) => alternate.hreflang)).toEqual([...locales, "x-default"]);
    expect(alternates.at(-1)?.path).toBe(pathFor("home", "en"));
    expect(defaultLocale).toBe("en");
  });

  it("keeps the subpath in every alternate", () => {
    const alternates = alternatesFor("projects", "villa");
    expect(alternates.map((alternate) => alternate.path)).toEqual([
      "/it/progetti/villa/",
      "/en/projects/villa/",
      "/es/proyectos/villa/",
      "/en/projects/villa/",
    ]);
  });
});

describe("isLocale", () => {
  it("accepts only supported locales", () => {
    expect(isLocale("it")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe("UI dictionaries", () => {
  it("have the same keys in every locale", () => {
    const keys = Object.keys(itUi).sort();
    expect(Object.keys(en).sort()).toEqual(keys);
    expect(Object.keys(es).sort()).toEqual(keys);
  });
});
