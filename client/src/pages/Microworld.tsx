import React, { useState } from "react";
import { motion } from "framer-motion";
import { Microscope, Clock, Bookmark, Atom, Dna, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { DailyFact } from "@/components/DailyFact";
import { Language } from "@/types/education";
import { FormattedMessage, useIntl } from "react-intl";
import SEO from "@/components/SEO";
import heroImage from "@assets/generated_images/9.avif";

interface MicroworldProps {
  language: Language;
}

function AtomicStructureModule() {
  const [electronShells] = useState([2, 8, 1]);
  const [isAnimated, setIsAnimated] = useState(true);
  const baseRadius = 29;
  const intl = useIntl();

  const animationToggleAriaLabel = intl.formatMessage({
    id: "microworld.atom.animationToggleAriaLabel",
    defaultMessage: "Włącz lub wyłącz animację elektronów",
  });

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="w-5 h-5 text-primary" />
          <FormattedMessage id="microworld.atom.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="microworld.atom.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Switch
            checked={isAnimated}
            onCheckedChange={setIsAnimated}
            aria-label={animationToggleAriaLabel}
          />
          <span className="text-sm">
            <FormattedMessage id="microworld.atom.animationToggle" />
          </span>
        </div>

        <div className="relative w-60 h-60 mx-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">+11</span>
          </div>

          {electronShells.map((electrons, shellIndex) => (
            <div
              key={shellIndex}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-full ${
                isAnimated ? "animate-spin" : ""
              }`}
              style={{
                width: `${(shellIndex + 1) * (baseRadius * 2)}px`,
                height: `${(shellIndex + 1) * (baseRadius * 2)}px`,
                animationDuration: `${(shellIndex + 1) * 3}s`,
              }}
            >
              {Array.from({ length: electrons }).map((_, electronIndex) => (
                <div
                  key={electronIndex}
                  className="absolute w-3 h-3 bg-blue-500 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${
                      (360 / electrons) * electronIndex
                    }deg) translateX(${
                      (shellIndex + 1) * baseRadius
                    }px) translateY(-6px)`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">
            <FormattedMessage id="microworld.atom.sodium.title" />
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <FormattedMessage id="microworld.atom.sodium.fact1" />
            </p>
            <p>
              <FormattedMessage
                id="microworld.atom.sodium.fact2"
                values={{ shells: electronShells.join(", ") }}
              />
            </p>
            <p>
              <FormattedMessage id="microworld.atom.sodium.fact3" />
            </p>
            <p>
              <FormattedMessage id="microworld.atom.sodium.fact4" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DNAStructureModule() {
  const [zoom, setZoom] = useState([1]);
  const [showBases, setShowBases] = useState(true);
  const intl = useIntl();

  const zoomAriaLabel = intl.formatMessage({
    id: "microworld.dna.zoomAriaLabel",
    defaultMessage: "Zmień powiększenie DNA",
  });
  const basesToggleAriaLabel = intl.formatMessage({
    id: "microworld.dna.basesToggleAriaLabel",
    defaultMessage: "Pokaż lub ukryj zasady azotowe",
  });

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dna className="w-5 h-5 text-primary" />
          <FormattedMessage id="microworld.dna.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="microworld.dna.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              <FormattedMessage
                id="microworld.dna.zoomLabel"
                values={{ zoom: zoom[0].toFixed(1) }}
              />
            </label>
            <Slider
              value={zoom}
              onValueChange={setZoom}
              max={5}
              min={0.5}
              step={0.1}
              className="mt-2"
              aria-label={zoomAriaLabel}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={showBases}
              onCheckedChange={setShowBases}
              aria-label={basesToggleAriaLabel}
            />
            <span className="text-sm">
              <FormattedMessage id="microworld.dna.basesToggle" />
            </span>
          </div>
        </div>

        <div
          className="relative h-64 bg-black rounded-lg overflow-hidden flex items-center justify-center"
          style={{ perspective: "800px" }}
        >
          <div
            style={{
              transform: `scale(${zoom[0]})`,
              transition: "transform 0.2s ease",
            }}
          >
            <div className="dna-helix">
              <div
                className="relative w-32 h-48"
                style={{ transformStyle: "preserve-3d" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full flex justify-between items-center"
                    style={{
                      top: `${i * 16}px`,
                      transform: `rotateY(${i * 30}deg)`,
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
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">
            <FormattedMessage id="microworld.dna.facts.title" />
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <FormattedMessage id="microworld.dna.facts.fact1" />
            </p>
            <p>
              <FormattedMessage id="microworld.dna.facts.fact2" />
            </p>
            <p>
              <FormattedMessage id="microworld.dna.facts.fact3" />
            </p>
            <p>
              <FormattedMessage id="microworld.dna.facts.fact4" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CellStructureModule() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(
    null
  );
  const intl = useIntl();

  const organelles = [
    { id: "nucleus", x: 50, y: 50, size: 20, color: "bg-purple-500" },
    { id: "mitochondria", x: 25, y: 25, size: 12, color: "bg-green-500" },
    { id: "ribosome", x: 75, y: 30, size: 6, color: "bg-blue-500" },
    { id: "er", x: 65, y: 65, size: 15, color: "bg-yellow-500" },
    { id: "golgi", x: 30, y: 70, size: 10, color: "bg-orange-500" },
  ];

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          <FormattedMessage id="microworld.cell.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="microworld.cell.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-full max-w-[300px] aspect-square mx-auto bg-gray-100 dark:bg-gray-800 rounded-full border-4 border-gray-300 dark:border-gray-600 overflow-hidden">
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-gray-400" />
          {organelles.map((organelle) => {
            const organelleName = intl.formatMessage({
              id: `microworld.cell.organelle.${organelle.id}`,
            });
            return (
              <div
                key={organelle.id}
                className={`absolute rounded-full cursor-pointer transition-all hover:scale-110 ${
                  organelle.color
                } ${
                  selectedOrganelle === organelle.id
                    ? "ring-4 ring-primary"
                    : ""
                }`}
                style={{
                  left: `${organelle.x}%`,
                  top: `${organelle.y}%`,
                  width: `${organelle.size * 2}px`,
                  height: `${organelle.size * 2}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedOrganelle(organelle.id)}
                role="button"
                tabIndex={0}
                aria-label={organelleName}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedOrganelle(organelle.id)
                }
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {organelles.map((organelle) => (
            <div
              key={organelle.id}
              className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                selectedOrganelle === organelle.id
                  ? "bg-primary/10 border-primary"
                  : "bg-muted border-border hover:bg-muted/80"
              }`}
              onClick={() => setSelectedOrganelle(organelle.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && setSelectedOrganelle(organelle.id)
              }
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${organelle.color}`} />
                <span className="font-medium">
                  <FormattedMessage
                    id={`microworld.cell.organelle.${organelle.id}`}
                  />
                </span>
              </div>
              {selectedOrganelle === organelle.id && (
                <p className="text-sm text-muted-foreground mt-1">
                  <FormattedMessage
                    id={`microworld.cell.organelleInfo.${organelle.id}`}
                  />
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
  const intl = useIntl();

  const bookmarkAriaLabel = intl.formatMessage({
    id: "microworld.bookmarkAriaLabel",
    defaultMessage: "Dodaj do zakładek",
  });

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "microworld.title" })}
        description={intl.formatMessage({ id: "microworld.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="microworld-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-12 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="ml-16 lg:ml-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  <FormattedMessage id="microworld.title" />
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  <FormattedMessage id="microworld.subtitle" />
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage id="microworld.readTime" />
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={bookmarkAriaLabel}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={heroImage}
                  alt="Ilustracje mikroskopijnego świata: atom, DNA i komórka"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyFact language={language} category="microworld" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                <FormattedMessage id="microworld.interactive.title" />
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                <FormattedMessage id="microworld.interactive.description" />
              </p>
            </div>

            <div className="grid gap-8">
              <AtomicStructureModule />
              <DNAStructureModule />
              <CellStructureModule />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-warm p-8 rounded-xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              <FormattedMessage id="microworld.summary.title" />
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="microworld.summary.atoms.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="microworld.summary.atoms.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.atoms.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.atoms.fact3" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.atoms.fact4" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="microworld.summary.molecules.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="microworld.summary.molecules.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.molecules.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.molecules.fact3" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.molecules.fact4" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="microworld.summary.cells.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="microworld.summary.cells.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.cells.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.cells.fact3" />
                  </li>
                  <li>
                    <FormattedMessage id="microworld.summary.cells.fact4" />
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
