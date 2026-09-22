import type { Lang } from './i18n';

export type Journey = { scene: number; step: number };
export const introWords = [
  'I like to build things.',
  'AI & Digital Developer.',
  'I turn ideas into reality.',
  'Let’s make something useful.',
];
export const sections: { id: string; label: Record<Lang, string> }[] = [
  { id: 'intro', label: { nl: 'Intro', en: 'Intro' } },
  { id: 'start', label: { nl: 'Dani Roemgens', en: 'Dani Roemgens' } },
  { id: 'projecten', label: { nl: 'Projecten', en: 'Projects' } },
  { id: 'ervaring', label: { nl: 'Ervaring', en: 'Experience' } },
  { id: 'expertise', label: { nl: 'Expertise', en: 'Expertise' } },
  { id: 'over-mij', label: { nl: 'Over mij', en: 'About me' } },
  { id: 'contact', label: { nl: 'Contact', en: 'Contact' } },
];
export function advanceJourney(current: Journey, direction: number): Journey {
  const delta = Math.sign(direction);
  if (!delta) return current;
  if (current.scene === 0) {
    if (delta > 0 && current.step < introWords.length - 1)
      return { scene: 0, step: current.step + 1 };
    if (delta < 0) return { scene: 0, step: Math.max(0, current.step - 1) };
    return { scene: 1, step: 0 };
  }
  if (current.scene === 1 && delta < 0)
    return { scene: 0, step: introWords.length - 1 };
  return {
    scene: Math.max(0, Math.min(sections.length - 1, current.scene + delta)),
    step: 0,
  };
}
export function sceneFromHash(hash: string): number {
  const id = hash.replace(/^#/, '');
  const legacy: Record<string, string> = {
    ai: 'start',
    code: 'projecten',
    content: 'start',
  };
  return sections.findIndex((section) => section.id === (legacy[id] ?? id));
}
