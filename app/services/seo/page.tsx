import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Management',
  description: 'Technical and strategic search engine optimisation focused on pages that convert, not vanity traffic.',
};

export default function SeoPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#book';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO Management',
    description:
      'Search engine optimisation services that combine technical fixes, content strategy and off‑page signals to grow organic revenue.',
    provider: {
      '@type': 'Organization',
      name: 'VividReach',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vividreach.vercel.app',
    },
  };
  return (
    <main className="px-4 py-16 max-w-5xl mx-auto">
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify(serviceSchema)}</script>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">SEO Management</h1>
      <p className="text-lg text-gray-300 mb-8">
        We unlock organic growth by fixing technical issues, crafting content that ranks and converts, and acquiring the right links. Our focus is on the pages that generate pipeline — not vanity traffic.
      </p>
      <h2 className="text-2xl font-bold mb-4">What we do</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-300 mb-8">
        <li>Technical audits, crawling and indexability fixes.</li>
        <li>Keyword & intent research aligned to revenue goals.</li>
        <li>Content planning and briefing for high‑intent pages.</li>
        <li>On‑page optimisation: metadata, internal linking and schema.</li>
        <li>Authority building through ethical link outreach and digital PR.</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a href={calendly} className="btn-primary">Book Strategy Call</a>
        <a href="/contact" className="btn-secondary">Get Free Audit</a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Common questions</h2>
      <div className="space-y-4 text-gray-300">
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">How long does SEO take?</summary>
          <p className="mt-2">SEO is a medium‑term channel. Many clients see traction in 3–6 months but sustainable growth compounds over years. We prioritise quick wins but build for the long term.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">Do you write the content?</summary>
          <p className="mt-2">We can provide detailed briefs for your writers or source freelance copywriters. Our focus is ensuring the right topics and structure to rank and convert.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">How do you build links?</summary>
          <p className="mt-2">We use a mix of digital PR, guest posting and strategic outreach to earn authoritative links. We do not buy or spam links.</p>
        </details>
      </div>
    </main>
  );
}