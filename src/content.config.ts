import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { projectGroups, projectImageKinds } from "./lib/projects";

/**
 * Portfolio projects (D-021): one Markdown file per project and per locale,
 * in `src/content/projects/<locale>/<slug>.md`. The slug is the same in every
 * locale (D-084). Images live in `src/assets/projects/<slug>/` and are shared
 * by the three locales; only alt texts and captions are translated.
 */
const projects = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => {
    const projectImage = z.object({
      src: image(),
      alt: z.string().min(5),
      /** Short text under the image; the alt text is used when missing. */
      caption: z.string().optional(),
      /** Plans and concept boards are shown whole on white (D-072). */
      kind: z.enum(projectImageKinds).default("photo"),
    });

    return z
      .object({
        /** Professional = completed, university = not completed (REQ-PROG-1, D-071). */
        group: z.enum(projectGroups),
        /** Evident placeholder until the real material arrives (D-013). */
        placeholder: z.boolean().default(false),
        order: z.number().int().default(99),
        title: z.string().min(3),
        /** One line under the title and on the card. */
        lead: z.string().min(10).max(220),
        /** Professional projects: type of work, place, surface area. */
        type: z.string().optional(),
        location: z.string().optional(),
        area: z.string().optional(),
        /** University projects: course (REQ-PROG-2). */
        course: z.string().optional(),
        year: z.string(),
        cover: projectImage.optional(),
        /** Image of the project card and of "Next project", when it differs from the cover. */
        thumbnail: projectImage.optional(),
        solutions: z.array(z.string()).default([]),
        /** 01 Project: renders, plans, concept (digital part, REQ-PROG-3). */
        digital: z.array(projectImage).default([]),
        /** 02 Before and after, side by side (REQ-PROG-4, D-072). */
        beforeAfter: z.array(z.object({ label: z.string(), before: projectImage, after: projectImage })).default([]),
        /** 03 Realisation: real photos of the finished work (REQ-PROG-3). */
        interior: z.array(projectImage).default([]),
        /** University projects: boards, renders and concepts (REQ-PROG-2). */
        boards: z.array(projectImage).default([]),
        seoDescription: z.string().max(170).optional(),
      })
      .refine((project) => project.group === "university" || project.placeholder || project.cover, {
        message: "Professional projects need a cover image",
        path: ["cover"],
      });
  },
});

export const collections = { projects };
