function stripTags(s:string){return s.replace(/[<>]/g,'').replace(/\s+/g,' ').trim();}
function tooManyLinks(s:string,max=3){const m=s.match(/https?:\/\//gi);return !!(m&&m.length>max)}
export async function POST(req:Request){
  const c=req.headers.get('content-type')||'';let fields:Record<string,string>={};
  if(c.includes('application/json')){fields=await req.json()}else{const fd=await req.formData();for(const [k,v] of fd.entries()) fields[k]=String(v??'')}
  const nickname=(fields['nickname']||'').trim(); if(nickname) return new Response(JSON.stringify({ok:false,error:'spam'}),{status:400});
  const name=stripTags(fields['name']||''); const email=stripTags(fields['email']||''); const website=stripTags(fields['website']||''); const budget=stripTags(fields['budget']||''); const message=stripTags(fields['message']||'');
  const emailOk=/.+@.+\..+/.test(email)&&email.length<=160; const nameOk=name.length>0&&name.length<=120; const siteOk=website.length<=200&&(!website||/^https?:\/\//.test(website));
  const budgetOk=['< $2k','$2k–$10k','$10k–$50k','> $50k'].includes(budget); const msgOk=message.length>0&&message.length<=2000&&!tooManyLinks(message,3);
  if(!(emailOk&&nameOk&&siteOk&&msgOk)){return new Response(JSON.stringify({ok:false,error:'validation'}),{status:400})}
  const forward=process.env.FORWARD_TO_FORM_ACTION; if(forward){try{await fetch(forward,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,website,budget,message})});}catch{}}
  return new Response(JSON.stringify({ok:true}),{status:200,headers:{'content-type':'application/json'}});
}
