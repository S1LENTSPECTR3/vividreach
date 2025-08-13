import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions for using the VividReach website and engaging with our services.',
};

export default function TermsPage() {
  return (
    <main className="px-4 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Terms of Service</h1>
      <p className="text-gray-300 mb-4">
        By using this website you agree to abide by the terms and conditions set forth on this page. These are not yet final and should be replaced with your actual terms drafted by legal counsel.
      </p>
      <p className="text-gray-300 mb-4">
        For the time being please consider all information on this site for informational purposes only. Engaging with VividReach does not constitute a binding agreement until a signed contract is in place.
      </p>
      <p className="text-gray-300">
        If you have questions about these terms please contact us.
      </p>
    </main>
  );
}