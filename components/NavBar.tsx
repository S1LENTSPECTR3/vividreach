'use client';

import Link from 'next/link';
import { useState } from 'react';

const LOGO = '/assets/logos/vividreach-logo-dark.svg';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  const Button = ({ href, children, primary=false, className='' }:{
    href: string; children: React.ReactNode; primary?: boolean; className?: string;
  }) => {
    const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    const cls = primary
      ? `${base} text-white shadow-sm`
      : `${base} ring-1 ring-white/20 text-white/90 bg-transparent hover:bg-white/10`;
    const style = primary ? { backgroundImage: 'linear-gradient(to right,#7C3AED,#06B6D4)' } : undefined;
    return <Link href={href} className={`${cls} ${className}`} style={style}>{children}</Link>;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO} alt="VividReach" className="h-8 md:h-9 w-auto max-w-[220px]" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/case-studies" className="hover:text-white">Results</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button href="/contact" className="!text-white !ring-white/20">Get Proposal</Button>
          <Button href={calendly} primary>Book Strategy Call →</Button>
        </div>

        {/* mobile toggle */}
        <button onClick={()=>setOpen(v=>!v)} className="md:hidden text-white/90 p-2 rounded-lg hover:bg-white/10">
          ☰
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/90 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-2 text-white/90">
            <Link href="/services" onClick={()=>setOpen(false)}>Services</Link>
            <Link href="/case-studies" onClick={()=>setOpen(false)}>Results</Link>
            <Link href="/about" onClick={()=>setOpen(false)}>About</Link>
            <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
            <div className="pt-2 flex gap-2">
              <Link href="/contact" className="flex-1 text-center rounded-xl ring-1 ring-white/20 px-3 py-2">Get Proposal</Link>
              <Link href={calendly} className="flex-1 text-center rounded-xl px-3 py-2 text-white"
                style={{backgroundImage:'linear-gradient(to right,#7C3AED,#06B6D4)'}}>Book Call</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
