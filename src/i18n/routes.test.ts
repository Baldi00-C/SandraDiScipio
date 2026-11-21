import { describe, expect, it } from "vitest";

import { defaultLocale, isLocale, locales } from "./config";
import { alternatesFor, pathFor } from "./routes";
import { en } from "./ui/en";
import { es } from "./ui/es";
import { it as itUi } from "./ui/it";

describe("pathFor", () => {
  it("returns the locale home with a trailing slash", () => {
    expect(pathFor("home", "it")).toBe("/it/");
    expect(pathFor("home", "en")).toBe("/en/");
    expect(pathFor("home", "es")).toBe("/es/");
  });
});

describe("alternatesFor", () => {
  it("lists every locale plus x-default pointing to English", () => {
    const alternates = alternatesFor("home");
    expect(alternates.map((alternate) => alternate.hreflang)).toEqual([...locales, "x-default"]);
    expect(alternates.at(-1)?.path).toBe(pathFor("home", "en"));
    expect(defaultLocale).toBe("en");
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
