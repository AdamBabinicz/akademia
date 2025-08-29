import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';
import { BilliardBalls } from '@/components/InteractiveModules/BilliardBalls';
import { PlanetaryMotion } from '@/components/InteractiveModules/PlanetaryMotion';

interface EarthSpaceProps {
  language: Language;
}

export default function EarthSpace({ language }: EarthSpaceProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="earth-space-page">
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
                Ziemia i kosmos
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj tajniki naszej planety i wszechświata
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~30 min</span>
              </div>
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

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16"
        >
          <Globe className="w-24 h-24 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ta sekcja jest w przygotowaniu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wkrótce znajdziesz tutaj fascynujące treści o porach roku, grawitacji, 
            i cyklach dnia i nocy. Sprawdź inne sekcje w międzyczasie!
          </p>
        </motion.div>

        {/* Planetary Motion Section */}
        <section className="grid gap-8">
          <PlanetaryMotion />
          <BilliardBalls />
        </section>
      </div>
    </div>
  );
}