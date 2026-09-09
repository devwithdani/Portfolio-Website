/** Public portfolio content. Leave unknown URLs and case details null; never use fake links. */
export const contact = {
  email: null as string | null,
  linkedin: null as string | null,
  github: null as string | null,
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
  media: { src: string; alt: string; kind: 'image' | 'video'; captions?: string } | null;
  links: { label: string; href: string }[];
};
export const projects: Project[] = [
  {
    id: 'ai-control-center', title: 'AI Control Center', category: 'AI · Digital Product',
    summary: 'Een eigen AI control center, onderdeel van mijn werk aan AI-tools en digitale producten.',
    role: 'Eigen project — concept en ontwikkeling', problem: null, solution: null,
    technologies: [], result: null, media: null, links: [],
  },
  {
    id: 'festival', title: 'Festival: web & tickets', category: 'Web Development · Design',
    summary: 'Een website en ticketsysteem, aangevuld met digitale uitingen voor social media.',
    role: 'Website, ticketsysteem en digitale/social-media-uitingen', problem: null,
    solution: 'Een website en ticketsysteem voor een festival, met bijbehorende digitale communicatie.',
    technologies: [], result: null, media: null, links: [],
  },
  {
    id: 'web-branding', title: 'Websites & branding', category: 'Web Development · Branding',
    summary: 'Websites, branding en digitale werkzaamheden voor verschillende ondernemersprojecten.',
    role: 'Webdevelopment, branding en digitale uitvoering', problem: null, solution: null,
    technologies: [], result: null, media: null, links: [],
  },
  {
    id: 'portfolio', title: 'Persoonlijk portfolio', category: 'Development · Design',
    summary: 'Een persoonlijke website waarin fotografie, typografie en een interactieve scroll-intro samenkomen.',
    role: 'Concept, vormgeving en ontwikkeling met AI-ondersteuning',
    problem: 'Mijn achtergrond, werk en manier van bouwen helder presenteren aan werkgevers en opdrachtgevers.',
    solution: 'Een portfolio met een scroll-intro, projectcases, ervaring en directe navigatie naar de relevante informatie.',
    technologies: ['React', 'TypeScript', 'Vinext', 'CSS'], result: null, media: null, links: [],
  },
];
export const experience = [
  { name: 'Independent projects', role: 'AI · Development · Automation', text: 'Eigen websites, AI-tools en een AI control center. Zelfstandig leren door ideeën te bouwen, te testen en verder te ontwikkelen.' },
  { name: 'Digital & Creative Projects', role: 'Web Development · Branding · Digital', text: 'Websites, branding en digitale werkzaamheden voor ondernemersprojecten binnen het Nederlandse gereguleerde cannabisexperiment. Voor een festival werkte ik aan een website, ticketsysteem en social-media-uitingen.' },
  { name: 'Dr. Hitti Gezondheidsmiddelen', role: 'IT / Technical Support', text: 'Technische ondersteuning bij computers, interne software en callsystemen. Samen met het IT-team technische problemen onderzoeken en oplossen.' },
  { name: 'NG Perfumes', role: 'Logistiek medewerker', text: 'Werkervaring in de logistiek.' },
  { name: 'Jumbo', role: 'Medewerker', text: 'Werkervaring in de supermarkt.' },
];
export const expertise = [
  { title: 'AI', description: 'Vrijwel dagelijks werken met AI en onderzoeken hoe het bruikbaar wordt in digitale producten.', items: ['AI-tools', 'LLMs', 'AI-workflows', 'Automatisering'] },
  { title: 'Development', description: 'Ideeën vertalen naar websites en interactieve producten. Deze site is gebouwd met React, TypeScript en Vinext.', items: ['JavaScript / TypeScript', 'React', 'Vinext', 'HTML / CSS', 'Frontend'] },
  { title: 'Design', description: 'Vormgeving die een product duidelijk en herkenbaar maakt, van interface tot visuele identiteit.', items: ['UI & webdesign', 'Digital design', 'Branding'], note: 'Aanvullende interesse: 3D en de verbinding tussen design en techniek.' },
];
