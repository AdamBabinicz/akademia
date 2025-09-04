import { Switch, Route } from "wouter";
import { IntlProvider } from "react-intl";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppContextProvider } from "@/contexts/AppContext";
import { Navigation } from "@/components/Navigation";
import { useTheme } from "@/hooks/useTheme";
import { messages, MessagesType } from "@/lib/i18n";
import { Language } from "@/types/education";
import { useState, ComponentType } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

import Home from "@/pages/Home";
import ElectricityMagnetism from "@/pages/ElectricityMagnetism";
import EarthSpace from "@/pages/EarthSpace";
import Microworld from "@/pages/Microworld";
import Perception from "@/pages/Perception";
import Quiz from "@/pages/Quiz";
import Facts from "@/pages/Facts";
import Scale from "@/pages/Scale";
import Mechanics from "@/pages/Mechanics";
import Thermodynamics from "@/pages/Thermodynamics";
import Optics from "@/pages/Optics";
import ModernPhysics from "@/pages/ModernPhysics";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";
import Boiling from "@/pages/Boiling";
import Taste from "@/pages/Taste";

const routeConfig: {
  key: keyof MessagesType;
  component: ComponentType<{ language: Language }>;
}[] = [
  { key: "routes.modernPhysics", component: ModernPhysics },
  { key: "routes.optics", component: Optics },
  { key: "routes.thermodynamics", component: Thermodynamics },
  { key: "routes.mechanics", component: Mechanics },
  { key: "routes.earthSpace", component: EarthSpace },
  { key: "routes.microworld", component: Microworld },
  { key: "routes.perception", component: Perception },
  { key: "routes.boiling", component: Boiling },
  { key: "routes.taste", component: Taste },
  { key: "routes.quiz", component: Quiz },
  { key: "routes.facts", component: Facts },
  { key: "routes.scale", component: Scale },
  { key: "routes.terms", component: Terms },
  { key: "routes.privacy", component: Privacy },
];

function Router({
  currentLanguage,
  setCurrentLanguage,
  theme,
  toggleTheme,
}: {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        <main>
          <Switch>
            <Route
              path="/"
              component={() => <Home language={currentLanguage} />}
            />
            {Object.keys(messages).map((lang) => (
              <Route
                key={`electricity-${lang}`}
                path={`${
                  messages[lang as Language]["routes.electricityMagnetism"]
                }/:rest*?`}
                component={() => (
                  <ElectricityMagnetism language={currentLanguage} />
                )}
              />
            ))}
            {routeConfig.flatMap(({ key, component: PageComponent }) =>
              Object.keys(messages).map((lang) => (
                <Route
                  key={`${key}-${lang}`}
                  path={messages[lang as Language][key]}
                  component={() => <PageComponent language={currentLanguage} />}
                />
              ))
            )}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </>
  );
}

const getInitialLanguage = (): Language => {
  const supportedLocales: Language[] = ["pl", "en", "hu"];
  const storedLanguage = localStorage.getItem("language") as Language;
  if (storedLanguage && supportedLocales.includes(storedLanguage)) {
    return storedLanguage;
  }
  const browserLanguage = navigator.language.split("-")[0] as Language;
  if (supportedLocales.includes(browserLanguage)) {
    return browserLanguage;
  }
  return "pl";
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(getInitialLanguage);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContextProvider>
          <IntlProvider
            locale={currentLanguage}
            messages={messages[currentLanguage]}
            defaultLocale="pl"
          >
            <Router
              key={currentLanguage}
              currentLanguage={currentLanguage}
              setCurrentLanguage={handleLanguageChange}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </IntlProvider>
          <Toaster />
          <ScrollToTopButton />
        </AppContextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
