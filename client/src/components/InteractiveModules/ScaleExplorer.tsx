import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { motion } from "framer-motion";
import { Maximize } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { SCALE_LEVELS } from "@/lib/constants";

export function ScaleExplorer() {
  const [currentScale, setCurrentScale] = useState([3]);
  const intl = useIntl();
  const scale = SCALE_LEVELS[currentScale[0]];

  const sliderAriaLabel = intl.formatMessage({
    id: "scaleExplorer.sliderAriaLabel",
    defaultMessage: "Zmień skalę wszechświata",
  });

  const getVisualization = () => {
    switch (scale.visualization) {
      case "atom":
        return (
          <div className="relative w-32 h-32">
            <div className="w-6 h-6 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div
              className="w-32 h-32 border-2 border-primary border-opacity-30 rounded-full absolute animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="w-24 h-24 border border-accent border-opacity-40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }}
            ></div>
          </div>
        );
      case "molecule":
        return (
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-6 h-6 bg-red-400 rounded-full ml-2"></div>
            <div className="w-6 h-6 bg-red-400 rounded-full ml-1"></div>
          </div>
        );
      case "human":
        return (
          <div className="relative w-16 h-32 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full mb-2"></div>
            <div className="w-12 h-20 bg-secondary rounded-lg"></div>
          </div>
        );
      case "earth":
        return (
          <div className="relative w-32 h-32">
            <div className="w-32 h-32 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
          </div>
        );
      default:
        return (
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 bg-primary rounded-full opacity-60"></div>
          </div>
        );
    }
  };

  return (
    <div
      className="interactive-module rounded-xl "
      data-testid="scale-explorer-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Maximize className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">
          <FormattedMessage
            id="scaleExplorer.title"
            defaultMessage="Zabawa skalą wszechświata"
          />
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground mb-6">
            <FormattedMessage
              id="scaleExplorer.description"
              defaultMessage="Podróżuj przez skale wszechświata - od najmniejszych cząstek do największych galaktyk. Interaktywne powiększanie pomoże Ci zrozumieć względne rozmiary obiektów."
            />
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">
                <FormattedMessage id="scale.level" defaultMessage="Skala" />
              </label>
              <span
                className="text-primary font-mono text-sm"
                data-testid="scale-name"
              >
                {intl.formatMessage({ id: scale.name as any })}
              </span>
            </div>

            <div className="relative">
              <Slider
                value={currentScale}
                onValueChange={setCurrentScale}
                min={0}
                max={SCALE_LEVELS.length - 1}
                step={1}
                className="w-full"
                aria-label={sliderAriaLabel}
                data-testid="scale-slider"
              />

              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>
                  <FormattedMessage id="scale.quark" defaultMessage="Kwark" />
                </span>
                <span>
                  <FormattedMessage id="scale.atom" defaultMessage="Atom" />
                </span>
                <span>
                  <FormattedMessage
                    id="scale.molecule"
                    defaultMessage="Cząsteczka"
                  />
                </span>
                <span>
                  <FormattedMessage id="scale.cell" defaultMessage="Komórka" />
                </span>
                <span>
                  <FormattedMessage
                    id="scale.human"
                    defaultMessage="Człowiek"
                  />
                </span>
                <span>
                  <FormattedMessage id="scale.earth" defaultMessage="Ziemia" />
                </span>
                <span>
                  <FormattedMessage
                    id="scale.galaxy"
                    defaultMessage="Galaktyka"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-muted rounded-lg p-6 relative overflow-hidden"
          style={{ height: "300px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={currentScale[0]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="scale-zoom"
              data-testid="scale-visualization"
            >
              {getVisualization()}
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="bg-background bg-opacity-80 backdrop-blur-sm rounded-lg p-3">
              <p
                className="text-sm text-foreground font-medium"
                data-testid="scale-description"
              >
                {intl.formatMessage({ id: scale.description as any })}
              </p>
              <p
                className="text-xs text-muted-foreground"
                data-testid="scale-size"
              >
                <FormattedMessage
                  id="scaleExplorer.size"
                  defaultMessage="Rozmiar"
                />
                : {scale.size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
