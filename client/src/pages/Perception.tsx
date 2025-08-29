import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface PerceptionProps {
  language: Language;
}

export default function Perception({ language }: PerceptionProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="perception-page">
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
                Percepcja i człowiek
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj jak działają nasze zmysły i jak mózg interpretuje świat
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~35 min</span>
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
          <Eye className="w-24 h-24 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Percepcja i człowiek w przygotowaniu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Wkrótce znajdziesz tutaj fascynujące treści o smaku języka, 
            widzeniu barw i sile wyporu. Sprawdź inne sekcje w międzyczasie!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Smak języka</h3>
              <p className="text-sm text-muted-foreground">
                Prawdziwa mapa receptorów smaku
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Widzenie barw</h3>
              <p className="text-sm text-muted-foreground">
                Jak oko i mózg interpretują światło
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Ciężar w wodzie</h3>
              <p className="text-sm text-muted-foreground">
                Siła wyporu i pozorna utrata masy
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
