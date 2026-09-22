'use client';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CustomCursor } from '@/components/portfolio/custom-cursor';
import { Portrait } from '@/components/portfolio/portrait';
import {
  PortfolioSections,
  SectionLink,
} from '@/components/portfolio/sections';
import { usePortfolioJourney } from '@/hooks/use-portfolio-journey';
import { introWords, sections } from '@/lib/journey';

export default function Home() {
  const { journey, go, move } = usePortfolioJourney();
  const { scene: active, step } = journey;
  const portraitScene =
    active === 0 ? 0 : active === 1 || active === 2 ? 1 : active === 5 ? 3 : 2;
  const reading = [2, 3, 4].includes(active);
  return (
    <main
      className={`portfolio scene-${active} ${reading ? 'portfolio--reading' : ''}`}
    >
      <CustomCursor />
      <Portrait scene={portraitScene} step={step} />
      <SectionLink scene={1} id="start" go={go} className="skip-link">
        Naar het portfolio
      </SectionLink>
      <header className="header">
        <SectionLink scene={0} id="intro" go={go} className="monogram">
          <span className="sr-only">Dani Roemgens — intro</span>DR
        </SectionLink>
        <nav aria-label="Hoofdnavigatie">
          {[2, 3, 5].map((index) => (
            <a
              key={index}
              href={`#${sections[index].id}`}
              aria-current={active === index ? 'location' : undefined}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                go(index);
              }}
            >
              {sections[index].label}
            </a>
          ))}
        </nav>
        <SectionLink scene={6} id="contact" go={go} className="contact-button">
          Contact <ArrowUpRight size={16} />
        </SectionLink>
      </header>
      <div className="scenes">
        {sections.map((section, scene) => (
          <section
            key={section.id}
            id={section.id}
            tabIndex={-1}
            className={`scene-content ${scene === 0 ? 'intro-content' : 'portfolio-panel'} ${active === scene ? 'is-active' : ''}`}
            data-position={scene < active ? 'before' : 'after'}
            aria-label={section.label}
            aria-hidden={active !== scene}
            inert={active !== scene}
          >
            {scene === 0 ? (
              <div className="intro-lockup">
                <div className="intro-caption">
                  <h1>
                    Dani Roemgens<span>BUILDING WITH AI, CODE & DESIGN</span>
                  </h1>
                </div>
                <div
                  className="intro-words"
                  aria-live="polite"
                  aria-atomic="true"
                  lang="en"
                >
                  <span className="sr-only">{introWords[step]}</span>
                  {introWords.map((word, index) => (
                    <span
                      key={word}
                      aria-hidden="true"
                      className={`intro-word ${step === index ? 'word-active' : ''}`}
                      data-passed={step > index}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <PortfolioSections scene={scene} go={go} />
            )}
          </section>
        ))}
      </div>
      <footer className="footer">
        <div className="footer-brand">
          <span className="status-dot" /> DANI ROEMGENS{' '}
          <span className="footer-sub">AI & DIGITAL DEVELOPER</span>
        </div>
        <div className="scene-navigation">
          <button
            disabled={active === 0 && step === 0}
            onClick={() => move(-1)}
            aria-label="Vorig onderdeel"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="progress" aria-hidden="true">
            <span
              style={{
                width: `${((active === 0 ? step : active + introWords.length - 1) / (sections.length + introWords.length - 2)) * 100}%`,
              }}
            />
          </div>
          <button
            disabled={active === sections.length - 1}
            onClick={() => move(1)}
            aria-label="Volgend onderdeel"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </footer>
    </main>
  );
}
