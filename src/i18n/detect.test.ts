import { describe, expect, it } from "vitest";

import { localeCookie, matchBrowserLocale, pickLocale, readSavedLocale } from "./detect";

describe("readSavedLocale", () => {
  it("reads a supported locale from the cookie string", () => {
    expect(readSavedLocale("theme=dark; locale=es; other=1")).toBe("es");
  });

  it("ignores missing, empty or unsupported values", () => {
    expect(readSavedLocale(undefined)).toBeUndefined();
    expect(readSavedLocale("")).toBeUndefined();
    expect(readSavedLocale("locale=fr")).toBeUndefined();
    expect(readSavedLocale("mylocale=it")).toBeUndefined();
  });

  it("round-trips the cookie it writes", () => {
    const [pair] = localeCookie("it").split(";");
    expect(readSavedLocale(pair)).toBe("it");
  });
});

describe("matchBrowserLocale", () => {
  it("matches regional variants by their primary language", () => {
    expect(matchBrowserLocale(["es-AR", "en"])).toBe("es");
    expect(matchBrowserLocale(["IT-it"])).toBe("it");
  });

  it("skips unsupported languages and keeps the preference order", () => {
    expect(matchBrowserLocale(["fr-FR", "de", "it", "en"])).toBe("it");
  });

  it("returns undefined when nothing matches", () => {
    expect(matchBrowserLocale(["fr", "de"])).toBeUndefined();
    expect(matchBrowserLocale([])).toBeUndefined();
  });
});

describe("pickLocale", () => {
  it("prefers the remembered choice over the browser", () => {
    expect(pickLocale({ saved: "it", browserLanguages: ["es"] })).toBe("it");
  });

  it("uses the browser language when nothing is remembered", () => {
    expect(pickLocale({ browserLanguages: ["es-ES"] })).toBe("es");
  });

  it("falls back to English", () => {
    expect(pickLocale({ browserLanguages: ["fr"] })).toBe("en");
  });
});
