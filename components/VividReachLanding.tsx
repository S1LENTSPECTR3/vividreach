'use client';
import React, { useEffect, useRef, useState } from 'react';

const BRAND = { primaryStart:'#7C3AED', primaryEnd:'#06B6D4', dark:'#0B1220' };
const LOGO_DARK_SRC = '/assets/logos/vividreach-logo-dark.svg';
function BrandLogo({ className='' }:{className?:string}){
  const [ok,setOk]=useState(true);
  if(ok) return <img src={LOGO_DARK_SRC} alt="VividReach" className={className} onError={()=>setOk(false)}/>;
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
function ContactForm(){return <div className="rounded-2xl bg-white ring-1 ring-slate-300 shadow-md p-6">Contact form goes here.</div>}
export default function VividReachLanding(){
  return <div className="min-h-screen" style={{backgroundImage:`linear-gradient(180deg, ${BRAND.dark} 0%, #0E1A2B 30%, #0F1E36 70%, #102243 100%)`}}>
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10"><div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
      <a href="#top" className="flex items-center gap-3 text-white"><BrandLogo className="h-9 w-auto max-w-[220px]"/></a>
      <nav className="hidden md:flex items-center gap-6 text-sm text-white/80"><a href="#services" className="hover:text-white">Services</a></nav>
      <div className="flex items-center gap-3"><Button href="#contact" variant="secondary" className="!text-white !ring-white/20 !bg-transparent">Get Proposal</Button><Button href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}>Book Strategy Call →</Button></div>
    </div></header>
    <section id="top" className="relative overflow-hidden"><div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 text-white">
      <div className="max-w-3xl"><div className="mb-4"><BrandLogo className="h-10 w-auto max-w-[260px]"/></div><h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Profit-first SEM that turns clicks into customers.</h1></div>
    </div></section>
    <section id="contact" className="bg-white px-6 py-16 sm:py-24"><div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-8 items-start"><ContactForm/><div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 min-h-[460px] shadow-sm">Calendly</div></div></section>
    <footer className="bg-slate-950 text-slate-400"><div className="mx-auto max-w-7xl px-6 py-10"><BrandLogo className="h-7 w-auto max-w-[220px]"/></div></footer>
  </div>;
}
