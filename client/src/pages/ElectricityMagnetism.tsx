import React from "react";
import { Link, Route, useRoute } from "wouter";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import { Clock, Bookmark, ChevronRight } from "lucide-react";
import electricityImage from "@assets/generated_images/2.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DailyFact } from "@/components/DailyFact";
import { ElectronDrift } from "@/components/InteractiveModules/ElectronDrift";
import { BilliardBalls } from "@/components/InteractiveModules/BilliardBalls";
import { ACCurrent } from "@/components/InteractiveModules/ACCurrent";
import { CircuitBuilder } from "@/components/InteractiveModules/CircuitBuilder";
import { Language } from "@/types/education";
import { CATEGORIES } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import MagnetismPage from "./Electromagnetism";

interface ElectricityMagnetismProps {
  language: Language;
}

function CurrentBasicsPage({ language }: ElectricityMagnetismProps) {
  const category = CATEGORIES.find((c) => c.id === "electricity-magnetism")!;
  const isMobile = useIsMobile();
  const billiardBallsHeight = isMobile ? 300 : 150;
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({
          id: "electricityMagnetism.header.title",
        })}
        description={intl.formatMessage({
          id: "electricityMagnetism.header.description",
        })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="electricity-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: `url(${electricityImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-background/70" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="ml-16 lg:ml-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="electricityMagnetism.header.title"
                    defaultMessage={category.titlePl}
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="electricityMagnetism.header.description"
                    defaultMessage="Poznaj tajniki przepływu prądu i zachowania elektronów"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="electricityMagnetism.header.readTime"
                        defaultMessage="~45 min"
                      />
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={electricityImage}
                  alt="Elektryczność i magnetyzm"
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
            <DailyFact language={language} category="electricity" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            id="current"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <FormattedMessage
                  id="electricityMagnetism.current.title"
                  defaultMessage="Czym jest prąd elektryczny?"
                />
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    <FormattedMessage
                      id="electricityMagnetism.current.description"
                      defaultMessage="Prąd elektryczny to uporządkowany ruch elektronów swobodnych w przewodniku. W metalach elektrony mogą się swobodnie przemieszczać między atomami, tworząc 'morze elektronów'."
                    />
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">
                      <FormattedMessage
                        id="electricityMagnetism.current.keyConceptsTitle"
                        defaultMessage="Kluczowe pojęcia:"
                      />
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <FormattedMessage
                          id="electricityMagnetism.current.keyConcept1"
                          defaultMessage="• Elektrony swobodne - mogą się poruszać"
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          id="electricityMagnetism.current.keyConcept2"
                          defaultMessage="• Przewodnik - materiał z elektronami swobodnymi"
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          id="electricityMagnetism.current.keyConcept3"
                          defaultMessage="• Prąd - uporządkowany ruch elektronów"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-accent rounded-full"></div>
                    </div>
                    <p className="text-sm">
                      <FormattedMessage
                        id="electricityMagnetism.current.visualization"
                        defaultMessage="Wizualizacja struktury metalicznej"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ElectronDrift />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            id="electrons"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <FormattedMessage
                  id="electricityMagnetism.electrons.title"
                  defaultMessage="Czy elektrony w kablu się poruszają?"
                />
              </h2>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-lg text-muted-foreground mb-4">
                    <FormattedMessage
                      id="electricityMagnetism.electrons.description"
                      defaultMessage="To częste nieporozumienie! Elektrony rzeczywiście się poruszają, ale bardzo powoli. Bez napięcia wykonują chaotyczny ruch cieplny, a z napięciem powoli dryfują w kierunku bieguna dodatniego."
                    />
                  </p>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h4 className="font-semibold text-card-foreground mb-3">
                      <FormattedMessage
                        id="electricityMagnetism.electrons.driftSpeedTitle"
                        defaultMessage="Prędkość dryfu elektronów:"
                      />
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-card-foreground">
                          <FormattedMessage
                            id="electricityMagnetism.electrons.driftSpeed1"
                            defaultMessage="Typowy przewód domowy:"
                          />
                        </span>
                        <Badge variant="secondary">~0.1 mm/s</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-card-foreground">
                          <FormattedMessage
                            id="electricityMagnetism.electrons.driftSpeed2"
                            defaultMessage="To znaczy na godzinę:"
                          />
                        </span>
                        <Badge variant="secondary">~36 cm</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-card-foreground">
                          <FormattedMessage
                            id="electricityMagnetism.electrons.signalSpeed"
                            defaultMessage="Prędkość sygnału:"
                          />
                        </span>
                        <Badge variant="default">~300,000 km/s</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm">
                      <FormattedMessage
                        id="electricityMagnetism.electrons.representation"
                        defaultMessage="Reprezentacja ruchu elektronów"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BilliardBalls height={billiardBallsHeight} />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            id="ac-current"
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <FormattedMessage
                  id="electricityMagnetism.acCurrent.title"
                  defaultMessage="Prąd zmienny w gniazdku"
                />
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-muted-foreground mb-4">
                    <FormattedMessage
                      id="electricityMagnetism.acCurrent.description"
                      defaultMessage="W gniazdku domowym mamy prąd zmienny - elektrony nie płyną w jednym kierunku, lecz drgają tam i z powrotem 50 razy na sekundę (50 Hz w Europie)."
                    />
                  </p>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h4 className="font-semibold text-card-foreground mb-3">
                      <FormattedMessage
                        id="electricityMagnetism.acCurrent.characteristicsTitle"
                        defaultMessage="Charakterystyka prądu zmiennego:"
                      />
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <FormattedMessage
                          id="electricityMagnetism.acCurrent.characteristic1"
                          defaultMessage="Częstotliwość: 50 Hz (Europa) / 60 Hz (USA)"
                        />
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <FormattedMessage
                          id="electricityMagnetism.acCurrent.characteristic2"
                          defaultMessage="Napięcie skuteczne: 230V"
                        />
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <FormattedMessage
                          id="electricityMagnetism.acCurrent.characteristic3"
                          defaultMessage="Energia: fala elektromagnetyczna"
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    </div>
                    <p className="text-sm">
                      <FormattedMessage
                        id="electricityMagnetism.acCurrent.powerGrid"
                        defaultMessage="Sieć elektroenergetyczna"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ACCurrent />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CircuitBuilder />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <ChevronRight className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">
                <FormattedMessage
                  id="electricityMagnetism.nextTopic.title"
                  defaultMessage="Następny temat"
                />
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  <FormattedMessage
                    id="electricityMagnetism.nextTopic.earthSpaceTitle"
                    defaultMessage="Ziemia i kosmos"
                  />
                </h3>
                <p className="text-blue-100 mb-6">
                  <FormattedMessage
                    id="electricityMagnetism.nextTopic.earthSpaceDescription"
                    defaultMessage="Odkryj prawdziwą przyczynę zmian pór roku, poznaj działanie grawitacji w teorii względności i zrozum, dlaczego Słońce wschodzi i zachodzi."
                  />
                </p>

                <Link href="/earth-space">
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-900 hover:bg-blue-50"
                    data-testid="next-earth-space"
                  >
                    <FormattedMessage
                      id="electricityMagnetism.nextTopic.button"
                      defaultMessage="Przejdź do Ziemia i kosmos"
                    />
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="w-64 h-64 mx-auto relative bg-black bg-opacity-30 rounded-full border border-white border-opacity-30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
                  <div
                    className="absolute w-3 h-3 bg-blue-400 rounded-full earth-orbit"
                    style={{ transformOrigin: "-80px center" }}
                  ></div>
                  <div className="absolute w-40 h-40 border border-white border-opacity-30 rounded-full"></div>
                </div>
                <p className="text-center text-sm text-blue-200 mt-4">
                  <FormattedMessage
                    id="electricityMagnetism.nextTopic.earthModel"
                    defaultMessage="Model ruchu Ziemi wokół Słońca"
                  />
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}

export default function ElectricityMagnetism({
  language,
}: ElectricityMagnetismProps) {
  const [isMagnetismPage] = useRoute("/electricity-magnetism/magnetism");

  if (isMagnetismPage) {
    return <MagnetismPage language={language} />;
  }

  return <CurrentBasicsPage language={language} />;
}
