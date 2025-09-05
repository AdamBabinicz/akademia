import React, { useState, useEffect, useRef } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import {
  Eye,
  Volume2,
  Hand,
  Palette,
  Clock,
  Bookmark,
  Play,
  Pause,
} from "lucide-react";
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
import heroImage from "@assets/generated_images/18.avif";

interface PerceptionProps {
  language: Language;
}

interface ModuleProps {
  intl: ReturnType<typeof useIntl>;
}

function ColorVisionModule({ intl }: ModuleProps) {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [showDaltonism, setShowDaltonism] = useState(false);

  const daltonismToggleAriaLabel = intl.formatMessage({
    id: "perception.color.daltonismToggleAriaLabel",
    defaultMessage: "Włącz symulację daltonizmu",
  });

  const colors = [
    {
      name: intl.formatMessage({ id: "perception.color.name.red" }),
      hex: "#ff0000",
    },
    {
      name: intl.formatMessage({ id: "perception.color.name.green" }),
      hex: "#00ff00",
    },
    {
      name: intl.formatMessage({ id: "perception.color.name.blue" }),
      hex: "#0000ff",
    },
    {
      name: intl.formatMessage({ id: "perception.color.name.yellow" }),
      hex: "#ffff00",
    },
    {
      name: intl.formatMessage({ id: "perception.color.name.purple" }),
      hex: "#ff00ff",
    },
    {
      name: intl.formatMessage({ id: "perception.color.name.cyan" }),
      hex: "#00ffff",
    },
  ];

  const getTextColorForBackground = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "text-black" : "text-white";
  };

  const getDaltonismFilter = (color: string) => {
    if (!showDaltonism) return color;
    if (color === "#ff0000") return "#999999";
    if (color === "#00ff00") return "#ffff00";
    return color;
  };

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <FormattedMessage id="perception.color.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="perception.color.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Switch
            checked={showDaltonism}
            onCheckedChange={setShowDaltonism}
            aria-label={daltonismToggleAriaLabel}
          />
          <span className="text-sm">
            <FormattedMessage id="perception.color.daltonismLabel" />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {colors.map((color) => {
            const displayedColor = getDaltonismFilter(color.hex);
            const textColorClass = getTextColorForBackground(displayedColor);
            return (
              <div
                key={color.hex}
                role="button"
                tabIndex={0}
                aria-label={color.name}
                className="aspect-square rounded-lg border-2 border-border cursor-pointer transition-all hover:scale-105"
                style={{ backgroundColor: displayedColor }}
                onClick={() => setSelectedColor(color.hex)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedColor(color.hex)
                }
              >
                <div
                  className={`w-full h-full flex items-center justify-center font-semibold text-xs ${textColorClass}`}
                >
                  {color.name}
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">
            <FormattedMessage
              id="perception.color.selected"
              values={{ selectedColor }}
            />
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <FormattedMessage id="perception.color.fact1" />
            </p>
            <p>
              <FormattedMessage id="perception.color.fact2" />
            </p>
            <p>
              <FormattedMessage id="perception.color.fact3" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SoundModule({ intl }: ModuleProps) {
  const [frequency, setFrequency] = useState([440]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const frequencyAriaLabel = intl.formatMessage({
    id: "perception.sound.frequencyAriaLabel",
    defaultMessage: "Zmień częstotliwość dźwięku",
  });
  const volumeAriaLabel = intl.formatMessage({
    id: "perception.sound.volumeAriaLabel",
    defaultMessage: "Zmień głośność dźwięku",
  });
  const playPauseAriaLabel = isPlaying
    ? intl.formatMessage({
        id: "perception.sound.pauseAriaLabel",
        defaultMessage: "Zatrzymaj dźwięk",
      })
    : intl.formatMessage({
        id: "perception.sound.playAriaLabel",
        defaultMessage: "Odtwórz dźwięk",
      });

  useEffect(() => {
    if (isPlaying) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainRef.current = audioContextRef.current.createGain();
      oscillatorRef.current.type = "sine";
      oscillatorRef.current.frequency.setValueAtTime(
        frequency[0],
        audioContextRef.current.currentTime
      );
      gainRef.current.gain.setValueAtTime(
        volume[0] / 100,
        audioContextRef.current.currentTime
      );
      oscillatorRef.current.connect(gainRef.current);
      gainRef.current.connect(audioContextRef.current.destination);
      oscillatorRef.current.start();
    }
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        frequency[0],
        audioContextRef.current.currentTime
      );
    }
  }, [frequency, isPlaying]);

  useEffect(() => {
    if (isPlaying && gainRef.current && audioContextRef.current) {
      gainRef.current.gain.setValueAtTime(
        volume[0] / 100,
        audioContextRef.current.currentTime
      );
    }
  }, [volume, isPlaying]);

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-primary" />
          <FormattedMessage id="perception.sound.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="perception.sound.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              <FormattedMessage
                id="perception.sound.frequency"
                values={{ frequency: frequency[0] }}
              />
            </label>
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              max={2000}
              min={100}
              step={10}
              className="mt-2"
              aria-label={frequencyAriaLabel}
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              <FormattedMessage
                id="perception.sound.volume"
                values={{ volume: volume[0] }}
              />
            </label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              min={0}
              step={5}
              className="mt-2"
              aria-label={volumeAriaLabel}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="btn-primary"
            aria-label={playPauseAriaLabel}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                <FormattedMessage id="common.pause" />
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                <FormattedMessage id="common.play" />
              </>
            )}
          </Button>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <FormattedMessage id="perception.sound.fact1" />
            </p>
            <p>
              <FormattedMessage id="perception.sound.fact2" />
            </p>
            <p>
              <FormattedMessage id="perception.sound.fact3" />
            </p>
            <p>
              <FormattedMessage id="perception.sound.fact4" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TouchModule({ intl }: ModuleProps) {
  const [sensitivity, setSensitivity] = useState([50]);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const sensitivityAriaLabel = intl.formatMessage({
    id: "perception.touch.sensitivityAriaLabel",
    defaultMessage: "Zmień próg czułości dotyku",
  });

  const bodyZones = [
    {
      id: "fingertip",
      name: intl.formatMessage({ id: "perception.touch.zone.fingertip" }),
      sensitivity: 95,
    },
    {
      id: "palm",
      name: intl.formatMessage({ id: "perception.touch.zone.palm" }),
      sensitivity: 70,
    },
    {
      id: "arm",
      name: intl.formatMessage({ id: "perception.touch.zone.arm" }),
      sensitivity: 40,
    },
    {
      id: "back",
      name: intl.formatMessage({ id: "perception.touch.zone.back" }),
      sensitivity: 25,
    },
    {
      id: "leg",
      name: intl.formatMessage({ id: "perception.touch.zone.leg" }),
      sensitivity: 30,
    },
  ];

  return (
    <Card className="card-interactive">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-primary" />
          <FormattedMessage id="perception.touch.title" />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id="perception.touch.description" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium">
            <FormattedMessage
              id="perception.touch.threshold"
              values={{ sensitivity: sensitivity[0] }}
            />
          </label>
          <Slider
            value={sensitivity}
            onValueChange={setSensitivity}
            max={100}
            min={0}
            step={5}
            className="mt-2"
            aria-label={sensitivityAriaLabel}
          />
        </div>
        <div className="grid gap-3">
          {bodyZones.map((zone) => (
            <div
              key={zone.id}
              role="button"
              tabIndex={0}
              aria-label={zone.name}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                zone.sensitivity >= sensitivity[0]
                  ? "bg-primary/10 border-primary"
                  : "bg-muted border-border"
              } ${activeZone === zone.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveZone(zone.id)}
              onKeyDown={(e) => e.key === "Enter" && setActiveZone(zone.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{zone.name}</span>
                <span className="text-sm text-muted-foreground">
                  <FormattedMessage
                    id="perception.touch.sensitivityLabel"
                    values={{ sensitivity: zone.sensitivity }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <FormattedMessage id="perception.touch.fact1" />
            </p>
            <p>
              <FormattedMessage id="perception.touch.fact2" />
            </p>
            <p>
              <FormattedMessage id="perception.touch.fact3" />
            </p>
            <p>
              <FormattedMessage id="perception.touch.fact4" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Perception({ language }: PerceptionProps) {
  const intl = useIntl();

  const bookmarkAriaLabel = intl.formatMessage({
    id: "perception.bookmarkAriaLabel",
    defaultMessage: "Dodaj do zakładek",
  });

  return (
    <>
      <SEO
        title={intl.formatMessage({ id: "perception.header.title" })}
        description={intl.formatMessage({ id: "perception.header.subtitle" })}
        schema={{ type: "article" }}
      />
      <div
        className="min-h-screen transition-all duration-300 ease-in-out"
        data-testid="perception-page"
      >
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border-b border-border py-6 px-6 lg:px-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="ml-16 lg:ml-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                  <FormattedMessage id="perception.header.title" />
                </h2>
                <p className="text-muted-foreground mt-2">
                  <FormattedMessage id="perception.header.subtitle" />
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      <FormattedMessage id="perception.header.readTime" />
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
                  alt={intl.formatMessage({
                    id: "perception.header.imageAlt",
                  })}
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
            <DailyFact language={language} category="perception" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                <FormattedMessage id="perception.modules.title" />
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                <FormattedMessage id="perception.modules.subtitle" />
              </p>
            </div>
            <div className="grid gap-8">
              <ColorVisionModule intl={intl} />
              <SoundModule intl={intl} />
              <TouchModule intl={intl} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-warm p-8 rounded-xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              <FormattedMessage id="perception.summary.title" />
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="perception.summary.sight.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="perception.summary.sight.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.sight.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.sight.fact3" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="perception.summary.hearing.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="perception.summary.hearing.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.hearing.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.hearing.fact3" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="perception.summary.touch.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="perception.summary.touch.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.touch.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.touch.fact3" />
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">
                  <FormattedMessage id="perception.summary.tasteSmell.title" />
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    <FormattedMessage id="perception.summary.tasteSmell.fact1" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.tasteSmell.fact2" />
                  </li>
                  <li>
                    <FormattedMessage id="perception.summary.tasteSmell.fact3" />
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
