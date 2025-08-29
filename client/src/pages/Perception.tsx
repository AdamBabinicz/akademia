
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Volume2, Hand, Palette, Clock, Bookmark, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface PerceptionProps {
  language: Language;
}

// Color Vision Module
function ColorVisionModule() {
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [showDaltonism, setShowDaltonism] = useState(false);
  
  const colors = [
    { name: 'Czerwony', hex: '#ff0000' },
    { name: 'Zielony', hex: '#00ff00' },
    { name: 'Niebieski', hex: '#0000ff' },
    { name: 'Żółty', hex: '#ffff00' },
    { name: 'Fioletowy', hex: '#ff00ff' },
    { name: 'Cyjan', hex: '#00ffff' }
  ];
  
  const getDaltonismFilter = (color: string) => {
    if (!showDaltonism) return color;
    // Simulate protanopia (red-blind)
    if (color === '#ff0000') return '#999999';
    if (color === '#00ff00') return '#ffff00';
    return color;
  };
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Percepcja Kolorów
        </CardTitle>
        <CardDescription>
          Odkryj jak oko ludzkie postrzega kolory i jak działa daltonizm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Switch
            checked={showDaltonism}
            onCheckedChange={setShowDaltonism}
          />
          <span className="text-sm">Symulacja daltonizmu</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {colors.map((color) => (
            <div
              key={color.hex}
              className="aspect-square rounded-lg border-2 border-border cursor-pointer transition-all hover:scale-105"
              style={{ backgroundColor: getDaltonismFilter(color.hex) }}
              onClick={() => setSelectedColor(color.hex)}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-semibold text-xs">
                {color.name}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Wybrany kolor: {selectedColor}</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Oko ludzkie ma 3 typy fotoreceptorów (stożki)</p>
            <p>• Każdy typ reaguje na inne długości fal światła</p>
            <p>• Daltonizm to niedobór jednego z typów stożków</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sound Frequency Module
function SoundModule() {
  const [frequency, setFrequency] = useState([440]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-primary" />
          Percepcja Dźwięku
        </CardTitle>
        <CardDescription>
          Eksploruj jak ucho odbiera różne częstotliwości dźwięku
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Częstotliwość: {frequency[0]} Hz</label>
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              max={2000}
              min={100}
              step={10}
              className="mt-2"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Głośność: {volume[0]}%</label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="btn-primary"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Zatrzymaj
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Odtwórz
              </>
            )}
          </Button>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Człowiek słyszy częstotliwości od 20 Hz do 20 kHz</p>
            <p>• Wysokość dźwięku zależy od częstotliwości</p>
            <p>• Głośność zależy od amplitudy fali dźwiękowej</p>
            <p>• Ucho środkowe wzmacnia dźwięki o 20-30 dB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Touch Sensitivity Module
function TouchModule() {
  const [sensitivity, setSensitivity] = useState([50]);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  
  const bodyZones = [
    { id: 'fingertip', name: 'Opuszek palca', sensitivity: 95 },
    { id: 'palm', name: 'Dłoń', sensitivity: 70 },
    { id: 'arm', name: 'Ramię', sensitivity: 40 },
    { id: 'back', name: 'Plecy', sensitivity: 25 },
    { id: 'leg', name: 'Noga', sensitivity: 30 }
  ];
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-primary" />
          Czucie Dotykowe
        </CardTitle>
        <CardDescription>
          Poznaj różnice w czułości dotykowej różnych części ciała
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium">Próg czucia: {sensitivity[0]}%</label>
          <Slider
            value={sensitivity}
            onValueChange={setSensitivity}
            max={100}
            min={0}
            step={5}
            className="mt-2"
          />
        </div>
        
        <div className="grid gap-3">
          {bodyZones.map((zone) => (
            <div
              key={zone.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                zone.sensitivity >= sensitivity[0]
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted border-border'
              } ${activeZone === zone.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setActiveZone(zone.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{zone.name}</span>
                <span className="text-sm text-muted-foreground">
                  {zone.sensitivity}% czułości
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Opuszki palców są najbardziej czułe na dotyk</p>
            <p>• Czucie temperatury i bólu to oddzielne receptory</p>
            <p>• Receptory mechaniczne reagują na nacisk i wibracje</p>
            <p>• Mózg interpretuje sygnały z różnych receptorów</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Perception({ language }: PerceptionProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="perception-page">
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
                Percepcja i Zmysły
              </h1>
              <p className="text-muted-foreground mt-2">
                Odkryj fascynujący świat ludzkich zmysłów i percepcji
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

        {/* Interactive Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interaktywne Moduły
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Eksploruj jak działają nasze zmysły poprzez interaktywne eksperymenty
            </p>
          </div>
          
          <div className="grid gap-8">
            <ColorVisionModule />
            <SoundModule />
            <TouchModule />
          </div>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-warm p-8 rounded-xl"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            Podsumowanie - Jak Działają Nasze Zmysły
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Wzrok</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Oko przekształca światło w sygnały elektryczne</li>
                <li>• Siatkówka zawiera pręciki i stożki</li>
                <li>• Mózg interpretuje obrazy w korze wzrokowej</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Słuch</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fale dźwiękowe wprawiają błonę bębenkową w drgania</li>
                <li>• Kosteczki słuchowe wzmacniają wibracje</li>
                <li>• Ślimak przekształca drgania w sygnały nerwowe</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Dotyk</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Receptory mechaniczne reagują na nacisk</li>
                <li>• Różne części ciała mają różną czułość</li>
                <li>• Mózg mapuje powierzchnię ciała</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Smak i Zapach</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kubki smakowe rozpoznają 5 podstawowych smaków</li>
                <li>• Węch jest tysiące razy czulszy niż smak</li>
                <li>• Oba zmysły współpracują przy rozpoznawaniu pokarmów</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
