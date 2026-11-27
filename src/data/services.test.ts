import { describe, expect, it } from "vitest";

import { quoteHref, services } from "./services";

describe("services", () => {
  it("lists the four services in the order of the page", () => {
    expect(services.map((service) => service.number)).toEqual([1, 2, 3, 4]);
  });

  it("send design services to Solo progetto and the others to Chiavi in mano (D-094)", () => {
    expect(Object.fromEntries(services.map((service) => [service.id, service.quotePath]))).toEqual({
      architecture: "design",
      interior: "design",
      renovation: "turnkey",
      furnishing: "turnkey",
    });
  });
});

describe("quoteHref", () => {
  it("adds the path anchor to the quote page", () => {
    expect(quoteHref("/it/preventivatore/", "turnkey")).toBe("/it/preventivatore/#turnkey");
  });
});
