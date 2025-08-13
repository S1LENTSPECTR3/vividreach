import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRO & Experimentation',
  description: 'Run disciplined A/B testing on landing pages and funnels to systematically lift conversion rates.',
};

export default function CroPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#book';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conversion Rate Optimisation',
    description:
      'Continuous experimentation programme to improve website and funnel conversion rates through data analysis and A/B testing.',
    provider: {
      '@type': 'Organization',
      name: 'VividReach',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vividreach.vercel.app',
    },
  };
  return (
    <main className="px-4 py-16 max-w-5xl mx-auto">
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify(serviceSchema)}</script>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">CRO & Experimentation</h1>
      <p className="text-lg text-gray-300 mb-8">
        We don’t guess what converts. We design and ship A/B tests weekly, analyse results rigorously and roll out winning variations. The outcome: predictable improvements in conversion rate and revenue per visitor.
      </p>
      <h2 className="text-2xl font-bold mb-4">What we do</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-300 mb-8">
        <li>Analyse your funnel to prioritise high‑impact pages and steps.</li>
        <li>Design hypotheses grounded in user research and analytics.</li>
        <li>Implement A/B tests via your platform or ours; we support Webflow, Shopify, custom sites and more.</li>
        <li>Statistical analysis and insights — no guessing, only learning.</li>
        <li>Roll out winners and iterate the testing roadmap every week.</li>
      </ul>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a href={calendly} className="btn-primary">Book Strategy Call</a>
        <a href="/contact" className="btn-secondary">Get Free Audit</a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Common questions</h2>
      <div className="space-y-4 text-gray-300">
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">What platforms do you support?</summary>
          <p className="mt-2">We can run experiments on most CMSs and e‑commerce platforms via client‑side tools like Google Optimize alternative scripts or native A/B functionality.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">Do you handle design/dev?</summary>
          <p className="mt-2">We draft simple layout and copy tests. For more advanced designs we coordinate with your developers or our freelance network.</p>
        </details>
        <details className="bg-gray-800/60 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer">How many tests per month?</summary>
          <p className="mt-2">Typically 4–8 tests, depending on traffic volume and test duration. Quality over quantity: each test has a clear hypothesis.</p>
        </details>
      </div>
    </main>
  );
}