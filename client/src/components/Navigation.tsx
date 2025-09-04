import React, { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { FormattedMessage, useIntl } from "react-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Atom,
  Zap,
  Globe,
  Eye,
  Lightbulb,
  Sun,
  Moon,
  Home,
  HelpCircle,
  Scale,
  Thermometer,
  Wrench,
  FileText,
  Shield,
  Github,
  Facebook,
  ChevronsUpDown,
  Microscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/types/education";
// KROK 1: Zaimportuj `messages` i typ, aby mieć dostęp do wszystkich ścieżek
import { messages, MessagesType } from "@/lib/i18n";

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 1200 1227"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6902H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z"
      fill="currentColor"
    ></path>
  </svg>
);

interface NavigationProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export function Navigation({
  currentLanguage,
  onLanguageChange,
  theme,
  onThemeToggle,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  // KROK 2: Pobierz funkcję `setLocation` z `wouter`
  const [location, setLocation] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const languageOptions = [
    { value: "pl", label: "🇵🇱 Polski" },
    { value: "en", label: "🇬🇧 English" },
    { value: "hu", label: "🇭🇺 Magyar" },
  ];

  const mainNavItems = [
    {
      href: intl.formatMessage({ id: "routes.mechanics" }),
      labelId: "nav.mechanics",
      icon: Wrench,
    },
    {
      href: intl.formatMessage({ id: "routes.thermodynamics" }),
      labelId: "nav.thermodynamics",
      icon: Thermometer,
    },
    {
      href: intl.formatMessage({ id: "routes.electricityMagnetism" }),
      labelId: "nav.electromagnetism",
      icon: Zap,
    },
    {
      href: intl.formatMessage({ id: "routes.optics" }),
      labelId: "nav.optics",
      icon: Eye,
    },
    {
      href: intl.formatMessage({ id: "routes.modernPhysics" }),
      labelId: "nav.modernPhysics",
      icon: Atom,
    },
    {
      href: intl.formatMessage({ id: "routes.earthSpace" }),
      labelId: "nav.earthSpace",
      icon: Globe,
    },
    {
      href: intl.formatMessage({ id: "routes.microworld" }),
      labelId: "nav.microworld",
      icon: Microscope,
    },
    {
      href: intl.formatMessage({ id: "routes.perception" }),
      labelId: "nav.perception",
      icon: Eye,
    },
  ];

  const toolsNavItems = [
    {
      href: intl.formatMessage({ id: "routes.quiz" }),
      labelId: "nav.quiz",
      icon: HelpCircle,
    },
    {
      href: intl.formatMessage({ id: "routes.facts" }),
      labelId: "nav.facts",
      icon: Lightbulb,
    },
    {
      href: intl.formatMessage({ id: "routes.scale" }),
      labelId: "nav.scale",
      icon: Scale,
    },
  ];

  const allNavItems = [...mainNavItems, ...toolsNavItems];

  // KROK 3: Stworzenie nowej, inteligentnej funkcji do zmiany języka
  const handleLanguageChange = (newLang: Language) => {
    let currentRouteKey: keyof MessagesType | null = null;
    let baseOldPath = "";
    let subPath = "";

    // Wyszukaj klucz trasy, który najlepiej pasuje do bieżącego URL
    // pętla znajduje najdłuższy pasujący fragment, np. /elektrycznosc-i-magnetyzm zamiast /
    for (const key in messages.en) {
      if (key.startsWith("routes.")) {
        const typedKey = key as keyof MessagesType;
        for (const langKey of Object.keys(messages)) {
          const path = messages[langKey as Language][typedKey];
          if (location.startsWith(path) && path.length > baseOldPath.length) {
            currentRouteKey = typedKey;
            baseOldPath = path;
          }
        }
      }
    }

    // Jeśli znaleziono pasującą trasę (np. jesteśmy na /mechanika)
    if (currentRouteKey) {
      // Zachowaj resztę ścieżki (np. /current-basics w /electricity-magnetism/current-basics)
      subPath = location.substring(baseOldPath.length);
      const newBasePath = messages[newLang][currentRouteKey];
      // Przekieruj na nową ścieżkę
      setLocation(newBasePath + subPath);
    } else {
      // Jeśli jesteśmy na stronie głównej lub nieznanej, po prostu idź do strony głównej w nowym języku
      setLocation(messages[newLang]["routes.home"]);
    }

    // Zaktualizuj stan języka w całej aplikacji
    onLanguageChange(newLang);
    closeNav();
  };

  return (
    <>
      <Button
        onClick={toggleNav}
        className="fixed top-4 left-4 z-[60] p-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label={
          isOpen
            ? intl.formatMessage({ id: "nav.closeMenu" })
            : intl.formatMessage({ id: "nav.openMenu" })
        }
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        data-testid="nav-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeNav}
            aria-hidden="true"
            data-testid="nav-overlay"
          />
        )}
      </AnimatePresence>

      <motion.nav
        ref={navRef}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={navVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-sm border-r border-border z-50 shadow-2xl flex flex-col"
        id="main-navigation"
        role="navigation"
        aria-label={intl.formatMessage({ id: "nav.mainMenu" })}
        data-testid="vertical-nav"
      >
        <div className="flex-grow overflow-y-auto hide-scrollbar">
          <div className="p-6 pb-8 pt-20">
            <div className="mb-8">
              <h2 className="text-lg font-bold text-foreground">
                {intl.formatMessage({ id: "app.title" })}
              </h2>
              <p className="text-xs text-muted-foreground">
                {intl.formatMessage({ id: "app.subtitle" })}
              </p>
            </div>

            {location !== "/" && (
              <div className="mb-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-xs font-medium text-primary uppercase tracking-wide">
                  {intl.formatMessage({ id: "nav.currentSection" })}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {allNavItems.find((item) => location.startsWith(item.href))
                    ?.labelId ? (
                    <FormattedMessage
                      id={
                        allNavItems.find((item) =>
                          location.startsWith(item.href)
                        )!.labelId
                      }
                    />
                  ) : (
                    <FormattedMessage
                      id="nav.homepage"
                      defaultMessage="Strona główna"
                    />
                  )}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {intl.formatMessage({ id: "nav.mainSections" })}
              </h3>
              <nav className="space-y-1">
                <Link
                  href={intl.formatMessage({ id: "routes.home" })}
                  onClick={closeNav}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location === "/"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:text-muted-foreground"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {intl.formatMessage({ id: "nav.home" })}
                </Link>

                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.startsWith(item.href) && item.href !== "/"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted hover:text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <FormattedMessage id={item.labelId} />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {intl.formatMessage({ id: "nav.additionalTools" })}
              </h3>
              <nav className="space-y-1">
                {toolsNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeNav}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.startsWith(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted hover:text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <FormattedMessage id={item.labelId} />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 pt-4 border-t border-border space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {intl.formatMessage({ id: "nav.language" })}
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between min-h-[40px] text-sm"
                    >
                      {languageOptions.find(
                        (lang) => lang.value === currentLanguage
                      )?.label || "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    {languageOptions.map((lang) => (
                      <DropdownMenuItem
                        key={lang.value}
                        // KROK 4: Użyj nowej funkcji
                        onSelect={() =>
                          handleLanguageChange(lang.value as Language)
                        }
                      >
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {intl.formatMessage({ id: "nav.theme" })}
                </label>
                <div className="flex items-center justify-between p-3 bg-background border-2 border-border rounded-lg min-h-[40px]">
                  <span className="text-sm font-medium text-foreground">
                    {theme === "dark"
                      ? `🌙 ${intl.formatMessage({ id: "theme.dark" })}`
                      : `☀️ ${intl.formatMessage({ id: "theme.light" })}`}
                  </span>
                  <Button
                    onClick={() => {
                      onThemeToggle();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 border-2 hover:bg-primary hover:text-primary-foreground"
                    aria-label={intl.formatMessage(
                      { id: "theme.toggle" },
                      {
                        theme:
                          theme === "dark"
                            ? intl.formatMessage({ id: "theme.light" })
                            : intl.formatMessage({ id: "theme.dark" }),
                      }
                    )}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-border p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Link
              href={intl.formatMessage({ id: "routes.terms" })}
              onClick={closeNav}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <FileText className="w-4 h-4" />
              <FormattedMessage id="nav.terms" />
            </Link>
            <Link
              href={intl.formatMessage({ id: "routes.privacy" })}
              onClick={closeNav}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Shield className="w-4 h-4" />
              <FormattedMessage id="nav.privacy" />
            </Link>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/AdamBabinicz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/AdamBabinicz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X (formerly Twitter)"
            >
              <XIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/adam.gierczak.334"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
