/**
 * The four services of the Services page (REQ-SERV-1, D-094) and the quote
 * path each one leads to (REQ-SERV-2): design-only services go to "Solo
 * progetto", services that reach the finished work go to "Chiavi in mano".
 */
export const quotePaths = ["turnkey", "design"] as const;
export type QuotePath = (typeof quotePaths)[number];

export const services = [
  { id: "architecture", number: 1, quotePath: "design" },
  { id: "interior", number: 2, quotePath: "design" },
  { id: "renovation", number: 3, quotePath: "turnkey" },
  { id: "furnishing", number: 4, quotePath: "turnkey" },
] as const satisfies readonly { id: string; number: 1 | 2 | 3 | 4; quotePath: QuotePath }[];

/** Link to a quote path: the quote page plus the path anchor, e.g. `/it/preventivatore/#turnkey`. */
export function quoteHref(quotePage: string, path: QuotePath): string {
  return `${quotePage}#${path}`;
}
