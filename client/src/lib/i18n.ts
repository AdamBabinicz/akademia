
import { createIntl, createIntlCache } from 'react-intl';

export const messages = {
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.electricity': 'Elektryczność i magnetyzm',
    'nav.earth': 'Ziemia i kosmos',
    'nav.microworld': 'Mikroświat',
    'nav.perception': 'Postrzeganie',
    'nav.quiz': 'Quiz',
    'nav.mechanics': 'Mechanika',
    'nav.thermodynamics': 'Termodynamika',
    'nav.electromagnetism': 'Elektromagnetyzm',
    'nav.optics': 'Optyka',
    'nav.modernPhysics': 'Fizyka nowoczesna',
    'nav.theme.light': 'Jasny',
    'nav.theme.dark': 'Ciemny',
    'nav.theme.system': 'Systemowy',
    'nav.language': 'Język',
    
    // Home page
    'home.hero.title': 'Interaktywna Nauka Fizyki',
    'home.hero.subtitle': 'Odkryj fascynujący świat fizyki poprzez eksperymenty i wizualizacje',
    'home.hero.cta': 'Rozpocznij naukę',
    'home.features.title': 'Główne sekcje',
    'home.interactiveModules.title': 'Moduły interaktywne',
    'home.modules.quiz.title': 'Quiz adaptacyjny',
    'home.modules.quiz.description': 'Test wiedzy dostosowujący się do Twojego poziomu',
    
    // Daily facts
    'dailyFact.title': 'Ciekawostka dnia',
    'dailyFact.newFact': 'Nowa ciekawostka',
    
    // Quiz
    'quiz.question': 'Pytanie {current} z {total}',
    'quiz.previous': 'Poprzednie',
    'quiz.next': 'Następne',
    'quiz.progress': 'Twój postęp',
    
    // Circuit builder
    'circuit.battery': 'Bateria',
    'circuit.bulb': 'Żarówka',
    'circuit.wire': 'Przewód',
    'circuit.switch': 'Przełącznik',
    'circuit.remember': 'Pamiętaj: obwód musi być zamknięty, żeby płynął prąd!',
    'circuit.buildArea': 'Obszar budowy obwodu',
    'circuit.dragHere': 'Przeciągnij komponenty tutaj',
    'circuit.toBuild': 'aby zbudować obwód',
    'circuit.status': 'Status obwodu',
    'circuit.closed': 'Zamknięty',
    'circuit.open': 'Otwarty',
    'circuit.dragComponent': 'Przeciągnij komponent {type}',
    
    // Scale explorer
    'scale.level': 'Poziom skali',
    
    // Simulation controls
    'simulation.voltage': 'Napięcie',
    'simulation.frequency': 'Częstotliwość',
    'simulation.reset': 'Reset',
    
    // Error messages
    'error.notFound': 'Strona nie została znaleziona',
    'error.goHome': 'Wróć do strony głównej'
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.electricity': 'Electricity & Magnetism',
    'nav.earth': 'Earth & Space',
    'nav.microworld': 'Microworld',
    'nav.perception': 'Perception',
    'nav.quiz': 'Quiz',
    'nav.mechanics': 'Mechanics',
    'nav.thermodynamics': 'Thermodynamics',
    'nav.electromagnetism': 'Electromagnetism',
    'nav.optics': 'Optics',
    'nav.modernPhysics': 'Modern Physics',
    'nav.theme.light': 'Light',
    'nav.theme.dark': 'Dark',
    'nav.theme.system': 'System',
    'nav.language': 'Language',
    
    // Home page
    'home.hero.title': 'Interactive Physics Learning',
    'home.hero.subtitle': 'Discover the fascinating world of physics through experiments and visualizations',
    'home.hero.cta': 'Start Learning',
    'home.features.title': 'Main Sections',
    'home.interactiveModules.title': 'Interactive Modules',
    'home.modules.quiz.title': 'Adaptive Quiz',
    'home.modules.quiz.description': 'Knowledge test that adapts to your level',
    
    // Daily facts
    'dailyFact.title': 'Fact of the Day',
    'dailyFact.newFact': 'New Fact',
    
    // Quiz
    'quiz.question': 'Question {current} of {total}',
    'quiz.previous': 'Previous',
    'quiz.next': 'Next',
    'quiz.progress': 'Your Progress',
    
    // Circuit builder
    'circuit.battery': 'Battery',
    'circuit.bulb': 'Light Bulb',
    'circuit.wire': 'Wire',
    'circuit.switch': 'Switch',
    'circuit.remember': 'Remember: the circuit must be closed for current to flow!',
    'circuit.buildArea': 'Circuit Build Area',
    'circuit.dragHere': 'Drag components here',
    'circuit.toBuild': 'to build a circuit',
    'circuit.status': 'Circuit Status',
    'circuit.closed': 'Closed',
    'circuit.open': 'Open',
    'circuit.dragComponent': 'Drag {type} component',
    
    // Scale explorer
    'scale.level': 'Scale Level',
    
    // Simulation controls
    'simulation.voltage': 'Voltage',
    'simulation.frequency': 'Frequency',
    'simulation.reset': 'Reset',
    
    // Error messages
    'error.notFound': 'Page not found',
    'error.goHome': 'Go to homepage'
  },
  
  hu: {
    // Navigation
    'nav.home': 'Főoldal',
    'nav.electricity': 'Elektromosság és mágnesesség',
    'nav.earth': 'Föld és űr',
    'nav.microworld': 'Mikrovilág',
    'nav.perception': 'Érzékelés',
    'nav.quiz': 'Kvíz',
    'nav.mechanics': 'Mechanika',
    'nav.thermodynamics': 'Termodinamika',
    'nav.electromagnetism': 'Elektromágnesesség',
    'nav.optics': 'Optika',
    'nav.modernPhysics': 'Modern fizika',
    'nav.theme.light': 'Világos',
    'nav.theme.dark': 'Sötét',
    'nav.theme.system': 'Rendszer',
    'nav.language': 'Nyelv',
    
    // Home page
    'home.hero.title': 'Interaktív Fizika Tanulás',
    'home.hero.subtitle': 'Fedezd fel a fizika lenyűgöző világát kísérleteken és vizualizációkon keresztül',
    'home.hero.cta': 'Tanulás kezdése',
    'home.features.title': 'Főbb Szekciók',
    'home.interactiveModules.title': 'Interaktív Modulok',
    'home.modules.quiz.title': 'Adaptív Kvíz',
    'home.modules.quiz.description': 'Tudásteszt, amely alkalmazkodik a szintedhez',
    
    // Daily facts
    'dailyFact.title': 'Napi Érdekesség',
    'dailyFact.newFact': 'Új Érdekesség',
    
    // Quiz
    'quiz.question': '{current}. kérdés {total}-ból',
    'quiz.previous': 'Előző',
    'quiz.next': 'Következő',
    'quiz.progress': 'Haladásod',
    
    // Circuit builder
    'circuit.battery': 'Akkumulátor',
    'circuit.bulb': 'Izzó',
    'circuit.wire': 'Vezeték',
    'circuit.switch': 'Kapcsoló',
    'circuit.remember': 'Emlékezz: az áramkörnek zártnak kell lennie, hogy áram folyjon!',
    'circuit.buildArea': 'Áramkör Építési Terület',
    'circuit.dragHere': 'Húzd ide az alkatrészeket',
    'circuit.toBuild': 'áramkör építéséhez',
    'circuit.status': 'Áramkör Állapota',
    'circuit.closed': 'Zárt',
    'circuit.open': 'Nyitott',
    'circuit.dragComponent': '{type} alkatrész húzása',
    
    // Scale explorer
    'scale.level': 'Skála Szint',
    
    // Simulation controls
    'simulation.voltage': 'Feszültség',
    'simulation.frequency': 'Frekvencia',
    'simulation.reset': 'Visszaállítás',
    
    // Error messages
    'error.notFound': 'Az oldal nem található',
    'error.goHome': 'Vissza a főoldalra'
  }
};

export type Language = 'pl' | 'en' | 'hu';

const cache = createIntlCache();

export const createIntlInstance = (locale: Language) => {
  return createIntl({
    locale,
    messages: messages[locale] || messages.pl,
  }, cache);
};

export const getIntlInstance = (locale: Language) => {
  return createIntlInstance(locale);
};
