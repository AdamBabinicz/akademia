import React from "react";
import { motion } from "framer-motion";
import { Ruler, Clock, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DailyFact } from "@/components/DailyFact";
import { ScaleExplorer } from "@/components/InteractiveModules/ScaleExplorer";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import scaleHeroImage from "@assets/generated_images/7.png";

interface ScaleProps {
  language: Language;
}

export default function Scale({ language }: ScaleProps) {
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "scale.hero.title" })}
        description={intl.formatMessage({ id: "scale.hero.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="scale-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${scaleHeroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="ml-16 lg:ml-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="scale.hero.title"
                    defaultMessage="Skale Wszechświata"
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="scale.hero.subtitle"
                    defaultMessage="Podróżuj od atomów do galaktyk i odkryj ogrom Wszechświata"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      ~30 min
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={scaleHeroImage}
                  alt="Skale Wszechświata"
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
            <DailyFact language={language} category="astronomy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ScaleExplorer />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage
                id="scale.context.title"
                defaultMessage="Zrozumienie skali w fizyce"
              />
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  <FormattedMessage
                    id="scale.context.why.title"
                    defaultMessage="Dlaczego skala ma znaczenie?"
                  />
                </h3>
                <p className="text-muted-foreground">
                  <FormattedMessage
                    id="scale.context.why.text"
                    defaultMessage="Zrozumienie względnych rozmiarów obiektów we wszechświecie pomaga w pojmowaniu złożoności fizyki na różnych poziomach - od mechaniki kwantowej po kosmologię."
                  />
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-card-foreground mb-2">
                    <FormattedMessage
                      id="scale.context.facts.title"
                      defaultMessage="Ciekawostki o skali:"
                    />
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>
                      <FormattedMessage
                        id="scale.context.facts.atom"
                        defaultMessage="• Gdyby atom był wielkości piłki futbolowej, jądro byłoby wielkości ziarnka ryżu"
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="scale.context.facts.human"
                        defaultMessage="• Człowiek jest w środku skali wszechświata"
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="scale.context.facts.galaxy"
                        defaultMessage="• Galaktyka zawiera około 100 miliardów gwiazd"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Ruler className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-sm">
                    <FormattedMessage
                      id="scale.context.visual"
                      defaultMessage="Logarytmiczna reprezentacja skali"
                    />
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
