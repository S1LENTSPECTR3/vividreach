import type { Metadata } from 'next';
import BrandLogo from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about VividReach: who we are, what we believe and how we deliver growth for our clients.',
};

export default function AboutPage() {
  return (
    <main className="px-4 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About Us</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8">
        VividReach exists to turn your marketing investment into measurable business growth. We’re a boutique search engine marketing agency built on the belief that ads and SEO should drive revenue, not vanity metrics.
      </p>
      <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
      <p className="text-gray-300 mb-6">
        We partner closely with founders and in‑house teams to craft full‑funnel strategies, implement robust tracking and run disciplined experiments. Everything we do is guided by data and a relentless focus on ROI.
      </p>
      <h2 className="text-2xl font-bold mb-4">Why VividReach</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-300">
        <li>Senior‑level expertise without the big‑agency overhead.</li>
        <li>Transparent reporting and communication — you always know what’s working and what’s not.</li>
        <li>Flexible engagement models that scale with your growth.</li>
        <li>A network of specialists to handle creative, copy and development as needed.</li>
      </ul>
    </main>
  );
}