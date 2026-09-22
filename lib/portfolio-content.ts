/** Public portfolio content. Leave unknown URLs and case details null; never use fake links. */
export const contact = {
  email: 'daniroemgens@gmail.com' as string | null,
  linkedin: 'https://www.linkedin.com/in/dani-roemgens-816318282/' as
    | string
    | null,
  github: 'https://github.com/devwithdani' as string | null,
  cv: null as string | null,
};
export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  problem: string | null;
  solution: string | null;
  technologies: string[];
  result: string | null;
  media: {
    src: string;
    alt: string;
    kind: 'image' | 'video';
    captions?: string;
  } | null;
  links: { label: string; href: string }[];
};
