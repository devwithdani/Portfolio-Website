/* oxlint-disable next/no-img-element -- Native local images preserve the existing transform-based portrait; Vinext has no configured image optimizer. */
'use client';
import { ArrowUpRight, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { contact, type Project } from '@/lib/portfolio-content';
import { useLanguage } from '@/lib/i18n';
import { copy } from '@/lib/translations';
import { useState, type MouseEvent } from 'react';

type Go = (scene: number) => unknown;
export function SectionLink({
  scene,
  id,
  children,
  go,
  className = '',
}: {
  scene: number;
  id: string;
  children: React.ReactNode;
  go: Go;
  className?: string;
}) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    go(scene);
  };
  return (
    <a href={`#${id}`} onClick={navigate} className={className}>
      {children}
    </a>
  );
}
function ProjectMedia({ media }: { media: Project['media'] }) {
  if (!media) return null;
  return media.kind === 'video' ? (
    <video
      className="case-media"
      src={media.src}
      controls
      preload="none"
      aria-label={media.alt}
    >
      <track
        kind="captions"
        label="Nederlands"
        srcLang="nl"
        src={media.captions}
      />
    </video>
  ) : (
    <img
      width={1600}
      height={1000}
      className="case-media"
      src={media.src}
      alt={media.alt}
      loading="lazy"
      decoding="async"
    />
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { lang } = useLanguage();
  const t = copy[lang].projectDialog;
  return (
    <article className="project-card">
      {project.media?.kind === 'image' && (
        <img
          width={1600}
          height={1000}
          className="project-thumbnail"
          src={project.media.src}
          alt={project.media.alt}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="project-topline">
        <span>{project.category}</span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <Dialog>
        <DialogTrigger className="case-trigger">
          {t.viewProject} <ArrowUpRight size={18} />
        </DialogTrigger>
        <DialogContent className="project-dialog" showCloseButton={false}>
          <DialogClose className="case-close" aria-label={t.closeAria}>
            <X size={20} />
          </DialogClose>
          <p className="section-kicker">{project.category}</p>
          <DialogTitle className="case-title">{project.title}</DialogTitle>
          <DialogDescription className="case-summary">
            {project.summary}
          </DialogDescription>
          <ProjectMedia media={project.media} />
          <dl className="case-facts">
            <div>
              <dt>{t.role}</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>{t.problem}</dt>
              <dd>{project.problem ?? t.problemFallback}</dd>
            </div>
            <div>
              <dt>{t.solution}</dt>
              <dd>{project.solution ?? t.solutionFallback}</dd>
            </div>
            <div>
              <dt>{t.technology}</dt>
              <dd>
                {project.technologies.length
                  ? project.technologies.join(' · ')
                  : t.technologyFallback}
              </dd>
            </div>
            {project.result && (
              <div>
                <dt>{t.result}</dt>
                <dd>{project.result}</dd>
              </div>
            )}
          </dl>
          {project.links.length > 0 ? (
            <div className="case-links">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          ) : (
            <p className="case-note">{t.moreNote}</p>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}
export function PortfolioSections({ scene, go }: { scene: number; go: Go }) {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = () => {
    if (!contact.email) return;
    navigator.clipboard?.writeText(contact.email).catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };
  if (scene === 1)
    return (
      <div className="panel-inner hero-panel">
        <p className="section-kicker">
          <span>01</span> {t.hero.kickerLabel}
        </p>
        <h2>
          {t.hero.headingLine1}
          <br />
          {t.hero.headingLine2}
          <span className="period">.</span>
        </h2>
        <div className="hero-story">
          <p>
            <strong>{t.hero.lead}</strong>
          </p>
          {t.hero.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <strong>{t.hero.closing}</strong>
          </p>
        </div>
      </div>
    );
  if (scene === 2)
    return (
      <div className="panel-inner">
        <p className="section-kicker">
          <span>02</span> {t.projectsScene.kickerLabel}
        </p>
        <h2>{t.projectsScene.heading}</h2>
      </div>
    );
  if (scene === 3)
    return (
      <div className="panel-inner">
        <p className="section-kicker">
          <span>03</span> {t.experienceScene.kickerLabel}
        </p>
        <div className="section-heading">
          <h2>{t.experienceScene.heading}</h2>
          <p>{t.experienceScene.lead}</p>
        </div>
        <ol className="experience-timeline">
          {t.experience.map((item) => (
            <li key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <span>{item.role}</span>
              </div>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  if (scene === 4)
    return (
      <div className="panel-inner">
        <p className="section-kicker">
          <span>04</span> {t.expertiseScene.kickerLabel}
        </p>
        <div className="section-heading">
          <h2>{t.expertiseScene.heading}</h2>
          <p>{t.expertiseScene.lead}</p>
        </div>
        <div className="expertise-grid">
          {t.expertise.map((area) => (
            <article key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {area.note && <p className="expertise-note">{area.note}</p>}
            </article>
          ))}
        </div>
        <p className="learning-note">{t.expertiseScene.learningNote}</p>
      </div>
    );
  if (scene === 5)
    return (
      <div className="panel-inner about-panel">
        <p className="section-kicker">
          <span>05</span> {t.about.kickerLabel}
        </p>
        <h2>
          {t.about.headingLine1}
          <br />
          {t.about.headingLine2}
        </h2>
        {t.about.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={index === 0 ? 'panel-lead' : 'panel-copy'}
          >
            {paragraph}
          </p>
        ))}
        <SectionLink scene={6} id="contact" go={go} className="primary-link">
          {t.about.cta} <ArrowUpRight size={18} />
        </SectionLink>
      </div>
    );
  return (
    <div className="panel-inner contact-panel">
      <p className="section-kicker">
        <span>06</span> {t.contactScene.kickerLabel}
      </p>
      <h2>{t.contactScene.heading}</h2>
      <p className="panel-lead">{t.contactScene.lead}</p>
      <div className="contact-links">
        {[
          {
            label: 'E-mail',
            value: contact.email,
            href: contact.email ? `mailto:${contact.email}` : null,
          },
          {
            label: 'LinkedIn',
            value: contact.linkedin,
            href: contact.linkedin,
          },
          { label: 'GitHub', value: contact.github, href: contact.github },
          { label: 'CV', value: contact.cv, href: contact.cv },
        ].map((item) =>
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.label === 'E-mail' ? undefined : '_blank'}
              rel="noreferrer"
              onClick={item.label === 'E-mail' ? copyEmail : undefined}
            >
              <span className="contact-label">
                {item.label}
                {item.label === 'E-mail' && (
                  <span className="contact-value">{item.value}</span>
                )}
              </span>
              {item.label === 'E-mail' && emailCopied ? (
                <span className="contact-copied">
                  {t.contactScene.copied} <Check size={18} />
                </span>
              ) : (
                <ArrowUpRight size={20} />
              )}
            </a>
          ) : (
            <div key={item.label} className="contact-pending">
              <span>{item.label}</span>
              <span>{t.contactScene.comingSoon}</span>
            </div>
          ),
        )}
      </div>
      <div className="signature">
        Dani Roemgens<span>{t.contactScene.signatureRole}</span>
      </div>
    </div>
  );
}
