import React from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Clock,
  Bookmark,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import heroImage from "@assets/generated_images/3.png";

interface ThermodynamicsProps {
  language: Language;
}

export default function Thermodynamics({ language }: ThermodynamicsProps) {
  const intl = useIntl();
  const [temperature, setTemperature] = React.useState([20]);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [moleculeSpeed, setMoleculeSpeed] = React.useState(1);

  React.useEffect(() => {
    setMoleculeSpeed(Math.max(0.5, temperature[0] / 20));
  }, [temperature]);

  const molecules = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 300,
    y: Math.random() * 200,
    vx: (Math.random() - 0.5) * moleculeSpeed,
    vy: (Math.random() - 0.5) * moleculeSpeed,
  }));

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "nav.thermodynamics" })}
        description={intl.formatMessage({
          id: "thermodynamics.header.subtitle",
        })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="thermodynamics-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-b border-border py-6 px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div className="ml-16 lg:ml-0">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <FormattedMessage
                  id="nav.thermodynamics"
                  defaultMessage="Termodynamika"
                />
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                <FormattedMessage
                  id="thermodynamics.header.subtitle"
                  defaultMessage="Poznaj zasady rządzące ciepłem i energią"
                />
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="thermodynamics.header.readTime"
                      defaultMessage="~30 min"
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
                alt="Wizualizacja termodynamiki"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyFact language={language} category="thermodynamics" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage
                id="thermodynamics.laws.title"
                defaultMessage="Zasady termodynamiki"
              />
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="thermodynamics.firstLaw.title"
                      defaultMessage="Pierwsza zasada termodynamiki"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.firstLaw.description"
                      defaultMessage="Energia nie może być stworzona ani zniszczona, może być tylko przekształcana z jednej formy w drugą."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="font-mono text-lg">
                      <FormattedMessage
                        id="thermodynamics.firstLaw.formula"
                        defaultMessage="ΔU = Q - W"
                      />
                    </p>
                    <p className="text-xs mt-2">
                      <FormattedMessage
                        id="thermodynamics.firstLaw.explanation"
                        defaultMessage="ΔU = zmiana energii wewnętrznej, Q = ciepło, W = praca"
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="thermodynamics.secondLaw.title"
                      defaultMessage="Druga zasada termodynamiki"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.secondLaw.description"
                      defaultMessage="Entropia układu izolowanego nigdy nie maleje. Ciepło płynie spontanicznie od ciał cieplejszych do chłodniejszych."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="font-mono text-lg">ΔS ≥ 0</p>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="thermodynamics.thirdLaw.title"
                      defaultMessage="Trzecia zasada termodynamiki"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.thirdLaw.description"
                      defaultMessage="Entropia doskonałego kryształu w temperaturze zera bezwzględnego wynosi zero."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="font-mono text-lg">S = 0 przy T = 0K</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="interactive-module">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Thermometer className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    <FormattedMessage
                      id="thermodynamics.temperature.title"
                      defaultMessage="Temperatura a ruch cząsteczek"
                    />
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  <FormattedMessage
                    id="thermodynamics.temperature.description"
                    defaultMessage="Przesuń suwak, aby zmienić temperaturę i obserwuj, jak zmienia się prędkość cząsteczek."
                  />
                </p>
                <div className="w-full h-64 bg-slate-50 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                  {molecules.map((m) => (
                    <motion.div
                      key={m.id}
                      className="w-2 h-2 rounded-full absolute"
                      style={{
                        backgroundColor: "hsl(var(--primary))",
                        left: m.x,
                        top: m.y,
                      }}
                      animate={{
                        x: m.x + m.vx * 50,
                        y: m.y + m.vy * 50,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1 / moleculeSpeed,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0°C</span>
                    <span>{temperature}°C</span>
                    <span>100°C</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={temperature}
                    onValueChange={setTemperature}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage
                id="thermodynamics.processes.title"
                defaultMessage="Procesy termodynamiczne"
              />
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="thermodynamics.isothermalProcess.title"
                      defaultMessage="Proces izotermiczny"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.isothermalProcess.description"
                      defaultMessage="Temperatura pozostaje stała podczas całego procesu."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-center font-mono">T = const</p>
                    <p className="text-center font-mono">p · V = const</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="thermodynamics.adiabaticProcess.title"
                      defaultMessage="Proces adiabatyczny"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.adiabaticProcess.description"
                      defaultMessage="Nie ma wymiany ciepła z otoczeniem."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-center font-mono">Q = 0</p>
                    <p className="text-center font-mono">p · V^γ = const</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="thermodynamics.isobaricProcess.title"
                      defaultMessage="Proces izobaryczny"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.isobaricProcess.description"
                      defaultMessage="Ciśnienie pozostaje stałe podczas całego procesu."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-center font-mono">p = const</p>
                    <p className="text-center font-mono">V/T = const</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="thermodynamics.isochoricProcess.title"
                      defaultMessage="Proces izochoryczny"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="thermodynamics.isochoricProcess.description"
                      defaultMessage="Objętość pozostaje stała podczas całego procesu."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-center font-mono">V = const</p>
                    <p className="text-center font-mono">p/T = const</p>
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
