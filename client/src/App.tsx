import { Switch, Route } from "wouter";
import { IntlProvider } from 'react-intl';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppContextProvider } from "@/contexts/AppContext";
import { Navigation } from "@/components/Navigation";
import { useTheme } from "@/hooks/useTheme";
import { messages } from "@/lib/i18n";
import { Language } from "@/types/education";
import { useState } from "react";

// Pages
import Home from "@/pages/Home";
import ElectricityMagnetism from "@/pages/ElectricityMagnetism";
import EarthSpace from "@/pages/EarthSpace";
import Microworld from "@/pages/Microworld";
import Perception from "@/pages/Perception";
import Quiz from "@/pages/Quiz";
import Facts from "@/pages/Facts";
import Scale from "@/pages/Scale";
import NotFound from "@/pages/not-found";

function Router({ currentLanguage, setCurrentLanguage, theme, toggleTheme }: {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) {

  return (
    <IntlProvider
      locale={currentLanguage}
      messages={messages[currentLanguage]}
      defaultLocale="pl"
    >
      <div className="min-h-screen bg-background text-foreground">
        <Navigation
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <Switch>
          <Route path="/" component={() => <Home language={currentLanguage} />} />
          <Route path="/electricity-magnetism" component={(props) => <ElectricityMagnetism {...props} language={currentLanguage} />} />
          <Route path="/electricity-magnetism/current-basics" component={(props) => <ElectricityMagnetism {...props} language={currentLanguage} />} />
          <Route path="/earth-space" component={(props) => <EarthSpace {...props} language={currentLanguage} />} />
          <Route path="/microworld" component={() => <Microworld language={currentLanguage} />} />
          <Route path="/perception" component={() => <Perception language={currentLanguage} />} />
          <Route path="/quiz" component={() => <Quiz language={currentLanguage} />} />
          <Route path="/facts" component={() => <Facts language={currentLanguage} />} />
          <Route path="/scale" component={() => <Scale language={currentLanguage} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </IntlProvider>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pl');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContextProvider>
          <Router
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <Toaster />
        </AppContextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;