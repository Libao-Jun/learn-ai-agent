import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allPosts = await getCollection('blog');

  // 正式环境过滤草稿，开发环境全部可见
  const posts = import.meta.env.PROD
    ? allPosts.filter((post) => !post.data.draft)
    : allPosts;

  // 按日期降序排列（最新在前）
  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return rss({
    title: 'Learn AI Agent',
    description: '个人博客，记录 AI Agent 学习与思考。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags || [],
    })),
    customData: [
      '<language>zh-CN</language>',
      '<copyright>Learn AI Agent</copyright>',
      '<generator>Astro</generator>',
      '<docs>https://www.rssboard.org/rss-specification</docs>',
    ].join('\n    '),
  });
}
