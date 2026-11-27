import { describe, expect, it } from "vitest";

import {
  addFiles,
  attachmentLimits,
  fitWithin,
  formatBytes,
  isAcceptedFile,
  reducedName,
  shouldShrink,
} from "./attachments";
import {
  fill,
  isPhoneRequired,
  linkLabel,
  normalizeLink,
  pathFromHash,
  questionnaires,
  stepCount,
  type QuoteField,
} from "./quote";

const allFields = (path: "turnkey" | "design"): QuoteField[] =>
  questionnaires[path].screens.flatMap((screen) => screen.fields);

describe("questionnaires", () => {
  it("Chiavi in mano has 14 screens in 4 chapters, privacy on the summary (D-097)", () => {
    const { chapters, screens } = questionnaires.turnkey;
    expect(chapters).toHaveLength(4);
    expect(stepCount("turnkey")).toBe(14);
    expect(new Set(screens.map((screen) => screen.chapter))).toEqual(new Set([0, 1, 2, 3]));
  });

  it("Solo progetto has 7 screens and 4 required answers (D-098)", () => {
    expect(stepCount("design")).toBe(7);
    const required = allFields("design")
      .filter((field) => field.required)
      .map((field) => field.name);
    expect(required).toEqual(["spaceType", "rooms", "designTiming", "contact"]);
  });

  it("both paths share the moodboard and end with the contact details (D-099)", () => {
    for (const path of ["turnkey", "design"] as const) {
      const screens = questionnaires[path].screens;
      expect(screens.some((screen) => screen.fields.some((field) => field.kind === "moodboard"))).toBe(true);
      expect(screens.at(-1)?.fields[0]?.kind).toBe("contact");
    }
  });

  it("uses unique field names inside each form", () => {
    for (const path of ["turnkey", "design"] as const) {
      const names = allFields(path).map((field) => field.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("lists exclusive options among the options of their field", () => {
    for (const field of [...allFields("turnkey"), ...allFields("design")]) {
      for (const option of field.exclusive ?? []) expect(field.options).toContain(option);
    }
  });

  it("keeps chapters in order", () => {
    for (const path of ["turnkey", "design"] as const) {
      const chapters = questionnaires[path].screens.map((screen) => screen.chapter);
      expect(chapters).toEqual([...chapters].sort((a, b) => a - b));
    }
  });
});

describe("pathFromHash", () => {
  it("opens the path of the Services anchors", () => {
    expect(pathFromHash("#turnkey")).toBe("turnkey");
    expect(pathFromHash("#design")).toBe("design");
  });

  it("returns null for the choice screen and unknown anchors", () => {
    expect(pathFromHash("")).toBeNull();
    expect(pathFromHash("#main")).toBeNull();
  });
});

describe("isPhoneRequired", () => {
  it("asks for the phone only for phone and WhatsApp contacts", () => {
    expect(isPhoneRequired("phone")).toBe(true);
    expect(isPhoneRequired("whatsapp")).toBe(true);
    expect(isPhoneRequired("email")).toBe(false);
    expect(isPhoneRequired(null)).toBe(false);
  });
});

describe("normalizeLink", () => {
  it("adds https to a bare address", () => {
    expect(normalizeLink(" pinterest.com/anna/casa ")).toBe("https://pinterest.com/anna/casa");
  });

  it("keeps http and https links", () => {
    expect(normalizeLink("https://www.instagram.com/p/abc/")).toBe("https://www.instagram.com/p/abc/");
    expect(normalizeLink("http://example.org")).toBe("http://example.org/");
  });

  it("refuses text that is not a web link", () => {
    expect(normalizeLink("")).toBeNull();
    expect(normalizeLink("la mia bacheca")).toBeNull();
    expect(normalizeLink("javascript:alert(1)")).toBeNull();
    expect(normalizeLink("localhost")).toBeNull();
  });
});

describe("linkLabel", () => {
  it("shows host and path without www", () => {
    expect(linkLabel("https://www.pinterest.com/anna/casa/")).toBe("pinterest.com/anna/casa/");
  });

  it("shortens long links", () => {
    const label = linkLabel(`https://example.org/${"a".repeat(80)}`, 20);
    expect(label).toHaveLength(20);
    expect(label.endsWith("…")).toBe(true);
  });
});

describe("fill", () => {
  it("replaces known placeholders and keeps the others", () => {
    expect(fill("Passo {n} di {total} {x}", { n: 2, total: 7 })).toBe("Passo 2 di 7 {x}");
  });
});

const file = (name: string, megabytes: number, type = "") => ({ name, size: megabytes * 1024 * 1024, type });

describe("attachments", () => {
  it("accepts JPG, PNG, HEIC, WebP and PDF by extension", () => {
    expect(isAcceptedFile(file("pianta.PDF", 1))).toBe(true);
    expect(isAcceptedFile(file("IMG_0001.heic", 1))).toBe(true);
    expect(isAcceptedFile(file("moodboard.docx", 1))).toBe(false);
    expect(isAcceptedFile(file("senza-estensione", 1))).toBe(false);
  });

  it("keeps at most 5 files", () => {
    const current = [file("1.jpg", 1), file("2.jpg", 1), file("3.jpg", 1), file("4.jpg", 1)];
    const result = addFiles(current, [file("5.jpg", 1), file("6.jpg", 1)]);
    expect(result.accepted.map((item) => item.name)).toEqual(["5.jpg"]);
    expect(result.rejected).toEqual([{ file: file("6.jpg", 1), reason: "count" }]);
  });

  it("keeps the total within 20 MB, file by file", () => {
    const result = addFiles([file("a.pdf", 12)], [file("b.pdf", 9), file("c.pdf", 8)]);
    expect(result.accepted.map((item) => item.name)).toEqual(["c.pdf"]);
    expect(result.rejected).toEqual([{ file: file("b.pdf", 9), reason: "size" }]);
  });

  it("accepts exactly 20 MB", () => {
    expect(addFiles([], [file("a.pdf", 20)]).accepted).toHaveLength(1);
    expect(attachmentLimits.maxTotalBytes).toBe(20 * 1024 * 1024);
  });

  it("refuses unknown formats before counting them", () => {
    const result = addFiles([], [file("a.zip", 1), file("b.png", 1)]);
    expect(result.rejected[0]?.reason).toBe("type");
    expect(result.accepted).toHaveLength(1);
  });

  it("reduces only heavy photos", () => {
    expect(shouldShrink(file("foto.jpg", 4))).toBe(true);
    expect(shouldShrink(file("foto.heic", 3))).toBe(true);
    expect(shouldShrink(file("foto.jpg", 1))).toBe(false);
    expect(shouldShrink(file("pianta.pdf", 8))).toBe(false);
  });

  it("fits a photo within 2560 px on the longest side", () => {
    expect(fitWithin(4032, 3024)).toEqual({ width: 2560, height: 1920 });
    expect(fitWithin(3024, 4032)).toEqual({ width: 1920, height: 2560 });
    expect(fitWithin(1200, 800)).toEqual({ width: 1200, height: 800 });
  });

  it("renames a reduced photo to JPG", () => {
    expect(reducedName("IMG_0001.HEIC")).toBe("IMG_0001.jpg");
    expect(reducedName("foto")).toBe("foto.jpg");
  });

  it("formats sizes with the decimal separator of the locale", () => {
    expect(formatBytes(850 * 1024, "it")).toBe("850 KB");
    expect(formatBytes(3.24 * 1024 * 1024, "it")).toBe("3,2 MB");
    expect(formatBytes(3.24 * 1024 * 1024, "en")).toBe("3.2 MB");
  });
});
