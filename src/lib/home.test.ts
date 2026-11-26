import { describe, expect, it } from "vitest";

import { detailImage, featuredProjects, slideCounter } from "./home";

const project = (
  title: string,
  order: number,
  group: "professional" | "university" = "professional",
  placeholder = false
) => ({
  title,
  order,
  group,
  placeholder,
});

describe("featuredProjects", () => {
  it("keeps professional projects with real material, in order", () => {
    const result = featuredProjects([
      project("Caracas", 3),
      project("University", 1, "university"),
      project("Castana", 1),
      project("Coming soon", 2, "professional", true),
      project("Milano", 2),
    ]);
    expect(result.map((item) => item.title)).toEqual(["Castana", "Milano", "Caracas"]);
  });

  it("returns an empty list when there is nothing to show", () => {
    expect(featuredProjects([project("University", 1, "university")])).toEqual([]);
  });
});

describe("detailImage", () => {
  const cover = { src: "cover.jpg", alt: "Cover", kind: "render" as const };

  it("prefers the first photo of the realisation", () => {
    const interior = [{ src: "photo.jpg", alt: "Photo", kind: "photo" as const }];
    const digital = [{ src: "render.jpg", alt: "Render", kind: "render" as const }];
    expect(detailImage(cover, [interior, digital])?.src).toBe("photo.jpg");
  });

  it("skips the cover, plans and concept boards", () => {
    const digital = [
      { src: "cover.jpg", alt: "Cover", kind: "render" as const },
      { src: "plan.jpg", alt: "Plan", kind: "plan" as const },
      { src: "concept.jpg", alt: "Concept", kind: "concept" as const },
      { src: "side.jpg", alt: "Side", kind: "render" as const },
    ];
    expect(detailImage(cover, [[], digital])?.src).toBe("side.jpg");
  });

  it("returns nothing when only drawings are left", () => {
    expect(detailImage(cover, [[{ src: "plan.jpg", alt: "Plan", kind: "plan" as const }]])).toBeUndefined();
  });
});

describe("slideCounter", () => {
  it("pads both numbers to two digits", () => {
    expect(slideCounter(0, 3)).toBe("01 / 03");
    expect(slideCounter(9, 12)).toBe("10 / 12");
  });
});
