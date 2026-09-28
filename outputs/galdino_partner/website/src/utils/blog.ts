import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../data/site';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedPosts(locale: Locale) {
  const posts = await getCollection('blog', ({ data }) => data.locale === locale && !data.draft);
  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function postSlug(post: BlogEntry) {
  return post.id.replace(/^(id|en)\//, '').replace(/\.md$/, '');
}

export function postUrl(post: BlogEntry) {
  return `/${post.data.locale}/blog/${postSlug(post)}/`;
}
