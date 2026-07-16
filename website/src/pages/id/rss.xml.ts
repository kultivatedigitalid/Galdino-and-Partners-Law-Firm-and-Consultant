import rss from '@astrojs/rss';
import { getPublishedPosts, postUrl } from '../../utils/blog';

export async function GET(context: { site?: URL }) {
  const posts = await getPublishedPosts('id');
  return rss({
    title: 'Insight Galdino & Partner',
    description: 'Insight hukum, perizinan, dan kepatuhan bisnis.',
    site: context.site!,
    items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.publishDate, link: postUrl(post) })),
    customData: '<language>id-ID</language>',
  });
}
