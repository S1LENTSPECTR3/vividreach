import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'VividReach Marketing',
  description: 'Profit-first SEM: PPC, SEO, CRO.',
};

export default function RootLayout({ children }:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
