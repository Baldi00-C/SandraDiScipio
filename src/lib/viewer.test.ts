import { describe, expect, it } from "vitest";

import { formatCounter, wrapIndex } from "./viewer";

describe("wrapIndex", () => {
  it("moves forward and back", () => {
    expect(wrapIndex(2, 1, 7)).toBe(3);
    expect(wrapIndex(2, -1, 7)).toBe(1);
  });

  it("wraps around the ends", () => {
    expect(wrapIndex(6, 1, 7)).toBe(0);
    expect(wrapIndex(0, -1, 7)).toBe(6);
  });

  it("stays at zero without images", () => {
    expect(wrapIndex(0, 1, 0)).toBe(0);
  });
});

describe("formatCounter", () => {
  it("fills the translated template with a 1-based position", () => {
    expect(formatCounter("{current} di {total}", 2, 7)).toBe("3 di 7");
    expect(formatCounter("{current} of {total}", 0, 1)).toBe("1 of 1");
  });
});
