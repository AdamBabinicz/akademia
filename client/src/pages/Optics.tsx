import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Lightbulb, Camera, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import heroImage from "@assets/generated_images/13.png";

interface OpticsProps {
  language: Language;
}

export default function Optics({ language }: OpticsProps) {
  const intl = useIntl();
  const [refractiveIndex, setRefractiveIndex] = useState([1.5]);
  const [wavelength, setWavelength] = useState([550]);
  const [lensDistance, setLensDistance] = useState([20]);

  const getWavelengthColor = (wl: number) => {
    if (wl < 450) return "#4B0082"; // Violet
    if (wl < 495) return "#0000FF"; // Blue
    if (wl < 570) return "#00FF00"; // Green
    if (wl < 590) return "#FFFF00"; // Yellow
    if (wl < 620) return "#FFA500"; // Orange
    return "#FF0000"; // Red
  };

  const getColorNameKey = (wl: number) => {
    if (wl < 450) return "optics.color.violet";
    if (wl < 495) return "optics.color.blue";
    if (wl < 570) return "optics.color.green";
    if (wl < 590) return "optics.color.yellow";
    if (wl < 620) return "optics.color.orange";
    return "optics.color.red";
  };

  const calculateRefraction = () => {
    const angle = 30; // degrees
    const criticalAngle = Math.asin(1 / refractiveIndex[0]) * (180 / Math.PI);
    const refractedAngle =
      Math.asin(Math.sin((angle * Math.PI) / 180) / refractiveIndex[0]) *
      (180 / Math.PI);
    return { criticalAngle, refractedAngle };
  };

  const { criticalAngle, refractedAngle } = calculateRefraction();

  const opticsImageAlt = intl.formatMessage({
    id: "opticsImageAlt",
    defaultMessage: "Abstrakcyjny obraz symbolizujący optykę",
  });

  const bookmarkAriaLabel = intl.formatMessage({
    id: "optics.bookmarkAriaLabel",
    defaultMessage: "Dodaj do zakładek",
  });

  const wavelengthAriaLabel = intl.formatMessage({
    id: "optics.wavelengthAriaLabel",
    defaultMessage: "Zmień długość fali światła",
  });

  const refractiveIndexAriaLabel = intl.formatMessage({
    id: "optics.refractiveIndexAriaLabel",
    defaultMessage: "Zmień współczynnik załamania",
  });

  const lensDistanceAriaLabel = intl.formatMessage({
    id: "optics.lensDistanceAriaLabel",
    defaultMessage: "Zmień odległość od soczewki",
  });

  const imgD = (10 * lensDistance[0]) / (lensDistance[0] - 10);
  const mag = imgD / lensDistance[0];

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "nav.optics" })}
        description={intl.formatMessage({ id: "opticsDescription" })}
        schema={{ type: "article" }}
      />
      <div className="min-h-screen transition-all duration-300 ease-in-out">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-b border-border py-6 px-4 md:px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="ml-0 md:ml-8 lg:ml-0">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  <FormattedMessage id="nav.optics" />
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                  <FormattedMessage id="opticsDescription" />
                </p>
                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      ~45 min
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={bookmarkAriaLabel}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="block">
                <img
                  src={heroImage}
                  alt={opticsImageAlt}
                  className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
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
            <DailyFact language={language} category="optics" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage id="opticsMainHeading" />
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    <FormattedMessage id="lightNature" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="lightNatureContent" />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <FormattedMessage id="reflectionRefraction" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="reflectionRefractionContent" />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    <FormattedMessage id="lensesMirrors" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="lensesMirrorsContent" />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    <FormattedMessage id="opticalInstruments" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="opticalInstrumentsContent" />
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                <FormattedMessage id="common.interactiveModule" />
              </h3>
              <p className="text-muted-foreground">
                <FormattedMessage id="home.modules.interactiveModules.description" />
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FormattedMessage id="home.topics.color.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <FormattedMessage
                        id="optics.wavelength.label"
                        defaultMessage="Długość fali:"
                      />{" "}
                      {wavelength[0]} nm
                    </label>
                    <Slider
                      value={wavelength}
                      onValueChange={setWavelength}
                      max={750}
                      min={380}
                      step={10}
                      className="w-full"
                      aria-label={wavelengthAriaLabel}
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div
                      className="w-full h-16 rounded mb-4 border"
                      style={{
                        backgroundColor: getWavelengthColor(wavelength[0]),
                      }}
                    />
                    <div className="text-center">
                      <Badge variant="secondary">
                        <FormattedMessage id={getColorNameKey(wavelength[0])} />
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="optics.wavelength.description"
                      defaultMessage="Przesuwaj suwakiem, aby zmienić długość fali światła i zobacz, jak wpływa to na jego kolor. Pamiętaj, że nasze oczy postrzegają jedynie wąski zakres fal elektromagnetycznych!"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FormattedMessage id="optics.refraction.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <FormattedMessage
                        id="optics.refractiveIndex.label"
                        defaultMessage="Współczynnik załamania (n):"
                      />{" "}
                      {refractiveIndex[0].toFixed(2)}
                    </label>
                    <Slider
                      value={refractiveIndex}
                      onValueChange={setRefractiveIndex}
                      max={2.5}
                      min={1.0}
                      step={0.01}
                      className="w-full"
                      aria-label={refractiveIndexAriaLabel}
                    />
                  </div>
                  <div className="flex items-center justify-center p-4 rounded-lg bg-background border">
                    <svg
                      width="250"
                      height="200"
                      viewBox="0 0 250 200"
                      className="max-w-full h-auto"
                    >
                      <rect
                        x="0"
                        y="100"
                        width="250"
                        height="100"
                        className="fill-blue-200 stroke-blue-500"
                      />
                      <line
                        x1="100"
                        y1="0"
                        x2="100"
                        y2="200"
                        className="stroke-gray-400 stroke-dasharray-4-2"
                      />
                      <path
                        d="M 100 0 L 100 100 L 150 100 Z"
                        className="fill-yellow-400 opacity-70"
                      />
                      <path
                        d={`M 150 100 L ${
                          150 + 50 * Math.sin((refractedAngle * Math.PI) / 180)
                        } ${
                          100 + 50 * Math.cos((refractedAngle * Math.PI) / 180)
                        }`}
                        className="stroke-blue-500 stroke-2"
                      />
                      <text x="110" y="20" className="text-xs fill-foreground">
                        <FormattedMessage
                          id="optics.air"
                          defaultMessage="Powietrze"
                        />
                      </text>
                      <text x="110" y="120" className="text-xs fill-foreground">
                        <FormattedMessage
                          id="optics.medium"
                          defaultMessage="Ośrodek"
                        />
                      </text>
                      <text
                        x="115"
                        y="65"
                        className="text-xs fill-yellow-600 font-mono"
                      >
                        30°
                      </text>
                      <text
                        x="160"
                        y="140"
                        className="text-xs fill-blue-600 font-mono"
                      >
                        {refractedAngle.toFixed(1)}°
                      </text>
                    </svg>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <h4 className="font-semibold mb-2">
                        <FormattedMessage
                          id="optics.snellsLaw.title"
                          defaultMessage="Prawo Snella"
                        />
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        <FormattedMessage
                          id="optics.snellsLaw.description"
                          defaultMessage="n₁sin(θ₁) = n₂sin(θ₂)"
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        n₁=1 (
                        <FormattedMessage
                          id="optics.air"
                          defaultMessage="Powietrze"
                        />
                        )
                      </p>
                      <p className="text-xs text-muted-foreground">
                        n₂={refractiveIndex[0].toFixed(2)} (
                        <FormattedMessage
                          id="optics.medium"
                          defaultMessage="Ośrodek"
                        />
                        )
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <h4 className="font-semibold mb-2">
                        <FormattedMessage
                          id="optics.criticalAngle.title"
                          defaultMessage="Kąt graniczny"
                        />
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {criticalAngle.toFixed(1)}°
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="optics.criticalAngle.description"
                          defaultMessage="Kąt padania, dla którego kąt załamania wynosi 90°."
                        />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FormattedMessage id="optics.lenses.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <FormattedMessage
                        id="optics.lensDistance.label"
                        defaultMessage="Odległość od soczewki:"
                      />{" "}
                      {lensDistance[0]} cm
                    </label>
                    <Slider
                      value={lensDistance}
                      onValueChange={setLensDistance}
                      max={50}
                      min={5}
                      step={1}
                      className="w-full"
                      aria-label={lensDistanceAriaLabel}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      viewBox="0 0 400 200"
                      className="w-full h-auto max-w-md"
                    >
                      <path
                        d="M 50 100 Q 100 50 150 100 Q 100 150 50 100 Z"
                        className="fill-blue-500 opacity-30 stroke-blue-500 stroke-2"
                      />
                      <line
                        x1="0"
                        y1="100"
                        x2="400"
                        y2="100"
                        className="stroke-gray-400 stroke-dasharray-4-2"
                      />
                      <line
                        x1="100"
                        y1="50"
                        x2="100"
                        y2="150"
                        className="stroke-black"
                      />
                      <circle cx="100" cy="100" r="3" className="fill-black" />
                      <circle
                        cx="200"
                        cy="100"
                        r="3"
                        className="fill-gray-600"
                      />
                      <text x="200" y="90" className="text-xs fill-gray-600">
                        F
                      </text>
                      <circle cx="0" cy="100" r="5" className="fill-red-500" />
                      <text x="0" y="90" className="text-xs fill-red-500">
                        O
                      </text>
                      <line
                        x1="0"
                        y1="100"
                        x2="100"
                        y2="100"
                        className="stroke-red-500 stroke-1"
                      />
                      <path
                        d="M 0 100 Q 50 50 100 100"
                        className="stroke-red-500 stroke-1"
                      />
                      <path
                        d={`M ${100} 100 L ${200 - lensDistance[0]} ${
                          100 +
                          50 *
                            (1 / (10 - lensDistance[0])) *
                            (lensDistance[0] / (10 - lensDistance[0]))
                        }`}
                        className="stroke-red-500 stroke-1"
                      />
                      <path
                        d={`M ${100} 100 L ${200 - lensDistance[0]} ${
                          100 +
                          50 *
                            (1 / (10 - lensDistance[0])) *
                            (lensDistance[0] / (10 - lensDistance[0]))
                        }`}
                        className="stroke-red-500 stroke-1"
                      />
                      <text x="50" y="115" className="text-xs fill-foreground">
                        {lensDistance[0]} cm
                      </text>
                      <circle
                        cx={(100 * lensDistance[0]) / (lensDistance[0] - 10)}
                        cy="100"
                        r="5"
                        className="fill-green-500"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      <FormattedMessage id="optics.lensFormula.title" />
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <FormattedMessage id="optics.lensFormula.description" />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {lensDistance[0] !== 10 ? (
                        <FormattedMessage
                          id="optics.lensFormula.example"
                          values={{
                            f: 10,
                            d: lensDistance[0],
                            imgD: imgD,
                            mag: mag,
                          }}
                        />
                      ) : (
                        "Brak obrazu"
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <section className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              <FormattedMessage
                id="optics.gallery.title"
                defaultMessage="Galeria Zjawisk"
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage id="optics.rainbow.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4 text-center">
                    <div className="text-2xl mb-2">🌈</div>
                    <div className="text-xs">
                      <FormattedMessage id="optics.rainbow.description" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="optics.rainbow.content" />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage id="optics.mirage.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4 text-center">
                    <div className="text-2xl mb-2">🏝️</div>
                    <div className="text-xs">
                      <FormattedMessage id="optics.mirage.description" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="optics.mirage.content" />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage id="optics.interference.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4">
                    <svg viewBox="0 0 100 50" className="w-full h-12">
                      <path
                        d="M 0 25 Q 25 15 50 25 Q 75 35 100 25"
                        stroke="blue"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M 0 25 Q 25 35 50 25 Q 75 15 100 25"
                        stroke="red"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="optics.interference.content" />
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
