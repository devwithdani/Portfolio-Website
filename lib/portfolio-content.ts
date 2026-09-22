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
export const projects: Project[] = [
  {
    id: 'ai-control-center',
    title: 'AI Control Center',
    category: 'AI · Digital Product',
    summary:
      'Een eigen AI control center, onderdeel van mijn werk aan AI-tools en digitale producten.',
    role: 'Eigen project — concept en ontwikkeling',
    problem: null,
    solution: null,
    technologies: [],
    result: null,
    media: null,
    links: [],
  },
  {
    id: 'festival',
    title: 'Festival: web & tickets',
    category: 'Web Development · Design',
    summary:
      'Een website en ticketsysteem, aangevuld met digitale uitingen voor social media.',
    role: 'Website, ticketsysteem en digitale/social-media-uitingen',
    problem: null,
    solution:
      'Een website en ticketsysteem voor een festival, met bijbehorende digitale communicatie.',
    technologies: [],
    result: null,
    media: null,
    links: [],
  },
  {
    id: 'web-branding',
    title: 'Websites & branding',
    category: 'Web Development · Branding',
    summary:
      'Websites, branding en digitale werkzaamheden voor verschillende ondernemersprojecten.',
    role: 'Webdevelopment, branding en digitale uitvoering',
    problem: null,
    solution: null,
    technologies: [],
    result: null,
    media: null,
    links: [],
  },
  {
    id: 'portfolio',
    title: 'Persoonlijk portfolio',
    category: 'Development · Design',
    summary:
      'Een persoonlijke website waarin fotografie, typografie en een interactieve scroll-intro samenkomen.',
    role: 'Concept, vormgeving en ontwikkeling met AI-ondersteuning',
    problem:
      'Mijn achtergrond, werk en manier van bouwen helder presenteren aan werkgevers en opdrachtgevers.',
    solution:
      'Een portfolio met een scroll-intro, projectcases, ervaring en directe navigatie naar de relevante informatie.',
    technologies: ['React', 'TypeScript', 'Vinext', 'CSS'],
    result: null,
    media: null,
    links: [],
  },
];
export const experience = [
  {
    name: 'Independent projects',
    role: 'AI · Development · Automation',
    text: 'Ik ontwikkel eigen websites, AI-tools en een AI control center, van idee tot werkend prototype. Door nieuwe technieken direct toe te passen en mijn projecten te verbeteren, bouw ik zelfstandig aan mijn kennis van development en automatisering, met aandacht voor ontwerp en gebruiksgemak.',
  },
  {
    name: 'Chris van Asselt',
    role: 'Brand Manager · Digital Marketing · Events',
    text: 'Als brand manager help ik Chris van Asselt bij het opbouwen en ontwikkelen van zijn eigen merk. Ik heb zijn website gebouwd en verzorg de online kant van zijn events, waaronder de digitale promotie en het opzetten en beheren van advertentiecampagnes. Daarnaast ga ik met hem mee naar events in het buitenland en ondersteun ik hem bij zijn aanwezigheid daar.',
  },
  {
    name: 'Jeason Bouwservice',
    role: 'Softwareontwikkeling · Automatisering · Web & IT',
    text: 'Twee maanden fulltime meegelopen met zelfstandig timmerman Jeason Eijwoudt om zijn werkprocessen en klantcontact in de praktijk te begrijpen. Op basis daarvan ontwikkel ik software om calculaties, facturatie, klantbeheer en boekhouding te vereenvoudigen en tijd te besparen. Daarnaast heb ik zijn bedrijfswebsite gebouwd en een eigen bedrijfsserver ingericht.',
  },
  {
    name: 'Down Under BV',
    role: 'IT-inrichting · Kassasystemen · Serverbeheer',
    text: 'Bijgedragen aan de IT-inrichting van het bedrijf, van het kassasysteem tot de eigen serveromgeving. Een kassasysteem met voorraadbeheer opgezet om verkoop en voorraad overzichtelijk bij te houden. Daarnaast een eigen server ingericht voor onder andere het camerasysteem en andere interne toepassingen, met de nadruk op een praktische inrichting die aansluit op het dagelijkse werk.',
  },
  {
    name: 'Dr. Hittich gezondheidsmiddelen',
    role: 'IT / Technical Support',
    text: 'Begonnen in het callcentrum en doorgestroomd naar IT / Technical Support. In die rol hielp ik collega’s bij technische problemen en werkte ik aan het oplossen van storingen in computers, interne software en callsystemen.',
  },
  {
    name: 'CS50',
    role: 'Cursus · Volledig afgerond',
    text: 'Tijdens CS50 heb ik de basis van programmeren geleerd: code schrijven, logisch denken en problemen stap voor stap oplossen. De cursus heb ik volledig afgerond.',
  },
  {
    name: 'Jumbo',
    role: 'Kassaverantwoordelijke',
    text: 'Verantwoordelijk voor de kassa’s tijdens mijn avonddiensten.',
  },
];
export const expertise = [
  {
    title: 'AI',
    description:
      'Vrijwel dagelijks werken met AI en onderzoeken hoe het bruikbaar wordt in digitale producten.',
    items: ['AI-tools', 'LLMs', 'AI-workflows', 'Automatisering'],
  },
  {
    title: 'Development',
    description:
      'Ideeën vertalen naar websites en interactieve producten. Deze site is gebouwd met React, TypeScript en Vinext.',
    items: [
      'JavaScript / TypeScript',
      'React',
      'Vinext',
      'HTML / CSS',
      'Frontend',
    ],
  },
  {
    title: 'Design',
    description:
      'Vormgeving die een product duidelijk en herkenbaar maakt, van interface tot visuele identiteit.',
    items: ['UI & webdesign', 'Digital design', 'Branding'],
    note: 'Aanvullende interesse: 3D en de verbinding tussen design en techniek.',
  },
];
