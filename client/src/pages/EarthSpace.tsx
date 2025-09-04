import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Clock, Bookmark, Sun, Moon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { BilliardBalls } from "@/components/InteractiveModules/BilliardBalls";
import { PlanetaryMotion } from "@/components/InteractiveModules/PlanetaryMotion";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import earthSpaceHeroImage from "@assets/generated_images/6.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface EarthSpaceProps {
  language: Language;
}

export default function EarthSpace({ language }: EarthSpaceProps) {
  const intl = useIntl();
  const isMobile = useIsMobile();

  const [earthTilt, setEarthTilt] = useState([23.5]);
  const [distanceFromSun, setDistanceFromSun] = useState([150]);
  const [timeOfDay, setTimeOfDay] = useState([12]);

  const billiardBallsHeight = isMobile ? 300 : 150;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const attemptScroll = (attempt = 0) => {
        if (attempt > 15) return;
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          setTimeout(() => attemptScroll(attempt + 1), 100);
        }
      };
      attemptScroll();
    }
  }, []);

  const getSeason = () => {
    const tilt = earthTilt[0];
    if (tilt > 20)
      return intl.formatMessage({ id: "earthSpace.seasons.distinctSeasons" });
    if (tilt > 10)
      return intl.formatMessage({ id: "earthSpace.seasons.moderateSeasons" });
    if (tilt > 5)
      return intl.formatMessage({ id: "earthSpace.seasons.weakSeasons" });
    return intl.formatMessage({ id: "earthSpace.seasons.noSeasons" });
  };

  const getGravitationalForce = () => {
    const d = distanceFromSun[0];
    const force = (150 * 150) / (d * d);
    return force;
  };

  const getSunPosition = () => {
    const hour = timeOfDay[0];
    const angle = (hour - 6) * 15;
    return angle;
  };

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "earthSpace.hero.title" })}
        description={intl.formatMessage({ id: "earthSpace.hero.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="earth-space-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${earthSpaceHeroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="mt-8 lg:mt-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="earthSpace.hero.title"
                    defaultMessage="Ziemia i kosmos"
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="earthSpace.hero.subtitle"
                    defaultMessage="Odkryj tajniki naszej planety i wszechświata"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.hero.readingTime"
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
                  src={earthSpaceHeroImage}
                  alt={intl.formatMessage({ id: "earthSpace.hero.imageAlt" })}
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
            <DailyFact language={language} category="earth-space" />
          </motion.div>

          <motion.section
            id={intl.formatMessage({ id: "routes.hash.seasons" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="earthSpace.seasons.title"
                defaultMessage="Pory roku - prawdziwa przyczyna"
              />
            </h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <FormattedMessage
                    id="earthSpace.seasons.cardTitle"
                    defaultMessage="Nachylenie osi Ziemi"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    <FormattedMessage
                      id="earthSpace.seasons.didYouKnowTitle"
                      defaultMessage="💡 Czy wiesz, że..."
                    />
                  </h4>
                  <p className="text-sm">
                    <FormattedMessage
                      id="earthSpace.seasons.didYouKnowText"
                      defaultMessage="To NIE odległość od Słońca decyduje o porach roku! W styczniu Ziemia jest najbliżej Słońca, a mimo to na półkuli północnej jest zima."
                    />
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    <FormattedMessage
                      id="earthSpace.seasons.tiltLabel"
                      defaultMessage="Nachylenie osi Ziemi: {tilt}°"
                      values={{ tilt: earthTilt[0] }}
                    />
                  </label>
                  <Slider
                    value={earthTilt}
                    onValueChange={setEarthTilt}
                    max={90}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <svg
                    viewBox="0 0 400 200"
                    className="w-full h-64 text-foreground"
                  >
                    <circle
                      cx="200"
                      cy="100"
                      r="20"
                      fill="yellow"
                      stroke="orange"
                      strokeWidth="2"
                    />
                    <text
                      x="200"
                      y="135"
                      className="text-xs font-bold fill-current"
                      textAnchor="middle"
                    >
                      <FormattedMessage
                        id="earthSpace.sun"
                        defaultMessage="Słońce"
                      />
                    </text>
                    <ellipse
                      cx="200"
                      cy="100"
                      rx="140"
                      ry="65"
                      fill="none"
                      stroke="gray"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <g transform="translate(340,100)">
                      <circle r="12" fill="blue" />
                      <line
                        x1="0"
                        y1="-15"
                        x2="0"
                        y2="15"
                        stroke="gray"
                        strokeWidth="2"
                        transform={`rotate(${earthTilt[0]})`}
                      />
                      <text
                        x="18"
                        y="0"
                        className="text-xs fill-current"
                        textAnchor="start"
                      >
                        <FormattedMessage
                          id="earthSpace.seasons.summerNorth"
                          defaultMessage="Lato (PŁN)"
                        />
                      </text>
                      <text
                        x="18"
                        y="12"
                        className="text-xs fill-current"
                        textAnchor="start"
                      >
                        <FormattedMessage
                          id="earthSpace.seasons.winterSouth"
                          defaultMessage="Zima (PŁD)"
                        />
                      </text>
                    </g>
                    <g transform="translate(60,100)">
                      <circle r="12" fill="blue" />
                      <line
                        x1="0"
                        y1="-15"
                        x2="0"
                        y2="15"
                        stroke="gray"
                        strokeWidth="2"
                        transform={`rotate(${earthTilt[0]})`}
                      />
                      <text
                        x="-18"
                        y="0"
                        className="text-xs fill-current"
                        textAnchor="end"
                      >
                        <FormattedMessage
                          id="earthSpace.seasons.winterNorth"
                          defaultMessage="Zima (PŁN)"
                        />
                      </text>
                      <text
                        x="-18"
                        y="12"
                        className="text-xs fill-current"
                        textAnchor="end"
                      >
                        <FormattedMessage
                          id="earthSpace.seasons.summerSouth"
                          defaultMessage="Lato (PŁD)"
                        />
                      </text>
                    </g>
                    <path
                      d="M 220 85 L 330 95"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 220 95 L 330 100"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 220 105 L 330 105"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 180 85 L 70 95"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 180 95 L 70 100"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 180 105 L 70 105"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded">
                    <h4 className="font-semibold mb-2">
                      <FormattedMessage
                        id="earthSpace.seasons.effectOfTilt"
                        defaultMessage="Skutek nachylenia"
                      />
                    </h4>
                    <Badge variant="secondary" className="mb-2">
                      {getSeason()}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.seasons.currentTiltInfo"
                        defaultMessage="Obecne nachylenie Ziemi (23.5°) zapewnia wyraźne pory roku."
                      />
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded">
                    <h4 className="font-semibold mb-2">
                      <FormattedMessage
                        id="earthSpace.seasons.temperatureDifferenceTitle"
                        defaultMessage="Różnica temperatur"
                      />
                    </h4>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {Math.round(earthTilt[0] * 2)}°C
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.seasons.differenceBetweenSeasons"
                        defaultMessage="Różnica między latem a zimą"
                      />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            id={intl.formatMessage({ id: "routes.hash.gravity" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="earthSpace.gravity.title"
                defaultMessage="Grawitacja - więcej niż myślisz"
              />
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="earthSpace.gravity.newtonsLawTitle"
                      defaultMessage="Prawo powszechnego ciążenia"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <FormattedMessage
                        id="earthSpace.gravity.distanceLabel"
                        defaultMessage="Odległość od Słońca: {distance} mln km"
                        values={{ distance: distanceFromSun[0] }}
                      />
                    </label>
                    <Slider
                      value={distanceFromSun}
                      onValueChange={setDistanceFromSun}
                      max={300}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-muted p-4 rounded text-center">
                    <div className="text-xl font-bold mb-2">
                      <FormattedMessage
                        id="earthSpace.gravity.formula"
                        defaultMessage="F = G × m₁m₂/r²"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      <FormattedMessage
                        id="earthSpace.gravity.forceDescription"
                        defaultMessage="Siła grawitacji między Ziemią a Słońcem"
                      />
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {getGravitationalForce().toFixed(2)} × F₀
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.gravity.relativeForce"
                        defaultMessage="(względem obecnej odległości)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="earthSpace.gravity.constantG"
                          defaultMessage="G (stała)"
                        />
                      </div>
                      <div className="text-muted-foreground">6.67 × 10⁻¹¹</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="earthSpace.gravity.sunMass"
                          defaultMessage="Masa Słońca"
                        />
                      </div>
                      <div className="text-muted-foreground">2 × 10³⁰ kg</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="earthSpace.gravity.earthMass"
                          defaultMessage="Masa Ziemi"
                        />
                      </div>
                      <div className="text-muted-foreground">6 × 10²⁴ kg</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="earthSpace.gravity.orbitalSpeed"
                          defaultMessage="Prędkość orbitalna"
                        />
                      </div>
                      <div className="text-muted-foreground">30 km/s</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="earthSpace.einstein.title"
                      defaultMessage="Teoria względności Einsteina"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      <FormattedMessage
                        id="earthSpace.einstein.newPerspectiveTitle"
                        defaultMessage="🚀 Nowe spojrzenie"
                      />
                    </h4>
                    <p className="text-sm">
                      <FormattedMessage
                        id="earthSpace.einstein.newPerspectiveText"
                        defaultMessage="Einstein pokazał, że grawitacja to nie siła, ale zakrzywienie czasoprzestrzeni! Masa zakrzywia przestrzeń, a obiekty poruszają się po najkrótszych ścieżkach."
                      />
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <svg
                      viewBox="0 0 200 150"
                      className="w-full h-32 text-foreground"
                    >
                      <defs>
                        <pattern
                          id="grid"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="gray"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect width="200" height="150" fill="url(#grid)" />
                      <ellipse
                        cx="100"
                        cy="75"
                        rx="50"
                        ry="25"
                        fill="none"
                        stroke="blue"
                        strokeWidth="2"
                      />
                      <ellipse
                        cx="100"
                        cy="75"
                        rx="35"
                        ry="18"
                        fill="none"
                        stroke="blue"
                        strokeWidth="2"
                      />
                      <ellipse
                        cx="100"
                        cy="75"
                        rx="20"
                        ry="10"
                        fill="none"
                        stroke="blue"
                        strokeWidth="2"
                      />
                      <circle cx="100" cy="75" r="8" fill="yellow" />
                      <text
                        x="100"
                        y="70"
                        className="text-xs fill-current"
                        textAnchor="middle"
                      >
                        <FormattedMessage
                          id="earthSpace.einstein.sunLabel"
                          defaultMessage="Słońce"
                        />
                      </text>
                      <circle cx="130" cy="75" r="3" fill="blue" />
                      <text
                        x="135"
                        y="80"
                        className="text-xs fill-current"
                        textAnchor="start"
                      >
                        <FormattedMessage
                          id="earthSpace.einstein.earthLabel"
                          defaultMessage="Ziemia"
                        />
                      </text>
                      <path
                        d="M 130 75 Q 120 65 110 75 Q 120 85 130 75"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeDasharray="2,2"
                      />
                    </svg>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>
                        <FormattedMessage
                          id="earthSpace.einstein.classicalPhysics"
                          defaultMessage="Klasyczna fizyka:"
                        />
                      </strong>
                      <FormattedMessage
                        id="earthSpace.einstein.classicalPhysicsText"
                        defaultMessage="Ziemia przyciągana przez Słońce"
                      />
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="earthSpace.einstein.relativityTheory"
                          defaultMessage="Teoria względności:"
                        />
                      </strong>
                      <FormattedMessage
                        id="earthSpace.einstein.relativityTheoryText"
                        defaultMessage="Ziemia podąża krzywizną czasoprzestrzeni"
                      />
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="earthSpace.einstein.outcome"
                          defaultMessage="Skutek:"
                        />
                      </strong>
                      <FormattedMessage
                        id="earthSpace.einstein.outcomeText"
                        defaultMessage="Identyczne przewidywania, różne wyjaśnienie"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="earthSpace.dayNight.title"
                defaultMessage="Cykl dnia i nocy"
              />
            </h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  <FormattedMessage
                    id="earthSpace.dayNight.cardTitle"
                    defaultMessage="Rotacja Ziemi"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    <FormattedMessage
                      id="earthSpace.dayNight.timeLabel"
                      defaultMessage="Pora dnia: {time}:00"
                      values={{ time: timeOfDay[0] }}
                    />
                  </label>
                  <Slider
                    value={timeOfDay}
                    onValueChange={setTimeOfDay}
                    max={24}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <svg
                    viewBox="0 0 300 200"
                    className="w-full h-64 text-foreground"
                  >
                    <circle
                      cx="50"
                      cy="100"
                      r="15"
                      fill="yellow"
                      stroke="orange"
                      strokeWidth="2"
                    />
                    <text
                      x="50"
                      y="125"
                      className="text-xs font-bold fill-current"
                      textAnchor="middle"
                    >
                      <FormattedMessage
                        id="earthSpace.dayNight.sunLabel"
                        defaultMessage="Słońce"
                      />
                    </text>
                    <circle
                      cx="200"
                      cy="100"
                      r="30"
                      fill="url(#dayNightGradient)"
                      stroke="darkblue"
                      strokeWidth="2"
                    />
                    <path
                      d="M 180 80 A 20 20 0 0 1 220 80"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <g
                      transform={`translate(200, 100) rotate(${
                        getSunPosition() + 90
                      })`}
                    >
                      <circle cx="0" cy="-30" r="3" fill="red" />
                    </g>
                    <text
                      x="200"
                      y="50"
                      className="text-xs text-red-600 fill-current"
                      textAnchor="middle"
                    >
                      <FormattedMessage
                        id="earthSpace.dayNight.yourLocation"
                        defaultMessage="Twoja lokalizacja"
                      />
                    </text>
                    <path
                      d="M 80 85 L 170 85"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 80 100 L 170 100"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d="M 80 115 L 170 115"
                      stroke="yellow"
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <defs>
                      <linearGradient
                        id="dayNightGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="darkblue" />
                        <stop offset="50%" stopColor="darkblue" />
                        <stop offset="50%" stopColor="lightblue" />
                        <stop offset="100%" stopColor="lightblue" />
                      </linearGradient>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="red" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded text-center">
                    <div className="text-lg font-bold mb-1">
                      {timeOfDay[0] >= 6 && timeOfDay[0] <= 18 ? "☀️" : "🌙"}
                    </div>
                    <div className="font-semibold">
                      {timeOfDay[0] >= 6 && timeOfDay[0] <= 18 ? (
                        <FormattedMessage
                          id="earthSpace.dayNight.day"
                          defaultMessage="Dzień"
                        />
                      ) : (
                        <FormattedMessage
                          id="earthSpace.dayNight.night"
                          defaultMessage="Noc"
                        />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.dayNight.localTimeTitle"
                        defaultMessage="Lokalna pora"
                      />
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded text-center">
                    <div className="text-lg font-bold mb-1">24h</div>
                    <div className="font-semibold">
                      <FormattedMessage
                        id="earthSpace.dayNight.dayLengthTitle"
                        defaultMessage="Doba"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.dayNight.dayLengthDescription"
                        defaultMessage="Pełny obrót Ziemi"
                      />
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded text-center">
                    <div className="text-lg font-bold mb-1">1670 km/h</div>
                    <div className="font-semibold">
                      <FormattedMessage
                        id="earthSpace.dayNight.equatorSpeedTitle"
                        defaultMessage="Prędkość na równiku"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.dayNight.equatorSpeedDescription"
                        defaultMessage="Prędkość rotacji"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    <FormattedMessage
                      id="earthSpace.dayNight.funFactTitle"
                      defaultMessage="🌍 Ciekawostka"
                    />
                  </h4>
                  <p className="text-sm">
                    <FormattedMessage
                      id="earthSpace.dayNight.funFactText"
                      defaultMessage="Wszyscy na Ziemi poruszamy się z ogromną prędkością! Na równiku to 1670 km/h, w Polsce około 1200 km/h. Dlaczego tego nie czujemy? Bo wszystko wokół nas porusza się z tą samą prędkością!"
                    />
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid gap-8"
          >
            <PlanetaryMotion />
            <BilliardBalls height={billiardBallsHeight} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="earthSpace.exploration.title"
                defaultMessage="Eksploracja kosmosu"
              />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <FormattedMessage
                      id="earthSpace.exploration.closestStarTitle"
                      defaultMessage="Najbliższa gwiazda"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      4.2
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.exploration.lightYears"
                        defaultMessage="lata świetlne"
                      />
                    </div>
                    <div className="text-xs mt-2">
                      <FormattedMessage
                        id="earthSpace.exploration.proximaCentauri"
                        defaultMessage="Proxima Centauri"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="earthSpace.exploration.voyagerTitle"
                      defaultMessage="Voyager 1"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      23 mld
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.exploration.voyagerDistance"
                        defaultMessage="km od Ziemi"
                      />
                    </div>
                    <div className="text-xs mt-2">
                      <FormattedMessage
                        id="earthSpace.exploration.voyagerLocation"
                        defaultMessage="Poza Układem Słonecznym"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="earthSpace.exploration.issTitle"
                      defaultMessage="ISS"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      408
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.exploration.issHeight"
                        defaultMessage="km wysokości"
                      />
                    </div>
                    <div className="text-xs mt-2">
                      <FormattedMessage
                        id="earthSpace.exploration.issSpeed"
                        defaultMessage="27,600 km/h"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="earthSpace.exploration.galaxyTitle"
                      defaultMessage="Galaktyka"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      100 mld
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="earthSpace.exploration.stars"
                        defaultMessage="gwiazd"
                      />
                    </div>
                    <div className="text-xs mt-2">
                      <FormattedMessage
                        id="earthSpace.exploration.milkyWay"
                        defaultMessage="Droga Mleczna"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
