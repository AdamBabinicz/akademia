import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Mails, Clock, Bookmark } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import heroImage from "@assets/generated_images/15.png";

interface TasteProps {
  language: Language;
}

const tastes = ["sweet", "sour", "salty", "bitter", "umami"];

const TasteHighlight = ({ taste }: { taste: string | null }) => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (taste) {
      const newPoints = Array.from({ length: 30 }).map(() => ({
        x: 50 + Math.random() * 100 - 50,
        y: 30 + Math.random() * 240,
      }));
      setPoints(newPoints);
    }
  }, [taste]);

  if (!taste) {
    return null;
  }

  return (
    <g>
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </g>
  );
};

export default function Taste({ language }: TasteProps) {
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "taste.title" })}
        description={intl.formatMessage({ id: "taste.subtitle" })}
        schema={{ type: "article" }}
      />
      <div className="min-h-screen transition-all duration-300 ease-in-out">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage id="taste.title" />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage id="taste.subtitle" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      ~10 min
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={heroImage}
                  alt="Wizualizacja połączenia neuronowego między językiem a mózgiem"
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
            <DailyFact language={language} category="perception" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mails className="w-5 h-5 text-primary" />
                  <FormattedMessage id="taste.module.title" />
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <FormattedMessage id="taste.module.description" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tastes.map((taste) => (
                      <Button
                        key={taste}
                        variant={
                          selectedTaste === taste ? "default" : "outline"
                        }
                        onClick={() =>
                          setSelectedTaste(
                            selectedTaste === taste ? null : taste
                          )
                        }
                      >
                        <FormattedMessage id={`taste.type.${taste}`} />
                      </Button>
                    ))}
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">
                      <FormattedMessage id="taste.myth.title" />
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage id="taste.myth.content" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    width="200"
                    height="300"
                    viewBox="0 0 200 300"
                    className="max-w-full h-auto"
                  >
                    <path
                      d="M100 0 C 40 40, 40 220, 100 300 C 160 220, 160 40, 100 0 Z"
                      fill="#F4C2C2"
                      stroke="#D4A2A2"
                      strokeWidth="2"
                    />
                    <defs>
                      <clipPath id="tongueClip">
                        <path d="M100 0 C 40 40, 40 220, 100 300 C 160 220, 160 40, 100 0 Z" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#tongueClip)">
                      <TasteHighlight taste={selectedTaste} />
                    </g>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage id="taste.types.title" />
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tastes.map((taste) => (
                <Card key={taste}>
                  <CardHeader>
                    <CardTitle>
                      <FormattedMessage id={`taste.type.${taste}`} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage id={`taste.explanation.${taste}`} />
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
