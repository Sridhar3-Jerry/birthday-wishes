import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';
import { triggerRomanticConfetti } from '../utils/confetti';

const navItems = [
  { label: 'Home', target: '#hero' },
  { label: 'Open Heart', target: '#open-heart' },
  { label: 'Love Meter', target: '#love-slider' },
  { label: 'Secrets', target: '#mystery-doors' },
  { label: 'Universe', target: '#our-universe' },
  { label: 'Memories', target: '#memories' },
  { label: 'Polaroids', target: '#polaroids' },
  { label: 'Wish 🎂', target: '#cake' },
  { label: 'Playlist', target: '#playlist' },
  { label: 'Surprise', target: '#surprise' },
];

export default function Navbar({ onLogoClick, onReplayIntro, onReturnToFriend }) {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'open-heart', 'love-slider', 'mystery-doors', 'our-universe', 'memories', 'polaroids', 'cake', 'playlist', 'surprise'];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (target) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onLogoClick) onLogoClick();
    scrollTo('#hero');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
          
          {/* Brand / Name Badge with Easter Egg click handler - Single Line, Never Wraps */}
          <motion.a
            href="#hero"
            onClick={handleBrandClick}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3.5 sm:px-4 h-10 rounded-full glass-pill border border-teal-300/80 dark:border-teal-500/40 hover:border-pink-400 shadow-md transition-all group cursor-pointer bg-white/95 dark:bg-[#130d20]/95 shrink-0 whitespace-nowrap"
            title="Click to go top (or tap 5x for a secret ❤️)"
          >
            <div className="relative flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
              <Sparkles className="w-2.5 h-2.5 text-teal-600 dark:text-teal-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#1e132c] dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors whitespace-nowrap">
              {birthdayData.recipientName}
            </span>
          </motion.a>

          {/* Desktop Centered Navigation Pill */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden xl:flex items-center gap-0.5 px-2 h-10 rounded-full glass-pill border border-teal-300/70 dark:border-white/15 shadow-xl bg-white/95 dark:bg-[#130d20]/95 shrink-0"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.target.replace('#', '');
              return (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className={`relative px-2.5 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-teal-950 dark:text-teal-200 font-extrabold'
                      : 'text-[#1e132c] dark:text-slate-200 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100 via-pink-100 to-purple-100 dark:from-teal-950/90 dark:via-purple-900/90 dark:to-pink-950/90 border border-teal-400/80 dark:border-teal-400/50 shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </motion.nav>

          {/* Right Action Controls: Light/Dark Theme Switcher + Replay Intro + Surprise Burst + Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 h-10 shrink-0">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#1e132c] dark:text-amber-300 border border-teal-300/80 dark:border-teal-500/40 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95 shrink-0"
              aria-label={isDark ? "Switch to romantic light mode" : "Switch to starlight dark mode"}
              title={isDark ? "Switch to romantic light mode" : "Switch to starlight dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#1e132c] hover:text-teal-600" />
              )}
            </motion.button>

            {/* Replay Love Intro Button */}
            {onReplayIntro && (
              <motion.button
                onClick={onReplayIntro}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="h-10 px-3 rounded-full glass-pill flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-300 border border-rose-300/80 dark:border-rose-500/40 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95 shrink-0 whitespace-nowrap"
                title="Replay Romantic Intro ❤️"
                aria-label="Replay Romantic Intro"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="hidden sm:inline">Intro</span>
              </motion.button>
            )}

            {/* Disguise / Return to Friend Page Button */}
            {onReturnToFriend && (
              <motion.button
                onClick={onReturnToFriend}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="h-10 px-3 rounded-full glass-pill flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95 shrink-0 whitespace-nowrap"
                title="Disguise: Return to Friend Page 🎭"
                aria-label="Return to Friend Page"
              >
                <span>🎭</span>
                <span className="hidden md:inline">Friend View</span>
              </motion.button>
            )}

            {/* Quick Confetti Burst Button */}
            <motion.button
              onClick={() => triggerRomanticConfetti()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="h-10 px-3.5 rounded-full glass-pill hidden sm:flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 border border-teal-300/70 dark:border-teal-500/40 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95 shrink-0 whitespace-nowrap"
              title="Celebrate with hearts & confetti!"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Surprise ✨</span>
            </motion.button>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-[#1e132c] dark:text-white border border-teal-300/70 dark:border-white/20 xl:hidden shadow-md hover:bg-white transition-all cursor-pointer bg-white/95 dark:bg-[#130d20]/95 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-3xl glass-card border border-teal-300/80 dark:border-white/15 shadow-2xl xl:hidden max-w-sm mx-auto bg-white/98 dark:bg-[#130d20]/98 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.target.replace('#', '');
                return (
                  <button
                    key={item.target}
                    onClick={() => scrollTo(item.target)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-100 via-pink-100 to-purple-100 dark:from-teal-950 dark:to-purple-950 text-teal-950 dark:text-teal-200 shadow-sm border border-teal-400/70 dark:border-teal-500/40'
                        : 'text-[#1e132c] dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-purple-900/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
                  </button>
                );
              })}

              {/* Mobile Replay Love Intro Button */}
              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="mt-2 flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold text-rose-600 dark:text-rose-300 bg-rose-50/90 dark:bg-rose-950/40 border border-rose-300/80 dark:border-rose-500/40 transition-all cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                    Replay Love Intro ❤️
                  </span>
                  <Sparkles className="w-4 h-4 text-teal-500" />
                </button>
              )}

              {/* Mobile Disguise: Return to Friend Page */}
              {onReturnToFriend && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReturnToFriend();
                  }}
                  className="mt-2 flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 transition-all cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>🎭</span>
                    Disguise: Return to Friend Page
                  </span>
                  <span className="text-xs text-slate-400">Exit</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
