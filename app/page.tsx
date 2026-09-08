'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Code2 } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription } from '@/components/ui/popover';
const sections = ['Intro', 'AI & mogelijkheden', 'Code & experimenten', 'De mens erachter'];
const ids = ['intro', 'ai', 'code', 'over-mij'];
function Network({ scene }: { scene: number }) {
 const canvas = useRef<HTMLCanvasElement>(null);
 useEffect(() => {
  const el = canvas.current!, ctx = el.getContext('2d'); if (!ctx) return;
  let w = 0, h = 0, frame = 0, pointerX = 0, pointerY = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const points = Array.from({length:160}, (_,i) => {const y=1-i/159*2,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));return [Math.cos(a)*r,y,Math.sin(a)*r];});
  const resize=()=>{w=el.clientWidth;h=el.clientHeight;const dpr=Math.min(devicePixelRatio,2);el.width=w*dpr;el.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};
  const move=(e:PointerEvent)=>{pointerX=(e.clientX/innerWidth-.5)*.4;pointerY=(e.clientY/innerHeight-.5)*.2;};
  resize();window.addEventListener('resize',resize);window.addEventListener('pointermove',move);
  const draw=(time:number)=>{
   ctx.clearRect(0,0,w,h);const angle=reduced?.3:time*.00006+pointerX,radius=Math.min(w*.37,h*.39),cx=w*(scene===0?.5:.66),cy=h*.47;
   const projected=points.map(([x,y,z])=>{const rx=x*Math.cos(angle)+z*Math.sin(angle),rz=-x*Math.sin(angle)+z*Math.cos(angle),ry=y*Math.cos(pointerY)-rz*Math.sin(pointerY),scale=3/(3-rz);return{x:cx+rx*radius*scale,y:cy+ry*radius*scale,z:rz};});
   projected.forEach((p,i)=>{for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);if(d<.37){const q=projected[j];ctx.strokeStyle=`rgba(203,220,214,${(.07+(p.z+1)*.1)*(1-d)})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}ctx.fillStyle=i%13===0?`rgba(202,255,150,${.4+(p.z+1)*.3})`:`rgba(225,235,229,${.15+(p.z+1)*.25})`;ctx.beginPath();ctx.arc(p.x,p.y,i%13===0?2.3:1.1,0,Math.PI*2);ctx.fill();});
   if(!reduced)frame=requestAnimationFrame(draw);
  };frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);};
 },[scene]);
 return <canvas ref={canvas} className="network" aria-hidden="true"/>;
}
export default function Home(){
 const [active,setActive]=useState(0);
 const transitionUntil=useRef(0);
 const go=(index:number)=>{transitionUntil.current=Date.now()+1100;setActive(index);window.history.replaceState(null,'',`#${ids[index]}`);window.scrollTo({top:0});};
 useEffect(()=>{const sync=()=>{const index=ids.indexOf(window.location.hash.slice(1));if(index>=0)setActive(index);};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{
  let accumulated=0, lastWheel=0, startX=0, startY=0;
  const interactive=(target:EventTarget|null)=>target instanceof Element&&!!target.closest('button,a,input,textarea,[role="dialog"]');
  const navigate=(delta:number)=>{if(Date.now()<transitionUntil.current)return;const next=Math.max(0,Math.min(3,active+delta));if(next!==active)go(next);};
  const key=(e:KeyboardEvent)=>{if(interactive(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();navigate(1);}if(e.key==='ArrowLeft'){e.preventDefault();navigate(-1);}};
  const wheel=(e:WheelEvent)=>{if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const now=Date.now();if(now-lastWheel>180)accumulated=0;lastWheel=now;const atBottom=innerHeight+scrollY>=document.documentElement.scrollHeight-3,atTop=scrollY<=1;if((e.deltaY>0&&!atBottom)||(e.deltaY<0&&!atTop)){accumulated=0;return;}accumulated+=e.deltaY;if(Math.abs(accumulated)>90){navigate(Math.sign(accumulated));accumulated=0;}};
  const touchStart=(e:TouchEvent)=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY;};
  const touchEnd=(e:TouchEvent)=>{if(interactive(e.target))return;const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>80&&Math.abs(dx)>Math.abs(dy)*1.5)navigate(dx<0?1:-1);};
  window.addEventListener('keydown',key);window.addEventListener('wheel',wheel,{passive:true});window.addEventListener('touchstart',touchStart,{passive:true});window.addEventListener('touchend',touchEnd,{passive:true});
  return()=>{window.removeEventListener('keydown',key);window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchend',touchEnd);};
 },[active]);
 return <main className={`portfolio scene-${active}`}>
  <Network scene={active}/><div className="ambient" aria-hidden="true"/><a className="skip-link" href="#content">Naar de inhoud</a>
  <header className="header"><button className="monogram" onClick={()=>go(0)} aria-label="Dani Roemgens, naar intro">DR<span className="accent">.</span></button><nav aria-label="Hoofdnavigatie">{sections.slice(1).map((title,i)=><button key={title} onClick={()=>go(i+1)} aria-current={active===i+1?'page':undefined}>{title}</button>)}</nav><Popover><PopoverTrigger className="contact-button">Contact <ArrowUpRight size={16}/></PopoverTrigger><PopoverContent align="end" className="contact-popover"><PopoverTitle>Laten we kennismaken.</PopoverTitle><PopoverDescription>Mijn contactgegevens volgen binnenkort.</PopoverDescription></PopoverContent></Popover></header>
  <div className="side-label" aria-hidden="true">PERSOONLIJK PORTFOLIO — 2026</div>
  <section id="content" className={`scene-content ${active===0?'intro-content':'detail-content'}`} key={active} aria-label={sections[active]}>
  {active===0?<><div className="hero-kicker"><span className="status-dot"/> NIEUWSGIERIG. ALTIJD IN ONTWIKKELING.</div><h1>Dani Roemgens<span>AI-maker met een passie voor code.</span></h1><div className="hero-title" aria-label="Denken. Maken. Verder."><span>Denken.</span><span className="outline">Maken.</span><span>Verder<span className="accent">.</span></span></div><div className="hero-bottom"><p>Vier jaar AI ontdekken, uitproberen en toepassen.<br/>En nog lang niet uitgeleerd.</p><button className="text-link" onClick={()=>go(1)}>Ontdek mijn wereld <ArrowDown size={18}/></button></div></>:active===1?<><p className="eyebrow">01 / AI & MOGELIJKHEDEN</p><h2>Van nieuwsgierigheid<br/>naar <em>mogelijkheden.</em></h2><p className="lead">AI is voor mij geen toekomstmuziek.<br/>Het is iets waar ik al vier jaar mee bezig ben.</p><p>Door te experimenteren ontdek ik wat er mogelijk is. Ik probeer ideeën uit, stel betere vragen en zoek uit hoe AI helpt om iets te maken dat er eerst nog niet was.</p><p>Wat mij drijft? De stap van ‘zou dit kunnen?’ naar ‘het werkt’. Juist de combinatie van creativiteit en techniek maakt dat interessant.</p><div className="detail-tags"><span><Sparkles size={15}/> AI toepassen</span><span>Experimenteren</span><span>Blijven leren</span></div></>:active===2?<><p className="eyebrow">02 / CODE & EXPERIMENTEN</p><h2>Een idee is het begin.<br/><em>Bouwen is de volgende stap.</em></h2><p className="lead">Naast AI trekt ook code me steeds meer.</p><p>Ik wil begrijpen hoe digitale dingen werken — en hoe ik ze zelf kan maken. Code geeft me de ruimte om ideeën tastbaar en interactief te maken.</p><p>Dit portfolio is het begin van die ontdekkingsreis. Hier ontstaat straks een verzameling van wat ik maak, probeer en leer.</p><div className="project-note"><Code2 size={22}/><div><strong>Mijn portfolio</strong><span>Eerste stap · In ontwikkeling</span></div><span className="project-number">001</span></div></>:<><p className="eyebrow">03 / DE MENS ERACHTER</p><h2>Hoi, ik ben Dani.<br/><em>Nieuwsgierigheid als startpunt.</em></h2><p className="lead">Veel interesse in AI. Een groeiende liefde voor code. En vooral: zin om te maken.</p><p>De afgelopen vier jaar heb ik veel tijd gestoken in het ontdekken van AI. Door ermee te werken en dingen uit te proberen, heb ik geleerd wat je ermee kunt doen.</p><p>Ik hoef nog niet precies in één functietitel te passen. Ik bouw liever verder aan wat ik kan — en laat hier zien waar dat toe leidt.</p><div className="signature">Dani Roemgens<span>AI & creatieve technologie</span></div></>}
  </section>
  <footer className="footer"><div className="footer-brand"><span className="status-dot"/> DANI ROEMGENS <span className="footer-sub">AI & CODE</span></div><div className="scene-navigation"><span className="scene-count">0{active+1}<span> / 04</span></span><button disabled={active===0} onClick={()=>go(active-1)} aria-label="Vorig onderdeel"><ArrowLeft size={18}/></button><div className="progress"><span style={{width:`${(active+1)*25}%`}}/></div><button disabled={active===3} onClick={()=>go(active+1)} aria-label="Volgend onderdeel"><ArrowRight size={18}/></button></div></footer>
 </main>;
}
