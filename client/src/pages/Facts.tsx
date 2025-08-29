
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, RefreshCw, Clock, Bookmark, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface FactsProps {
  language: Language;
}

interface Fact {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'podstawowy' | 'średni' | 'zaawansowany';
  readTime: number;
  isLiked: boolean;
}

const scienceFacts: Fact[] = [
  {
    id: '1',
    title: 'Prędkość światła w próżni',
    description: 'Uniwersalna stała fizyczna',
    content: 'Światło w próżni porusza się z prędkością 299 792 458 metrów na sekundę. To jest dokładnie zdefiniowana wartość, która służy jako podstawa do definiowania metra w układzie SI. Nic nie może poruszać się szybciej niż światło w próżni - to fundamentalne ograniczenie wynikające z teorii względności Einsteina.',
    category: 'fizyka',
    difficulty: 'podstawowy',
    readTime: 2,
    isLiked: false
  },
  {
    id: '2',
    title: 'DNA jako nośnik informacji',
    description: 'Kod genetyczny wszystkich organizmów',
    content: 'Jeśli rozwinąć DNA z jednej komórki ludzkiej, jego długość wyniosłaby około 2 metrów. W całym organizmie człowieka znajduje się około 37 bilionów komórek, co oznacza, że całkowita długość DNA w naszym ciele to około 74 miliardów kilometrów - to ponad 400 razy więcej niż odległość Ziemi od Słońca!',
    category: 'biologia',
    difficulty: 'średni',
    readTime: 3,
    isLiked: false
  },
  {
    id: '3',
    title: 'Gęstość neutronów',
    description: 'Najbardziej gęsta materia we Wszechświecie',
    content: 'Łyżeczka materiału z gwiazdy neutronowej ważyłaby około 6 miliardów ton. Gwiazdy neutronowe to pozostałości po eksplozjach supernowych, gdzie materia jest tak skompresowana, że protony i elektrony łączą się w neutrony. Promień typowej gwiazdy neutronowej to tylko 10-15 km, ale jej masa jest większa niż masa Słońca.',
    category: 'astrofizyka',
    difficulty: 'zaawansowany',
    readTime: 4,
    isLiked: false
  },
  {
    id: '4',
    title: 'Neurony w mózgu człowieka',
    description: 'Skomplikowana sieć połączeń',
    content: 'Mózg człowieka zawiera około 86 miliardów neuronów, a każdy neuron może być połączony z tysiącami innych neuronów. To daje nam łącznie około 100 bilionów połączeń synaptycznych. Sygnały w mózgu poruszają się z prędkością do 120 m/s, a mózg zużywa około 20% całej energii organizmu.',
    category: 'neurobiologia',
    difficulty: 'średni',
    readTime: 3,
    isLiked: false
  },
  {
    id: '5',
    title: 'Kwantowe tunelowanie',
    description: 'Cząstki przechodzą przez bariery energetyczne',
    content: 'W mechanice kwantowej cząstki mogą "przejść" przez bariery energetyczne, które klasycznie byłyby nie do pokonania. To zjawisko umożliwia fuzję jądrową w gwiazdach - protony mogą się połączyć mimo elektrostatycznego odpychania. Bez kwantowego tunelowania Słońce nie mogłoby świecić, a życie na Ziemi nie byłoby możliwe.',
    category: 'fizyka kwantowa',
    difficulty: 'zaawansowany',
    readTime: 4,
    isLiked: false
  },
  {
    id: '6',
    title: 'Fotosynteza - najbardziej wydajny proces',
    description: 'Rośliny przekształcają światło w energię',
    content: 'Fotosynteza jest jednym z najważniejszych procesów na Ziemi. Rośliny pochłaniają rocznie około 100 miliardów ton dwutlenku węgla z atmosfery. Proces fotosyntezy jest tak wydajny, że wykorzystuje niemal każdy foton światła, który pada na chlorofil. To dzięki fotosyntezie mamy tlen w atmosferze - przed ewolucją roślin atmosfera Ziemi nie zawierała tlenu.',
    category: 'biologia',
    difficulty: 'podstawowy',
    readTime: 3,
    isLiked: false
  }
];

const categories = ['wszystkie', 'fizyka', 'biologia', 'astrofizyka', 'neurobiologia', 'fizyka kwantowa'];

export default function Facts({ language }: FactsProps) {
  const [facts, setFacts] = useState<Fact[]>(scienceFacts);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const filteredFacts = selectedCategory === 'wszystkie' 
    ? facts 
    : facts.filter(fact => fact.category === selectedCategory);

  const currentFact = filteredFacts[currentFactIndex] || filteredFacts[0];

  useEffect(() => {
    if (isAutoPlay && filteredFacts.length > 1) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % filteredFacts.length);
      }, 10000); // Change fact every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, filteredFacts.length]);

  const toggleLike = (factId: string) => {
    setFacts(prev => prev.map(fact => 
      fact.id === factId ? { ...fact, isLiked: !fact.isLiked } : fact
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'podstawowy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'średni': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'zaawansowany': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % filteredFacts.length);
  };

  const previousFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + filteredFacts.length) % filteredFacts.length);
  };

  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="facts-page">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border py-6 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="ml-16 lg:ml-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ciekawe Fakty Naukowe
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj fascynujące fakty ze świata nauki
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={isAutoPlay ? "default" : "outline"}
                size="sm"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isAutoPlay ? 'animate-spin' : ''}`} />
                Auto-odtwarzanie
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
        {/* Daily Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DailyFact language={language} />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentFactIndex(0);
              }}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Main Fact Display */}
        <AnimatePresence mode="wait">
          {currentFact && (
            <motion.div
              key={currentFact.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-interactive max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Lightbulb className="w-6 h-6 text-primary" />
                        {currentFact.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {currentFact.description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(currentFact.id)}
                      className="flex-shrink-0"
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          currentFact.isLiked 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Badge variant="secondary" className="capitalize">
                      {currentFact.category}
                    </Badge>
                    <Badge className={getDifficultyColor(currentFact.difficulty)}>
                      {currentFact.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{currentFact.readTime} min</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-foreground leading-relaxed text-lg">
                    {currentFact.content}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={previousFact}
                      disabled={filteredFacts.length <= 1}
                    >
                      Poprzedni
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {currentFactIndex + 1} z {filteredFacts.length}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={nextFact}
                      disabled={filteredFacts.length <= 1}
                    >
                      Następny
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-foreground">
            Wszystkie Fakty w Kategorii: {selectedCategory}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacts.map((fact, index) => (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card 
                  className={`card-interactive h-full cursor-pointer ${
                    index === currentFactIndex ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setCurrentFactIndex(index)}
                >
                  <CardHeader>
                    <CardTitle className="text-base line-clamp-2">
                      {fact.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {fact.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {fact.category}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(fact.difficulty)}`}>
                        {fact.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {fact.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{fact.readTime} min</span>
                      </div>
                      
                      <Heart 
                        className={`w-4 h-4 ${
                          fact.isLiked 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
