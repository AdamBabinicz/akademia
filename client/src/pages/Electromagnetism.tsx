import React from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Bookmark, Magnet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import heroImage1 from "@assets/generated_images/2.png";

interface ElectromagnetismProps {
  language: Language;
}

export default function MagnetismPage({ language }: ElectromagnetismProps) {
  const [magneticField, setMagneticField] = React.useState(false);
  const intl = useIntl();

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "nav.electromagnetism" })}
        description={intl.formatMessage({
          id: "electromagnetism.header.subtitle",
        })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="electromagnetism-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-b border-border py-6 px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            <div className="ml-16 lg:ml-0">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <FormattedMessage id="nav.electromagnetism" />
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                <FormattedMessage id="electromagnetism.header.subtitle" />
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    <FormattedMessage id="electromagnetism.header.readTime" />
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src={heroImage1}
                alt="Wizualizacja pola elektromagnetycznego"
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
            <DailyFact language={language} category="electricity" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="interactive-module">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Magnet className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    <FormattedMessage id="electromagnetism.magneticFieldSimulation.title" />
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  <FormattedMessage id="electromagnetism.magneticFieldSimulation.description" />
                </p>

                <div className="relative w-full h-80 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative">
                    <div className="flex">
                      <div className="w-16 h-32 bg-red-500 rounded-l-lg flex items-center justify-center text-white font-bold">
                        N
                      </div>
                      <div className="w-16 h-32 bg-blue-500 rounded-r-lg flex items-center justify-center text-white font-bold">
                        S
                      </div>
                    </div>

                    {magneticField && (
                      <>
                        <div className="absolute -top-8 left-0 w-32 h-2 border-t-2 border-dashed border-purple-500 rounded-full transform -rotate-12"></div>
                        <div className="absolute -top-12 left-2 w-28 h-2 border-t-2 border-dashed border-purple-500 rounded-full transform -rotate-6"></div>
                        <div className="absolute -top-16 left-4 w-24 h-2 border-t-2 border-dashed border-purple-500 rounded-full"></div>

                        <div className="absolute -bottom-8 left-0 w-32 h-2 border-b-2 border-dashed border-purple-500 rounded-full transform rotate-12"></div>
                        <div className="absolute -bottom-12 left-2 w-28 h-2 border-b-2 border-dashed border-purple-500 rounded-full transform rotate-6"></div>
                        <div className="absolute -bottom-16 left-4 w-24 h-2 border-b-2 border-dashed border-purple-500 rounded-full"></div>

                        <div className="absolute top-4 -left-20 w-16 h-24 border-l-2 border-dashed border-purple-500 rounded-full transform rotate-45"></div>
                        <div className="absolute top-4 -right-20 w-16 h-24 border-r-2 border-dashed border-purple-500 rounded-full transform -rotate-45"></div>
                      </>
                    )}
                  </div>

                  {magneticField && (
                    <>
                      <div className="absolute top-16 left-40 text-purple-600 font-bold">
                        →
                      </div>
                      <div className="absolute top-24 left-44 text-purple-600 font-bold">
                        →
                      </div>
                      <div className="absolute bottom-16 left-40 text-purple-600 font-bold">
                        →
                      </div>
                      <div className="absolute bottom-24 left-44 text-purple-600 font-bold">
                        →
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setMagneticField(!magneticField)}
                    variant={magneticField ? "destructive" : "default"}
                  >
                    <FormattedMessage
                      id={
                        magneticField
                          ? "electromagnetism.hideField"
                          : "electromagnetism.showField"
                      }
                    />
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    <FormattedMessage id="electromagnetism.magneticFieldProperties.title" />
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <FormattedMessage id="electromagnetism.magneticFieldProperties.prop1" />
                    </li>
                    <li>
                      <FormattedMessage id="electromagnetism.magneticFieldProperties.prop2" />
                    </li>
                    <li>
                      <FormattedMessage id="electromagnetism.magneticFieldProperties.prop3" />
                    </li>
                  </ul>
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
              <FormattedMessage id="electromagnetism.maxwellEquations.title" />
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="electromagnetism.maxwellEquations.gaussElectric.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage id="electromagnetism.maxwellEquations.gaussElectric.description" />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg">∮ E⃗ · dA⃗ = Q/ε₀</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="electromagnetism.maxwellEquations.gaussMagnetic.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage id="electromagnetism.maxwellEquations.gaussMagnetic.description" />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg">∮ B⃗ · dA⃗ = 0</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="electromagnetism.maxwellEquations.faraday.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage id="electromagnetism.maxwellEquations.faraday.description" />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg">∮ E⃗ · dl⃗ = -dΦB/dt</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage id="electromagnetism.maxwellEquations.ampereMaxwell.title" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage id="electromagnetism.maxwellEquations.ampereMaxwell.description" />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg">
                      ∮ B⃗ · dl⃗ = μ₀I + μ₀ε₀dΦE/dt
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage id="electromagnetism.electromagneticWaves.title" />
            </h2>
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>
                  <FormattedMessage id="electromagnetism.electromagneticWaves.spectrum.title" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  <FormattedMessage id="electromagnetism.electromagneticWaves.spectrum.description" />
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded text-center">
                    <div className="font-semibold text-purple-800 dark:text-purple-200">
                      <FormattedMessage id="electromagnetism.waveType.radioWaves.title" />
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-300">
                      λ &gt; 1m
                    </div>
                  </div>

                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded text-center">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">
                      <FormattedMessage id="electromagnetism.waveType.microwaves.title" />
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-300">
                      1m - 1mm
                    </div>
                  </div>

                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded text-center">
                    <div className="font-semibold text-green-800 dark:text-green-200">
                      <FormattedMessage id="electromagnetism.waveType.visibleLight.title" />
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-300">
                      400-700nm
                    </div>
                  </div>

                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded text-center">
                    <div className="font-semibold text-orange-800 dark:text-orange-200">
                      <FormattedMessage id="electromagnetism.waveType.xRays.title" />
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-300">
                      0.01-10nm
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    <FormattedMessage id="electromagnetism.frequencyWavelength.title" />
                  </h4>
                  <p className="font-mono text-lg text-center">c = λf</p>
                  <p className="text-xs text-center mt-2">
                    <FormattedMessage id="electromagnetism.frequencyWavelength.description" />
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </>
  );
}
