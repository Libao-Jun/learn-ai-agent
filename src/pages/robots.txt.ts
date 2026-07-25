import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/+$/, '') ?? '';
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${origin}${base}/sitemap-index.xml`,
    // `Sitemap: http://localhost:4321/sitemap-index.xml`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain' },
  });
};
