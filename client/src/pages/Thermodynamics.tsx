
import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Clock, Bookmark, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface ThermodynamicsProps {
  language: Language;
}

export default function Thermodynamics({ language }: ThermodynamicsProps) {
  const [temperature, setTemperature] = React.useState([20]);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [moleculeSpeed, setMoleculeSpeed] = React.useState(1);

  React.useEffect(() => {
    // Związek temperatury z prędkością cząsteczek
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
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="thermodynamics-page">
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
                Termodynamika
              </h1>
              <p className="text-muted-foreground mt-2">
                Poznaj prawa rządzące ciepłem i energią
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~40 min</span>
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

        {/* Symulator temperatury i ruchu cząsteczek */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="interactive-module">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Thermometer className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Ruch cząsteczek a temperatura</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Obserwuj jak temperatura wpływa na prędkość ruchu cząsteczek gazu.
              </p>

              {/* Kontrola temperatury */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Temperatura:</label>
                  <span className="text-lg font-mono">{temperature[0]}°C</span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={100}
                  min={-20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Wizualizacja cząsteczek */}
              <div className="relative w-full h-64 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-gray-300 overflow-hidden">
                {molecules.map((molecule) => (
                  <div
                    key={molecule.id}
                    className={`absolute w-2 h-2 rounded-full transition-all duration-100 ${
                      temperature[0] > 50 ? 'bg-red-500' :
                      temperature[0] > 0 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{
                      left: `${(molecule.x + Date.now() * molecule.vx * 0.001) % 300}px`,
                      top: `${(molecule.y + Date.now() * molecule.vy * 0.001) % 200}px`,
                      transform: `scale(${Math.max(0.5, moleculeSpeed)})`,
                    }}
                  />
                ))}
                
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Prędkość: {(moleculeSpeed * 100).toFixed(0)}%
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs">Niska temperatura<br/>Wolny ruch</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs">Średnia temperatura<br/>Umiarkowany ruch</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-xs">Wysoka temperatura<br/>Szybki ruch</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Prawa termodynamiki */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Prawa termodynamiki</h2>
          <div className="grid gap-6">
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>I Zasada termodynamiki</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Energia nie może być stworzona ani zniszczona, może być tylko przekształcana z jednej formy w drugą.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">ΔU = Q - W</p>
                  <p className="text-xs mt-2">Zmiana energii wewnętrznej = Ciepło dostarczone - Praca wykonana</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>II Zasada termodynamiki</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Entropia układu izolowanego nigdy nie maleje. Ciepło płynie spontanicznie od ciał cieplejszych do chłodniejszych.
                </p>
                <div className="flex justify-center items-center gap-4 p-4 bg-muted rounded">
                  <div className="w-16 h-16 bg-red-500 rounded flex items-center justify-center text-white font-bold">HOT</div>
                  <span className="text-2xl">→</span>
                  <div className="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white font-bold">COLD</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>III Zasada termodynamiki</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Entropia doskonałego kryształu w temperaturze zera bezwzględnego wynosi zero.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">T → 0K ⟹ S → 0</p>
                  <p className="text-xs mt-2">Przy temperaturze zera bezwzględnego entropia dąży do zera</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Procesy termodynamiczne */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Procesy termodynamiczne</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Proces izotermiczny</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Temperatura pozostaje stała podczas całego procesu.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-center font-mono">T = const</p>
                  <p className="text-center font-mono">pV = const</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Proces adiabatyczny</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Nie ma wymiany ciepła z otoczeniem.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-center font-mono">Q = 0</p>
                  <p className="text-center font-mono">pV^γ = const</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Proces izobaryczny</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ciśnienie pozostaje stałe podczas całego procesu.
                </p>
                <div className="bg-muted p-3 rounded">
                  <p className="text-center font-mono">p = const</p>
                  <p className="text-center font-mono">V/T = const</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Proces izochoryczny</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Objętość pozostaje stała podczas całego procesu.
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
  );
}
