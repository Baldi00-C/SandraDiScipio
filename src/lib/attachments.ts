/**
 * Attachment rules of the quote builder (REQ-PREV-3, D-015, D-069, T-08.6):
 * at most 5 files and 20 MB in all, JPG, PNG, HEIC, WebP or PDF. Large photos
 * are reduced in the browser before the check, so a phone photo fits.
 */

export const attachmentLimits = {
  maxFiles: 5,
  maxTotalBytes: 20 * 1024 * 1024,
  /** Longest side of a reduced photo, in pixels. */
  maxImageSide: 2560,
  /** Photos lighter than this are sent as they are. */
  shrinkAboveBytes: 1.5 * 1024 * 1024,
  jpegQuality: 0.82,
} as const;

export const acceptedExtensions = ["jpg", "jpeg", "png", "heic", "heif", "webp", "pdf"] as const;

/** Value of the `accept` attribute of the file inputs. */
export const acceptAttribute = [
  ...acceptedExtensions.map((extension) => `.${extension}`),
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
  "application/pdf",
].join(",");

export interface FileLike {
  name: string;
  size: number;
  type: string;
}

export type RejectReason = "type" | "count" | "size";

export interface AddResult<T extends FileLike> {
  accepted: T[];
  rejected: { file: T; reason: RejectReason }[];
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

/** True for the accepted formats. HEIC files often have an empty MIME type, so the extension decides. */
export function isAcceptedFile(file: Pick<FileLike, "name" | "type">): boolean {
  return (acceptedExtensions as readonly string[]).includes(extensionOf(file.name));
}

/**
 * Adds files to those already chosen in the form, in order, keeping the
 * limits: a file is refused for its format, for the count or for the total size.
 */
export function addFiles<T extends FileLike>(current: readonly FileLike[], incoming: readonly T[]): AddResult<T> {
  const result: AddResult<T> = { accepted: [], rejected: [] };
  let count = current.length;
  let total = current.reduce((sum, file) => sum + file.size, 0);
  for (const file of incoming) {
    if (!isAcceptedFile(file)) {
      result.rejected.push({ file, reason: "type" });
    } else if (count >= attachmentLimits.maxFiles) {
      result.rejected.push({ file, reason: "count" });
    } else if (total + file.size > attachmentLimits.maxTotalBytes) {
      result.rejected.push({ file, reason: "size" });
    } else {
      result.accepted.push(file);
      count += 1;
      total += file.size;
    }
  }
  return result;
}

/** Size that fits a picture within `max` pixels on its longest side, keeping the proportions. */
export function fitWithin(width: number, height: number, max: number = attachmentLimits.maxImageSide) {
  const longest = Math.max(width, height);
  if (longest <= max) return { width, height };
  const ratio = max / longest;
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) };
}

/** True when a file is a photo worth reducing before upload. */
export function shouldShrink(file: Pick<FileLike, "name" | "size">): boolean {
  const extension = extensionOf(file.name);
  const photo = ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(extension);
  return photo && file.size > attachmentLimits.shrinkAboveBytes;
}

/** Name of a reduced photo: same base name, `.jpg` extension. */
export function reducedName(name: string): string {
  const dot = name.lastIndexOf(".");
  return `${dot === -1 ? name : name.slice(0, dot)}.jpg`;
}

/** File size for people: "850 KB", "3,2 MB" (decimal separator of the locale). */
export function formatBytes(bytes: number, locale: string): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  const megabytes = bytes / (1024 * 1024);
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(megabytes)} MB`;
}
