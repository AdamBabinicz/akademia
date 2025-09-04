import { Link, useLocation } from "wouter";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import heroImage from "@assets/generated_images/Interactive_physics_learning_hero_dc15d5c5.png";
import {
  Zap,
  Globe,
  Microscope,
  Eye,
  Clock,
  MousePointer,
  Move3d,
  BarChart3,
  Lightbulb,
  Map,
  Shuffle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyFact } from "@/components/DailyFact";
import { ScaleExplorer } from "@/components/InteractiveModules/ScaleExplorer";
import { Language } from "@/types/education";

interface HomeProps {
  language: Language;
}

export default function Home({ language }: HomeProps) {
  const intl = useIntl();
  const [, setLocation] = useLocation();

  const topics = [
    {
      id: "seasons",
      href: `${intl.formatMessage({
        id: "routes.earthSpace",
      })}#${intl.formatMessage({ id: "routes.hash.seasons" })}`,
      title: "Pory roku",
      description:
        "Model 3D pokazujący wpływ nachylenia osi Ziemi na pory roku",
      icon: (
        <div className="p-2 bg-blue-600 rounded-lg">
          <Globe className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Interaktywny model 3D",
      featureIcon: <MousePointer className="w-3 h-3" />,
    },
    {
      id: "gravity",
      href: `${intl.formatMessage({
        id: "routes.earthSpace",
      })}#${intl.formatMessage({ id: "routes.hash.gravity" })}`,
      title: "Grawitacja",
      description: intl.formatMessage({
        id: "home.modules.gravity.description",
      }),
      icon: (
        <div className="p-2 bg-purple-600 rounded-lg">
          <Globe className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Symulacja czasoprzestrzeni",
      featureIcon: <Move3d className="w-3 h-3" />,
    },
    {
      id: "boiling",
      href: intl.formatMessage({ id: "routes.boiling" }),
      title: "Wrzenie wody",
      description: "Dynamiczne wykresy ciśnienia pary wodnej vs temperatura",
      icon: (
        <div className="p-2 bg-cyan-600 rounded-lg">
          <Microscope className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Interaktywne wykresy",
      featureIcon: <BarChart3 className="w-3 h-3" />,
    },
    {
      id: "color",
      href: intl.formatMessage({ id: "routes.optics" }),
      title: "Kolor obiektów",
      description:
        "Eksperyment z oświetlaniem obiektów światłem różnych kolorów",
      icon: (
        <div className="p-2 bg-red-600 rounded-lg">
          <Eye className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Eksperyment wirtualny",
      featureIcon: <Lightbulb className="w-3 h-3" />,
    },
    {
      id: "taste",
      href: intl.formatMessage({ id: "routes.taste" }),
      title: "Smak języka",
      description:
        "Interaktywna mapa języka pokazująca prawdziwą dystrybucję receptorów smaku",
      icon: (
        <div className="p-2 bg-green-600 rounded-lg">
          <Eye className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Mapa interaktywna",
      featureIcon: <Map className="w-3 h-3" />,
    },
    {
      id: "atoms",
      href: intl.formatMessage({ id: "routes.microworld" }),
      title: "Struktura atomu",
      description:
        "Porównanie klasycznego modelu planetarnego z kwantowym modelem chmury prawdopodobieństwa",
      icon: (
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Microscope className="w-5 h-5 text-white" />
        </div>
      ),
      feature: "Porównanie modeli",
      featureIcon: <Shuffle className="w-3 h-3" />,
    },
  ];

  return (
    <>
      <SEO
        isHomePage={true}
        title={intl.formatMessage({ id: "home.hero.title" })}
        description={intl.formatMessage({ id: "home.hero.subtitle" })}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="home-page"
      >
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
              <div className="ml-16 lg:ml-0">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="home.hero.title"
                    defaultMessage="Interaktywna Nauka"
                  />
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="home.hero.subtitle"
                    defaultMessage="Odkryj tajniki fizyki przez interaktywne eksperymenty i symulacje"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {intl.formatMessage({ id: "home.course.full" })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={heroImage}
                  alt="Interaktywna nauka fizyki"
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
            className="space-y-8"
          >
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-bold text-foreground">
                <FormattedMessage
                  id="home.featured.title"
                  defaultMessage="Polecane: Elektryczność i magnetyzm"
                />
              </h2>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                data-testid="view-all-electricity"
                onClick={() =>
                  setLocation(
                    intl.formatMessage({ id: "routes.electricityMagnetism" })
                  )
                }
              >
                <FormattedMessage
                  id="common.viewAll"
                  defaultMessage="Zobacz wszystko"
                />
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-gradient-to-r from-accent to-primary p-8 rounded-xl text-accent-foreground">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-black bg-opacity-20 rounded-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      <FormattedMessage
                        id="home.electricity.title"
                        defaultMessage="Czym jest prąd elektryczny?"
                      />
                    </h3>
                  </div>
                  <p className="text-accent-foreground opacity-90 mb-6">
                    <FormattedMessage
                      id="home.electricity.description"
                      defaultMessage="Poznaj prawdziwą naturę prądu elektrycznego. Dowiedz się, dlaczego elektrony poruszają się powoli, ale sygnał jest błyskawiczny, i jak działa prąd zmienny w twoim domu."
                    />
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-white text-foreground hover:bg-gray-100 w-full sm:w-auto"
                      data-testid="start-current-basics"
                      onClick={() =>
                        setLocation(
                          `${intl.formatMessage({
                            id: "routes.electricityMagnetism",
                          })}/current-basics`
                        )
                      }
                    >
                      <FormattedMessage
                        id="common.startLearning"
                        defaultMessage="Rozpocznij naukę"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-accent-foreground text-accent-foreground dark:border-white dark:text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                      data-testid="explore-electricity"
                      onClick={() =>
                        setLocation(
                          intl.formatMessage({
                            id: "routes.electricityMagnetism",
                          })
                        )
                      }
                    >
                      <FormattedMessage
                        id="common.exploreAll"
                        defaultMessage="Eksploruj wszystkie tematy"
                      />
                    </Button>
                  </div>
                </div>
                <div className="relative mt-8 lg:mt-0">
                  <div className="w-full h-48 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">
                        {intl.formatMessage({
                          id: "home.modules.electrons.title",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ScaleExplorer />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="home.otherTopics.title"
                defaultMessage="Inne tematy do eksploracji"
              />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <Link href={topic.href} key={topic.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="h-full"
                  >
                    <Card className="h-full hover:border-accent transition-colors cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          {topic.icon}
                          <CardTitle className="text-lg">
                            <FormattedMessage
                              id={`home.topics.${topic.id}.title`}
                              defaultMessage={topic.title}
                            />
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <Lightbulb className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <p className="text-sm">
                              <FormattedMessage
                                id="common.interactiveModule"
                                defaultMessage="Moduł interaktywny"
                              />
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          <FormattedMessage
                            id={`home.topics.${topic.id}.description`}
                            defaultMessage={topic.description}
                          />
                        </p>
                        <div className="flex items-center gap-2 text-xs text-accent">
                          {topic.featureIcon}
                          <span>
                            <FormattedMessage
                              id={`home.topics.${topic.id}.feature`}
                              defaultMessage={topic.feature}
                            />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              <FormattedMessage
                id="home.interactiveModules.title"
                defaultMessage="Moduły interaktywne"
              />
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={intl.formatMessage({ id: "routes.quiz" })}>
                <Card className="hover:border-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary rounded-lg">
                        <Zap className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        <FormattedMessage
                          id="home.modules.quiz.title"
                          defaultMessage="Quiz adaptacyjny"
                        />
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="home.modules.quiz.description"
                        defaultMessage="Test wiedzy dostosowujący się do Twojego poziomu"
                      />
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href={intl.formatMessage({ id: "routes.facts" })}>
                <Card className="hover:border-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-accent rounded-lg">
                        <Lightbulb className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        <FormattedMessage
                          id="home.modules.facts.title"
                          defaultMessage="Ciekawostka dnia"
                        />
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="home.modules.facts.description"
                        defaultMessage="Codziennie nowa fascynująca informacja z fizyki"
                      />
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href={intl.formatMessage({ id: "routes.scale" })}>
                <Card className="hover:border-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-secondary rounded-lg">
                        <Microscope className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <h4 className="font-semibold">
                        <FormattedMessage
                          id="home.modules.scale.title"
                          defaultMessage="Zabawa skalą"
                        />
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="home.modules.scale.description"
                        defaultMessage="Podróż od atomów do galaktyk w jednej symulacji"
                      />
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
