/* oxlint-disable next/no-img-element -- Native local images preserve the existing transform-based portrait; Vinext has no configured image optimizer. */
'use client';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { projects, experience, expertise, contact, type Project } from '@/lib/portfolio-content';
import type { MouseEvent } from 'react';

type Go = (scene: number) => unknown;
export function SectionLink({ scene, id, children, go, className = '' }: { scene: number; id: string; children: React.ReactNode; go: Go; className?: string }) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); go(scene);
  };
  return <a href={`#${id}`} onClick={navigate} className={className}>{children}</a>;
}
function ProjectMedia({ media }: { media: Project['media'] }) {
  if (!media) return null;
  return media.kind === 'video'
    ? <video className="case-media" src={media.src} controls preload="none" aria-label={media.alt}><track kind="captions" label="Nederlands" srcLang="nl" src={media.captions} /></video>
    : <img width={1600} height={1000} className="case-media" src={media.src} alt={media.alt} loading="lazy" decoding="async" />;
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card">
    {project.media?.kind === 'image' && <img width={1600} height={1000} className="project-thumbnail" src={project.media.src} alt={project.media.alt} loading="lazy" decoding="async" />}
    <div className="project-topline"><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
    <h3>{project.title}</h3><p>{project.summary}</p>
    <Dialog>
      <DialogTrigger className="case-trigger">Bekijk project <ArrowUpRight size={18} /></DialogTrigger>
      <DialogContent className="project-dialog" showCloseButton={false}>
        <DialogClose className="case-close" aria-label="Project sluiten"><X size={20} /></DialogClose>
        <p className="section-kicker">{project.category}</p>
        <DialogTitle className="case-title">{project.title}</DialogTitle>
        <DialogDescription className="case-summary">{project.summary}</DialogDescription>
        <ProjectMedia media={project.media} />
        <dl className="case-facts">
          <div><dt>Mijn rol</dt><dd>{project.role}</dd></div>
          <div><dt>Probleem</dt><dd>{project.problem ?? 'De probleemstelling wordt nog toegevoegd.'}</dd></div>
          <div><dt>Oplossing</dt><dd>{project.solution ?? 'De aanpak en oplossing worden nog toegevoegd.'}</dd></div>
          <div><dt>Technologie</dt><dd>{project.technologies.length ? project.technologies.join(' · ') : 'De gebruikte technologieën volgen bij de volledige case.'}</dd></div>
          {project.result && <div><dt>Resultaat</dt><dd>{project.result}</dd></div>}
        </dl>
        {project.links.length > 0 ? <div className="case-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={16} /></a>)}</div> : <p className="case-note">Meer beelden, details en projectlinks volgen.</p>}
      </DialogContent>
    </Dialog>
  </article>;
}
export function PortfolioSections({ scene, go }: { scene: number; go: Go }) {
  if (scene === 1) return <div className="panel-inner hero-panel">
    <p className="section-kicker"><span>01</span> DANI ROEMGENS</p>
    <h2>AI & Digital<br />Developer<span className="period">.</span></h2>
    <div className="hero-story">
      <p><strong>Ik bouw liever iets dan dat ik er alleen over praat.</strong></p>
      <p>Geef me een idee, een probleem of zelfs maar een halve gedachte en ik wil weten hoe ik er iets werkends van kan maken. Soms wordt dat een website, soms een eigen tool, een automatisering of iets met AI waarvan ik van tevoren zelf nog niet precies weet waar het eindigt.</p>
      <p>Juist dat proces vind ik interessant: uitzoeken hoe iets werkt, tegen problemen aanlopen, opnieuw proberen en uiteindelijk iets bouwen dat eerst alleen in je hoofd bestond.</p>
      <p>Ik combineer development, AI en design omdat ik niet alleen wil dat iets technisch werkt. Het moet logisch voelen, goed ogen en vooral daadwerkelijk bruikbaar zijn.</p>
      <p>Nieuwe technieken leer ik het liefst niet uit alleen theorie, maar door ze meteen toe te passen in echte projecten. Zo blijf ik mezelf uitdagen, nieuwe dingen proberen en steeds beter begrijpen wat er allemaal mogelijk is met technologie.</p>
      <p><strong>Van “zou dit kunnen?” naar “het werkt.” Daar krijg ik energie van.</strong></p>
    </div>
  </div>;
  if (scene === 2) return <div className="panel-inner">
    <p className="section-kicker"><span>02</span> PROJECTEN</p>
    <h2>Coming soon.</h2>
  </div>;
  if (scene === 3) return <div className="panel-inner">
    <p className="section-kicker"><span>03</span> ERVARING</p><div className="section-heading"><h2>Een praktische basis.</h2><p>Mijn achtergrond verbindt werkervaring, technische ondersteuning en digitale projecten.</p></div>
    <ol className="experience-timeline">{experience.map(item => <li key={item.name}><div><h3>{item.name}</h3><span>{item.role}</span></div><p>{item.text}</p></li>)}</ol>
  </div>;
  if (scene === 4) return <div className="panel-inner">
    <p className="section-kicker"><span>04</span> EXPERTISE</p><div className="section-heading"><h2>AI. Development. Design.</h2><p>Drie gebieden die in mijn projecten samenkomen.</p></div>
    <div className="expertise-grid">{expertise.map(area => <article key={area.title}><h3>{area.title}</h3><p>{area.description}</p><ul>{area.items.map(item => <li key={item}>{item}</li>)}</ul>{area.note && <p className="expertise-note">{area.note}</p>}</article>)}</div>
    <p className="learning-note">Ik verdiep me verder in AI-agents, API-integraties en de backend achter digitale producten. Wat ik leer, pas ik toe in eigen werk.</p>
    <SectionLink scene={5} id="over-mij" go={go} className="section-next">De persoon achter het werk <ArrowRight size={18} /></SectionLink>
  </div>;
  if (scene === 5) return <div className="panel-inner about-panel">
    <p className="section-kicker"><span>05</span> OVER MIJ</p><h2>Ik leer door<br />dingen te bouwen.</h2>
    <p className="panel-lead">Ik ben Dani Roemgens, 21 jaar. Ik werk op het snijvlak van AI, development en design.</p>
    <p className="panel-copy">Mijn interesse groeide van technische problemen oplossen naar zelf digitale oplossingen maken. Bij IT-ondersteuning leerde ik problemen samen met een team onderzoeken. In digitale projecten ontdekte ik hoeveel je zelf kunt bouwen door gericht uit te proberen en door te zetten.</p>
    <p className="panel-copy">Ik leer zelfstandig, werk vrijwel dagelijks met AI en bouw websites, tools en eigen producten. Daarbij wil ik begrijpen waarom iets werkt — en hoe ik het duidelijker, bruikbaarder en beter kan maken.</p>
    <p className="panel-copy">Ik zoek een omgeving waarin ik kan bijdragen, verder kan leren en samen met anderen nuttige dingen kan bouwen.</p>
    <SectionLink scene={6} id="contact" go={go} className="primary-link">Kennismaken <ArrowUpRight size={18} /></SectionLink>
  </div>;
  return <div className="panel-inner contact-panel">
    <p className="section-kicker"><span>06</span> CONTACT</p><h2>Iets bouwen?</h2><p className="panel-lead">Een rol in je team, een digitaal project of gewoon kennismaken? Ik ga graag in gesprek.</p>
    <div className="contact-links">
      {[
        { label: 'E-mail', value: contact.email, href: contact.email ? `mailto:${contact.email}` : null },
        { label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin },
        { label: 'GitHub', value: contact.github, href: contact.github },
        { label: 'CV', value: contact.cv, href: contact.cv },
      ].map(item => item.href ? <a key={item.label} href={item.href} target={item.label === 'E-mail' ? undefined : '_blank'} rel="noreferrer"><span>{item.label}</span><ArrowUpRight size={20} /></a> : <div key={item.label} className="contact-pending"><span>{item.label}</span><span>Volgt binnenkort</span></div>)}
    </div>
    <p className="case-note">Mijn contactgegevens en profielpagina’s worden binnenkort toegevoegd.</p>
    <div className="signature">Dani Roemgens<span>AI & Digital Developer</span></div>
  </div>;
}
