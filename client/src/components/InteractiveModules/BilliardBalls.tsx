import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from 'react-intl';

export function BilliardBalls() {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerDemo = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const ballVariants = {
    initial: { x: 0 },
    impact: (i: number) => ({
      x: i === 0 ? 10 : i === 7 ? 40 : 5,
      transition: { delay: i * 0.1, duration: 0.2, type: "spring" }
    })
  };

  return (
    <div className="interactive-module rounded-xl p-8" data-testid="billiard-balls-module">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Target className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">
          Eksperyment z kulkami bilardowymi
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-6">
            <FormattedMessage id="billiard.description" />
          </p>
          
          <Button
            onClick={triggerDemo}
            disabled={isAnimating}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
            data-testid="trigger-demo-button"
          >
            <PlayCircle className="w-5 h-5" />
            <FormattedMessage id="billiard.pushFirst" />
          </Button>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            Rura z kulkami bilardowymi
          </h4>
          
          <div className="relative">
            {/* Tube representation */}
            <div className="bg-gradient-to-r from-amber-800 to-amber-600 h-16 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Billiard balls */}
              <div className="flex items-center gap-1 px-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="billiard-ball"
                    custom={i}
                    variants={ballVariants}
                    initial="initial"
                    animate={isAnimating ? "impact" : "initial"}
                    data-testid={`ball-${i}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Naciśnij przycisk powyżej, aby zobaczyć natychmiastowy efekt
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
