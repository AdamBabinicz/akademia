import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import {
  BookOpen,
  Clock,
  Bookmark,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { SCIENCE_FACTS, ScienceFact } from "@/lib/constants";
import factsHeroImage from "@assets/generated_images/8.png";

interface FactsProps {
  language: Language;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "podstawowy":
    case "basic":
    case "alap":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "średni":
    case "intermediate":
    case "közepes":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "zaawansowany":
    case "advanced":
    case "haladó":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const categories = ["wszystkie", "fizyka", "astronomia", "biologia"];

export default function Facts({ language }: FactsProps) {
  const [facts, setFacts] = useState<ScienceFact[]>(SCIENCE_FACTS);
  const [selectedCategory, setSelectedCategory] = useState("wszystkie");
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const factCarouselRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const filteredFacts =
    selectedCategory === "wszystkie"
      ? facts
      : facts.filter((fact) => fact.categoryKey === selectedCategory);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlay && factCarouselRef.current) {
      interval = setInterval(() => {
        const { current } = factCarouselRef;
        if (current) {
          if (current.scrollLeft + current.clientWidth >= current.scrollWidth) {
            current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            current.scrollBy({ left: 300, behavior: "smooth" });
          }
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const toggleLike = (factId: string) => {
    setFacts((prev) =>
      prev.map((fact) =>
        fact.id === factId ? { ...fact, isLiked: !fact.isLiked } : fact
      )
    );
  };

  const handleManualCarouselScroll = (direction: "left" | "right") => {
    if (factCarouselRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300;
      factCarouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShuffle = () => {
    setFacts((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "nav.facts" })}
        description={intl.formatMessage({ id: "facts.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="facts-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${factsHeroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="mt-8 lg:mt-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="nav.facts"
                    defaultMessage="Ciekawostki"
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="facts.subtitle"
                    defaultMessage="Najciekawsze informacje ze świata fizyki, biologii i astronomii"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="facts.readTime"
                        defaultMessage="Czytanie ~5 min"
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={factsHeroImage}
                  alt={intl.formatMessage({ id: "facts.hero.imageAlt" })}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyFact language={language} />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                <FormattedMessage
                  id="facts.featured"
                  defaultMessage="Wyróżnione ciekawostki"
                />
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleManualCarouselScroll("left")}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleManualCarouselScroll("right")}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div
              ref={factCarouselRef}
              className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
            >
              {facts
                .filter((fact) => fact.isFeatured)
                .map((fact) => (
                  <Card
                    key={fact.id}
                    className="min-w-[300px] sm:min-w-[350px] flex-shrink-0 h-full flex flex-col"
                  >
                    <CardHeader>
                      <CardTitle>
                        {intl.formatMessage({ id: fact.titleKey })}
                      </CardTitle>
                      <CardDescription>
                        {intl.formatMessage({ id: fact.descriptionKey })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">
                        {intl.formatMessage({ id: fact.contentKey })}
                      </p>
                    </CardContent>
                    <div className="mt-auto p-6 pt-0 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        <FormattedMessage
                          id={`facts.category.${fact.categoryKey}`}
                        />
                      </Badge>
                      <div className="flex gap-2 items-center">
                        <Button variant="ghost" size="icon">
                          <Share2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleLike(fact.id)}
                        >
                          <Heart
                            className={`w-4 h-4 transition-all ${
                              fact.isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground">
                <FormattedMessage
                  id="facts.allFacts"
                  defaultMessage="Wszystkie ciekawostki"
                />
              </h2>
              <div className="flex gap-2 items-center self-end md:self-auto">
                <Button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  variant={isAutoPlay ? "default" : "outline"}
                >
                  {isAutoPlay ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  <FormattedMessage
                    id="facts.autoplay"
                    defaultMessage="Autoodtwarzanie"
                  />
                </Button>
                <Button variant="outline" onClick={handleShuffle}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  <FormattedMessage
                    id="facts.shuffle"
                    defaultMessage="Wymieszaj"
                  />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  <FormattedMessage
                    id={`facts.category.${category}`}
                    defaultMessage={category}
                  />
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredFacts.map((fact) => (
                  <motion.div
                    key={fact.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>
                          {intl.formatMessage({ id: fact.titleKey })}
                        </CardTitle>
                        <CardDescription>
                          {intl.formatMessage({ id: fact.descriptionKey })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            <FormattedMessage
                              id={`facts.category.${fact.categoryKey}`}
                            />
                          </Badge>
                          <Badge
                            className={`text-xs ${getDifficultyColor(
                              intl.formatMessage({
                                id: `facts.difficulty.${fact.difficultyKey}`,
                              })
                            )}`}
                          >
                            <FormattedMessage
                              id={`facts.difficulty.${fact.difficultyKey}`}
                            />
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-4">
                          {intl.formatMessage({ id: fact.contentKey })}
                        </p>
                      </CardContent>
                      <div className="mt-auto p-6 pt-0 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{fact.readTime} min</span>
                        </div>
                        <Heart
                          className={`w-4 h-4 cursor-pointer transition-colors ${
                            fact.isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:fill-red-500 hover:text-red-500"
                          }`}
                          onClick={() => toggleLike(fact.id)}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
