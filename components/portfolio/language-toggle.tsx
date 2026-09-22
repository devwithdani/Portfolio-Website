'use client';
import { useLanguage, type Lang } from '@/lib/i18n';
import { copy } from '@/lib/translations';

const options: Lang[] = ['nl', 'en'];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className="language-toggle"
      role="group"
      aria-label={copy[lang].languageToggleAria}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={lang === option}
          onClick={() => setLang(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
