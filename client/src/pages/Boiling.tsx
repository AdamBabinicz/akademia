import React, { useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import { Thermometer, Clock, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import heroImage from "@assets/generated_images/11.png";

interface BoilingProps {
  language: Language;
}

const Molecule = ({ temperature }: { temperature: number }) => {
  const duration = 5 / (temperature / 20 + 0.1);
  return (
    <motion.div
      className="absolute w-2 h-2 bg-blue-500 rounded-full"
      style={{
        top: `${Math.random() * 90 + 5}%`,
        left: `${Math.random() * 90 + 5}%`,
      }}
      animate={{
        x: [0, Math.random() * 30 - 15, 0],
        y: [0, Math.random() * 30 - 15, 0],
      }}
      transition={{
        duration: duration,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
};

export default function Boiling({ language }: BoilingProps) {
  const [temperature, setTemperature] = useState([20]);
  const intl = useIntl();

  const temperatureAriaLabel = intl.formatMessage({
    id: "boiling.temperatureAriaLabel",
    defaultMessage: "Zmień temperaturę wody",
  });

  const bookmarkAriaLabel = intl.formatMessage({
    id: "boiling.bookmarkAriaLabel",
    defaultMessage: "Dodaj do zakładek",
  });

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "boiling.title" })}
        description={intl.formatMessage({ id: "boiling.subtitle" })}
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
                  <FormattedMessage id="boiling.title" />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage id="boiling.subtitle" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      ~15 min
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

              <div className="hidden lg:block">
                <img
                  src={heroImage}
                  alt="Stylizowana ilustracja wrzenia wody w zlewce"
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
            <DailyFact language={language} category="thermodynamics" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <FormattedMessage id="boiling.module.title" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative w-full h-64 bg-background border-2 border-border rounded-lg overflow-hidden">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <Molecule key={i} temperature={temperature[0]} />
                  ))}
                  {temperature[0] > 90 &&
                    Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full"
                        animate={{
                          y: -200,
                          opacity: 0,
                          x: Math.random() * 100 - 50,
                        }}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: Infinity,
                          delay: Math.random(),
                        }}
                      />
                    ))}
                </div>
                <div>
                  <label className="text-sm font-medium">
                    <FormattedMessage id="boiling.temperature.label" />:{" "}
                    {temperature[0]}°C
                  </label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={120}
                    min={0}
                    step={1}
                    className="mt-2"
                    aria-label={temperatureAriaLabel}
                  />
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-lg font-semibold">
                    {temperature[0] < 100 ? (
                      <FormattedMessage id="boiling.state.liquid" />
                    ) : (
                      <FormattedMessage id="boiling.state.boiling" />
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="boiling.state.description" />
                  </p>
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
              <FormattedMessage id="boiling.explanation.title" />
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="boiling.point.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="boiling.point.content" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="boiling.pressure.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage id="boiling.pressure.content" />
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
