import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectCategories } from './data/site';

/**
 * Progetti del portfolio.
 * Ogni file .md in src/content/projects/ è un progetto; le immagini stanno in
 * src/assets/projects/<slug>/ e vengono ottimizzate in build da astro:assets.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3),
      /** Riga breve per card e slider. */
      excerpt: z.string().min(10).max(220),
      category: z.enum(projectCategories),
      location: z.string(),
      year: z.number().int().min(2000).max(2100),
      area: z.string().optional(),
      client: z.string().optional(),
      order: z.number().int().default(99),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      cover: image(),
      coverAlt: z.string().min(5),
      /** Seconda immagine (verticale) usata nello slider della home. */
      detail: image().optional(),
      detailAlt: z.string().optional(),
      solutions: z.array(z.string()).min(1),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(5),
            caption: z.string().optional(),
            kind: z.enum(['foto', 'render', 'pianta', 'concept']).default('foto'),
          }),
        )
        .default([]),
      beforeAfter: z
        .array(
          z.object({
            label: z.string(),
            before: image(),
            beforeAlt: z.string().min(5),
            after: image(),
            afterAlt: z.string().min(5),
          }),
        )
        .default([]),
      seoDescription: z.string().max(170).optional(),
    }),
});

export const collections = { projects };
