
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Bookmark, Magnet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyFact } from '@/components/DailyFact';
import { Language } from '@/types/education';

interface ElectromagnetismProps {
  language: Language;
}

export default function Electromagnetism({ language }: ElectromagnetismProps) {
  const [magneticField, setMagneticField] = React.useState(false);

  return (
    <div className="min-h-screen transition-all duration-300 ease-in-out" data-testid="electromagnetism-page">
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
                Elektromagnetyzm
              </h1>
              <p className="text-muted-foreground mt-2">
                Poznaj jedność sił elektrycznych i magnetycznych
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">~50 min</span>
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

        {/* Pole magnetyczne */}
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
                <CardTitle className="text-2xl">Pole magnetyczne magnesu</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Obserwuj linie pola magnetycznego wokół magnesu trwałego.
              </p>

              {/* Wizualizacja pola magnetycznego */}
              <div className="relative w-full h-80 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                {/* Magnes */}
                <div className="relative">
                  <div className="flex">
                    <div className="w-16 h-32 bg-red-500 rounded-l-lg flex items-center justify-center text-white font-bold">
                      N
                    </div>
                    <div className="w-16 h-32 bg-blue-500 rounded-r-lg flex items-center justify-center text-white font-bold">
                      S
                    </div>
                  </div>
                  
                  {/* Linie pola magnetycznego */}
                  {magneticField && (
                    <>
                      {/* Górne linie */}
                      <div className="absolute -top-8 left-0 w-32 h-2 border-t-2 border-dashed border-purple-500 rounded-full transform -rotate-12"></div>
                      <div className="absolute -top-12 left-2 w-28 h-2 border-t-2 border-dashed border-purple-500 rounded-full transform -rotate-6"></div>
                      <div className="absolute -top-16 left-4 w-24 h-2 border-t-2 border-dashed border-purple-500 rounded-full"></div>
                      
                      {/* Dolne linie */}
                      <div className="absolute -bottom-8 left-0 w-32 h-2 border-b-2 border-dashed border-purple-500 rounded-full transform rotate-12"></div>
                      <div className="absolute -bottom-12 left-2 w-28 h-2 border-b-2 border-dashed border-purple-500 rounded-full transform rotate-6"></div>
                      <div className="absolute -bottom-16 left-4 w-24 h-2 border-b-2 border-dashed border-purple-500 rounded-full"></div>
                      
                      {/* Boczne linie */}
                      <div className="absolute top-4 -left-20 w-16 h-24 border-l-2 border-dashed border-purple-500 rounded-full transform rotate-45"></div>
                      <div className="absolute top-4 -right-20 w-16 h-24 border-r-2 border-dashed border-purple-500 rounded-full transform -rotate-45"></div>
                    </>
                  )}
                </div>
                
                {/* Strzałki kierunku */}
                {magneticField && (
                  <>
                    <div className="absolute top-16 left-40 text-purple-600 font-bold">→</div>
                    <div className="absolute top-24 left-44 text-purple-600 font-bold">→</div>
                    <div className="absolute bottom-16 left-40 text-purple-600 font-bold">→</div>
                    <div className="absolute bottom-24 left-44 text-purple-600 font-bold">→</div>
                  </>
                )}
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={() => setMagneticField(!magneticField)}
                  variant={magneticField ? "destructive" : "default"}
                >
                  {magneticField ? 'Ukryj pole' : 'Pokaż pole magnetyczne'}
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Właściwości pola magnetycznego:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Linie pola wychodzą z bieguna N i wchodzą do bieguna S</li>
                  <li>• Linie pola nigdy się nie przecinają</li>
                  <li>• Gęstość linii oznacza siłę pola</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Równania Maxwella */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Równania Maxwella</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Prawo Gaussa dla pola elektrycznego</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Strumień pola elektrycznego przez zamkniętą powierzchnię jest proporcjonalny do ładunku wewnątrz.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">∮ E⃗ · dA⃗ = Q/ε₀</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Prawo Gaussa dla pola magnetycznego</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Strumień pola magnetycznego przez zamkniętą powierzchnię jest zawsze równy zero.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">∮ B⃗ · dA⃗ = 0</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Prawo Faradaya</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foregeground mb-4">
                  Zmienne pole magnetyczne indukuje pole elektryczne.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">∮ E⃗ · dl⃗ = -dΦB/dt</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-interactive">
              <CardHeader>
                <CardTitle>Prawo Ampère'a-Maxwella</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Prąd i zmienne pole elektryczne wytwarzają pole magnetyczne.
                </p>
                <div className="bg-muted p-4 rounded text-center">
                  <p className="font-mono text-lg">∮ B⃗ · dl⃗ = μ₀I + μ₀ε₀dΦE/dt</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Fale elektromagnetyczne */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Fale elektromagnetyczne</h2>
          <Card className="card-interactive">
            <CardHeader>
              <CardTitle>Spektrum fal elektromagnetycznych</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Wszystkie fale elektromagnetyczne poruszają się z prędkością światła w próżni: c = 299 792 458 m/s
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded text-center">
                  <div className="font-semibold text-purple-800 dark:text-purple-200">Fale radiowe</div>
                  <div className="text-xs text-purple-600 dark:text-purple-300">λ &gt; 1m</div>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded text-center">
                  <div className="font-semibold text-blue-800 dark:text-blue-200">Mikrofale</div>
                  <div className="text-xs text-blue-600 dark:text-blue-300">1m - 1mm</div>
                </div>
                
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded text-center">
                  <div className="font-semibold text-green-800 dark:text-green-200">Światło widzialne</div>
                  <div className="text-xs text-green-600 dark:text-green-300">400-700nm</div>
                </div>
                
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded text-center">
                  <div className="font-semibold text-orange-800 dark:text-orange-200">Promienie X</div>
                  <div className="text-xs text-orange-600 dark:text-orange-300">0.01-10nm</div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Związek między częstotliwością a długością fali:</h4>
                <p className="font-mono text-lg text-center">c = λf</p>
                <p className="text-xs text-center mt-2">gdzie c - prędkość światła, λ - długość fali, f - częstotliwość</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
