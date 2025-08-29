
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Clock, Bookmark, Atom, Dna, Eye, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface MicroworldProps {
  language: Language;
}

// Atomic Structure Module
function AtomicStructureModule() {
  const [electronShells, setElectronShells] = useState([2, 8, 1]); // Sodium atom
  const [isAnimated, setIsAnimated] = useState(true);
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-primary" />
          Struktura Atomu
        </CardTitle>
        <CardDescription>
          Eksploruj budowę atomu i rozmieszczenie elektronów
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Switch
            checked={isAnimated}
            onCheckedChange={setIsAnimated}
          />
          <span className="text-sm">Animacja elektronów</span>
        </div>
        
        <div className="relative w-64 h-64 mx-auto">
          {/* Nucleus */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">+11</span>
          </div>
          
          {/* Electron shells */}
          {electronShells.map((electrons, shellIndex) => (
            <div
              key={shellIndex}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-full ${
                isAnimated ? 'animate-spin' : ''
              }`}
              style={{
                width: `${(shellIndex + 1) * 60}px`,
                height: `${(shellIndex + 1) * 60}px`,
                animationDuration: `${(shellIndex + 1) * 3}s`
              }}
            >
              {Array.from({ length: electrons }).map((_, electronIndex) => (
                <div
                  key={electronIndex}
                  className="absolute w-3 h-3 bg-blue-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${(360 / electrons) * electronIndex}deg) translateX(${(shellIndex + 1) * 30}px) translateY(-6px)`
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Atom sodu (Na)</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Jądro zawiera 11 protonów i 12 neutronów</p>
            <p>• Elektrony rozmieszczone w powłokach: {electronShells.join(', ')}</p>
            <p>• Promień atomu: ~180 pikometrów</p>
            <p>• Elektrony krążą z prędkością ~2200 km/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// DNA Structure Module
function DNAStructureModule() {
  const [zoom, setZoom] = useState([1]);
  const [showBases, setShowBases] = useState(true);
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="w-5 h-5 text-primary" />
          Struktura DNA
        </CardTitle>
        <CardDescription>
          Poznaj budowę kwasu deoksyrybonukleinowego
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Powiększenie: {zoom[0]}x</label>
            <Slider
              value={zoom}
              onValueChange={setZoom}
              max={5}
              min={0.5}
              step={0.1}
              className="mt-2"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={showBases}
              onCheckedChange={setShowBases}
            />
            <span className="text-sm">Pokaż zasady azotowe</span>
          </div>
        </div>
        
        <div className="relative h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center">
          <div 
            className="dna-helix"
            style={{ transform: `scale(${zoom[0]})` }}
          >
            {/* DNA Double Helix Visualization */}
            <div className="relative w-32 h-48">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full flex justify-between items-center"
                  style={{ 
                    top: `${i * 16}px`,
                    transform: `rotateY(${i * 30}deg)`
                  }}
                >
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  {showBases && (
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 mx-1" />
                  )}
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Fakty o DNA</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Średnica podwójnej helisy: 2 nanometry</p>
            <p>• Jeden obrót helisy: 3.4 nanometra</p>
            <p>• 4 zasady azotowe: A, T, G, C</p>
            <p>• Długość DNA w komórce: ~2 metry</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Cell Structure Module
function CellStructureModule() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
  
  const organelles = [
    { id: 'nucleus', name: 'Jądro', x: 50, y: 50, size: 20, color: 'bg-purple-500' },
    { id: 'mitochondria', name: 'Mitochondrium', x: 25, y: 25, size: 12, color: 'bg-green-500' },
    { id: 'ribosome', name: 'Rybosomy', x: 75, y: 30, size: 6, color: 'bg-blue-500' },
    { id: 'er', name: 'Siateczka śródplazmatyczna', x: 65, y: 65, size: 15, color: 'bg-yellow-500' },
    { id: 'golgi', name: 'Aparat Golgiego', x: 30, y: 70, size: 10, color: 'bg-orange-500' }
  ];
  
  const organelleInfo = {
    nucleus: 'Centrum kontrolne komórki zawierające DNA',
    mitochondria: 'Elektrownie komórki produkujące ATP',
    ribosome: 'Fabryki białek komórki',
    er: 'System transportowy i magazynowy',
    golgi: 'Centrum pakowania i modyfikacji białek'
  };
  
  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          Budowa Komórki
        </CardTitle>
        <CardDescription>
          Eksploruj organelle komórki eukariotycznej
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-80 h-80 mx-auto bg-gray-100 rounded-full border-4 border-gray-300 overflow-hidden">
          {/* Cell membrane */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-gray-400" />
          
          {/* Organelles */}
          {organelles.map((organelle) => (
            <div
              key={organelle.id}
              className={`absolute rounded-full cursor-pointer transition-all hover:scale-110 ${organelle.color} ${
                selectedOrganelle === organelle.id ? 'ring-4 ring-primary' : ''
              }`}
              style={{
                left: `${organelle.x}%`,
                top: `${organelle.y}%`,
                width: `${organelle.size}px`,
                height: `${organelle.size}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedOrganelle(organelle.id)}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {organelles.map((organelle) => (
            <div
              key={organelle.id}
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                selectedOrganelle === organelle.id
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted border-border hover:bg-muted/80'
              }`}
              onClick={() => setSelectedOrganelle(organelle.id)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${organelle.color}`} />
                <span className="font-medium">{organelle.name}</span>
              </div>
              {selectedOrganelle === organelle.id && (
                <p className="text-sm text-muted-foreground mt-1">
                  {organelleInfo[organelle.id as keyof typeof organelleInfo]}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Microworld({ language }: MicroworldProps) {
  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="microworld-page">
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
                Mikroświat
              </h1>
              <p className="text-muted-foreground mt-2">
                Zanurz się w fascynujący świat atomów, cząsteczek i komórek
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

        {/* Interactive Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Interaktywne Eksploracje Mikroświata
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Odkryj struktury i procesy zachodzące w najmniejszej skali rzeczywistości
            </p>
          </div>
          
          <div className="grid gap-8">
            <AtomicStructureModule />
            <DNAStructureModule />
            <CellStructureModule />
          </div>
        </motion.div>

        {/* Educational Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-warm p-8 rounded-xl"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            Poziomy Organizacji Mikroświata
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Atomy</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Podstawowe jednostki materii</li>
                <li>• Składają się z protonów, neutronów i elektronów</li>
                <li>• Rozmiar: 0.1-0.5 nanometra</li>
                <li>• 118 znanych pierwiastków</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Cząsteczki</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Połączenia atomów</li>
                <li>• DNA, białka, węglowodany</li>
                <li>• Rozmiar: 1-100 nanometrów</li>
                <li>• Podstawa życia biologicznego</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Komórki</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Podstawowe jednostki życia</li>
                <li>• Zawierają organelle i DNA</li>
                <li>• Rozmiar: 1-100 mikrometrów</li>
                <li>• Około 37 bilionów w organizmie człowieka</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
