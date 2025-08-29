import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Lightbulb } from 'lucide-react';
import { Language } from '@/types/education';
import { DAILY_FACTS } from '@/lib/constants';

interface DailyFactProps {
  language: Language;
}

export function DailyFact({ language }: DailyFactProps) {
  // In a real app, this would fetch from an API
  const todaysFact = DAILY_FACTS[0];

  const getTitle = () => {
    switch (language) {
      case 'en': return todaysFact.titleEn;
      case 'hu': return todaysFact.titleHu;
      default: return todaysFact.titlePl;
    }
  };

  const getContent = () => {
    switch (language) {
      case 'en': return todaysFact.contentEn;
      case 'hu': return todaysFact.contentHu;
      default: return todaysFact.contentPl;
    }
  };

  return (
    <div 
      className="bg-gradient-to-r from-accent to-primary p-6 rounded-xl text-accent-foreground mb-8"
      data-testid="daily-fact"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-black bg-opacity-20 rounded-lg">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">
            <FormattedMessage id="daily.fact.title" defaultMessage="Ciekawostka dnia" />
          </h3>
          <p className="opacity-90">{getContent()}</p>
        </div>
      </div>
    </div>
  );
}
