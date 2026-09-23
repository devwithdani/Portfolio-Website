'use client';
import { ArrowLeft } from 'lucide-react';
import { LanguageToggle } from '@/components/portfolio/language-toggle';
import { LanguageProvider, useLanguage } from '@/lib/i18n';
import { copy } from '@/lib/translations';

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}

function PrivacyContent() {
  const { lang } = useLanguage();
  const t = copy[lang].privacy;
  return (
    <main className="privacy-page">
      <div className="privacy-page-inner">
        <div className="privacy-page-top">
          <a href="/" className="privacy-back-link">
            <ArrowLeft size={16} /> {t.backLink}
          </a>
          <LanguageToggle />
        </div>
        <p className="privacy-updated">{t.updated}</p>
        <h1>{t.title}</h1>
        <p className="privacy-intro">{t.intro}</p>
        {t.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
