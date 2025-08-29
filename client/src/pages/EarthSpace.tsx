
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, Bookmark, Sun, Moon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';
import { BilliardBalls } from '@/components/InteractiveModules/BilliardBalls';
import { PlanetaryMotion } from '@/components/InteractiveModules/PlanetaryMotion';

interface EarthSpaceProps {
  language: Language;
}

export default function EarthSpace({ language }: EarthSpaceProps) {
  const [earthTilt, setEarthTilt] = useState([23.5]);
  const [distanceFromSun, setDistanceFromSun] = useState([150]);
  const [timeOfDay, setTimeOfDay] = useState([12]);

  const getSeason = () => {
    const tilt = earthTilt[0];
    if (tilt > 20) return 'Wyraźne pory roku';
    if (tilt > 10) return 'Umiarkowane pory roku';
    if (tilt > 5) return 'Słabe pory roku';
    return 'Brak pór roku';
  };

  const getGravitationalForce = () => {
    const d = distanceFromSun[0];
    const force = 150 * 150 / (d * d); // Relative to Earth's current distance
    return force;
  };

  const getSunPosition = () => {
    const hour = timeOfDay[0];
    const angle = (hour - 6) * 15; // 15 degrees per hour, sunrise at 6
    return angle;
  };

  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="earth-space-page">
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
                Ziemia i kosmos
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj tajniki naszej planety i wszechświata
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

        {/* Seasons Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Pory roku - prawdziwa przyczyna</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Nachylenie osi Ziemi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Czy wiesz, że...</h4>
                <p className="text-sm">
                  To NIE odległość od Słońca decyduje o porach roku! W styczniu Ziemia jest 
                  najbliżej Słońca, a mimo to na półkuli północnej jest zima.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nachylenie osi Ziemi: {earthTilt[0]}°</label>
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
                <svg viewBox="0 0 400 200" className="w-full h-48">
                  {/* Sun */}
                  <circle cx="200" cy="100" r="20" fill="yellow" stroke="orange" strokeWidth="2" />
                  <text x="185" y="135" className="text-xs font-bold">Słońce</text>
                  
                  {/* Earth orbit */}
                  <ellipse cx="200" cy="100" rx="120" ry="60" fill="none" stroke="gray" strokeWidth="1" strokeDasharray="3,3" />
                  
                  {/* Earth in summer position */}
                  <g transform="translate(320,100)">
                    <circle r="12" fill="blue" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="gray" strokeWidth="1" transform={`rotate(${earthTilt[0]})`} />
                    <text x="15" y="0" className="text-xs">Lato (PŁN)</text>
                    <text x="15" y="10" className="text-xs">Zima (PŁD)</text>
                  </g>
                  
                  {/* Earth in winter position */}
                  <g transform="translate(80,100)">
                    <circle r="12" fill="blue" />
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="gray" strokeWidth="1" transform={`rotate(${earthTilt[0]})`} />
                    <text x="-60" y="0" className="text-xs">Zima (PŁN)</text>
                    <text x="-60" y="10" className="text-xs">Lato (PŁD)</text>
                  </g>
                  
                  {/* Light rays */}
                  <path d="M 180 80 L 300 80" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 180 85 L 300 85" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 180 90 L 300 90" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  
                  <path d="M 220 80 L 100 80" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 220 85 L 100 85" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 220 90 L 100 90" stroke="yellow" strokeWidth="2" opacity="0.7" />
                </svg>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Skutek nachylenia</h4>
                  <Badge variant="secondary" className="mb-2">{getSeason()}</Badge>
                  <p className="text-sm text-muted-foreground">
                    Obecne nachylenie Ziemi (23.5°) zapewnia wyraźne pory roku.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Różnica temperatur</h4>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {Math.round(earthTilt[0] * 2)}°C
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Różnica między latem a zimą
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Gravity Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Grawitacja - więcej niż myślisz</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Prawo powszechnego ciążenia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Odległość od Słońca: {distanceFromSun[0]} mln km
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
                  <div className="text-xl font-bold mb-2">F = G × m₁m₂/r²</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Siła grawitacji między Ziemią a Słońcem
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {getGravitationalForce().toFixed(2)} × F₀
                  </div>
                  <div className="text-xs text-muted-foreground">
                    (względem obecnej odległości)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">G (stała)</div>
                    <div className="text-muted-foreground">6.67 × 10⁻¹¹</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Masa Słońca</div>
                    <div className="text-muted-foreground">2 × 10³⁰ kg</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Masa Ziemi</div>
                    <div className="text-muted-foreground">6 × 10²⁴ kg</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Prędkość orbitalna</div>
                    <div className="text-muted-foreground">30 km/s</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teoria względności Einsteina</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🚀 Nowe spojrzenie</h4>
                  <p className="text-sm">
                    Einstein pokazał, że grawitacja to nie siła, ale zakrzywienie 
                    czasoprzestrzeni! Masa zakrzywia przestrzeń, a obiekty poruszają 
                    się po najkrótszych ścieżkach.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <svg viewBox="0 0 200 150" className="w-full h-32">
                    {/* Grid representing spacetime */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="1" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="200" height="150" fill="url(#grid)" />
                    
                    {/* Curved spacetime around massive object */}
                    <ellipse cx="100" cy="75" rx="50" ry="25" fill="none" stroke="blue" strokeWidth="2" />
                    <ellipse cx="100" cy="75" rx="35" ry="18" fill="none" stroke="blue" strokeWidth="2" />
                    <ellipse cx="100" cy="75" rx="20" ry="10" fill="none" stroke="blue" strokeWidth="2" />
                    
                    {/* Central mass */}
                    <circle cx="100" cy="75" r="8" fill="yellow" />
                    <text x="85" y="70" className="text-xs">Słońce</text>
                    
                    {/* Orbiting object */}
                    <circle cx="130" cy="75" r="3" fill="blue" />
                    <text x="135" y="80" className="text-xs">Ziemia</text>
                    
                    {/* Path */}
                    <path d="M 130 75 Q 120 65 110 75 Q 120 85 130 75" fill="none" stroke="red" strokeWidth="2" strokeDasharray="2,2" />
                  </svg>
                </div>

                <div className="space-y-2 text-sm">
                  <div><strong>Klasyczna fizyka:</strong> Ziemia przyciągana przez Słońce</div>
                  <div><strong>Teoria względności:</strong> Ziemia podąża krzywizną czasoprzestrzeni</div>
                  <div><strong>Skutek:</strong> Identyczne przewidywania, różne wyjaśnienie</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Day-Night Cycle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Cykl dnia i nocy</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Rotacja Ziemi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pora dnia: {timeOfDay[0]}:00</label>
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
                <svg viewBox="0 0 300 200" className="w-full h-48">
                  {/* Sun */}
                  <circle cx="50" cy="100" r="15" fill="yellow" stroke="orange" strokeWidth="2" />
                  <text x="25" y="125" className="text-xs font-bold">Słońce</text>
                  
                  {/* Earth */}
                  <circle cx="200" cy="100" r="30" fill="blue" stroke="darkblue" strokeWidth="2" />
                  
                  {/* Day side */}
                  <path d="M 200 70 A 30 30 0 0 1 200 130" fill="lightblue" />
                  
                  {/* Night side */}
                  <path d="M 200 70 A 30 30 0 0 0 200 130" fill="darkblue" />
                  
                  {/* Rotation arrow */}
                  <path d="M 180 80 A 20 20 0 0 1 220 80" fill="none" stroke="red" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  
                  {/* Your location marker */}
                  <circle 
                    cx={200 + 30 * Math.cos(getSunPosition() * Math.PI / 180)} 
                    cy={100 + 30 * Math.sin(getSunPosition() * Math.PI / 180)} 
                    r="3" 
                    fill="red" 
                  />
                  <text x="160" y="50" className="text-xs text-red-600">Twoja lokalizacja</text>
                  
                  {/* Sun rays */}
                  <path d="M 80 85 L 170 85" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 80 100 L 170 100" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  <path d="M 80 115 L 170 115" stroke="yellow" strokeWidth="2" opacity="0.7" />
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="red" />
                    </marker>
                  </defs>
                </svg>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded text-center">
                  <div className="text-lg font-bold mb-1">
                    {timeOfDay[0] >= 6 && timeOfDay[0] <= 18 ? '☀️' : '🌙'}
                  </div>
                  <div className="font-semibold">
                    {timeOfDay[0] >= 6 && timeOfDay[0] <= 18 ? 'Dzień' : 'Noc'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lokalna pora
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded text-center">
                  <div className="text-lg font-bold mb-1">24h</div>
                  <div className="font-semibold">Doba</div>
                  <div className="text-sm text-muted-foreground">
                    Pełny obrót Ziemi
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded text-center">
                  <div className="text-lg font-bold mb-1">1670 km/h</div>
                  <div className="font-semibold">Prędkość na równiku</div>
                  <div className="text-sm text-muted-foreground">
                    Prędkość rotacji
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🌍 Ciekawostka</h4>
                <p className="text-sm">
                  Wszyscy na Ziemi poruszamy się z ogromną prędkością! Na równiku to 1670 km/h, 
                  w Polsce około 1200 km/h. Dlaczego tego nie czujemy? Bo wszystko wokół nas 
                  porusza się z tą samą prędkością!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Interactive Modules */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-8"
        >
          <PlanetaryMotion />
          <BilliardBalls />
        </motion.section>

        {/* Space Exploration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Eksploracja kosmosu</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Najbliższa gwiazda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">4.2</div>
                  <div className="text-sm text-muted-foreground">lata świetlne</div>
                  <div className="text-xs mt-2">Proxima Centauri</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Voyager 1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">23 mld</div>
                  <div className="text-sm text-muted-foreground">km od Ziemi</div>
                  <div className="text-xs mt-2">Poza Układem Słonecznym</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ISS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">408</div>
                  <div className="text-sm text-muted-foreground">km wysokości</div>
                  <div className="text-xs mt-2">27,600 km/h</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Galaktyka</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">100 mld</div>
                  <div className="text-sm text-muted-foreground">gwiazd</div>
                  <div className="text-xs mt-2">Droga Mleczna</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
