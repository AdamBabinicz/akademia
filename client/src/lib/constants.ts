import { Category, ScaleLevel, QuizQuestion } from '@/types/education';

export const CATEGORIES: Category[] = [
  {
    id: 'electricity-magnetism',
    titlePl: 'Elektryczność i magnetyzm',
    titleEn: 'Electricity and Magnetism',
    titleHu: 'Elektromosság és mágnesség',
    icon: 'zap',
    topics: [
      {
        id: 'current-basics',
        titlePl: 'Czym jest prąd?',
        titleEn: 'What is Current?',
        titleHu: 'Mi az áram?',
        category: {} as Category,
        estimatedTime: 15,
        difficulty: 'basic',
        interactiveModules: ['electron-drift'],
        mdxContent: 'current-basics'
      },
      {
        id: 'electron-movement',
        titlePl: 'Czy elektrony w kablu się poruszają?',
        titleEn: 'Do electrons move in cables?',
        titleHu: 'Mozognak-e az elektronok a kábelekben?',
        category: {} as Category,
        estimatedTime: 20,
        difficulty: 'basic',
        interactiveModules: ['billiard-balls'],
        mdxContent: 'electron-movement'
      },
      {
        id: 'signal-speed',
        titlePl: 'Skąd więc bierzemy „szybki" prąd?',
        titleEn: 'Where does "fast" current come from?',
        titleHu: 'Honnan származik a "gyors" áram?',
        category: {} as Category,
        estimatedTime: 18,
        difficulty: 'intermediate',
        interactiveModules: ['billiard-balls'],
        mdxContent: 'signal-speed'
      },
      {
        id: 'ac-current',
        titlePl: 'Prąd w gniazdku',
        titleEn: 'Current in the Socket',
        titleHu: 'Áram a konnektorban',
        category: {} as Category,
        estimatedTime: 25,
        difficulty: 'intermediate',
        interactiveModules: ['ac-current'],
        mdxContent: 'ac-current'
      },
      {
        id: 'batteries',
        titlePl: 'Baterie',
        titleEn: 'Batteries',
        titleHu: 'Elemek',
        category: {} as Category,
        estimatedTime: 20,
        difficulty: 'basic',
        interactiveModules: ['circuit-builder'],
        mdxContent: 'batteries'
      }
    ]
  },
  {
    id: 'earth-space',
    titlePl: 'Ziemia i kosmos',
    titleEn: 'Earth and Space',
    titleHu: 'Föld és űr',
    icon: 'globe',
    topics: []
  },
  {
    id: 'microworld',
    titlePl: 'Mikroświat',
    titleEn: 'Microworld',
    titleHu: 'Mikrovilág',
    icon: 'microscope',
    topics: []
  },
  {
    id: 'perception',
    titlePl: 'Percepcja i człowiek',
    titleEn: 'Perception and Human',
    titleHu: 'Észlelés és ember',
    icon: 'eye',
    topics: []
  }
];

export const SCALE_LEVELS: ScaleLevel[] = [
  { name: 'Quark', size: '10⁻¹⁸ m', description: 'Fundamentalne składniki protonów i neutronów', visualization: 'quark' },
  { name: 'Proton', size: '10⁻¹⁵ m', description: 'Jądro atomowe składające się z kwarków', visualization: 'proton' },
  { name: 'Atom', size: '10⁻¹⁰ m', description: 'Najmniejszy atom wodoru', visualization: 'atom' },
  { name: 'Cząsteczka', size: '10⁻⁹ m', description: 'Cząsteczka wody H₂O', visualization: 'molecule' },
  { name: 'Wirus', size: '10⁻⁷ m', description: 'Typowy wirus grypy', visualization: 'virus' },
  { name: 'Komórka', size: '10⁻⁵ m', description: 'Komórka ludzka', visualization: 'cell' },
  { name: 'Mrówka', size: '10⁻³ m', description: 'Robotnicza mrówka', visualization: 'ant' },
  { name: 'Człowiek', size: '10⁰ m', description: 'Średni wzrost człowieka', visualization: 'human' },
  { name: 'Miasto', size: '10⁴ m', description: 'Średnie miasto', visualization: 'city' },
  { name: 'Ziemia', size: '10⁷ m', description: 'Nasza planeta', visualization: 'earth' },
  { name: 'Galaktyka', size: '10²¹ m', description: 'Droga Mleczna', visualization: 'galaxy' }
];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionPl: 'Jaka jest typowa prędkość dryfu elektronów w przewodniku domowym?',
    questionEn: 'What is the typical drift velocity of electrons in a household conductor?',
    questionHu: 'Mi a tipikus elektronok sodródási sebessége egy háztartási vezetőben?',
    options: [
      {
        id: 'a',
        textPl: '300,000 km/s (prędkość światła)',
        textEn: '300,000 km/s (speed of light)',
        textHu: '300,000 km/s (fénysebesség)'
      },
      {
        id: 'b',
        textPl: 'Około 0.1 mm/s',
        textEn: 'About 0.1 mm/s',
        textHu: 'Körülbelül 0.1 mm/s'
      },
      {
        id: 'c',
        textPl: '100 m/s',
        textEn: '100 m/s',
        textHu: '100 m/s'
      },
      {
        id: 'd',
        textPl: '1 km/h',
        textEn: '1 km/h',
        textHu: '1 km/h'
      }
    ],
    correctAnswer: 'b',
    explanation: 'Elektrony dryfują bardzo powoli, ale sygnał elektryczny rozchodzi się z prędkością światła.',
    difficulty: 'medium',
    topic: 'current-basics'
  }
];

export const LANGUAGES = {
  pl: { name: 'Polski', flag: '🇵🇱' },
  en: { name: 'English', flag: '🇬🇧' },
  hu: { name: 'Magyar', flag: '🇭🇺' }
};

export const DAILY_FACTS = [
  {
    titlePl: 'Ciekawostka o elektronach',
    titleEn: 'Electron Fact',
    titleHu: 'Elektron tény',
    contentPl: 'Prędkość dryfu elektronów w przewodniku to zaledwie kilka milimetrów na godzinę, ale sygnał elektryczny podróżuje z prędkością światła!',
    contentEn: 'The drift velocity of electrons in a conductor is only a few millimeters per hour, but the electrical signal travels at the speed of light!',
    contentHu: 'Az elektronok sodródási sebessége egy vezetőben csak néhány milliméter óránként, de az elektromos jel fénysebességgel utazik!',
    category: 'electricity'
  }
];
