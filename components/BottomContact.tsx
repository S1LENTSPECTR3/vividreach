'use client';

import { useRef, useState } from 'react';

export default function BottomContact(){
  const [msg,setMsg]=useState<string| null>(null);
  const [err,setErr]=useState<string| null>(null);
  const [loading,setLoading]=useState(false);
  const formRef=useRef<HTMLFormElement|null>(null);
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  async function submit(e:React.FormEvent){
    e.preventDefault(); setMsg(null); setErr(null); setLoading(true);
    const f=formRef.current!;
    // honeypot
    const hp = (f.querySelector('input[name="nickname"]') as HTMLInputElement);
    if (hp?.value) { setErr('Spam detected.'); setLoading(false); return; }
    const fd = new FormData(f);
    try{
      const res = await fetch('/api/contact',{ method:'POST', body:fd });
      if(!res.ok) throw new Error('Bad response');
      setMsg('Thanks! We’ll reply within one business day.'); f.reset();
    }catch{ setErr('Could not send message.'); } finally { setLoading(false); }
  }

  return (
    <section className="bg-white px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-8 items-start">
        <form ref={formRef} onSubmit={submit} className="rounded-2xl bg-white ring-1 ring-slate-300 shadow p-6">
          <div style={{position:'absolute',left:-9999,top:0}} aria-hidden>
            <label>Nickname<input name="nickname" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Get a free audit</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-800">Name</label>
              <input name="name" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800">Email</label>
              <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-800">What are you trying to achieve?</label>
              <textarea name="message" rows={4} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Lower CPA, GA4 migration, CRO tests..." />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button type="submit" className="rounded-xl px-4 py-2 text-white"
              style={{backgroundImage:'linear-gradient(to right,#7C3AED,#06B6D4)'}}>
              {loading ? 'Sending…' : 'Send'}
            </button>
            <span className="text-sm text-slate-600">We reply within 1 business day.</span>
          </div>
          {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
          {msg && <div className="mt-3 text-sm text-green-700">{msg}</div>}
        </form>

        <div className="rounded-2xl ring-1 ring-slate-200 p-6 min-h-[360px] bg-white">
          <div className="text-sm text-slate-700">Prefer to book directly?</div>
          <a className="text-cyan-700 underline" href={calendly} target="_blank">Open Calendly in a new tab</a>
          <div className="mt-4 text-slate-600 text-sm">Embed goes here later (Calendly inline widget).</div>
          <div className="mt-4 rounded-xl ring-1 ring-dashed ring-slate-300 p-6 text-center text-slate-400">
            Calendly Inline Widget Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}
