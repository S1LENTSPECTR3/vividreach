"use client";

import { useEffect } from 'react';
import BrandLogo from '@/components/BrandLogo';
import ServiceCard from '@/components/ServiceCard';

/**
 * Capture UTM parameters and a referrer from the current URL. These values are
 * stored in sessionStorage so they can be included with contact form
 * submissions. This hook runs on the client once on mount.
 */
function useCaptureUtm() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const value = params.get(key);
      if (value) utm[key] = value;
    });
    const ref = params.get('ref') || document.referrer || '';
    if (Object.keys(utm).length > 0 || ref) {
      const payload = { ...utm, referrer: ref };
      sessionStorage.setItem('vividreach-utm', JSON.stringify(payload));
    }
  }, []);
}

export default function Home() {
  useCaptureUtm();
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#book';
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="flex flex-col items-center text-center py-24 px-4">
        <BrandLogo className="h-12 md:h-14 mb-8 max-w-[280px]" />
        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight mb-6">
          Profit‑first SEM that turns clicks into customers.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          We manage PPC, SEO, and CRO with ruthless testing and clear attribution. No fluff. Just compounded learnings and revenue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={calendly}
            className="btn-primary text-center"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'cta_click', { label: 'hero_book_call' });
              }
            }}
          >
            Book Strategy Call
          </a>
          <a
            href="#contact"
            className="btn-secondary text-center"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'cta_click', { label: 'hero_free_audit' });
              }
            }}
          >
            Get Free Audit
          </a>
        </div>
        {/* Metrics */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl w-full">
          <div className="p-4 rounded-lg bg-gray-800/60 backdrop-blur text-center">
            <span className="text-3xl md:text-4xl font-bold text-white">32%</span>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Avg. CPA improvement</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/60 backdrop-blur text-center">
            <span className="text-3xl md:text-4xl font-bold text-white">41%</span>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Lift in CVR (90d)</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/60 backdrop-blur text-center">
            <span className="text-3xl md:text-4xl font-bold text-white">8–12</span>
            <p className="text-gray-400 mt-1 text-sm md:text-base">A/B tests per month</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800/60 backdrop-blur text-center">
            <span className="text-3xl md:text-4xl font-bold text-white">72</span>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Client NPS</p>
          </div>
        </div>
      </section>
      {/* Services summary section */}
      <section className="py-20 px-4 bg-[#0a1124]">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What we do</h2>
          <p className="text-gray-300 text-lg md:text-xl">
            Complete search engine marketing for growth‑focused businesses. See how we drive revenue across paid media, organic search and conversion optimisation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            title="PPC Management"
            description="Full‑funnel Google & Microsoft Ads management: account audits, structure, bidding strategies, negative keywords and relentless experimentation."
            href="/services/ppc"
          />
          <ServiceCard
            title="SEO Management"
            description="Technical and content SEO focused on high‑intent pages. We prioritise what drives pipeline, not vanity traffic."
            href="/services/seo"
          />
          <ServiceCard
            title="CRO & Experimentation"
            description="Systematic A/B testing on landing pages, lead flows and funnels. Ship experiments weekly and learn fast."
            href="/services/cro"
          />
        </div>
      </section>
      {/* Contact anchor for Get Free Audit button. The full contact page resides at /contact. */}
      <div id="contact"></div>
    </main>
  );
}