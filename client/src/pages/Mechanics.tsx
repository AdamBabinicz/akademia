
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Bookmark, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface MechanicsProps {
  language: Language;
}

export default function Mechanics({ language }: MechanicsProps) {
  const [pendulumAngle, setPendulumAngle] = React.useState(0);
  const [isSwinging, setIsSwinging] = React.useState(false);

  React.useEffect(() => {
    let animationId: number;
    
    if (isSwinging) {
      const animate = () => {
        setPendulumAngle(prev => Math.sin(Date.now() * 0.003) * 45);
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
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="mechanics-page">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border py-6 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="ml-16 lg:ml-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Mechanika
              </h1>
              <p className="text-muted-foreground mt-2">
                Poznaj prawa ruchu i siły w przyrodzie
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~45 min</span>
              </div>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
        {/* Daily Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DailyFact language={language} />
        </motion.div>

        {/* Prawa Newtona */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Prawa Newtona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="text-lg">I Prawo Newtona</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Prawo bezwładności - ciało pozostaje w spoczynku lub porusza się ruchem jednostajnym prostoliniowym, 
                  jeśli nie działają na nie siły lub siły się równoważą.
                </p>
                <div className="bg-muted p-3 rounded text-center">
                  <div className="w-8 h-8 bg-primary rounded-full mx-auto"></div>
                  <p className="text-xs mt-2">Ciało w spoczynku</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="text-lg">II Prawo Newtona</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Przyspieszenie ciała jest wprost proporcjonalne do działającej siły i odwrotnie 
                  proporcjonalne do masy: F = ma
                </p>
                <div className="bg-muted p-3 rounded text-center">
                  <p className="font-mono text-lg">F = ma</p>
                  <p className="text-xs mt-2">Podstawowe równanie dynamiki</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle className="text-lg">III Prawo Newtona</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Akcja równa się reakcji - jeśli ciało A działa na ciało B siłą, 
                  to ciało B działa na A siłą równą co do wartości, ale przeciwnie skierowaną.
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

        {/* Wahadło matematyczne */}
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
                <CardTitle className="text-2xl">Wahadło matematyczne</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Obserwuj ruch wahadła i poznaj związek między okresem drgań a długością wahadła.
              </p>

              {/* Symulacja wahadła */}
              <div className="relative w-full h-64 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div 
                    className="w-0.5 h-40 bg-gray-600 origin-top"
                    style={{ 
                      transform: `rotate(${pendulumAngle}deg)`,
                      transition: isSwinging ? 'none' : 'transform 0.3s ease'
                    }}
                  ></div>
                  <div 
                    className="w-6 h-6 bg-yellow-500 rounded-full absolute -bottom-3 -left-3"
                    style={{ 
                      transform: `translateX(${Math.sin(pendulumAngle * Math.PI / 180) * 40}px)`,
                      transition: isSwinging ? 'none' : 'transform 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>

              {/* Kontrolki */}
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => setIsSwinging(!isSwinging)}
                  variant={isSwinging ? "destructive" : "default"}
                >
                  {isSwinging ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isSwinging ? 'Zatrzymaj' : 'Uruchom'}
                </Button>
                <Button 
                  onClick={() => {
                    setIsSwinging(false);
                    setPendulumAngle(0);
                  }}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Wzór na okres wahadła:</h4>
                <p className="font-mono text-lg text-center">T = 2π√(L/g)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  gdzie L to długość wahadła, g to przyspieszenie ziemskie
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Energia mechaniczna */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Energia mechaniczna</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Energia kinetyczna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Energia związana z ruchem ciała. Zależy od masy i prędkości.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg mb-2">Ek = ½mv²</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded animate-pulse"></div>
                    <span className="text-xs">Ciało w ruchu</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Energia potencjalna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Energia związana z położeniem ciała w polu grawitacyjnym.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg mb-2">Ep = mgh</p>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div className="w-8 h-1 bg-gray-400"></div>
                    <span className="text-xs">Ciało na wysokości h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-interactive">
            <CardHeader>
              <CardTitle>Zasada zachowania energii mechanicznej</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                W układzie izolowanym suma energii kinetycznej i potencjalnej pozostaje stała:
              </p>
              <div className="bg-muted p-4 rounded text-center">
                <p className="font-mono text-xl">Ek + Ep = const</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
