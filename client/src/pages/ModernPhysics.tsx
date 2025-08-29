
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Zap, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface ModernPhysicsProps {
  language: Language;
}

export default function ModernPhysics({ language }: ModernPhysicsProps) {
  const [velocity, setVelocity] = useState([0.5]);
  const [energy, setEnergy] = useState([2]);
  const [mass, setMass] = useState([1]);

  const calculateRelativistic = () => {
    const v = velocity[0];
    const c = 1; // c = 1 w jednostkach względnych
    const gamma = 1 / Math.sqrt(1 - v * v);
    const timeDialation = gamma;
    const lengthContraction = 1 / gamma;
    const massIncrease = gamma;
    return { gamma, timeDialation, lengthContraction, massIncrease };
  };

  const calculatePhotoelectric = () => {
    const h = 4.136e-15; // eV⋅s
    const E = energy[0];
    const frequency = E / h / 1e14; // w jednostkach 10^14 Hz
    const wavelength = 300 / frequency; // w nm (przybliżenie)
    return { frequency, wavelength };
  };

  const { gamma, timeDialation, lengthContraction, massIncrease } = calculateRelativistic();
  const { frequency, wavelength } = calculatePhotoelectric();

  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out">
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
                Fizyka Nowoczesna
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj tajemnice kwantów, względności i struktury materii
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~60 min</span>
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

        {/* Relativity Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Teoria względności</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Efekty relatywistyczne
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prędkość (w jednostkach c): {velocity[0].toFixed(2)}c</label>
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
                  <h4 className="font-semibold">Współczynnik Lorentza (γ)</h4>
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
                  <h4 className="font-semibold">Wzór E = mc²</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div>Energia spoczynkowa: E₀ = mc²</div>
                      <div>Energia całkowita: E = γmc²</div>
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
                    <CardTitle className="text-lg">Dylatacja czasu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {timeDialation.toFixed(2)}×
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Czas płynie wolniej
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Kontrakcja długości</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {lengthContraction.toFixed(2)}×
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Długość się skraca
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Wzrost masy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {massIncrease.toFixed(2)}×
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Masa relatywistyczna
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Quantum Physics Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Fizyka kwantowa</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Efekt fotoelektryczny</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Energia fotonu: {energy[0]} eV</label>
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
                    {/* Metal surface */}
                    <rect x="50" y="150" width="200" height="40" fill="#c0c0c0" stroke="black" strokeWidth="2" />
                    <text x="140" y="175" className="text-xs font-bold">Metal</text>
                    
                    {/* Incident photons */}
                    {energy[0] > 2 && (
                      <>
                        <circle cx="80" cy="100" r="3" fill="yellow" />
                        <path d="M 80 100 L 85 120" stroke="yellow" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <text x="60" y="95" className="text-xs">Foton</text>
                        <text x="55" y="105" className="text-xs">{energy[0]} eV</text>
                      </>
                    )}
                    
                    {/* Emitted electrons */}
                    {energy[0] > 2 && (
                      <>
                        <circle cx="120" cy="80" r="2" fill="blue" />
                        <path d="M 120 80 L 130 60" stroke="blue" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        <text x="135" y="55" className="text-xs">Elektron</text>
                        <text x="130" y="65" className="text-xs">{(energy[0] - 2).toFixed(1)} eV</text>
                      </>
                    )}
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="space-y-2 text-sm">
                  <div><strong>Równanie Einsteina:</strong> E = hf = Φ + Ek</div>
                  <div><strong>Częstotliwość:</strong> {frequency.toFixed(1)} × 10¹⁴ Hz</div>
                  <div><strong>Długość fali:</strong> {wavelength.toFixed(0)} nm</div>
                  <div><strong>Praca wyjścia (Φ):</strong> 2.0 eV</div>
                  <div><strong>Energia kinetyczna:</strong> {Math.max(0, energy[0] - 2).toFixed(1)} eV</div>
                  {energy[0] < 2 && <Badge variant="destructive">Brak emisji elektronów!</Badge>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Atom className="w-5 h-5" />
                  Model atomu Bohra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <svg viewBox="0 0 200 200" className="w-full h-48">
                    {/* Nucleus */}
                    <circle cx="100" cy="100" r="8" fill="red" />
                    <text x="95" y="105" className="text-xs font-bold fill-white">N</text>
                    
                    {/* Electron orbits */}
                    <circle cx="100" cy="100" r="30" fill="none" stroke="blue" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="green" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="purple" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="100" cy="100" r="90" fill="none" stroke="orange" strokeWidth="1" strokeDasharray="2,2" />
                    
                    {/* Electrons */}
                    <circle cx="130" cy="100" r="3" fill="blue" />
                    <circle cx="150" cy="100" r="3" fill="green" />
                    <circle cx="170" cy="100" r="3" fill="purple" />
                    
                    {/* Energy levels */}
                    <text x="10" y="70" className="text-xs">n=4 (-0.85 eV)</text>
                    <text x="10" y="50" className="text-xs">n=3 (-1.51 eV)</text>
                    <text x="10" y="30" className="text-xs">n=2 (-3.4 eV)</text>
                    <text x="10" y="130" className="text-xs">n=1 (-13.6 eV)</text>
                    
                    {/* Photon emission */}
                    <path d="M 150 100 L 130 100" stroke="yellow" strokeWidth="3" markerEnd="url(#arrowhead)" />
                    <text x="135" y="85" className="text-xs">hν</text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Energia poziomu n</div>
                    <div className="text-muted-foreground">En = -13.6/n² eV</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Promień orbity</div>
                    <div className="text-muted-foreground">rn = n² × 0.529 Å</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Częstotliwość</div>
                    <div className="text-muted-foreground">ν = (Ei - Ef)/h</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Moment pędu</div>
                    <div className="text-muted-foreground">L = nℏ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Particle Physics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Fizyka cząstek elementarnych</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Model Standardowy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {/* Quarks */}
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
                    <div className="text-xs">foton</div>
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
                    <div className="text-xs">bozon W</div>
                  </div>
                  
                  {/* Leptons */}
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">e</div>
                    <div className="text-xs">elektron</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">μ</div>
                    <div className="text-xs">mion</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">τ</div>
                    <div className="text-xs">taon</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">Z</div>
                    <div className="text-xs">bozon Z</div>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">νe</div>
                    <div className="text-xs">neutrino e</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">νμ</div>
                    <div className="text-xs">neutrino μ</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">ντ</div>
                    <div className="text-xs">neutrino τ</div>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded text-center">
                    <div className="font-bold text-xs">H</div>
                    <div className="text-xs">Higgs</div>
                  </div>
                </div>
                
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded"></div>
                    <span>Kwarki (6 typów)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded"></div>
                    <span>Leptony (6 typów)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
                    <span>Bozony cechowania</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-100 dark:bg-yellow-900/30 rounded"></div>
                    <span>Bozon Higgsa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fundamentalne oddziaływania</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Silne</span>
                      <Badge>1</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Wiąże kwarki w nukleony, gluon
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Elektromagnetyczne</span>
                      <Badge>10⁻²</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Między ładunkami, foton
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Słabe</span>
                      <Badge>10⁻⁶</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rozpady β, bozony W i Z
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Grawitacyjne</span>
                      <Badge>10⁻³⁹</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Między masami, grawiton?
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Applications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Zastosowania fizyki nowoczesnej</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Energia jądrowa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded mb-4 text-center">
                  <div className="text-2xl mb-2">⚛️</div>
                  <div className="text-sm">E = mc²</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Rozszczepienie i fuzja jądrowa wykorzystują defekt masy do produkcji energii.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lasery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded mb-4 text-center">
                  <div className="text-2xl mb-2">🔦</div>
                  <div className="text-sm">Emisja wymuszona</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kwantowe przejścia elektronów w atomach produkują spójne światło.
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
                  <div className="text-sm">Korekta relatywistyczna</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  System wymaga uwzględnienia efektów dylatacji czasu z teorii względności.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
