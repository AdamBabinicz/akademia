import React, { useState, useEffect, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from "@/types/education";

interface DailyFactProps {
  language: Language;
  category?: string;
}

interface Fact {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryId: string;
}

export function DailyFact({ language, category }: DailyFactProps) {
  const intl = useIntl();
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  console.log("====================================");
  console.log("DIAGNOSTYKA KOMPONENTU DailyFact:");
  console.log("Otrzymana kategoria z zewnątrz:", category);

  const allFacts = useMemo(() => {
    const messages = intl.messages as Record<string, string>;
    const factKeys = Object.keys(messages).filter(
      (key) => key.startsWith("dailyFacts.") && key.endsWith(".title")
    );

    return factKeys.map((key) => {
      const id = key.replace("dailyFacts.", "").replace(".title", "");
      return {
        id: id,
        title: intl.formatMessage({ id: `dailyFacts.${id}.title` }),
        content: intl.formatMessage({ id: `dailyFacts.${id}.content` }),
        category: intl.formatMessage({ id: `dailyFacts.${id}.category` }),
        categoryId: intl.formatMessage({ id: `dailyFacts.${id}.categoryId` }),
      };
    });
  }, [intl, language]);

  const filteredFacts = useMemo(() => {
    if (!category) return allFacts;
    const categoryFacts = allFacts.filter(
      (fact) => fact.categoryId === category
    );
    return categoryFacts.length > 0 ? categoryFacts : allFacts;
  }, [allFacts, category]);

  const selectNewFact = () => {
    if (filteredFacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredFacts.length);
      setCurrentFact(filteredFacts[randomIndex]);
    }
  };

  useEffect(() => {
    if (filteredFacts.length > 0) {
      selectNewFact();
    }
  }, [filteredFacts, language]);

  if (!currentFact) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:to-amber-900/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">
          <FormattedMessage id="dailyFact.title" />
        </CardTitle>
        <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold text-foreground">
          {currentFact.title}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {currentFact.content}
        </p>
        <Button
          variant="link"
          size="sm"
          className="px-0 mt-2 h-auto text-xs text-amber-700 dark:text-amber-300"
          onClick={selectNewFact}
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          <FormattedMessage id="dailyFact.newFact" />
        </Button>
      </CardContent>
    </Card>
  );
}
