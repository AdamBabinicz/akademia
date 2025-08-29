import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock } from 'lucide-react';
import { DailyFact } from '@/components/DailyFact';
import { AdaptiveQuiz } from '@/components/InteractiveModules/AdaptiveQuiz';
import { Language } from '@/types/education';

interface QuizProps {
  language: Language;
}

export default function Quiz({ language }: QuizProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="quiz-page">
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
                Quiz adaptacyjny
              </h1>
              <p className="text-muted-foreground mt-2">
                Test wiedzy dostosowujący się do Twojego poziomu
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~15 min</span>
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

        {/* Adaptive Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AdaptiveQuiz language={language} />
        </motion.div>
      </div>
    </div>
  );
}
