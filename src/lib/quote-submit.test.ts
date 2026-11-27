import { describe, expect, it, vi } from "vitest";

import { submitQuote } from "./quote-submit";

describe("submitQuote", () => {
  it("sends nothing and reports a dry run without an endpoint", async () => {
    const fetcher = vi.fn();
    const result = await submitQuote(new FormData(), "", fetcher);
    expect(result).toEqual({ ok: true, dryRun: true });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("posts the form data to the endpoint", async () => {
    const data = new FormData();
    data.append("path", "turnkey");
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    const result = await submitQuote(data, "https://example.org/api/quote", fetcher);
    expect(result).toEqual({ ok: true, dryRun: false });
    expect(fetcher).toHaveBeenCalledWith(
      "https://example.org/api/quote",
      expect.objectContaining({ method: "POST", body: data })
    );
  });

  it("reports a failure when the endpoint answers with an error", async () => {
    const result = await submitQuote(new FormData(), "https://example.org/api/quote", async () => ({ ok: false }));
    expect(result).toEqual({ ok: false, dryRun: false });
  });

  it("reports a failure when the network is down", async () => {
    const result = await submitQuote(new FormData(), "https://example.org/api/quote", async () => {
      throw new Error("offline");
    });
    expect(result).toEqual({ ok: false, dryRun: false });
  });
});
