import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../site.config';

export async function GET(context) {
  const allPosts = await getCollection('blog');

  // 正式环境过滤草稿，开发环境全部可见
  const posts = import.meta.env.PROD
    ? allPosts.filter((post) => !post.data.draft)
    : allPosts;

  // 按日期降序排列（最新在前）
  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags || [],
    })),
    customData: [
      `<language>${SITE.language}</language>`,
      `<copyright>${SITE.copyright}</copyright>`,
      '<generator>Astro</generator>',
      '<docs>https://www.rssboard.org/rss-specification</docs>',
    ].join('\n    '),
  });
}
