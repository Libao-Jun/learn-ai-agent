import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkCallout from './src/plugins/remark-callout.mjs';
import rehypeCodeBlocks from './src/plugins/rehype-code-blocks.mjs';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://libao-jun.github.io',
  base: process.env.NODE_ENV === 'production' ? '/learn-ai-agent/' : '/',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap(), 
    mdx(),
    mermaid({
      theme: 'forest',
      autoTheme: true
    })
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDirective, remarkCallout],
      rehypePlugins: [rehypeCodeBlocks],
    }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
