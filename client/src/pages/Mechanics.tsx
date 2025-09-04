import React from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Clock,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import heroImage from "@assets/generated_images/1.jpeg";

interface MechanicsProps {
  language: Language;
}

export default function Mechanics({ language }: MechanicsProps) {
  const [pendulumAngle, setPendulumAngle] = React.useState(0);
  const [isSwinging, setIsSwinging] = React.useState(false);
  const intl = useIntl();

  React.useEffect(() => {
    let animationId: number;

    if (isSwinging) {
      const animate = () => {
        setPendulumAngle((prev) => Math.sin(Date.now() * 0.003) * 45);
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isSwinging]);

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "mechanics.header.title" })}
        description={intl.formatMessage({ id: "mechanics.header.subtitle" })}
        schema={{ type: "article" }}
        image="/1.png"
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="mechanics-page"
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
                  id="mechanics.header.title"
                  defaultMessage="Mechanika"
                />
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                <FormattedMessage
                  id="mechanics.header.subtitle"
                  defaultMessage="Explore the laws of motion and forces in nature"
                />
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="mechanics.header.readTime"
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
                src={heroImage}
                alt="Symbol mechaniki i fizyki"
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
            <DailyFact language={language} category="mechanics" />
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              <FormattedMessage
                id="mechanics.newtonLaws.title"
                defaultMessage="Newton's Laws"
              />
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="mechanics.newtonLaw1.title"
                      defaultMessage="Newton's First Law"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="mechanics.newtonLaw1.description"
                      defaultMessage="Law of Inertia - a body remains at rest or in uniform motion in a straight line unless acted upon by a net force."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="w-8 h-8 bg-primary rounded-full mx-auto"></div>
                    <p className="text-xs mt-2">
                      <FormattedMessage
                        id="mechanics.newtonLaw1.example"
                        defaultMessage="Body at rest"
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="mechanics.newtonLaw2.title"
                      defaultMessage="Newton's Second Law"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="mechanics.newtonLaw2.description"
                      defaultMessage="The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass: F = ma"
                    />
                  </p>
                  <div className="bg-muted p-3 rounded text-center">
                    <p className="font-mono text-lg">F = ma</p>
                    <p className="text-xs mt-2">
                      <FormattedMessage
                        id="mechanics.newtonLaw2.example"
                        defaultMessage="Fundamental equation of dynamics"
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <FormattedMessage
                      id="mechanics.newtonLaw3.title"
                      defaultMessage="Newton's Third Law"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <FormattedMessage
                      id="mechanics.newtonLaw3.description"
                      defaultMessage="Action-Reaction - For every action, there is an equal and opposite reaction."
                    />
                  </p>
                  <div className="bg-muted p-3 rounded flex justify-center items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>⟵⟶</span>
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
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
                    <Settings className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">
                    <FormattedMessage
                      id="mechanics.pendulum.title"
                      defaultMessage="Mathematical Pendulum"
                    />
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  <FormattedMessage
                    id="mechanics.pendulum.description"
                    defaultMessage="Observe the motion of a pendulum and learn about the relationship between its oscillation period and length."
                  />
                </p>

                <div className="relative w-full h-64 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden flex justify-center pt-8">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full z-10"></div>
                  <motion.div
                    className="relative w-1 h-40 origin-top mt-1"
                    animate={{ rotate: pendulumAngle }}
                    transition={{ ease: "linear", duration: 0 }}
                  >
                    <div className="w-0.5 h-full bg-gray-600 mx-auto"></div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                  </motion.div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => setIsSwinging(!isSwinging)}
                    variant={isSwinging ? "destructive" : "default"}
                  >
                    {isSwinging ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    <FormattedMessage
                      id={
                        isSwinging
                          ? "mechanics.pendulum.pause"
                          : "mechanics.pendulum.play"
                      }
                      defaultMessage={isSwinging ? "Stop" : "Start"}
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSwinging(false);
                      setPendulumAngle(0);
                    }}
                    variant="outline"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    <FormattedMessage
                      id="mechanics.pendulum.reset"
                      defaultMessage="Reset"
                    />
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    <FormattedMessage
                      id="mechanics.pendulum.formulaTitle"
                      defaultMessage="Pendulum period formula:"
                    />
                  </h4>
                  <p className="font-mono text-lg text-center">T = 2π√(L/g)</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <FormattedMessage
                      id="mechanics.pendulum.formulaDescription"
                      defaultMessage="where L is the length of the pendulum, g is the acceleration due to gravity"
                    />
                  </p>
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
                id="mechanics.mechanicalEnergy.title"
                defaultMessage="Mechanical Energy"
              />
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="mechanics.kineticEnergy.title"
                      defaultMessage="Kinetic Energy"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="mechanics.kineticEnergy.description"
                      defaultMessage="Energy associated with the motion of an object. Depends on mass and velocity."
                    />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg mb-2">Ek = ½mv²</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded animate-pulse"></div>
                      <span className="text-xs">
                        <FormattedMessage
                          id="mechanics.kineticEnergy.example"
                          defaultMessage="Object in motion"
                        />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-interactive">
                <CardHeader>
                  <CardTitle>
                    <FormattedMessage
                      id="mechanics.potentialEnergy.title"
                      defaultMessage="Potential Energy"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <FormattedMessage
                      id="mechanics.potentialEnergy.description"
                      defaultMessage="Energy associated with the position of an object in a gravitational field."
                    />
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="font-mono text-lg mb-2">Ep = mgh</p>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <span className="text-xs">
                        <FormattedMessage
                          id="mechanics.potentialEnergy.example"
                          defaultMessage="Object at height h"
                        />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>
                  <FormattedMessage
                    id="mechanics.energyConservation.title"
                    defaultMessage="Law of Conservation of Mechanical Energy"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  <FormattedMessage
                    id="mechanics.energyConservation.description"
                    defaultMessage="In an isolated system, the sum of kinetic and potential energy remains constant:"
                  />
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-xl">Ek + Ep = const</p>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </>
  );
}
