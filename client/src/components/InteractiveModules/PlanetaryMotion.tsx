import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Globe } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

interface Planet {
  name: string;
  distance: number;
  speed: number;
  size: number;
  color: string;
  angle: number;
}

export function PlanetaryMotion() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [planets, setPlanets] = useState<Planet[]>([
    { name: 'Merkury', distance: 80, speed: 2.0, size: 4, color: '#8C7853', angle: 0 },
    { name: 'Wenus', distance: 100, speed: 1.5, size: 6, color: '#FFC649', angle: 0 },
    { name: 'Ziemia', distance: 120, speed: 1.0, size: 6, color: '#6B93D6', angle: 0 },
    { name: 'Mars', distance: 140, speed: 0.8, size: 5, color: '#C1440E', angle: 0 },
  ]);

  useEffect(() => {
    let animationId: number;

    if (isRunning) {
      const animate = () => {
        setPlanets(prev => prev.map(planet => ({
          ...planet,
          angle: (planet.angle + planet.speed * speed[0] * 0.02) % (2 * Math.PI)
        })));
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRunning, speed]);

  const resetAnimation = () => {
    setPlanets(prev => prev.map(planet => ({ ...planet, angle: 0 })));
    setIsRunning(false);
  };

  return (
    <Card className="interactive-module" data-testid="planetary-motion-module">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Globe className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">
            <FormattedMessage id="planetaryMotion.title" defaultMessage="Ruch planet wokół Słońca" />
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-muted-foreground">
          <FormattedMessage 
            id="planetaryMotion.description" 
            defaultMessage="Obserwuj jak planety poruszają się wokół Słońca z różnymi prędkościami zgodnie z prawami Keplera." 
          />
        </div>

        {/* Solar System Visualization */}
        <div className="relative w-full h-80 bg-gradient-to-b from-slate-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
          {/* Sun */}
          <div 
            className="absolute w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
            style={{ 
              boxShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706' 
            }}
          />

          {/* Orbital paths */}
          {planets.map((planet, index) => (
            <div
              key={`orbit-${index}`}
              className="absolute border border-gray-600/30 rounded-full"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
              }}
            />
          ))}

          {/* Planets */}
          {planets.map((planet, index) => (
            <div
              key={`planet-${index}`}
              className="absolute rounded-full transition-all duration-75"
              style={{
                width: planet.size,
                height: planet.size,
                backgroundColor: planet.color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${planet.distance * Math.cos(planet.angle)}px, ${planet.distance * Math.sin(planet.angle)}px)`,
                boxShadow: `0 0 ${planet.size}px ${planet.color}50`
              }}
              title={planet.name}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              <FormattedMessage id="planetaryMotion.speed" defaultMessage="Prędkość animacji" />
            </label>
            <span className="text-primary font-mono text-sm">
              {speed[0]}x
            </span>
          </div>

          <Slider
            value={speed}
            onValueChange={setSpeed}
            max={5}
            min={0.1}
            step={0.1}
            className="w-full"
            aria-label="Prędkość animacji"
            data-testid="speed-slider"
          />

          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant="default"
              size="sm"
              data-testid="play-pause-button"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  <FormattedMessage id="common.pause" defaultMessage="Pauza" />
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  <FormattedMessage id="common.play" defaultMessage="Odtwórz" />
                </>
              )}
            </Button>

            <Button
              onClick={resetAnimation}
              variant="outline"
              size="sm"
              data-testid="reset-button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <FormattedMessage id="common.reset" defaultMessage="Reset" />
            </Button>
          </div>
        </div>

        {/* Planet Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {planets.map((planet, index) => (
            <div 
              key={`info-${index}`}
              className="flex items-center gap-2 p-2 bg-muted rounded-lg"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <div className="text-xs">
                <div className="font-medium">{planet.name}</div>
                <div className="text-muted-foreground">
                  {planet.speed.toFixed(1)}x
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}