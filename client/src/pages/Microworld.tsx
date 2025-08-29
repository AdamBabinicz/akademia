import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface MicroworldProps {
  language: Language;
}

export default function Microworld({ language }: MicroworldProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="microworld-page">
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
                Mikroświat
              </h1>
              <p className="text-muted-foreground mt-2">
                Zanurz się w świecie atomów, cząsteczek i zjawisk molekularnych
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~40 min</span>
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
          <Microscope className="w-24 h-24 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Mikroświat w przygotowaniu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Wkrótce znajdziesz tutaj interaktywne moduły o cząsteczkach wody we wrzątku, 
            kolorach obiektów i strukturze atomów. Sprawdź inne sekcje w międzyczasie!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Cząsteczki wody</h3>
              <p className="text-sm text-muted-foreground">
                Ciśnienie pary wodnej i punkt wrzenia
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Kolor obiektów</h3>
              <p className="text-sm text-muted-foreground">
                Jak obiekty odbijają i pochłaniają światło
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-card-foreground mb-2">Atomy</h3>
              <p className="text-sm text-muted-foreground">
                Kwantowy model vs model planetarny
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
