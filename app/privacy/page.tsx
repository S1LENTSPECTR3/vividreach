import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How VividReach handles personal data collected through our website.',
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Privacy Policy</h1>
      <p className="text-gray-300 mb-4">
        This page explains how we collect, use and protect your personal information. It will be updated when our practices change. For now please assume we only use your data to respond to your enquiries and improve our marketing.
      </p>
      <p className="text-gray-300 mb-4">
        We use third‑party tools like Google Analytics and Vercel Analytics to understand how visitors interact with our site. These tools may set cookies in your browser. You can opt out at any time by adjusting your browser settings or by contacting us.
      </p>
      <p className="text-gray-300">
        If you have questions about your data please get in touch via our contact form.
      </p>
    </main>
  );
}