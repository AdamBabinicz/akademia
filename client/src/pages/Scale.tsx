import React from 'react';
import { motion } from 'framer-motion';
import { Maximize, Clock } from 'lucide-react';
import { DailyFact } from '@/components/DailyFact';
import { ScaleExplorer } from '@/components/InteractiveModules/ScaleExplorer';
import { Language } from '@/types/education';

interface ScaleProps {
  language: Language;
}

export default function Scale({ language }: ScaleProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="scale-page">
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
                Zabawa skalą wszechświata
              </h1>
              <p className="text-muted-foreground mt-2">
                Podróż od najmniejszych cząstek do największych galaktyk
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~20 min</span>
              </div>
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

        {/* Scale Explorer Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScaleExplorer />
        </motion.div>

        {/* Educational Context */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Zrozumienie skali w fizyce
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Dlaczego skala ma znaczenie?
              </h3>
              <p className="text-muted-foreground">
                Zrozumienie względnych rozmiarów obiektów we wszechświecie pomaga 
                w pojmowaniu złożoności fizyki na różnych poziomach - od mechaniki kwantowej 
                po kosmologię.
              </p>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-card-foreground mb-2">
                  Ciekawostki o skali:
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Gdyby atom był wielkości piłki futbolowej, jądro byłoby wielkości ziarnka ryżu</li>
                  <li>• Człowiek jest w środku skali wszechświata</li>
                  <li>• Galaktyka zawiera około 100 miliardów gwiazd</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Maximize className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="text-sm">Logarytmiczna reprezentacja skali</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
