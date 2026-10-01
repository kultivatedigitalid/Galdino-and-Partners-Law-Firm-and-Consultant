import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(80).max(170),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).min(1),
    featuredImage: z.string(),
    locale: z.enum(['id', 'en']),
    translationKey: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
