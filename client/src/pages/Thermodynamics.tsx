
import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface ThermodynamicsProps {
  language: Language;
}

export default function Thermodynamics({ language }: ThermodynamicsProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="thermodynamics-page">
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
                Termodynamika
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj prawa ciepła, temperatury i energii termicznej
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
          <Thermometer className="w-24 h-24 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ta sekcja jest w przygotowaniu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wkrótce znajdziesz tutaj fascynujące treści o prawach termodynamiki, 
            entropii, maszynach cieplnych i teorii kinetycznej gazów. 
            Sprawdź inne sekcje w międzyczasie!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
