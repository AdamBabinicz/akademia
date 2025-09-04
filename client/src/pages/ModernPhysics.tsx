import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import { Atom, Zap, Clock, Bookmark } from "lucide-react";
import SEO from "@/components/SEO";
import heroImage from "@assets/generated_images/5.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";

interface ModernPhysicsProps {
  language: Language;
}

export default function ModernPhysics({ language }: ModernPhysicsProps) {
  const intl = useIntl();
  const [velocity, setVelocity] = useState([0.5]);
  const [energy, setEnergy] = useState([2]);
  const [mass, setMass] = useState([1]);

  const calculateRelativistic = () => {
    const v = velocity[0];
    const c = 1;
    const gamma = 1 / Math.sqrt(1 - v * v);
    const timeDialation = gamma;
    const lengthContraction = 1 / gamma;
    const massIncrease = gamma;
    return { gamma, timeDialation, lengthContraction, massIncrease };
  };

  const calculatePhotoelectric = () => {
    const h = 4.136e-15;
    const E = energy[0];
    const frequency = E / h / 1e14;
    const wavelength = 300 / frequency;
    return { frequency, wavelength };
  };

  const { gamma, timeDialation, lengthContraction, massIncrease } =
    calculateRelativistic();
  const { frequency, wavelength } = calculatePhotoelectric();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "modernphysics.hero.title" })}
        description={intl.formatMessage({ id: "modernphysics.hero.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="modern-physics-page"
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
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage
                    id="modernphysics.hero.title"
                    defaultMessage="Fizyka Nowoczesna"
                  />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage
                    id="modernphysics.hero.subtitle"
                    defaultMessage="Odkryj tajemnice kwantów, względności i struktury materii"
                  />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage
                        id="modernphysics.course.duration"
                        defaultMessage="~60 min"
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
                  src={heroImage}
                  alt={intl.formatMessage({
                    id: "modernphysics.hero.imageAlt",
                    defaultMessage: "Fizyka nowoczesna - wizualizacja",
                  })}
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
            <DailyFact language={language} category="modernPhysics" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="modernphysics.relativity.title"
                defaultMessage="Teoria względności"
              />
            </h2>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <FormattedMessage
                    id="modernphysics.relativity.effects.title"
                    defaultMessage="Efekty relatywistyczne"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    <FormattedMessage
                      id="modernphysics.relativity.velocity"
                      defaultMessage="Prędkość (w jednostkach c): {velocity}c"
                      values={{ velocity: velocity[0].toFixed(2) }}
                    />
                  </label>
                  <Slider
                    value={velocity}
                    onValueChange={setVelocity}
                    max={0.99}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      <FormattedMessage
                        id="modernphysics.relativity.lorentz"
                        defaultMessage="Współczynnik Lorentza (γ)"
                      />
                    </h4>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {gamma.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        γ = 1/√(1 - v²/c²)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      <FormattedMessage
                        id="modernphysics.relativity.einstein"
                        defaultMessage="Wzór E = mc²"
                      />
                    </h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div>
                          <FormattedMessage
                            id="modernphysics.relativity.restEnergy"
                            defaultMessage="Energia spoczynkowa: E₀ = mc²"
                          />
                        </div>
                        <div>
                          <FormattedMessage
                            id="modernphysics.relativity.totalEnergy"
                            defaultMessage="Energia całkowita: E = γmc²"
                          />
                        </div>
                        <div className="text-primary font-semibold">
                          E = {(gamma * mass[0]).toFixed(3)} × mc²
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <FormattedMessage
                          id="modernphysics.relativity.timeDilation"
                          defaultMessage="Dylatacja czasu"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {timeDialation.toFixed(2)}×
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <FormattedMessage
                            id="modernphysics.relativity.timeSlows"
                            defaultMessage="Czas płynie wolniej"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <FormattedMessage
                          id="modernphysics.relativity.lengthContraction"
                          defaultMessage="Kontrakcja długości"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {lengthContraction.toFixed(2)}×
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <FormattedMessage
                            id="modernphysics.relativity.lengthShrinks"
                            defaultMessage="Długość się skraca"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        <FormattedMessage
                          id="modernphysics.relativity.massIncrease"
                          defaultMessage="Wzrost masy"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {massIncrease.toFixed(2)}×
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <FormattedMessage
                            id="modernphysics.relativity.relativisticMass"
                            defaultMessage="Masa relatywistyczna"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="modernphysics.quantum.title"
                defaultMessage="Fizyka kwantowa"
              />
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="modernphysics.quantum.photoelectric"
                      defaultMessage="Efekt fotoelektryczny"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <FormattedMessage
                        id="modernphysics.quantum.photonEnergy"
                        defaultMessage="Energia fotonu: {energy} eV"
                        values={{ energy: energy[0] }}
                      />
                    </label>
                    <Slider
                      value={energy}
                      onValueChange={setEnergy}
                      max={10}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <svg viewBox="0 0 300 200" className="w-full h-40">
                      <rect
                        x="50"
                        y="150"
                        width="200"
                        height="40"
                        fill="#c0c0c0"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <text
                        x="140"
                        y="175"
                        className="text-xs dark:text-black font-bold"
                        fill="currentColor"
                      >
                        <FormattedMessage
                          id="modernphysics.common.metal"
                          defaultMessage="Metal"
                        />
                      </text>

                      {energy[0] > 2 && (
                        <>
                          <circle cx="80" cy="100" r="3" fill="yellow" />
                          <path
                            d="M 80 100 L 85 120"
                            stroke="yellow"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                          <text
                            x="60"
                            y="95"
                            className="text-xs"
                            fill="currentColor"
                          >
                            <FormattedMessage
                              id="modernphysics.quantum.photon"
                              defaultMessage="Foton"
                            />
                          </text>
                          <text
                            x="55"
                            y="105"
                            className="text-xs"
                            fill="currentColor"
                          >
                            {energy[0]} eV
                          </text>
                        </>
                      )}

                      {energy[0] > 2 && (
                        <>
                          <circle cx="120" cy="80" r="2" fill="blue" />
                          <path
                            d="M 120 80 L 130 60"
                            stroke="blue"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                          <text
                            x="135"
                            y="55"
                            className="text-xs"
                            fill="currentColor"
                          >
                            <FormattedMessage
                              id="modernphysics.quantum.electron"
                              defaultMessage="Elektron"
                            />
                          </text>
                          <text
                            x="130"
                            y="65"
                            className="text-xs"
                            fill="currentColor"
                          >
                            {(energy[0] - 2).toFixed(1)} eV
                          </text>
                        </>
                      )}

                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="currentColor"
                          />
                        </marker>
                      </defs>
                    </svg>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>
                        <FormattedMessage
                          id="modernphysics.quantum.einsteinEquation"
                          defaultMessage="Równanie Einsteina:"
                        />
                      </strong>{" "}
                      E = hf = Φ + Ek
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="modernphysics.quantum.frequency"
                          defaultMessage="Częstotliwość:"
                        />
                      </strong>{" "}
                      {frequency.toFixed(1)} × 10¹⁴ Hz
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="modernphysics.quantum.wavelength"
                          defaultMessage="Długość fali:"
                        />
                      </strong>{" "}
                      {wavelength.toFixed(0)} nm
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="modernphysics.quantum.workFunction"
                          defaultMessage="Praca wyjścia (Φ):"
                        />
                      </strong>{" "}
                      2.0 eV
                    </div>
                    <div>
                      <strong>
                        <FormattedMessage
                          id="modernphysics.quantum.kineticEnergy"
                          defaultMessage="Energia kinetyczna:"
                        />
                      </strong>{" "}
                      {Math.max(0, energy[0] - 2).toFixed(1)} eV
                    </div>
                    {energy[0] < 2 && (
                      <Badge variant="destructive">
                        <FormattedMessage
                          id="modernphysics.quantum.noEmission"
                          defaultMessage="Brak emisji elektronów!"
                        />
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Atom className="w-5 h-5" />
                    <FormattedMessage
                      id="modernphysics.quantum.bohrModel"
                      defaultMessage="Model atomu Bohra"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <svg viewBox="0 0 200 200" className="w-full h-48">
                      <circle cx="100" cy="100" r="8" fill="red" />
                      <text
                        x="95"
                        y="105"
                        className="text-xs font-bold"
                        fill="white"
                      >
                        N
                      </text>

                      <circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="blue"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="50"
                        fill="none"
                        stroke="green"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="purple"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="orange"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />

                      <circle cx="130" cy="100" r="3" fill="blue" />
                      <circle cx="150" cy="100" r="3" fill="green" />
                      <circle cx="170" cy="100" r="3" fill="purple" />

                      <text
                        x="10"
                        y="70"
                        className="text-xs"
                        fill="currentColor"
                      >
                        n=4 (-0.85 eV)
                      </text>
                      <text
                        x="10"
                        y="50"
                        className="text-xs"
                        fill="currentColor"
                      >
                        n=3 (-1.51 eV)
                      </text>
                      <text
                        x="10"
                        y="30"
                        className="text-xs"
                        fill="currentColor"
                      >
                        n=2 (-3.4 eV)
                      </text>
                      <text
                        x="10"
                        y="130"
                        className="text-xs"
                        fill="currentColor"
                      >
                        n=1 (-13.6 eV)
                      </text>

                      <path
                        d="M 150 100 L 130 100"
                        stroke="yellow"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x="135"
                        y="85"
                        className="text-xs"
                        fill="currentColor"
                      >
                        hν
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="modernphysics.quantum.energyLevel"
                          defaultMessage="Energia poziomu n"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        En = -13.6/n² eV
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="modernphysics.quantum.orbitRadius"
                          defaultMessage="Promień orbity"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        rn = n² × 0.529 Å
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="modernphysics.quantum.frequencyFormula"
                          defaultMessage="Częstotliwość"
                        />
                      </div>
                      <div className="text-muted-foreground">
                        ν = (Ei - Ef)/h
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="font-semibold">
                        <FormattedMessage
                          id="modernphysics.quantum.angularMomentum"
                          defaultMessage="Moment pędu"
                        />
                      </div>
                      <div className="text-muted-foreground">L = nℏ</div>
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
                id="modernphysics.particles.title"
                defaultMessage="Fizyka cząstek elementarnych"
              />
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="modernphysics.particles.standardModel"
                      defaultMessage="Model Standardowy"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">u</div>
                      <div className="text-xs">up</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">c</div>
                      <div className="text-xs">charm</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">t</div>
                      <div className="text-xs">top</div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">γ</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.photon"
                          defaultMessage="foton"
                        />
                      </div>
                    </div>

                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">d</div>
                      <div className="text-xs">down</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">s</div>
                      <div className="text-xs">strange</div>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">b</div>
                      <div className="text-xs">bottom</div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">W</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.wBoson"
                          defaultMessage="bozon W"
                        />
                      </div>
                    </div>

                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">e</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.electronShort"
                          defaultMessage="elektron"
                        />
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">μ</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.muon"
                          defaultMessage="mion"
                        />
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">τ</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.tau"
                          defaultMessage="taon"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">Z</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.zBoson"
                          defaultMessage="bozon Z"
                        />
                      </div>
                    </div>

                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">νe</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.electronNeutrino"
                          defaultMessage="neutrino e"
                        />
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">νμ</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.muonNeutrino"
                          defaultMessage="neutrino μ"
                        />
                      </div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">ντ</div>
                      <div className="text-xs">
                        <FormattedMessage
                          id="modernphysics.particles.tauNeutrino"
                          defaultMessage="neutrino τ"
                        />
                      </div>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded text-center">
                      <div className="font-bold text-xs">H</div>
                      <div className="text-xs">Higgs</div>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded"></div>
                      <span>
                        <FormattedMessage
                          id="modernphysics.particles.quarks"
                          defaultMessage="Kwarki (6 typów)"
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded"></div>
                      <span>
                        <FormattedMessage
                          id="modernphysics.particles.leptons"
                          defaultMessage="Leptony (6 typów)"
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
                      <span>
                        <FormattedMessage
                          id="modernphysics.particles.gaugeBosons"
                          defaultMessage="Bozony cechowania"
                        />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900/30 rounded"></div>
                      <span>
                        <FormattedMessage
                          id="modernphysics.particles.higgsBoson"
                          defaultMessage="Bozon Higgsa"
                        />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="modernphysics.particles.fundamentalForces"
                      defaultMessage="Fundamentalne oddziaływania"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">
                          <FormattedMessage
                            id="modernphysics.particles.strongForce"
                            defaultMessage="Silne"
                          />
                        </span>
                        <Badge>1</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="modernphysics.particles.strongDescription"
                          defaultMessage="Wiąże kwarki w nukleony, gluon"
                        />
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">
                          <FormattedMessage
                            id="modernphysics.particles.electromagneticForce"
                            defaultMessage="Elektromagnetyczne"
                          />
                        </span>
                        <Badge>10⁻²</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="modernphysics.particles.electromagneticDescription"
                          defaultMessage="Między ładunkami, foton"
                        />
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">
                          <FormattedMessage
                            id="modernphysics.particles.weakForce"
                            defaultMessage="Słabe"
                          />
                        </span>
                        <Badge>10⁻⁶</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="modernphysics.particles.weakDescription"
                          defaultMessage="Rozpady β, bozony W i Z"
                        />
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">
                          <FormattedMessage
                            id="modernphysics.particles.gravitationalForce"
                            defaultMessage="Grawitacyjne"
                          />
                        </span>
                        <Badge>10⁻³⁹</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <FormattedMessage
                          id="modernphysics.particles.gravitationalDescription"
                          defaultMessage="Między masami, grawiton?"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground">
              <FormattedMessage
                id="modernphysics.applications.title"
                defaultMessage="Zastosowania fizyki nowoczesnej"
              />
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="modernphysics.applications.nuclear"
                      defaultMessage="Energia jądrowa"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4 text-center">
                    <div className="text-2xl mb-2">⚛️</div>
                    <div className="text-sm">E = mc²</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="modernphysics.applications.nuclearDescription"
                      defaultMessage="Rozszczepienie i fuzja jądrowa wykorzystują defekt masy do produkcji energii."
                    />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="modernphysics.applications.lasers"
                      defaultMessage="Lasery"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4 text-center">
                    <div className="text-2xl mb-2">🔦</div>
                    <div className="text-sm">
                      <FormattedMessage
                        id="modernphysics.applications.stimulatedEmission"
                        defaultMessage="Emisja wymuszona"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="modernphysics.applications.lasersDescription"
                      defaultMessage="Kwantowe przejścia elektronów w atomach produkują spójne światło."
                    />
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">GPS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded mb-4 text-center">
                    <div className="text-2xl mb-2">🛰️</div>
                    <div className="text-sm">
                      <FormattedMessage
                        id="modernphysics.applications.relativisticCorrection"
                        defaultMessage="Korekta relatywistyczna"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="modernphysics.applications.gpsDescription"
                      defaultMessage="System wymaga uwzględnienia efektów dylatacji czasu z teorii względności."
                    />
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
