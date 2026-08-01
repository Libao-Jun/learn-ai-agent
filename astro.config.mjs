import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkDirective from 'remark-directive';
import remarkCallout from './src/plugins/remark-callout.mjs';

export default defineConfig({
  site: 'https://libao-jun.github.io',
  base: process.env.NODE_ENV === 'production' ? '/learn-ai-agent/' : '/',
  integrations: [sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallout],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
