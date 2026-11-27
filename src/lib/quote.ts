/**
 * Quote builder questionnaires (S-08, docs/03-preventivatore.md, D-095 → D-100).
 * Pure data and helpers shared by the page, the browser script and the tests.
 * Visitor-facing texts live in `src/i18n/quote/`, keyed by the ids below.
 */
import type { QuotePath } from "../data/services";

export type { QuotePath } from "../data/services";
export { quotePaths } from "../data/services";

export type FieldKind =
  "single" | "multi" | "text" | "number" | "textarea" | "counter" | "moodboard" | "files" | "contact";

export interface QuoteField {
  /** Form field name, also the key of the field texts. */
  name: string;
  kind: FieldKind;
  required?: boolean;
  /** Option ids of a single or multiple choice. */
  options?: readonly string[];
  /** Option cards show an icon (`QuoteIcon` names). */
  icons?: boolean;
  /** Options that clear the others when chosen ("Tutto", "Nessuno", "Non so"). */
  exclusive?: readonly string[];
  /** Ready-made openings for a free text (D-098). */
  prompts?: readonly string[];
  min?: number;
  max?: number;
  /** `autocomplete` of a text input. */
  autocomplete?: string;
}

export interface QuoteScreen {
  /** Screen id, also the key of the screen title. */
  id: string;
  /** Chapter index (0-based). */
  chapter: number;
  fields: readonly QuoteField[];
}

export interface Questionnaire {
  path: QuotePath;
  /** Chapter ids, in order: keys of the chapter names. */
  chapters: readonly string[];
  screens: readonly QuoteScreen[];
}

const rooms: QuoteField = {
  name: "rooms",
  kind: "multi",
  required: true,
  icons: true,
  options: ["kitchen", "living", "bedroom", "bathroom", "study", "outdoor", "whole"],
  exclusive: ["whole"],
};

const moodboard: QuoteField = { name: "moodboard", kind: "moodboard" };
const contact: QuoteField = { name: "contact", kind: "contact", required: true };

/** Chiavi in mano: 15 questions in 4 chapters (D-097). The privacy consent sits on the summary. */
const turnkey: Questionnaire = {
  path: "turnkey",
  chapters: ["property", "works", "tasteTime", "you"],
  screens: [
    {
      id: "propertyType",
      chapter: 0,
      fields: [
        {
          name: "propertyType",
          kind: "single",
          required: true,
          icons: true,
          options: ["apartment", "house", "office", "shop", "other"],
        },
      ],
    },
    {
      id: "location",
      chapter: 0,
      fields: [{ name: "location", kind: "text", required: true, autocomplete: "address-level2" }],
    },
    { id: "size", chapter: 0, fields: [{ name: "size", kind: "number", required: true, min: 1, max: 100000 }] },
    {
      id: "ownership",
      chapter: 0,
      fields: [{ name: "ownership", kind: "single", required: true, options: ["owned", "buying", "evaluating"] }],
    },
    {
      id: "intervention",
      chapter: 1,
      fields: [{ name: "intervention", kind: "single", required: true, options: ["full", "partial", "furnishing"] }],
    },
    { id: "rooms", chapter: 1, fields: [rooms] },
    {
      id: "systems",
      chapter: 1,
      fields: [
        {
          name: "systems",
          kind: "multi",
          options: ["electrical", "plumbing", "heating", "none", "unknown"],
          exclusive: ["none", "unknown"],
        },
      ],
    },
    {
      id: "furniture",
      chapter: 1,
      fields: [{ name: "furniture", kind: "single", required: true, options: ["yes", "partly", "no"] }],
    },
    { id: "moodboard", chapter: 2, fields: [moodboard] },
    {
      id: "budgetTurnkey",
      chapter: 2,
      fields: [
        {
          name: "budgetTurnkey",
          kind: "single",
          options: ["upTo30k", "from30to60k", "from60to100k", "over100k", "discuss"],
        },
      ],
    },
    {
      id: "timing",
      chapter: 2,
      fields: [
        { name: "timing", kind: "single", required: true, options: ["within6m", "from6to12m", "later", "noRush"] },
      ],
    },
    { id: "notes", chapter: 3, fields: [{ name: "notes", kind: "textarea" }] },
    { id: "attachments", chapter: 3, fields: [{ name: "attachments", kind: "files" }] },
    { id: "contact", chapter: 3, fields: [contact] },
  ],
};

/** Solo progetto: a brief with moodboard, 7 screens and 4 required answers (D-098). */
const design: Questionnaire = {
  path: "design",
  chapters: ["space", "needs", "moodboard", "timeContact"],
  screens: [
    {
      id: "space",
      chapter: 0,
      fields: [
        {
          name: "spaceType",
          kind: "single",
          required: true,
          icons: true,
          options: ["house", "office", "shop", "other"],
        },
        { name: "size", kind: "number", min: 1, max: 100000 },
      ],
    },
    { id: "rooms", chapter: 0, fields: [rooms] },
    {
      id: "needs",
      chapter: 1,
      fields: [
        { name: "needs", kind: "multi", options: ["layout", "render", "furnishings", "materials", "lighting"] },
        { name: "adults", kind: "counter", min: 0, max: 12 },
        { name: "children", kind: "counter", min: 0, max: 12 },
        { name: "pets", kind: "single", options: ["yes", "no"] },
      ],
    },
    {
      id: "story",
      chapter: 1,
      fields: [
        {
          name: "story",
          kind: "textarea",
          prompts: ["workFromHome", "cookOften", "guests", "notWorking", "mustHave", "keep"],
        },
      ],
    },
    { id: "moodboard", chapter: 2, fields: [moodboard] },
    {
      id: "timeBudget",
      chapter: 3,
      fields: [
        { name: "designTiming", kind: "single", required: true, options: ["within1m", "from1to3m", "noRush"] },
        {
          name: "budgetDesign",
          kind: "single",
          options: ["upTo20k", "from20to50k", "from50to100k", "over100k", "discuss"],
        },
        { name: "attachments", kind: "files" },
      ],
    },
    { id: "contact", chapter: 3, fields: [contact] },
  ],
};

export const questionnaires: Record<QuotePath, Questionnaire> = { turnkey, design };

/** Moodboard choices (D-099). Colors carry their swatch. */
export const moodboardOptions = {
  atmospheres: ["warm", "bright", "elegant", "natural", "industrial", "contemporary"],
  colors: [
    { id: "ivory", hex: "#f4efe6" },
    { id: "sand", hex: "#d9c7a7" },
    { id: "terracotta", hex: "#b86b4b" },
    { id: "blush", hex: "#e3c2bc" },
    { id: "sage", hex: "#9aa58a" },
    { id: "navy", hex: "#2e3a4b" },
    { id: "stone", hex: "#8e8a84" },
    { id: "black", hex: "#1d1d1b" },
  ],
  materials: ["wood", "stone", "brick", "metal", "naturalFabrics", "resin"],
} as const;

/** Contact preferences: the phone becomes required for phone and WhatsApp (D-097). */
export const contactPreferences = ["email", "phone", "whatsapp"] as const;
export type ContactPreference = (typeof contactPreferences)[number];

export function isPhoneRequired(preference: string | null | undefined): boolean {
  return preference === "phone" || preference === "whatsapp";
}

/** The path a URL hash opens (`#turnkey`, `#design`), or null for the choice screen. */
export function pathFromHash(hash: string): QuotePath | null {
  const id = hash.replace(/^#/, "");
  return id === "turnkey" || id === "design" ? id : null;
}

/** Number of screens of a path (the summary excluded). */
export function stepCount(path: QuotePath): number {
  return questionnaires[path].screens.length;
}

/**
 * Normalizes a reference link typed by the visitor (D-099): adds `https://`
 * when missing and accepts only http(s) URLs with a dotted host.
 * Returns null when the text is not a usable link.
 */
export function normalizeLink(raw: string): string | null {
  const text = raw.trim();
  if (!text || /\s/.test(text)) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.href;
  } catch {
    return null;
  }
}

/** Short label of a link for lists: host without `www.` plus the path, e.g. `pinterest.com/anna/casa`. */
export function linkLabel(href: string, max = 48): string {
  const url = new URL(href);
  const text = `${url.hostname.replace(/^www\./, "")}${url.pathname === "/" ? "" : url.pathname}`;
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** Replaces `{name}` placeholders in a dictionary text. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match: string, key: string) => (key in values ? String(values[key]) : match));
}
