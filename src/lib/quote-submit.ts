/**
 * Sending a quote request. The endpoint (email to Sandra and copy to the
 * visitor with Resend, D-009, D-014) arrives with T-05.3 and the anti-spam
 * check with T-05.4: until `PUBLIC_QUOTE_ENDPOINT` is set, the request is not
 * sent and the result says so (`dryRun`), so the page can tell the visitor.
 *
 * Payload (multipart/form-data): `path` (turnkey | design), `locale`, every
 * answer under its field name (repeated for multiple choices and links),
 * `privacy=accepted` and the files under `attachments` and `referenceFiles`.
 */

export interface SubmitResult {
  ok: boolean;
  /** True when no endpoint is configured and nothing was sent. */
  dryRun: boolean;
}

type Fetcher = (input: string, init: RequestInit) => Promise<Pick<Response, "ok">>;

const configuredEndpoint: string = (import.meta.env.PUBLIC_QUOTE_ENDPOINT as string | undefined) ?? "";

export async function submitQuote(
  data: FormData,
  endpoint: string = configuredEndpoint,
  fetcher: Fetcher = (input, init) => fetch(input, init)
): Promise<SubmitResult> {
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { ok: true, dryRun: true };
  }
  try {
    const response = await fetcher(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    return { ok: response.ok, dryRun: false };
  } catch {
    return { ok: false, dryRun: false };
  }
}
