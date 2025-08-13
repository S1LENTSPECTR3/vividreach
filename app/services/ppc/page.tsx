import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import BrandLogo from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'PPC Management',
  description: 'Data‑driven PPC management for Google & Microsoft Ads: audits, structure, bidding and continuous experimentation.',
};

export default function PpcPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#book';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'PPC Management',
    description:
      'Comprehensive pay per click management across Google Ads, Microsoft Ads and more. We audit accounts, rebuild structure, deploy full‑funnel campaigns and iterate weekly to maximise ROI.',
    provider: {
      '@type': 'Organization',
      name: 'VividReach',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vividreach.vercel.app',
    },
  };
  return (
    <main className="px-4 py-16 max-w-5xl mx-auto">
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify(serviceSchema)}</script>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">PPC Management</h1>
      <p className="text-lg text-gray-300 mb-8">
        We manage your pay per click investments end to end — from account audit and restructure to bidding strategy and creative testing. Our approach is revenue‑centric: minimise CPA, maximise LTV.
      </p>
      <h2 className="text-2xl font-bold mb-4">What we do</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-300 mb-8">
        <li>Account audits and restructures to fix wasted spend and capture intent.</li>
        <li>Custom campaign architecture: full‑funnel, match types, negative keyword strategy.</li>
        <li>Automated bidding & budgeting tuned to profit not just conversions.</li>
        <li>Ad copywriting, extension optimisation and creative testing.</li>
        <li>Continuous experiment cadence to refine audiences, offers and landing pages.</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a href={calendly} className="btn-primary">Book Strategy Call</a>
        <a href="/contact" className="btn-secondary">Get Free Audit</a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Common questions</h2>
      <div className="space-y-4 text-gray-300">
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">How long until we see results?</summary>
          <p className="mt-2">Most accounts see significant improvements within the first 30–60 days as we restructure and implement a testing cadence. Compounding learnings drive incremental gains over time.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">Do you manage our ad creative?</summary>
          <p className="mt-2">We write ad copy and set up extensions. For visual creatives we partner with freelance designers or work with your in‑house team.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">What’s your pricing model?</summary>
          <p className="mt-2">We charge a monthly management fee that scales with spend and complexity. After an audit we’ll recommend the right tier for you.</p>
        </details>
      </div>
    </main>
  );
}