'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Code2 } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription } from '@/components/ui/popover';
import { advanceJourney, introWords, type Journey } from '@/lib/journey';
const sections = ['Intro', 'AI & mogelijkheden', 'Code & experimenten', 'De mens erachter'];
const ids = ['intro', 'ai', 'code', 'over-mij'];
function Portrait({scene,step}:{scene:number;step:number}) {
 const container=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let frame=0,x=0,y=0,targetX=0,targetY=0,last=0;
  const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;targetX=(e.clientX/innerWidth-.5)*2;targetY=(e.clientY/innerHeight-.5)*2;};
  const reset=()=>{targetX=0;targetY=0;};
  const draw=(time:number)=>{const dt=Math.min(time-last||16,50);last=time;const ease=1-Math.exp(-dt/240);x+=(targetX-x)*ease;y+=(targetY-y)*ease;container.current?.style.setProperty('--pointer-x',String(x));container.current?.style.setProperty('--pointer-y',String(y));frame=requestAnimationFrame(draw);};
  frame=requestAnimationFrame(draw);window.addEventListener('pointermove',move);document.addEventListener('pointerleave',reset);window.addEventListener('blur',reset);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset);window.removeEventListener('blur',reset);};
 },[]);
 return <div ref={container} className={`portrait-stage portrait-scene-${scene} portrait-step-${step}`} aria-hidden="true">
  <div className="portrait-wash"/>
  <div className="portrait-composition">
   <div className="portrait-parallax"><div className="portrait-breath"><img className="portrait-image" src="/dani-portret.png" alt="" fetchPriority="high"/></div></div>
  </div>
  <div className="secondary-composition"><div className="portrait-parallax"><div className="portrait-breath"><img className="portrait-image" src="/dani-buiten.png" alt=""/></div></div></div>
  <div className="portrait-shade"/>
 </div>;
}
export default function Home(){
 const [journey,setJourney]=useState<Journey>({scene:0,step:0});
 const active=journey.scene,introStep=journey.step;
 const transitionUntil=useRef(0),journeyRef=useRef<Journey>({scene:0,step:0});
 const commitJourney=(next:Journey)=>{const current=journeyRef.current;if(next.scene===current.scene&&next.step===current.step)return false;transitionUntil.current=performance.now()+(next.scene===current.scene?950:1400);journeyRef.current=next;setJourney(next);window.history.replaceState(null,'',`#${ids[next.scene]}`);return true;};
 const go=(index:number)=>commitJourney({scene:index,step:0});
 const move=(delta:number)=>{if(performance.now()<transitionUntil.current)return false;return commitJourney(advanceJourney(journeyRef.current,delta));};
 useEffect(()=>{const sync=()=>{const index=ids.indexOf(window.location.hash.slice(1));if(index>=0){const next={scene:index,step:0};journeyRef.current=next;setJourney(next);}};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{
  let accumulated=0, lastWheel=0, consumed=false, startX=0, startY=0;
  const interactive=(target:EventTarget|null)=>target instanceof Element&&!!target.closest('button,a,input,textarea,[role="dialog"]');
  const navigate=(delta:number)=>move(delta);
  const key=(e:KeyboardEvent)=>{if(interactive(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;if((e.key==='ArrowRight'||e.key==='PageDown'||(journeyRef.current.scene===0&&e.key==='ArrowDown'))){e.preventDefault();navigate(1);}if((e.key==='ArrowLeft'||e.key==='PageUp'||(journeyRef.current.scene===0&&e.key==='ArrowUp'))){e.preventDefault();navigate(-1);}};
  const wheel=(e:WheelEvent)=>{
   if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!e.deltaY)return;
   if(e.target instanceof Element&&e.target.closest('[data-slot="popover-content"]'))return;
   const now=performance.now(),fresh=now-lastWheel>180;lastWheel=now;
   if(fresh){accumulated=0;consumed=false;}
   const panel=document.querySelector<HTMLElement>('.scene-content.is-active');if(!panel)return;
   const dir=Math.sign(e.deltaY),canScroll=dir>0?panel.scrollTop+panel.clientHeight<panel.scrollHeight-2:panel.scrollTop>2;
   if(now<transitionUntil.current||consumed){e.preventDefault();return;}
   if(canScroll&&journeyRef.current.scene!==0){accumulated=0;return;}
   e.preventDefault();const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
   if(Math.sign(accumulated)!==dir)accumulated=0;accumulated+=delta;
   if(Math.abs(accumulated)>=65){consumed=navigate(dir);accumulated=0;}
  };
  const touchStart=(e:TouchEvent)=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY;};
  const touchEnd=(e:TouchEvent)=>{if(interactive(e.target))return;const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)navigate(dx<0?1:-1);else if(journeyRef.current.scene===0&&Math.abs(dy)>65&&Math.abs(dy)>Math.abs(dx)*1.5)navigate(dy<0?1:-1);};
  window.addEventListener('keydown',key);window.addEventListener('wheel',wheel,{passive:false});window.addEventListener('touchstart',touchStart,{passive:true});window.addEventListener('touchend',touchEnd,{passive:true});
  return()=>{window.removeEventListener('keydown',key);window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchend',touchEnd);};
 },[]);
 return <main className={`portfolio scene-${active}`}>
  <Portrait scene={active} step={introStep}/><a className="skip-link" href="#content">Naar de inhoud</a>
  <header className="header"><button className="monogram" onClick={()=>go(0)} aria-label="Dani Roemgens, naar intro">DR<span className="accent">.</span></button><nav aria-label="Hoofdnavigatie">{sections.slice(1).map((title,i)=><button key={title} onClick={()=>go(i+1)} aria-current={active===i+1?'page':undefined}>{title}</button>)}</nav><Popover><PopoverTrigger className="contact-button">Contact <ArrowUpRight size={16}/></PopoverTrigger><PopoverContent align="end" className="contact-popover"><PopoverTitle>Laten we kennismaken.</PopoverTitle><PopoverDescription>Mijn contactgegevens volgen binnenkort.</PopoverDescription></PopoverContent></Popover></header>
  <div className="side-label" aria-hidden="true">PERSOONLIJK PORTFOLIO — 2026</div>
  <div className="scenes" id="content">{sections.map((title,scene)=><section key={title} className={`scene-content ${scene===0?'intro-content':'detail-content'} ${active===scene?'is-active':''}`} data-position={scene<active?'before':'after'} aria-label={title} aria-hidden={active!==scene} inert={active!==scene}>
  {scene===0?<><div className="intro-caption"><h1>Dani Roemgens<span>AI-maker met een passie voor code.</span></h1></div><div className="intro-words" aria-live="polite" aria-atomic="true"><span className="sr-only">{introWords[introStep]||'Welkom bij Dani Roemgens'}</span>{introWords.map((word,i)=><span key={word} aria-hidden="true" className={`intro-word ${introStep===i?'word-active':''}`} data-passed={introStep>i}>{word}</span>)}</div></>:scene===1?<><p className="eyebrow">01 / AI & MOGELIJKHEDEN</p><h2>Van nieuwsgierigheid<br/>naar <em>mogelijkheden.</em></h2><p className="lead">AI is voor mij geen toekomstmuziek.<br/>Het is iets waar ik al vier jaar mee bezig ben.</p><p>Door te experimenteren ontdek ik wat er mogelijk is. Ik probeer ideeën uit, stel betere vragen en zoek uit hoe AI helpt om iets te maken dat er eerst nog niet was.</p><p>Wat mij drijft? De stap van ‘zou dit kunnen?’ naar ‘het werkt’. Juist de combinatie van creativiteit en techniek maakt dat interessant.</p><div className="detail-tags"><span><Sparkles size={15}/> AI toepassen</span><span>Experimenteren</span><span>Blijven leren</span></div></>:scene===2?<><p className="eyebrow">02 / CODE & EXPERIMENTEN</p><h2>Een idee is het begin.<br/><em>Bouwen is de volgende stap.</em></h2><p className="lead">Naast AI trekt ook code me steeds meer.</p><p>Ik wil begrijpen hoe digitale dingen werken — en hoe ik ze zelf kan maken. Code geeft me de ruimte om ideeën tastbaar en interactief te maken.</p><p>Dit portfolio is het begin van die ontdekkingsreis. Hier ontstaat straks een verzameling van wat ik maak, probeer en leer.</p><div className="project-note"><Code2 size={22}/><div><strong>Mijn portfolio</strong><span>Eerste stap · In ontwikkeling</span></div><span className="project-number">001</span></div></>:<><p className="eyebrow">03 / DE MENS ERACHTER</p><h2>Hoi, ik ben Dani.<br/><em>Nieuwsgierigheid als startpunt.</em></h2><p className="lead">Veel interesse in AI. Een groeiende liefde voor code. En vooral: zin om te maken.</p><p>De afgelopen vier jaar heb ik veel tijd gestoken in het ontdekken van AI. Door ermee te werken en dingen uit te proberen, heb ik geleerd wat je ermee kunt doen.</p><p>Ik hoef nog niet precies in één functietitel te passen. Ik bouw liever verder aan wat ik kan — en laat hier zien waar dat toe leidt.</p><div className="signature">Dani Roemgens<span>AI & creatieve technologie</span></div></>}
  </section>)}</div>
  <footer className="footer"><div className="footer-brand"><span className="status-dot"/> DANI ROEMGENS <span className="footer-sub">AI & CODE</span></div><div className="scene-navigation"><span className="scene-count">0{active+1}<span> / 04</span></span><button disabled={active===0&&introStep===0} onClick={()=>move(-1)} aria-label="Vorig onderdeel"><ArrowLeft size={18}/></button><div className="progress"><span style={{width:`${((active===0?introStep:active+3)/6)*100}%`}}/></div><button disabled={active===3} onClick={()=>move(1)} aria-label="Volgend onderdeel"><ArrowRight size={18}/></button></div></footer>
 </main>;
}
