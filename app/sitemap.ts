import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://vividreach.vercel.app';
  const paths = [
    '/',
    '/services',
    '/services/ppc',
    '/services/seo',
    '/services/cro',
    '/about',
    '/contact',
    '/case-studies',
    '/privacy',
    '/terms',
  ];
  const urls = paths
    .map((p) => `<url><loc>${base}${p}</loc><changefreq>monthly</changefreq></url>`) // monthly by default
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}