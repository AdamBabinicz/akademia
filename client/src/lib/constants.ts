import { Category, ScaleLevel, QuizQuestion } from "@/types/education";

// Definicja typu ScienceFact
export interface ScienceFact {
  id: string;
  titleKey: string;
  descriptionKey: string;
  contentKey: string;
  categoryKey: string;
  difficultyKey: "podstawowy" | "średni" | "zaawansowany";
  readTime: number;
  isLiked: boolean;
  isFeatured: boolean;
}

// Dane dla ciekawostek
export const SCIENCE_FACTS: ScienceFact[] = [
  {
    id: "1",
    titleKey: "facts.fact1.title",
    descriptionKey: "facts.fact1.description",
    contentKey: "facts.fact1.content",
    categoryKey: "fizyka",
    difficultyKey: "podstawowy",
    readTime: 2,
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "2",
    titleKey: "facts.fact2.title",
    descriptionKey: "facts.fact2.description",
    contentKey: "facts.fact2.content",
    categoryKey: "astronomia",
    difficultyKey: "podstawowy",
    readTime: 3,
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "3",
    titleKey: "facts.fact3.title",
    descriptionKey: "facts.fact3.description",
    contentKey: "facts.fact3.content",
    categoryKey: "biologia",
    difficultyKey: "podstawowy",
    readTime: 2,
    isLiked: false,
    isFeatured: false,
  },
  {
    id: "4",
    titleKey: "facts.fact4.title",
    descriptionKey: "facts.fact4.description",
    contentKey: "facts.fact4.content",
    categoryKey: "fizyka",
    difficultyKey: "średni",
    readTime: 4,
    isLiked: false,
    isFeatured: false,
  },
  {
    id: "5",
    titleKey: "facts.fact5.title",
    descriptionKey: "facts.fact5.description",
    contentKey: "facts.fact5.content",
    categoryKey: "astronomia",
    difficultyKey: "średni",
    readTime: 5,
    isLiked: false,
    isFeatured: false,
  },
  {
    id: "6",
    titleKey: "facts.fact6.title",
    descriptionKey: "facts.fact6.description",
    contentKey: "facts.fact6.content",
    categoryKey: "biologia",
    difficultyKey: "zaawansowany",
    readTime: 3,
    isLiked: false,
    isFeatured: false,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "electricity-magnetism",
    titlePl: "Elektryczność i magnetyzm",
    titleEn: "Electricity and Magnetism",
    titleHu: "Elektromosság és mágnesség",
    icon: "zap",
    topics: [
      {
        id: "current-basics",
        titlePl: "Czym jest prąd?",
        titleEn: "What is Current?",
        titleHu: "Mi az áram?",
        category: {} as Category,
        estimatedTime: 15,
        difficulty: "basic",
        interactiveModules: ["electron-drift"],
        mdxContent: "current-basics",
      },
      {
        id: "electron-movement",
        titlePl: "Czy elektrony w kablu się poruszają?",
        titleEn: "Do electrons move in cables?",
        titleHu: "Mozognak-e az elektronok a kábelekben?",
        category: {} as Category,
        estimatedTime: 20,
        difficulty: "basic",
        interactiveModules: ["billiard-balls"],
        mdxContent: "electron-movement",
      },
      {
        id: "signal-speed",
        titlePl: 'Skąd więc bierzemy „szybki" prąd?',
        titleEn: 'Where does "fast" current come from?',
        titleHu: 'Honnan származik a "gyors" áram?',
        category: {} as Category,
        estimatedTime: 18,
        difficulty: "intermediate",
        interactiveModules: ["billiard-balls"],
        mdxContent: "signal-speed",
      },
      {
        id: "ac-current",
        titlePl: "Prąd w gniazdku",
        titleEn: "Current in the Socket",
        titleHu: "Áram a konnektorban",
        category: {} as Category,
        estimatedTime: 25,
        difficulty: "intermediate",
        interactiveModules: ["ac-current"],
        mdxContent: "ac-current",
      },
      {
        id: "batteries",
        titlePl: "Baterie",
        titleEn: "Batteries",
        titleHu: "Elemek",
        category: {} as Category,
        estimatedTime: 20,
        difficulty: "basic",
        interactiveModules: ["circuit-builder"],
        mdxContent: "batteries",
      },
    ],
  },
  {
    id: "earth-space",
    titlePl: "Ziemia i kosmos",
    titleEn: "Earth and Space",
    titleHu: "Föld és űr",
    icon: "globe",
    topics: [],
  },
  {
    id: "microworld",
    titlePl: "Mikroświat",
    titleEn: "Microworld",
    titleHu: "Mikrovilág",
    icon: "microscope",
    topics: [],
  },
  {
    id: "perception",
    titlePl: "Percepcja i człowiek",
    titleEn: "Perception and Human",
    titleHu: "Észlelés és ember",
    icon: "eye",
    topics: [],
  },
];

export const SCALE_LEVELS: ScaleLevel[] = [
  {
    name: "scale.level.quark.name",
    size: "10⁻¹⁸ m",
    description: "scale.level.quark.description",
    visualization: "quark",
  },
  {
    name: "Proton",
    size: "10⁻¹⁵ m",
    description: "Jądro atomowe składające się z kwarków",
    visualization: "proton",
  },
  {
    name: "Atom",
    size: "10⁻¹⁰ m",
    description: "Najmniejszy atom wodoru",
    visualization: "atom",
  },
  {
    name: "scale.level.molecule.name",
    size: "10⁻⁹ m",
    description: "scale.level.molecule.description",
    visualization: "molecule",
  },
  {
    name: "scale.level.virus.name",
    size: "10⁻⁷ m",
    description: "scale.level.virus.description",
    visualization: "virus",
  },
  {
    name: "scale.level.cell.name",
    size: "10⁻⁵ m",
    description: "scale.level.cell.description",
    visualization: "cell",
  },
  {
    name: "scale.level.ant.name",
    size: "10⁻³ m",
    description: "scale.level.ant.description",
    visualization: "ant",
  },
  {
    name: "scale.level.human.name",
    size: "10⁰ m",
    description: "scale.level.human.description",
    visualization: "human",
  },
  {
    name: "scale.level.city.name",
    size: "10⁴ m",
    description: "scale.level.city.description",
    visualization: "city",
  },
  {
    name: "scale.level.earth.name",
    size: "10⁷ m",
    description: "scale.level.earth.description",
    visualization: "earth",
  },
  {
    name: "scale.level.galaxy.name",
    size: "10²¹ m",
    description: "scale.level.galaxy.description",
    visualization: "galaxy",
  },
];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    questionPl:
      "Jaka jest typowa prędkość dryfu elektronów w przewodniku domowym?",
    questionEn:
      "What is the typical drift velocity of electrons in a household conductor?",
    questionHu:
      "Mi a tipikus elektronok sodródási sebessége egy háztartási vezetőben?",
    options: [
      {
        id: "a",
        textPl: "300,000 km/s (prędkość światła)",
        textEn: "300,000 km/s (speed of light)",
        textHu: "300,000 km/s (fénysebesség)",
      },
      {
        id: "b",
        textPl: "Około 0.1 mm/s",
        textEn: "About 0.1 mm/s",
        textHu: "Körülbelül 0.1 mm/s",
      },
      {
        id: "c",
        textPl: "100 m/s",
        textEn: "100 m/s",
        textHu: "100 m/s",
      },
      {
        id: "d",
        textPl: "1 km/h",
        textEn: "1 km/h",
        textHu: "1 km/h",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Elektrony dryfują bardzo powoli, ale sygnał elektryczny rozchodzi się z prędkością światła.",
    difficulty: "medium",
    topic: "current-basics",
  },
];

export const LANGUAGES = {
  pl: { name: "Polski", flag: "🇵🇱" },
  en: { name: "English", flag: "🇬🇧" },
  hu: { name: "Magyar", flag: "🇭🇺" },
};

export const DAILY_FACTS = [
  {
    titlePl: "Ciekawostka o elektronach",
    titleEn: "Electron Fact",
    titleHu: "Elektron tény",
    contentPl:
      "Prędkość dryfu elektronów w przewodniku to zaledwie kilka milimetrów na godzinę, ale sygnał elektryczny podróżuje z prędkością światła!",
    contentEn:
      "The drift velocity of electrons in a conductor is only a few millimeters per hour, but the electrical signal travels at the speed of light!",
    contentHu:
      "Az elektronok sodródási sebessége egy vezetőben csak néhány milliméter óránként, de az elektromos jel fénysebességgel utazik!",
    category: "electricity",
  },
];
