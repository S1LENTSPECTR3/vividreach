import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'See how we’ve helped clients drive more revenue through PPC, SEO and CRO.',
};

export default function CaseStudiesPage() {
  const studies = [
    {
      id: 1,
      title: 'SaaS Startup triples qualified demos',
      excerpt: 'We rebuilt their ad campaigns and landing pages, slashing CPA by 40% and tripling demo bookings.',
    },
    {
      id: 2,
      title: 'E‑commerce brand lifts ROAS 68%',
      excerpt: 'By restructuring Shopping campaigns and optimising product pages, we drove more profit on the same ad spend.',
    },
    {
      id: 3,
      title: 'B2B services scales SEO pipeline',
      excerpt: 'Technical fixes and strategic content increased organic leads 120% in six months.',
    },
  ];
  return (
    <main className="px-4 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Case Studies</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl">
        A sample of outcomes we’ve delivered. More detailed case studies will be published soon.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {studies.map((study) => (
          <article key={study.id} className="bg-gray-800/60 backdrop-blur rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">{study.title}</h3>
            <p className="text-gray-300 mb-4">{study.excerpt}</p>
            <span className="text-primary-light font-medium">Coming soon</span>
          </article>
        ))}
      </div>
    </main>
  );
}