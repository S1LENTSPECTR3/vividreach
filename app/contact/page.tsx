"use client";

import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a strategy call or request a free audit. Tell us about your business and we’ll be in touch within one business day.',
};

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    const formData = new FormData(e.currentTarget);
    // Honeypot - if filled, block silently
    if (formData.get('subject')) {
      setStatus('success');
      return;
    }
    const payload: any = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      website: formData.get('website')?.toString().trim() || '',
      budget: formData.get('budget')?.toString() || '',
      message: formData.get('message')?.toString().trim() || '',
    };
    // Attach UTM if stored
    if (typeof window !== 'undefined') {
      const utm = sessionStorage.getItem('vividreach-utm');
      if (utm) {
        try {
          Object.assign(payload, JSON.parse(utm));
        } catch {
          /* ignore */
        }
      }
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit', { status: 'success' });
        }
        e.currentTarget.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', { status: 'error' });
      }
    }
  }

  return (
    <main className="px-4 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Get in touch</h1>
      <p className="text-lg text-gray-300 mb-8">
        Send a few details and we’ll reply with next steps. No pressure, no hard sells.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field */}
        <input type="text" name="subject" className="hidden" autoComplete="off" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              maxLength={120}
              className="w-full rounded-md bg-gray-800/60 backdrop-blur px-3 py-2 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              maxLength={160}
              className="w-full rounded-md bg-gray-800/60 backdrop-blur px-3 py-2 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-1">
            Website (optional)
          </label>
          <input
            type="url"
            name="website"
            id="website"
            maxLength={200}
            className="w-full rounded-md bg-gray-800/60 backdrop-blur px-3 py-2 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light"
            placeholder="https://yourdomain.com"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1">
            Monthly ad spend
          </label>
          <select
            name="budget"
            id="budget"
            required
            className="w-full rounded-md bg-gray-800/60 backdrop-blur px-3 py-2 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-light"
            defaultValue="< $2k"
          >
            <option value="< $2k">&lt; $2k</option>
            <option value="$2k–$10k">$2k–$10k</option>
            <option value="$10k–$50k">$10k–$50k</option>
            <option value="> $50k">&gt; $50k</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            What are you trying to achieve?
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            maxLength={2000}
            className="w-full rounded-md bg-gray-800/60 backdrop-blur px-3 py-2 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light"
            placeholder="e.g. Lower CPA on Google Ads, migrate to GA4, run CRO tests on lead gen pages…"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="btn-primary"
        >
          {status === 'loading' ? 'Sending…' : 'Submit'}
        </button>
        {status === 'success' && <p className="text-green-400 mt-2">Thanks! We’ll be in touch soon.</p>}
        {status === 'error' && error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </main>
  );
}