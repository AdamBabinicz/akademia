import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { FormattedMessage, useIntl } from 'react-intl';
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
  Ruler,
  Home,
  HelpCircle,
  Scale
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
  const navRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

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
    sun: Sun,
    home: Home,
    helpcircle: HelpCircle,
    scale: Scale,
  };

  const navigationItems = [
    { href: "/", label: "Strona główna", icon: "home" },
    { href: "/mechanics", label: "Mechanika", icon: "zap" },
    { href: "/thermodynamics", label: "Termodynamika", icon: "sun" },
    { href: "/electromagnetism", label: "Elektromagnetyzm", icon: "globe" },
    { href: "/optics", label: "Optyka", icon: "eye" },
    { href: "/modern-physics", label: "Fizyka współczesna", icon: "microscope" },
    { href: "/earth-space", label: "Ziemia i kosmos", icon: "maximize" }, // Corrected link for "Ziemia i kosmos"
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
            onClick={closeNav} // Changed to closeNav to close the menu
            aria-hidden="true"
            data-testid="nav-overlay"
          />
        )}
      </AnimatePresence>

      {/* Vertical Navigation */}
      <motion.nav
        ref={navRef}
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
        <div className="h-full overflow-y-auto">
          <div className="p-6 pb-8">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Atom className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">{intl.formatMessage({ id: 'app.title' })}</h1>
              <p className="text-xs text-sidebar-muted-foreground">{intl.formatMessage({ id: 'app.subtitle' })}</p>
            </div>
          </div>

          {/* Current Section Indicator */}
          {location !== '/' && (
            <div className="mb-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs font-medium text-primary uppercase tracking-wide">
                {intl.formatMessage({ id: 'nav.currentSection' })}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {navigationItems.find(item => item.href === location)?.label || <FormattedMessage id="nav.homepage" defaultMessage="Strona główna" />}
              </p>
            </div>
          )}

          {/* Main Sections */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {intl.formatMessage({ id: 'nav.mainSections' })}
            </h3>
            <nav className="space-y-1">
              <Link href="/">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Home className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.home' })}
                </a>
              </Link>

              <Link href="/mechanics">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/mechanics' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <span className="w-4 h-4 text-center">⚙️</span>
                  {intl.formatMessage({ id: 'nav.mechanics' })}
                </a>
              </Link>

              <Link href="/thermodynamics">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/thermodynamics' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <span className="w-4 h-4 text-center">🌡️</span>
                  {intl.formatMessage({ id: 'nav.thermodynamics' })}
                </a>
              </Link>

              <Link href="/electromagnetism">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/electromagnetism' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Zap className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.electromagnetism' })}
                </a>
              </Link>

              <Link href="/optics">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/optics' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <span className="w-4 h-4 text-center">👁️</span>
                  {intl.formatMessage({ id: 'nav.optics' })}
                </a>
              </Link>

              <Link href="/modern-physics">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/modern-physics' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Atom className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.modernPhysics' })}
                </a>
              </Link>

              <Link href="/earth-space">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.startsWith('/earth') 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Globe className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.earthSpace' })}
                </a>
              </Link>
            </nav>
          </div>

          {/* Additional Tools */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {intl.formatMessage({ id: 'nav.additionalTools' })}
            </h3>
            <nav className="space-y-1">
              <Link href="/quiz">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/quiz' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.quiz' })}
                </a>
              </Link>

              <Link href="/facts">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/facts' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Lightbulb className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.facts' })}
                </a>
              </Link>

              <Link href="/scale">
                <a className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === '/scale' 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}>
                  <Scale className="w-4 h-4" />
                  {intl.formatMessage({ id: 'nav.scale' })}
                </a>
              </Link>
            </nav>
          </div>

          {/* Language and Theme Controls */}
          <div className="mt-6 pt-4 border-t border-border space-y-4">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {intl.formatMessage({ id: 'nav.language' })}
              </label>
              <select 
                value={currentLanguage} 
                onChange={(e) => {
                  onLanguageChange(e.target.value as Language);
                  setIsOpen(false);
                }}
                className="w-full p-3 bg-background border-2 border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                style={{ minHeight: '40px' }}
              >
                <option value="pl">🇵🇱 Polski</option>
                <option value="en">🇬🇧 English</option>
                <option value="hu">🇭🇺 Magyar</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {intl.formatMessage({ id: 'nav.theme' })}
              </label>
              <div className="flex items-center justify-between p-3 bg-background border-2 border-border rounded-lg min-h-[40px]">
                <span className="text-sm font-medium text-foreground">
                  {theme === 'dark' ? 
                    `🌙 ${intl.formatMessage({ id: 'theme.dark' })}` : 
                    `☀️ ${intl.formatMessage({ id: 'theme.light' })}`
                  }
                </span>
                <Button
                  onClick={() => {
                    onThemeToggle();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 border-2 hover:bg-primary hover:text-primary-foreground"
                  aria-label={`Przełącz na ${theme === 'dark' ? 'jasny' : 'ciemny'} motyw`}
                >
                  {theme === 'dark' ? 
                    <Sun className="h-4 w-4" /> : 
                    <Moon className="h-4 w-4" />
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </motion.nav>
    </>
  );
}