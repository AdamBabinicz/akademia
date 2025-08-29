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
  Moon,
  BookOpen,
  Ruler
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
    eye: Eye,
    atom: Atom,
    bookopen: BookOpen,
    lightbulb: Lightbulb,
    ruler: Ruler,
    bookmark: Bookmark,
    maximize: Maximize,
  };

  const navigationItems = [
    { href: "/", label: "Strona główna", icon: "atom" },
    { href: "/mechanics", label: "Mechanika", icon: "zap" },
    { href: "/thermodynamics", label: "Termodynamika", icon: "sun" },
    { href: "/electromagnetism", label: "Elektromagnetyzm", icon: "globe" },
    { href: "/optics", label: "Optyka", icon: "eye" },
    { href: "/modern-physics", label: "Fizyka współczesna", icon: "microscope" },
    { href: "/earth-and-space", label: "Ziemia i kosmos", icon: "maximize" }, // Added "Ziemia i kosmos"
  ];

  return (
    <>
      {/* Navigation Toggle Button */}
      <Button
        onClick={toggleNav}
        className="fixed top-4 left-4 z-[60] p-3 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label={isOpen ? 'Zamknij menu nawigacyjne' : 'Otwórz menu nawigacyjne'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
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
            aria-hidden="true"
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
        id="main-navigation"
        role="navigation"
        aria-label="Menu główne"
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

          {/* Current Section Indicator */}
          <div className="mb-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs font-medium text-primary uppercase tracking-wide">
              Aktualna sekcja
            </p>
            <p className="text-sm font-semibold text-foreground">
              {navigationItems.find(item => item.href === location)?.label || 'Strona główna'}
            </p>
          </div>

          {/* Main Navigation */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Główne sekcje
            </h3>
            {navigationItems.map((item) => {
              const IconComponent = iconMap[item.icon];
              const isActive = location === item.href;

              return (
                <Link key={item.href} href={item.href} onClick={closeNav}>
                  <motion.div
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-md border border-primary/30' 
                        : 'hover:bg-muted text-foreground hover:shadow-sm border border-transparent hover:border-border'
                    }`}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full ml-auto" />
                      )}
                    </div>
                    {isActive && (
                      <motion.div
                        className="w-1 h-6 bg-primary-foreground rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Additional Tools */}
          <div className="mt-8 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Dodatkowe narzędzia
            </h3>

            <Link href="/quiz" onClick={closeNav}>
              <motion.div
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  location === '/quiz'
                    ? 'bg-secondary text-secondary-foreground shadow-md border border-secondary/30' 
                    : 'hover:bg-muted text-foreground hover:shadow-sm border border-transparent hover:border-border'
                }`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="w-5 h-5 text-secondary" />
                <span className="font-medium">Quiz interaktywny</span>
              </motion.div>
            </Link>

            <Link href="/facts" onClick={closeNav}>
              <motion.div
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  location === '/facts'
                    ? 'bg-secondary text-secondary-foreground shadow-md border border-secondary/30' 
                    : 'hover:bg-muted text-foreground hover:shadow-sm border border-transparent hover:border-border'
                }`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Lightbulb className="w-5 h-5 text-secondary" />
                <span className="font-medium">Ciekawe fakty</span>
              </motion.div>
            </Link>

            <Link href="/scale" onClick={closeNav}>
              <motion.div
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  location === '/scale'
                    ? 'bg-secondary text-secondary-foreground shadow-md border border-secondary/30' 
                    : 'hover:bg-muted text-foreground hover:shadow-sm border border-transparent hover:border-border'
                }`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Ruler className="w-5 h-5 text-secondary" />
                <span className="font-medium">Skale wszechświata</span>
              </motion.div>
            </Link>
          </div>

          {/* Language and Theme Controls */}
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            {/* Language Selector */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Język / Language
              </label>
              <select 
                value={currentLanguage} 
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="w-full p-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {theme === 'dark' ? 'Tryb ciemny' : 'Tryb jasny'}
              </span>
              <Button
                onClick={onThemeToggle}
                variant="outline"
                size="sm"
                className="p-2"
                aria-label={`Przełącz na ${theme === 'dark' ? 'jasny' : 'ciemny'} motyw`}
              >
                {theme === 'dark' ? 
                  <Sun className="w-4 h-4" /> : 
                  <Moon className="w-4 h-4" />
                }
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}