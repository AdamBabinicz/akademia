import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function ACCurrent() {
  const [frequency, setFrequency] = useState([50]);
  const [oscillationPhase, setOscillationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOscillationPhase(prev => (prev + frequency[0] * 0.1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [frequency]);

  const setPresetFrequency = (freq: number) => {
    setFrequency([freq]);
  };

  const getOscillationY = (baseY: number, index: number) => {
    const phase = oscillationPhase + (index * 30);
    return baseY + Math.sin((phase * Math.PI) / 180) * 15;
  };

  return (
    <div className="interactive-module rounded-xl p-8" data-testid="ac-current-module">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Radio className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">
          Wizualizacja prądu zmiennego
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-6">
            Zmień częstotliwość prądu zmiennego i obserwuj, jak drgają elektrony. 
            Zauważ, że energia jest przenoszona przez falę, nie przez ruch elektronów!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">
                <FormattedMessage id="simulation.frequency" defaultMessage="Częstotliwość" />
              </label>
              <span className="text-primary font-mono text-sm" data-testid="frequency-display">
                {frequency[0]} Hz
              </span>
            </div>
            
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              min={1}
              max={100}
              step={1}
              className="w-full"
              aria-label="Ustaw częstotliwość prądu zmiennego w hercach"
              data-testid="frequency-slider"
            />
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetFrequency(50)}
                aria-label="Ustaw częstotliwość na 50 Hz (standard europejski)"
                data-testid="freq-50"
              >
                50 Hz (EU)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetFrequency(60)}
                aria-label="Ustaw częstotliwość na 60 Hz (standard amerykański)"
                data-testid="freq-60"
              >
                60 Hz (US)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPresetFrequency(1)}
                data-testid="freq-1"
              >
                1 Hz (wolno)
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6 relative" style={{ height: '300px' }}>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            Drgania elektronów
          </h4>
          
          {/* AC Visualization */}
          <div className="relative w-full h-48 border-2 border-border rounded-lg overflow-hidden bg-background">
            {/* Sine wave background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: "hsl(var(--primary))", stopOpacity: 0.3}} />
                  <stop offset="100%" style={{stopColor: "hsl(var(--primary))", stopOpacity: 0.1}} />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 100 ${Array.from({ length: 20 }, (_, i) => {
                  const x = i * 20;
                  const y = 100 + Math.sin((oscillationPhase + i * 18) * Math.PI / 180) * 30;
                  return `L ${x} ${y}`;
                }).join(' ')}`}
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="url(#waveGradient)"
              />
            </svg>
            
            {/* Oscillating electrons */}
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-accent rounded-full"
                animate={{
                  x: 50 + i * 60,
                  y: getOscillationY(90, i)
                }}
                transition={{ duration: 0.05 }}
                data-testid={`oscillating-electron-${i}`}
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Fala elektromagnetyczna niosąca energię →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
