import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import { Activity, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function ElectronDrift() {
  const [voltage, setVoltage] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [electrons, setElectrons] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 40 + i * 40,
      y: 30 + Math.random() * 40,
      chaotic: true,
    }))
  );
  const intl = useIntl();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElectrons((prev) =>
        prev.map((electron) => {
          if (voltage[0] === 0) {
            return {
              ...electron,
              x: Math.max(
                10,
                Math.min(270, electron.x + (Math.random() - 0.5) * 20)
              ),
              y: Math.max(
                10,
                Math.min(70, electron.y + (Math.random() - 0.5) * 20)
              ),
              chaotic: true,
            };
          } else {
            return {
              ...electron,
              x: electron.x > 280 ? -10 : electron.x + voltage[0] * 0.3,
              y: electron.y + (Math.random() - 0.5) * 4,
              chaotic: false,
            };
          }
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [voltage, isPlaying]);

  const resetSimulation = () => {
    setVoltage([0]);
    setElectrons(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: 40 + i * 40,
        y: 30 + Math.random() * 40,
        chaotic: true,
      }))
    );
  };

  const voltageAriaLabel = intl.formatMessage({
    id: "electronDrift.voltageAriaLabel",
    defaultMessage: "Ustaw napięcie w woltach",
  });
  const resetAriaLabel = intl.formatMessage({
    id: "electronDrift.resetAriaLabel",
    defaultMessage: "Zresetuj symulację dryfu elektronów",
  });
  const playPauseAriaLabel = isPlaying
    ? intl.formatMessage({
        id: "electronDrift.pauseAriaLabel",
        defaultMessage: "Zatrzymaj symulację",
      })
    : intl.formatMessage({
        id: "electronDrift.playAriaLabel",
        defaultMessage: "Uruchom symulację",
      });

  return (
    <div
      className="interactive-module rounded-xl p-8"
      data-testid="electron-drift-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Activity className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">
          <FormattedMessage
            id="electronDrift.title"
            defaultMessage="Symulacja dryfu elektronów"
          />
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-6">
            <FormattedMessage
              id="electronDrift.description"
              defaultMessage="Obserwuj zachowanie elektronów w przewodniku. Bez napięcia poruszają się chaotycznie, z napięciem - powoli dryfują w jednym kierunku."
            />
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">
                <FormattedMessage
                  id="electronDrift.voltageLabel"
                  defaultMessage="Napięcie"
                />
              </label>
              <span
                className="text-primary font-mono text-sm"
                data-testid="voltage-display"
              >
                {voltage[0]}V
              </span>
            </div>

            <Slider
              value={voltage}
              onValueChange={setVoltage}
              max={12}
              step={1}
              className="w-full"
              aria-label={voltageAriaLabel}
              data-testid="voltage-slider"
            />

            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="secondary"
                onClick={resetSimulation}
                aria-label={resetAriaLabel}
                data-testid="reset-button"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                <FormattedMessage
                  id="electronDrift.resetButton"
                  defaultMessage="Reset"
                />
              </Button>

              <Button
                variant="default"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={playPauseAriaLabel}
                data-testid="play-pause-button"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div
          className="bg-muted rounded-lg p-6 relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            <FormattedMessage
              id="electronDrift.conductor"
              defaultMessage="Przewodnik miedziany"
            />
          </h4>

          <div className="relative w-full h-32 bg-gradient-to-r from-amber-900 to-amber-700 rounded-lg border-2 border-accent opacity-80">
            {electrons.map((electron) => (
              <motion.div
                key={electron.id}
                className="w-2 h-2 bg-primary rounded-full absolute"
                animate={{
                  x: electron.x,
                  y: electron.y,
                }}
                transition={{ duration: 0.1 }}
                data-testid={`electron-${electron.id}`}
              />
            ))}

            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-primary font-bold">
              +
            </div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold">
              -
            </div>
          </div>

          <div className="mt-6 text-center">
            <p
              className="text-sm text-muted-foreground"
              data-testid="simulation-status"
            >
              {voltage[0] === 0 ? (
                <FormattedMessage
                  id="electronDrift.status.chaotic"
                  defaultMessage="Brak napięcia - ruch chaotyczny"
                />
              ) : (
                <FormattedMessage
                  id="electronDrift.status.drift"
                  defaultMessage="Napięcie {voltage}V - powolny dryf →"
                  values={{ voltage: voltage[0] }}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
