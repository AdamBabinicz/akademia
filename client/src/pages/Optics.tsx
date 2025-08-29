
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Lightbulb, Camera, Bookmark, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface OpticsProps {
  language: Language;
}

export default function Optics({ language }: OpticsProps) {
  const [refractiveIndex, setRefractiveIndex] = useState([1.5]);
  const [wavelength, setWavelength] = useState([550]);
  const [lensDistance, setLensDistance] = useState([20]);

  const getWavelengthColor = (wl: number) => {
    if (wl < 450) return '#4B0082'; // Violet
    if (wl < 495) return '#0000FF'; // Blue
    if (wl < 570) return '#00FF00'; // Green
    if (wl < 590) return '#FFFF00'; // Yellow
    if (wl < 620) return '#FFA500'; // Orange
    return '#FF0000'; // Red
  };

  const calculateRefraction = () => {
    const angle = 30; // degrees
    const criticalAngle = Math.asin(1 / refractiveIndex[0]) * (180 / Math.PI);
    const refractedAngle = Math.asin(Math.sin(angle * Math.PI / 180) / refractiveIndex[0]) * (180 / Math.PI);
    return { criticalAngle, refractedAngle };
  };

  const { criticalAngle, refractedAngle } = calculateRefraction();

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
                Optyka
              </h1>
              <p className="text-muted-foreground mt-2">
                Poznaj tajemnice światła, soczewek i percepcji wzrokowej
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

        {/* Light and Color Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Światło i kolory</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Spektrum światła widzialnego
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Długość fali: {wavelength[0]} nm</label>
                  <Slider
                    value={wavelength}
                    onValueChange={setWavelength}
                    max={750}
                    min={380}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div 
                    className="w-full h-16 rounded mb-4 border"
                    style={{ backgroundColor: getWavelengthColor(wavelength[0]) }}
                  />
                  <div className="text-center">
                    <Badge variant="secondary">
                      {wavelength[0] < 450 ? 'Fioletowy' :
                       wavelength[0] < 495 ? 'Niebieski' :
                       wavelength[0] < 570 ? 'Zielony' :
                       wavelength[0] < 590 ? 'Żółty' :
                       wavelength[0] < 620 ? 'Pomarańczowy' : 'Czerwony'}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Światło widzialne to fale elektromagnetyczne o długości od 380 do 750 nm.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Właściwości światła</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="font-semibold">Prędkość</div>
                    <div className="text-sm text-muted-foreground">299,792,458 m/s</div>
                  </div>
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="font-semibold">Częstotliwość</div>
                    <div className="text-sm text-muted-foreground">{(3e8 / (wavelength[0] * 1e-9) / 1e12).toFixed(1)} THz</div>
                  </div>
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="font-semibold">Energia fotonu</div>
                    <div className="text-sm text-muted-foreground">{(1240 / wavelength[0]).toFixed(2)} eV</div>
                  </div>
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="font-semibold">Natura</div>
                    <div className="text-sm text-muted-foreground">Fala i cząstka</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Refraction Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Załamanie światła</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Interaktywny symulator załamania</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Współczynnik załamania: {refractiveIndex[0]}</label>
                <Slider
                  value={refractiveIndex}
                  onValueChange={setRefractiveIndex}
                  max={2.5}
                  min={1.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <svg viewBox="0 0 400 300" className="w-full h-64">
                  {/* Air */}
                  <rect x="0" y="0" width="400" height="150" fill="#e6f3ff" opacity="0.5" />
                  <text x="10" y="20" className="text-xs fill-current">Powietrze (n=1.0)</text>
                  
                  {/* Medium */}
                  <rect x="0" y="150" width="400" height="150" fill="#b3d9ff" opacity="0.7" />
                  <text x="10" y="170" className="text-xs fill-current">Ośrodek (n={refractiveIndex[0]})</text>
                  
                  {/* Interface */}
                  <line x1="0" y1="150" x2="400" y2="150" stroke="black" strokeWidth="2" />
                  
                  {/* Incident ray */}
                  <line x1="150" y1="50" x2="200" y2="150" stroke="red" strokeWidth="3" />
                  <text x="120" y="40" className="text-xs fill-red-600">Promień padający</text>
                  
                  {/* Refracted ray */}
                  <line 
                    x1="200" 
                    y1="150" 
                    x2={200 + 50 * Math.sin(refractedAngle * Math.PI / 180)} 
                    y2={150 + 50 * Math.cos(refractedAngle * Math.PI / 180)} 
                    stroke="blue" 
                    strokeWidth="3" 
                  />
                  <text x="220" y="200" className="text-xs fill-blue-600">Promień załamany</text>
                  
                  {/* Normal */}
                  <line x1="200" y1="50" x2="200" y2="250" stroke="gray" strokeWidth="1" strokeDasharray="5,5" />
                  <text x="205" y="100" className="text-xs fill-gray-600">Normalna</text>
                  
                  {/* Angles */}
                  <path d="M 200 150 L 180 130 A 20 20 0 0 1 180 150 Z" fill="red" opacity="0.3" />
                  <text x="165" y="135" className="text-xs fill-red-600">30°</text>
                  
                  <path d={`M 200 150 L 200 170 A 20 20 0 0 0 ${200 + 20 * Math.sin(refractedAngle * Math.PI / 180)} ${150 + 20 * Math.cos(refractedAngle * Math.PI / 180)} Z`} fill="blue" opacity="0.3" />
                  <text x="220" y="175" className="text-xs fill-blue-600">{refractedAngle.toFixed(1)}°</text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Prawo Snella</h4>
                  <p className="text-sm text-muted-foreground mb-2">n₁ sin θ₁ = n₂ sin θ₂</p>
                  <p className="text-xs">1.0 × sin(30°) = {refractiveIndex[0]} × sin({refractedAngle.toFixed(1)}°)</p>
                </div>
                <div className="bg-muted p-4 rounded">
                  <h4 className="font-semibold mb-2">Kąt graniczny</h4>
                  <p className="text-sm text-muted-foreground mb-2">θc = arcsin(1/n)</p>
                  <p className="text-xs">{criticalAngle.toFixed(1)}° (dla n = {refractiveIndex[0]})</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Lenses Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Soczewki</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Soczewka skupiająca
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Odległość przedmiotu: {lensDistance[0]} cm</label>
                  <Slider
                    value={lensDistance}
                    onValueChange={setLensDistance}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <svg viewBox="0 0 300 150" className="w-full h-32">
                    {/* Lens */}
                    <ellipse cx="150" cy="75" rx="3" ry="30" fill="lightblue" stroke="blue" strokeWidth="2" />
                    
                    {/* Optical axis */}
                    <line x1="0" y1="75" x2="300" y2="75" stroke="gray" strokeWidth="1" strokeDasharray="3,3" />
                    
                    {/* Object */}
                    <line x1={150 - lensDistance[0] * 2} y1="75" x2={150 - lensDistance[0] * 2} y2="45" stroke="red" strokeWidth="3" />
                    <text x={150 - lensDistance[0] * 2 - 10} y="40" className="text-xs fill-red-600">Przedmiot</text>
                    
                    {/* Image */}
                    {(() => {
                      const f = 10; // focal length in cm
                      const imageDistance = (f * lensDistance[0]) / (lensDistance[0] - f);
                      const magnification = imageDistance / lensDistance[0];
                      const imageHeight = 30 * Math.abs(magnification);
                      
                      if (imageDistance > 0 && imageDistance < 75) {
                        return (
                          <>
                            <line 
                              x1={150 + imageDistance * 2} 
                              y1="75" 
                              x2={150 + imageDistance * 2} 
                              y2={75 - imageHeight} 
                              stroke="blue" 
                              strokeWidth="3" 
                            />
                            <text x={150 + imageDistance * 2 + 5} y="40" className="text-xs fill-blue-600">Obraz</text>
                          </>
                        );
                      }
                      return null;
                    })()}
                    
                    {/* Focal points */}
                    <circle cx="130" cy="75" r="2" fill="orange" />
                    <text x="125" y="90" className="text-xs fill-orange-600">F</text>
                    <circle cx="170" cy="75" r="2" fill="orange" />
                    <text x="165" y="90" className="text-xs fill-orange-600">F</text>
                  </svg>
                </div>

                <div className="text-sm space-y-2">
                  {(() => {
                    const f = 10;
                    const imageDistance = (f * lensDistance[0]) / (lensDistance[0] - f);
                    const magnification = imageDistance / lensDistance[0];
                    
                    return (
                      <>
                        <p><strong>Ogniskowa:</strong> f = 10 cm</p>
                        <p><strong>Odległość obrazu:</strong> {imageDistance > 0 ? imageDistance.toFixed(1) : 'Obraz pozorny'} cm</p>
                        <p><strong>Powiększenie:</strong> {magnification.toFixed(2)}×</p>
                        <p><strong>Typ obrazu:</strong> {imageDistance > 0 ? 'Rzeczywisty' : 'Pozorny'}, {magnification < 0 ? 'Odwrócony' : 'Prosty'}</p>
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Oko ludzkie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <svg viewBox="0 0 200 100" className="w-full h-24">
                    {/* Eye outline */}
                    <ellipse cx="100" cy="50" rx="80" ry="35" fill="white" stroke="black" strokeWidth="2" />
                    
                    {/* Cornea */}
                    <ellipse cx="70" cy="50" rx="15" ry="20" fill="lightblue" stroke="blue" strokeWidth="1" />
                    
                    {/* Lens */}
                    <ellipse cx="100" cy="50" rx="8" ry="12" fill="lightgreen" stroke="green" strokeWidth="1" />
                    
                    {/* Retina */}
                    <line x1="160" y1="25" x2="160" y2="75" stroke="red" strokeWidth="3" />
                    
                    {/* Light rays */}
                    <path d="M 10 30 L 70 45 L 100 50 L 160 50" stroke="orange" strokeWidth="2" fill="none" />
                    <path d="M 10 70 L 70 55 L 100 50 L 160 50" stroke="orange" strokeWidth="2" fill="none" />
                    
                    {/* Labels */}
                    <text x="65" y="25" className="text-xs">Rogówka</text>
                    <text x="95" y="25" className="text-xs">Soczewka</text>
                    <text x="165" y="45" className="text-xs">Siatkówka</text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Moc łączna</div>
                    <div className="text-muted-foreground">~60 D</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Akomodacja</div>
                    <div className="text-muted-foreground">~14 D</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Pole widzenia</div>
                    <div className="text-muted-foreground">~180°</div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-semibold">Rozdzielczość</div>
                    <div className="text-muted-foreground">~1 łuk.min</div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Oko ludzkie to doskonały system optyczny zdolny do automatycznego ogniskowania (akomodacji) na różnych odległościach.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Optical Phenomena */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-foreground">Zjawiska optyczne</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tęcza</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 h-8 rounded mb-4"></div>
                <p className="text-sm text-muted-foreground">
                  Dyspersja światła w kroplach wody powoduje rozkład światła białego na kolory składowe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mirażę</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded mb-4 text-center">
                  <div className="text-2xl mb-2">🏝️</div>
                  <div className="text-xs">Pozorny obraz</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Załamanie światła w warstwach powietrza o różnej temperaturze tworzy pozorne obrazy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interferencja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded mb-4">
                  <svg viewBox="0 0 100 50" className="w-full h-12">
                    <path d="M 0 25 Q 25 15 50 25 Q 75 35 100 25" stroke="blue" strokeWidth="2" fill="none" />
                    <path d="M 0 25 Q 25 35 50 25 Q 75 15 100 25" stroke="red" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nakładanie się fal świetlnych prowadzi do wzmocnienia lub osłabienia światła.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
