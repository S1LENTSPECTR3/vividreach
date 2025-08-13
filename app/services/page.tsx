import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our services across PPC management, SEO and CRO & experimentation.',
};

export default function ServicesPage() {
  return (
    <main className="px-4 py-16 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Our Services</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl">
        We help growth‑focused businesses turn search traffic into predictable revenue. Dive into our core service offerings below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          title="PPC Management"
          description="Full‑funnel paid media management across Google & Microsoft ads."
          href="/services/ppc"
        />
        <ServiceCard
          title="SEO Management"
          description="Technical & content SEO focused on pages that deliver pipeline."
          href="/services/seo"
        />
        <ServiceCard
          title="CRO & Experimentation"
          description="Systematic A/B testing to lift conversion rates and revenue per visitor."
          href="/services/cro"
        />
      </div>
    </main>
  );
}