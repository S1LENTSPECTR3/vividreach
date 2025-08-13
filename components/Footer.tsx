import Link from 'next/link';

const LOGO = '/assets/logos/vividreach-logo-dark.svg';

export default function Footer(){
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-[1fr,1fr,1fr] gap-8 items-start">
          <div>
            <img src={LOGO} alt="VividReach" className="h-7 w-auto max-w-[220px]" />
            <p className="mt-3 text-sm">Profit-first SEM: PPC, SEO, CRO.</p>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white">Company</div>
            <div className="mt-2 flex flex-col gap-1">
              <Link href="/services" className="hover:text-white">Services</Link>
              <Link href="/case-studies" className="hover:text-white">Results</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white">Legal</div>
            <div className="mt-2 flex flex-col gap-1">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-xs">
          © {new Date().getFullYear()} VividReach LLC — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
