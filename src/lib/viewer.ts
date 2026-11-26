/** Pure helpers of the image viewer (D-073). */

/** Index after moving by `step`, wrapping around the ends. */
export function wrapIndex(index: number, step: number, total: number): number {
  if (total <= 0) return 0;
  return (((index + step) % total) + total) % total;
}

/** "3 di 7" from the translated template "{current} di {total}". */
export function formatCounter(template: string, index: number, total: number): string {
  return template.replace("{current}", String(index + 1)).replace("{total}", String(total));
}
