import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { FormattedMessage } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Atom, 
  Zap, 
  Globe, 
  Microscope, 
  Eye, 
  Brain, 
  Lightbulb, 
  Maximize,
  ChevronRight,
  Clock,
  Bookmark,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES, LANGUAGES } from '@/lib/constants';
import { Language } from '@/types/education';

interface NavigationProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Navigation({ currentLanguage, onLanguageChange, theme, onThemeToggle }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 }
  };

  const iconMap = {
    zap: Zap,
    globe: Globe,
    microscope: Microscope,
    eye: Eye
  };

  return (
    <>
      {/* Navigation Toggle Button */}
      <Button
        onClick={toggleNav}
        className="fixed top-4 left-4 z-[60] p-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label="Toggle navigation menu"
        data-testid="nav-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleNav}
            data-testid="nav-overlay"
          />
        )}
      </AnimatePresence>

      {/* Vertical Navigation */}
      <motion.nav
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={navVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-80 bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border z-50 shadow-2xl"
        data-testid="vertical-nav"
      >
        <div className="p-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Atom className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">Interaktywna Nauka</h1>
              <p className="text-sm text-muted-foreground">Physics Learning Hub</p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg">
            {Object.entries(LANGUAGES).map(([code, lang]) => (
              <Button
                key={code}
                variant={currentLanguage === code ? "default" : "ghost"}
                size="sm"
                onClick={() => onLanguageChange(code as Language)}
                className="flex-1 text-xs"
                data-testid={`lang-${code}`}
              >
                {lang.flag} {code.toUpperCase()}
              </Button>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="flex-1 text-xs"
              data-testid="theme-toggle"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  <FormattedMessage id="theme.light" defaultMessage="JASNY" />
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  <FormattedMessage id="theme.dark" defaultMessage="CIEMNY" />
                </>
              )}
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                <FormattedMessage id="nav.categories" defaultMessage="Kategorie" />
              </h3>
            </div>
            
            {/* Categories */}
            {CATEGORIES.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Atom;
              const isActive = location.includes(category.id);
              
              return (
                <div key={category.id} className="mb-4">
                  <Link href={`/${category.id}`}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-between p-3"
                      onClick={closeNav}
                      data-testid={`nav-category-${category.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{category.titlePl}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  
                  {/* Topics submenu */}
                  {isActive && category.topics.length > 0 && (
                    <div className="ml-8 mt-2 space-y-2">
                      {category.topics.map((topic) => (
                        <Link key={topic.id} href={`/${category.id}/${topic.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-sm text-muted-foreground hover:text-primary"
                            onClick={closeNav}
                            data-testid={`nav-topic-${topic.id}`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{topic.titlePl}</span>
                              <div className="flex items-center gap-1 text-xs">
                                <Clock className="w-3 h-3" />
                                <span>{topic.estimatedTime}min</span>
                              </div>
                            </div>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Separator className="my-4" />

            {/* Interactive Modules */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                <FormattedMessage id="nav.interactive" defaultMessage="Moduły interaktywne" />
              </h3>
              
              <Link href="/quiz">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 mb-2"
                  onClick={closeNav}
                  data-testid="nav-quiz"
                >
                  <Brain className="w-5 h-5 mr-3" />
                  <FormattedMessage id="nav.quiz" defaultMessage="Quiz adaptacyjny" />
                </Button>
              </Link>
              
              <Link href="/facts">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3 mb-2"
                  onClick={closeNav}
                  data-testid="nav-facts"
                >
                  <Lightbulb className="w-5 h-5 mr-3" />
                  <FormattedMessage id="nav.facts" defaultMessage="Ciekawostka dnia" />
                </Button>
              </Link>
              
              <Link href="/scale">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-3"
                  onClick={closeNav}
                  data-testid="nav-scale"
                >
                  <Maximize className="w-5 h-5 mr-3" />
                  <FormattedMessage id="nav.scale" defaultMessage="Zabawa skalą" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </motion.nav>
    </>
  );
}
