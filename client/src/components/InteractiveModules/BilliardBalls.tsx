import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isElectron: boolean;
}

interface BilliardBallsProps {
  width?: number;
  height?: number;
}

export function BilliardBalls({ width = 400, height = 300 }: BilliardBallsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [signalSpeed, setSignalSpeed] = useState(0);

  // Inicjalizacja kulek
  useEffect(() => {
    const initBalls = () => {
      const newBalls: Ball[] = [];
      const ballRadius = 15;
      const spacing = 35;

      // Tworzymy rząd kulek reprezentujących atomy
      for (let i = 0; i < 10; i++) {
        newBalls.push({
          id: i,
          x: 50 + i * spacing,
          y: height / 2,
          vx: 0,
          vy: 0,
          radius: ballRadius,
          color: '#94a3b8', // szary - atomy
          isElectron: false
        });
      }

      // Dodajemy "elektron" - czerwoną kulkę
      newBalls.push({
        id: 10,
        x: 20,
        y: height / 2,
        vx: 2,
        vy: 0,
        radius: 12,
        color: '#ef4444', // czerwony - elektron
        isElectron: true
      });

      setBalls(newBalls);
    };

    initBalls();
  }, [height]);

  // Animacja
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      setBalls(prevBalls => {
        const newBalls = [...prevBalls];

        // Aktualizuj pozycje kulek
        newBalls.forEach((ball) => {
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Tłumienie
          ball.vx *= 0.999;
          ball.vy *= 0.999;

          // Odbicie od ścian
          if (ball.x <= ball.radius || ball.x >= width - ball.radius) {
            ball.vx *= -0.8;
            ball.x = Math.max(ball.radius, Math.min(width - ball.radius, ball.x));
          }
          if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
            ball.vy *= -0.8;
            ball.y = Math.max(ball.radius, Math.min(height - ball.radius, ball.y));
          }
        });

        // Kolizje między kulkami
        for (let i = 0; i < newBalls.length; i++) {
          for (let j = i + 1; j < newBalls.length; j++) {
            const ball1 = newBalls[i];
            const ball2 = newBalls[j];
            const dx = ball2.x - ball1.x;
            const dy = ball2.y - ball1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball1.radius + ball2.radius) {
              // Kolizja! Transfer energii
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Prędkości przed kolizją
              const vx1 = ball1.vx * cos + ball1.vy * sin;
              const vy1 = ball1.vy * cos - ball1.vx * sin;
              const vx2 = ball2.vx * cos + ball2.vy * sin;
              const vy2 = ball2.vy * cos - ball2.vx * sin;

              // Transfer prędkości (uproszczony)
              const tempVx1 = vx1;
              ball1.vx = (vx2 * cos - vy1 * sin) * 0.8;
              ball1.vy = (vy1 * cos + vx2 * sin) * 0.8;
              ball2.vx = (tempVx1 * cos - vy2 * sin) * 0.8;
              ball2.vy = (vy2 * cos + tempVx1 * sin) * 0.8;

              // Rozdziel kulki
              const overlap = ball1.radius + ball2.radius - distance;
              const moveX = overlap * 0.5 * cos;
              const moveY = overlap * 0.5 * sin;
              
              ball1.x -= moveX;
              ball1.y -= moveY;
              ball2.x += moveX;
              ball2.y += moveY;

              // Symulacja szybkości sygnału
              if (ball1.isElectron || ball2.isElectron) {
                setSignalSpeed(prev => prev + 1);
              }
            }
          }
        }

        return newBalls;
      });

      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, width, height, balls.length]);

  // Rysowanie kulek
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    balls.forEach(ball => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.strokeStyle = ball.isElectron ? '#dc2626' : '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (ball.isElectron) {
        // Dodaj świecenie dla elektronu
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef4444';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }, [balls, width, height]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSignalSpeed(0);

    // Reset pozycji kulek
    setBalls(prevBalls => {
      const newBalls = [...prevBalls];
      newBalls.forEach((ball, index) => {
        if (ball.isElectron) {
          ball.x = 20;
          ball.y = height / 2;
          ball.vx = 2;
          ball.vy = 0;
        } else {
          ball.x = 50 + index * 35;
          ball.y = height / 2;
          ball.vx = 0;
          ball.vy = 0;
        }
      });
      return newBalls;
    });
  };

  const pushElectron = () => {
    setBalls(prevBalls => {
      const newBalls = [...prevBalls];
      const electron = newBalls.find(ball => ball.isElectron);
      if (electron) {
        electron.vx += 3;
      }
      return newBalls;
    });
  };

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Eksperyment z kulkami bilardowymi
        </CardTitle>
        <CardDescription>
          Analogia ruchu elektronów w przewodniku - kulki reprezentują atomy, czerwona kulka to elektron
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleStart} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start
          </Button>
          <Button 
            onClick={handlePause} 
            disabled={!isRunning}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pause className="w-4 h-4" />
            Pauza
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button 
            onClick={pushElectron}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Popchnij elektron
          </Button>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Szybkość sygnału:</span>
            <Badge variant="secondary">{signalSpeed}</Badge>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="interactive-canvas w-full"
            style={{ background: 'hsl(var(--card))' }}
          />
        </div>

        <div className="bg-muted p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">Jak to działa:</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Szare kulki = atomy w przewodniku</li>
            <li>• Czerwona kulka = elektron</li>
            <li>• Kolizje = transfer energii między elektronami</li>
            <li>• Sygnał rozchodzi się szybko, elektrony powoli</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default BilliardBalls;