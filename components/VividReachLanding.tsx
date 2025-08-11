'use client';
import React, { useRef, useState } from 'react';

const BRAND = { primaryStart:'#7C3AED', primaryEnd:'#06B6D4', dark:'#0B1220' };
const LOGO_DARK_SRC = '/assets/logos/vividreach-logo-dark.svg';

function BrandLogo({ className='' }:{className?:string}){
  const [ok,setOk]=useState(true);
  if(ok) return <img src={LOGO_DARK_SRC} alt="VividReach" className={className + ' block'} onError={()=>setOk(false)}/>;
  return <div className={`font-extrabold tracking-tight ${className}`}>Vivid<span className="text-cyan-400">Reach</span></div>;
}
const Button:React.FC<{href?:string;onClick?:any;children:any;variant?:'primary'|'secondary';className?:string;type?:any}> = ({href,onClick,children,variant='primary',className='',type})=>{
  const base='inline-flex items-center justify-center px-5 py-3 rounded-2xl text-sm font-semibold transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  const isPrimary=variant==='primary';
  const classes=isPrimary?`text-white ${base}`:`text-slate-900 bg-white hover:bg-slate-50 ring-1 ring-slate-300 focus:ring-slate-300 ${base}`;
  const style=isPrimary?{backgroundImage:`linear-gradient(to right, ${BRAND.primaryStart}, ${BRAND.primaryEnd})`}:undefined;
  if(href) return <a href={href} style={style} onClick={(e)=>onClick?.(e)} className={`${classes} ${className}`}>{children}</a>;
  return <button type={type||'button'} style={style} onClick={(e)=>onClick?.(e)} className={`${classes} ${className}`}>{children}</button>;
};
const Section:React.FC<{id?:string;eyebrow?:string;title?:string;subtitle?:string;bg?:'light'|'dark';children:any}> = ({id,eyebrow,title,subtitle,children,bg='light'})=>{
  const bgClass=bg==='dark'?`bg-[${BRAND.dark}] text-white`:'bg-white';
  const subClass=bg==='dark'?'text-slate-300':'text-slate-600';
  return <section id={id} className={`${bgClass} px-6 py-16 sm:py-24`}>
    <div className="mx-auto max-w-7xl">
      {(eyebrow||title) && <div className="mb-10 sm:mb-12">
        {eyebrow && <div className={`text-xs font-semibold tracking-widest uppercase ${bg==='dark'?'text-cyan-300/80':'text-cyan-700'}`}>{eyebrow}</div>}
        {title && <h2 className={`mt-2 text-2xl sm:text-3xl md:text-4xl font-bold ${bg==='dark'?'text-white':'text-slate-900'}`}>{title}</h2>}
        {subtitle && <p className={`mt-3 max-w-3xl ${subClass}`}>{subtitle}</p>}
      </div>}
      {children}
    </div>
  </section>;
};

function ContactForm(){
  const formRef = useRef<HTMLFormElement|null>(null);
  const [err,setErr]=useState(''); const [ok,setOk]=useState(false); const [loading,setLoading]=useState(false);
  const onSubmit=async(e:React.FormEvent)=>{
    e.preventDefault(); setErr(''); setOk(false); setLoading(true);
    const f=formRef.current!; const hp=(f.querySelector('input[name="nickname"]') as HTMLInputElement); if(hp?.value.trim()){setErr('Spam detected.'); setLoading(false); return;}
    const fd=new FormData(f); const s=(k:string)=>String(fd.get(k)||'').trim();
    const name=s('name'), email=s('email'), website=s('website'), budget=s('budget'), message=s('message');
    const tooLong=(v:string,n:number)=>v.length>n;
    if(!name||!email||!message){setErr('Please fill in required fields.'); setLoading(false); return;}
    if(tooLong(name,120)||tooLong(email,160)||tooLong(website,200)||tooLong(message,2000)){setErr('Input too long.'); setLoading(false); return;}
    if((message.match(/https?:\/\//gi)||[]).length>3){setErr('Too many links in message.'); setLoading(false); return;}
    try{
      const res=await fetch('/api/contact',{method:'POST',body:fd}); if(!res.ok) throw new Error('Bad response'); setOk(true); f.reset();
    }catch{setErr('Could not send message.');} finally{setLoading(false);}
  };
  return <form ref={formRef} onSubmit={onSubmit} className="rounded-2xl bg-white ring-1 ring-slate-300 shadow-md p-6">
    <div style={{position:'absolute',left:-9999,top:0}} aria-hidden><label>Nickname<input name="nickname" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div><label className="block text-sm font-medium text-slate-800">Name</label>
        <input name="name" required className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" placeholder="Jane Doe"/></div>
      <div><label className="block text-sm font-medium text-slate-800">Email</label>
        <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" placeholder="jane@company.com"/></div>
      <div className="sm:col-span-2"><label className="block text-sm font-medium text-slate-800">Website (optional)</label>
        <input name="website" className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" placeholder="https://example.com"/></div>
      <div><label className="block text-sm font-medium text-slate-800">Monthly ad spend</label>
        <select name="budget" className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2">
          {['< $2k','$2k–$10k','$10k–$50k','> $50k'].map(b=><option key={b} value={b}>{b}</option>)}
        </select></div>
      <div className="sm:col-span-2"><label className="block text-sm font-medium text-slate-800">What are you trying to achieve?</label>
        <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500 px-3 py-2" placeholder="e.g., Lower CPA on Google Ads, migrate to GA4, run CRO tests..."/></div>
    </div>
    <div className="mt-5 flex items-center gap-3">
      <Button type="submit">{loading?'Sending…':'Send'}</Button>
      <span className="text-sm text-slate-600">We reply within 1 business day.</span>
    </div>
    {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
    {ok && <div className="mt-3 text-sm text-green-700">Thanks! We'll be in touch shortly.</div>}
  </form>;
}

export default function VividReachLanding(){
  return <div className="min-h-screen" style={{backgroundImage:`linear-gradient(180deg, ${BRAND.dark} 0%, #0E1A2B 30%, #0F1E36 70%, #102243 100%)`}}>
    {/* Navbar */}
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-white">
          <BrandLogo className="h-8 md:h-9 w-auto max-w-[220px]" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#process" className="hover:text-white">Process</a>
          <a href="#results" className="hover:text-white">Results</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button href="#contact" variant="secondary" className="!text-white !ring-white/20 !bg-transparent">Get Proposal</Button>
          <Button href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}>Book Strategy Call →</Button>
        </div>
      </div>
    </header>

    {/* HERO */}
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(closest-side, ${BRAND.primaryEnd}, transparent)` }} />
        <div className="absolute -bottom-48 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(closest-side, ${BRAND.primaryStart}, transparent)` }} />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 text-white">
        <div className="max-w-3xl">
          <div className="mb-4"><BrandLogo className="h-10 md:h-12 w-auto max-w-[280px]" /></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Profit-first SEM that turns clicks into customers.</h1>
          <p className="mt-5 text-lg text-slate-300">We manage PPC, SEO, and CRO with ruthless testing and clear attribution. No fluff. Just compounded learnings and revenue.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}>Book Strategy Call</Button>
            <Button href="#contact" variant="secondary">Get a Free Audit</Button>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Avg. CPA Improvement', value: '32%' },
              { label: 'Lift in CVR (90d)', value: '+41%' },
              { label: 'A/B Tests per Month', value: '8–12' },
              { label: 'Client NPS', value: '72' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-slate-200 p-5">
                <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* PROOF STRIP */}
    <Section bg="light">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
        {['Google Partner','GA4 + GTM','Meta & TikTok Ads','Microsoft Ads'].map(label => (
          <div key={label} className="flex items-center justify-center rounded-xl ring-1 ring-slate-200 p-4 text-slate-600 bg-white">
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </Section>

    {/* SERVICES */}
    <Section id="services" eyebrow="What we do" title="PPC, SEO, and CRO — built to compound" subtitle="We focus on the levers that move revenue. Tight account structure, LTV-aware bidding, technical SEO that ships, and page templates that actually get tested.">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {title:'PPC Management', points:['Google & Microsoft Ads','Granular negatives & query mapping','Creative testing & offer iteration','LTV-aware bid strategies']},
          {title:'SEO Management', points:['Technical + architecture first','Revenue pages > vanity keywords','Content briefs & outlines','Internal linking that scales']},
          {title:'CRO & Experimentation', points:['Template-based A/B program','North-star metrics, not just CTR','Weekly test cadence','Analytics & attribution setup']}
        ].map(f => (
          <div key={f.title} className="rounded-2xl ring-1 ring-slate-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
            <ul className="mt-4 space-y-2">
              {f.points.map(p => <li key={p} className="flex items-start gap-3 text-sm text-slate-700"><span className="mt-0.5 text-cyan-600">✔</span>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    {/* PROCESS (dark) */}
    <Section id="process" bg="dark" eyebrow="How we work" title="Audit → Plan → 90-day sprints → Weekly experiments" subtitle="Clarity over chaos. You’ll get a concise plan, a testing roadmap, and dashboards to see what’s working.">
      <div className="grid md:grid-cols-4 gap-6">
        {['Zero-Noise Audit','Strategy & Forecast','Build & Launch','Iterate & Scale'].map((step,i)=> (
          <div key={step} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="text-cyan-300 text-sm font-semibold">Step {i+1}</div>
            <div className="mt-2 text-lg font-bold text-white">{step}</div>
            <p className="mt-2 text-sm text-slate-300">{['Tight look at accounts, pages, analytics, and offers.','PPC/SEO roadmap with test hypotheses and revenue model.','Ship structure, tracking, and first tests fast.','Double down on winners, cut losers, and expand TAM.'][i]}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Button href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}>Get Your Audit →</Button>
        <Button href="#contact" variant="secondary" className="!bg-white/10 !text-white !ring-white/20">Request Proposal</Button>
      </div>
    </Section>

    {/* RESULTS */}
    <Section id="results" eyebrow="Recent wins" title="Real improvements, fast" subtitle="A peek at the type of deltas we aim for in the first 60–90 days.">
      <div className="grid md:grid-cols-3 gap-6">
        {[{h:'Local Services',k:'-37% CPA',d:'Restructure + negatives + lead-quality filters via offline conversions.'},
          {h:'SaaS',k:'+61% SQLs',d:'Offer shift to product-led + landing template tests.'},
          {h:'E-commerce',k:'+29% CVR',d:'PDP hierarchy + social proof density + page speed fixes.'}
        ].map(x => (
          <div key={x.h} className="rounded-2xl ring-1 ring-slate-200 p-6 bg-white">
            <div className="text-sm font-semibold text-cyan-700">{x.h}</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{x.k}</div>
            <p className="mt-2 text-sm text-slate-700">{x.d}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* PRICING */}
    <Section id="pricing" eyebrow="Engagements" title="Simple retainers. Impact in weeks, not months." subtitle="Start lean. Scale what works.">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {name:'Kickoff', price:'$0 setup + lean retainer', points:['Audit + 90-day plan','1 channel (PPC or SEO)','Tracking/GTM setup','2 tests/mo']},
          {name:'Growth', price:'$ retainer + % of ad spend', points:['PPC + SEO','CRO program','4–6 tests/mo','Monthly strategy review']},
          {name:'Scale', price:'Custom', points:['Multi-channel + creative ops','Experimentation pod','Attribution & LTV modeling','Weekly exec reporting']}
        ].map(tier => (
          <div key={tier.name} className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
            <div className="text-sm font-semibold text-cyan-700">{tier.name}</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{tier.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {tier.points.map(p => <li key={p} className="flex gap-3"><span className="text-cyan-600 mt-0.5">✔</span>{p}</li>)}
            </ul>
            <div className="mt-6"><Button href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}>Talk to us →</Button></div>
          </div>
        ))}
      </div>
    </Section>

    {/* FAQ */}
    <Section id="faq" eyebrow="Questions" title="FAQ">
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {q:'Do you create content?', a:'We’re strategy and management first. We’ll brief and coordinate creatives via your team or our vetted freelancers.'},
          {q:'Is there a contract?', a:'Month-to-month with a 30-day notice. We win by delivering, not locking you in.'},
          {q:'Which industries do you serve?', a:'Service businesses, SaaS, and e-commerce—where paid + search + CRO can be tied to revenue.'},
          {q:'How fast can we start?', a:'Audits typically within 5 business days. First experiments within 2 weeks of kickoff.'},
        ].map(item => (
          <details key={item.q} className="rounded-xl bg-white ring-1 ring-slate-200 p-5 group">
            <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">{item.q}<span className="text-slate-400 group-open:rotate-180 transition">⌃</span></summary>
            <div className="mt-3 text-sm text-slate-700">{item.a}</div>
          </details>
        ))}
      </div>
    </Section>

    {/* CONTACT / BOOK */}
    <Section id="contact" eyebrow="Next step" title="Get a free audit or book a call" subtitle="Send a few details and we’ll reply with next steps. No pressure, no hard sells.">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <ContactForm />
        <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 min-h-[460px] shadow-sm">
          <div className="text-sm text-slate-700 mb-2">Prefer to book directly?</div>
          <a className="text-cyan-700 underline" href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'} target="_blank" rel="noreferrer">Open Calendly in a new tab</a>
          <div className="mt-4 text-slate-600 text-sm">Embed goes here (replace this box with Calendly's inline widget once you have your link).</div>
          <div className="mt-4 rounded-xl ring-1 ring-dashed ring-slate-300 p-6 text-center text-slate-400">Calendly Inline Widget Placeholder</div>
        </div>
      </div>
    </Section>

    {/* FOOTER */}
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <BrandLogo className="h-7 w-auto max-w-[220px]" />
          <div className="text-sm">
            <div>© {new Date().getFullYear()} VividReach LLC. All rights reserved.</div>
            <div className="mt-1">Privacy • Terms • <a className="underline" href="#contact">Contact</a></div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white">Get in touch</div>
            <div className="mt-1">hello@vividreach.com (placeholder)</div>
          </div>
        </div>
      </div>
    </footer>
  </div>;
}
