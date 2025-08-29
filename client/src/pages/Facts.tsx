import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';
import { DAILY_FACTS } from '@/lib/constants';

interface FactsProps {
  language: Language;
}

export default function Facts({ language }: FactsProps) {
  const [currentFactIndex, setCurrentFactIndex] = React.useState(0);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * DAILY_FACTS.length);
    setCurrentFactIndex(randomIndex);
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
                Ciekawostki fizyczne
              </h1>
              <p className="text-muted-foreground mt-2">
                Fascynujące fakty z świata nauki
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={getRandomFact}
                className="flex items-center gap-2"
                data-testid="random-fact-button"
              >
                <RefreshCw className="w-4 h-4" />
                Losowa ciekawostka
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
        {/* Main Daily Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DailyFact language={language} />
        </motion.div>

        {/* Fact Archive */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Archiwum ciekawostek
          </h2>
          
          <div className="grid gap-6">
            {DAILY_FACTS.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="hover:border-accent transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-lg">
                        <Lightbulb className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">
                        {language === 'en' ? fact.titleEn : 
                         language === 'hu' ? fact.titleHu : fact.titlePl}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {language === 'en' ? fact.contentEn : 
                       language === 'hu' ? fact.contentHu : fact.contentPl}
                    </p>
                    <div className="mt-4 inline-flex px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                      Kategoria: {fact.category}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fun Facts Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Szybkie fakty
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { fact: "Prędkość światła: 299,792,458 m/s", icon: "⚡" },
              { fact: "Elektrony w atomie nie orbitują", icon: "⚛️" },
              { fact: "Ziemia obraca się z prędkością 1670 km/h", icon: "🌍" },
              { fact: "Punkt wrzenia zależy od ciśnienia", icon: "💧" }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="text-sm text-muted-foreground">{item.fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
