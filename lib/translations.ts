import type { Lang } from './i18n';
import type { Project } from './portfolio-content';

type Experience = { name: string; role: string; text: string };
type Expertise = {
  title: string;
  description: string;
  items: string[];
  note?: string;
};

type Copy = {
  skipLink: string;
  navLabel: string;
  contactCta: string;
  prevAria: string;
  nextAria: string;
  languageToggleAria: string;
  portraitAria: string;
  portraitAlt0: string;
  portraitAlt1: string;
  portraitAlt3: string;
  hero: {
    kickerLabel: string;
    headingLine1: string;
    headingLine2: string;
    lead: string;
    paragraphs: string[];
    closing: string;
  };
  projectsScene: {
    kickerLabel: string;
    heading: string;
  };
  experienceScene: {
    kickerLabel: string;
    heading: string;
    lead: string;
  };
  expertiseScene: {
    kickerLabel: string;
    heading: string;
    lead: string;
    learningNote: string;
  };
  about: {
    kickerLabel: string;
    headingLine1: string;
    headingLine2: string;
    paragraphs: string[];
    cta: string;
  };
  contactScene: {
    kickerLabel: string;
    heading: string;
    lead: string;
    comingSoon: string;
    copied: string;
    signatureRole: string;
  };
  projectDialog: {
    viewProject: string;
    closeAria: string;
    role: string;
    problem: string;
    problemFallback: string;
    solution: string;
    solutionFallback: string;
    technology: string;
    technologyFallback: string;
    result: string;
    moreNote: string;
  };
  experience: Experience[];
  expertise: Expertise[];
  projects: Project[];
};

export const copy: Record<Lang, Copy> = {
  nl: {
    skipLink: 'Naar het portfolio',
    navLabel: 'Hoofdnavigatie',
    contactCta: 'Contact',
    prevAria: 'Vorig onderdeel',
    nextAria: 'Volgend onderdeel',
    languageToggleAria: 'Taal wisselen',
    portraitAria: 'Portretten van Dani Roemgens',
    portraitAlt0: 'Dani Roemgens, zwart-witportret in een donker overhemd',
    portraitAlt1: 'Dani Roemgens kijkt naar links',
    portraitAlt3: 'Dani Roemgens buiten op een plein',
    hero: {
      kickerLabel: 'DANI ROEMGENS',
      headingLine1: 'AI & Digital',
      headingLine2: 'Developer',
      lead: 'Ik bouw liever iets dan dat ik er alleen over praat.',
      paragraphs: [
        'Geef me een idee, een probleem of zelfs maar een halve gedachte en ik wil weten hoe ik er iets werkends van kan maken. Soms wordt dat een website, soms een eigen tool, een automatisering of iets met AI waarvan ik van tevoren zelf nog niet precies weet waar het eindigt.',
        'Juist dat proces vind ik interessant: uitzoeken hoe iets werkt, tegen problemen aanlopen, opnieuw proberen en uiteindelijk iets bouwen dat eerst alleen in je hoofd bestond.',
        'Ik combineer development, AI en design omdat ik niet alleen wil dat iets technisch werkt. Het moet logisch voelen, goed ogen en vooral daadwerkelijk bruikbaar zijn.',
        'Nieuwe technieken leer ik het liefst niet uit alleen theorie, maar door ze meteen toe te passen in echte projecten. Zo blijf ik mezelf uitdagen, nieuwe dingen proberen en steeds beter begrijpen wat er allemaal mogelijk is met technologie.',
      ],
      closing:
        'Van “zou dit kunnen?” naar “het werkt.” Daar krijg ik energie van.',
    },
    projectsScene: {
      kickerLabel: 'PROJECTEN',
      heading: 'Coming soon.',
    },
    experienceScene: {
      kickerLabel: 'ERVARING',
      heading: 'Een praktische basis.',
      lead: 'Mijn achtergrond verbindt werkervaring, technische ondersteuning en digitale projecten.',
    },
    expertiseScene: {
      kickerLabel: 'EXPERTISE',
      heading: 'AI. Development. Design.',
      lead: 'Drie gebieden die in mijn projecten samenkomen.',
      learningNote:
        'Ik verdiep me verder in AI-agents, API-integraties en de backend achter digitale producten. Wat ik leer, pas ik toe in eigen werk.',
    },
    about: {
      kickerLabel: 'OVER MIJ',
      headingLine1: 'Ik leer door',
      headingLine2: 'dingen te bouwen.',
      paragraphs: [
        'Ik ben Dani, 21 jaar, en ik ben van nature iemand die graag dingen uitzoekt, probeert en zelf wil begrijpen hoe iets werkt. Als ik ergens nieuwsgierig naar ben, blijf ik er meestal net zo lang mee bezig tot ik er iets van snap of iets werkends van heb gemaakt.',
        'Buiten development vind ik het belangrijk om ook gewoon te genieten van het leven. Ik breng graag tijd door met mijn vriendin, ga graag op vakantie en vind het leuk om nieuwe plekken te ontdekken. Even weg van een scherm doet soms net zoveel goed als een avond lang bouwen.',
        'Tegelijk ben ik iemand die moeilijk stil kan zitten als ik eenmaal een idee in mijn hoofd heb. Dat kan een website zijn, iets met AI, een tool, een nieuw concept of gewoon iets waarvan ik denk: dit moet slimmer kunnen.',
        'Ik leer vooral door te doen. Dingen proberen, fouten maken, opnieuw beginnen en stap voor stap beter begrijpen waarom iets werkt. Juist dat proces vind ik leuk.',
        'Uiteindelijk wil ik mezelf blijven ontwikkelen, werk doen waar ik energie van krijg en samen met andere mensen dingen bouwen waar je echt iets aan hebt.',
      ],
      cta: 'Kennismaken',
    },
    contactScene: {
      kickerLabel: 'CONTACT',
      heading: 'Iets bouwen?',
      lead: 'Een rol in je team, een digitaal project of gewoon kennismaken? Ik ga graag in gesprek.',
      comingSoon: 'Volgt binnenkort',
      copied: 'Gekopieerd',
      signatureRole: 'AI & Digital Developer',
    },
    projectDialog: {
      viewProject: 'Bekijk project',
      closeAria: 'Project sluiten',
      role: 'Mijn rol',
      problem: 'Probleem',
      problemFallback: 'De probleemstelling wordt nog toegevoegd.',
      solution: 'Oplossing',
      solutionFallback: 'De aanpak en oplossing worden nog toegevoegd.',
      technology: 'Technologie',
      technologyFallback:
        'De gebruikte technologieën volgen bij de volledige case.',
      result: 'Resultaat',
      moreNote: 'Meer beelden, details en projectlinks volgen.',
    },
    experience: [
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
    ],
    expertise: [
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
    ],
    projects: [
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
    ],
  },
  en: {
    skipLink: 'Skip to the portfolio',
    navLabel: 'Main navigation',
    contactCta: 'Contact',
    prevAria: 'Previous section',
    nextAria: 'Next section',
    languageToggleAria: 'Switch language',
    portraitAria: 'Portraits of Dani Roemgens',
    portraitAlt0: 'Dani Roemgens, black-and-white portrait in a dark shirt',
    portraitAlt1: 'Dani Roemgens looking to the left',
    portraitAlt3: 'Dani Roemgens outside on a square',
    hero: {
      kickerLabel: 'DANI ROEMGENS',
      headingLine1: 'AI & Digital',
      headingLine2: 'Developer',
      lead: "I'd rather build something than just talk about it.",
      paragraphs: [
        "Give me an idea, a problem, or even just half a thought, and I want to figure out how to turn it into something that actually works. Sometimes that becomes a website, sometimes a tool of my own, an automation, or something with AI where I don't fully know in advance where it will end up.",
        "That process is exactly what I find interesting: figuring out how something works, running into problems, trying again, and eventually building something that only existed in your head before.",
        "I combine development, AI, and design because I don't just want something to work technically. It has to feel logical, look good, and above all actually be usable.",
        "I'd rather not learn new techniques from theory alone, but by applying them directly in real projects. That way I keep challenging myself, trying new things, and getting a better understanding of what's possible with technology.",
      ],
      closing:
        'From “could this work?” to “it works.” That’s what gives me energy.',
    },
    projectsScene: {
      kickerLabel: 'PROJECTS',
      heading: 'Coming soon.',
    },
    experienceScene: {
      kickerLabel: 'EXPERIENCE',
      heading: 'A practical foundation.',
      lead: 'My background connects hands-on work experience, technical support, and digital projects.',
    },
    expertiseScene: {
      kickerLabel: 'EXPERTISE',
      heading: 'AI. Development. Design.',
      lead: 'Three areas that come together in my projects.',
      learningNote:
        "I'm further deepening my knowledge of AI agents, API integrations, and the backend behind digital products, and applying what I learn to my own work.",
    },
    about: {
      kickerLabel: 'ABOUT ME',
      headingLine1: 'I learn by',
      headingLine2: 'building things.',
      paragraphs: [
        "I'm Dani, 21 years old, and by nature I'm someone who likes to figure things out, try them, and understand how they work for myself. When I'm curious about something, I usually stick with it until I understand it or have built something that works.",
        "Outside of development, it's important to me to simply enjoy life too. I like spending time with my girlfriend, going on holiday, and discovering new places. Stepping away from a screen for a while sometimes does just as much good as a whole evening of building.",
        'At the same time, I find it hard to sit still once I have an idea in my head. That could be a website, something with AI, a tool, a new concept, or just something where I think: this should be able to work smarter.',
        'I learn mostly by doing. Trying things, making mistakes, starting over, and gradually understanding better why something works. That process is exactly what I enjoy.',
        'Ultimately, I want to keep developing myself, do work that gives me energy, and build things together with other people that are genuinely useful.',
      ],
      cta: 'Get in touch',
    },
    contactScene: {
      kickerLabel: 'CONTACT',
      heading: "Let's build something?",
      lead: "A role on your team, a digital project, or just getting in touch? I'd love to talk.",
      comingSoon: 'Coming soon',
      copied: 'Copied',
      signatureRole: 'AI & Digital Developer',
    },
    projectDialog: {
      viewProject: 'View project',
      closeAria: 'Close project',
      role: 'My role',
      problem: 'Problem',
      problemFallback: 'The problem statement will be added soon.',
      solution: 'Solution',
      solutionFallback: 'The approach and solution will be added soon.',
      technology: 'Technology',
      technologyFallback:
        'The technologies used will follow with the full case study.',
      result: 'Result',
      moreNote: 'More visuals, details, and project links will follow.',
    },
    experience: [
      {
        name: 'Independent projects',
        role: 'AI · Development · Automation',
        text: "I build my own websites, AI tools, and an AI control center, from idea to working prototype. By applying new techniques directly and continuously improving my projects, I build my knowledge of development and automation independently, with attention to design and usability.",
      },
      {
        name: 'Chris van Asselt',
        role: 'Brand Manager · Digital Marketing · Events',
        text: 'As brand manager, I help Chris van Asselt build and grow his personal brand. I built his website and handle the online side of his events, including digital promotion and setting up and managing ad campaigns. I also travel with him to events abroad and support him there.',
      },
      {
        name: 'Jeason Bouwservice',
        role: 'Software Development · Automation · Web & IT',
        text: "Spent two months working full-time alongside independent carpenter Jeason Eijwoudt to understand his work processes and client contact firsthand. Based on that, I'm developing software to simplify quoting, invoicing, client management, and bookkeeping, and to save time. I also built his company website and set up a dedicated company server.",
      },
      {
        name: 'Down Under BV',
        role: 'IT Setup · POS Systems · Server Management',
        text: "Contributed to the company's IT setup, from the point-of-sale system to its own server environment. Set up a POS system with inventory management to keep sales and stock organized. Also configured a dedicated server for the camera system and other internal applications, with a focus on a practical setup that fits day-to-day operations.",
      },
      {
        name: 'Dr. Hittich gezondheidsmiddelen',
        role: 'IT / Technical Support',
        text: 'Started in the call center and moved into IT / Technical Support. In that role, I helped colleagues with technical issues and worked on resolving problems with computers, internal software, and call systems.',
      },
      {
        name: 'CS50',
        role: 'Course · Fully completed',
        text: 'Through CS50, I learned the fundamentals of programming: writing code, thinking logically, and solving problems step by step. I completed the course in full.',
      },
      {
        name: 'Jumbo',
        role: 'Checkout Supervisor',
        text: 'Responsible for the checkouts during my evening shifts.',
      },
    ],
    expertise: [
      {
        title: 'AI',
        description:
          'Working with AI almost daily, exploring how it becomes genuinely useful in digital products.',
        items: ['AI tools', 'LLMs', 'AI workflows', 'Automation'],
      },
      {
        title: 'Development',
        description:
          'Translating ideas into websites and interactive products. This site itself is built with React, TypeScript, and Vinext.',
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
          'Design that makes a product clear and recognizable, from interface to visual identity.',
        items: ['UI & web design', 'Digital design', 'Branding'],
        note: 'Also interested in: 3D and the connection between design and technology.',
      },
    ],
    projects: [
      {
        id: 'ai-control-center',
        title: 'AI Control Center',
        category: 'AI · Digital Product',
        summary:
          'A personal AI control center, part of my work on AI tools and digital products.',
        role: 'Personal project — concept and development',
        problem: null,
        solution: null,
        technologies: [],
        result: null,
        media: null,
        links: [],
      },
      {
        id: 'festival',
        title: 'Festival: website & ticketing',
        category: 'Web Development · Design',
        summary:
          'A website and ticketing system, complemented by digital assets for social media.',
        role: 'Website, ticketing system, and digital/social media assets',
        problem: null,
        solution:
          'A website and ticketing system for a festival, together with the accompanying digital communication.',
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
          'Websites, branding, and digital work for several entrepreneurial projects.',
        role: 'Web development, branding, and digital execution',
        problem: null,
        solution: null,
        technologies: [],
        result: null,
        media: null,
        links: [],
      },
      {
        id: 'portfolio',
        title: 'Personal portfolio',
        category: 'Development · Design',
        summary:
          'A personal website that brings together photography, typography, and an interactive scroll intro.',
        role: 'Concept, design, and development with AI assistance',
        problem:
          'Clearly presenting my background, work, and way of building to employers and clients.',
        solution:
          'A portfolio with a scroll intro, project case studies, experience, and direct navigation to the relevant information.',
        technologies: ['React', 'TypeScript', 'Vinext', 'CSS'],
        result: null,
        media: null,
        links: [],
      },
    ],
  },
};
