import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';
import { triggerRomanticConfetti } from '../utils/confetti';

const navItems = [
  { label: 'Home', target: '#hero' },
  { label: 'Countdown', target: '#countdown' },
  { label: 'Message', target: '#letter' },
  { label: 'Memories', target: '#memories' },
  { label: 'Gallery', target: '#gallery' },
  { label: 'Reasons', target: '#reasons' },
  { label: 'Make a Wish', target: '#cake' },
  { label: 'Surprise', target: '#surprise' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'countdown', 'letter', 'memories', 'gallery', 'reasons', 'cake', 'surprise'];
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3.5 transition-all duration-300 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand / Name Badge (Left) */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-teal-300/80 dark:border-teal-500/40 hover:border-pink-400 shadow-md transition-all group cursor-pointer bg-white/95 dark:bg-[#130d20]/95"
          >
            <div className="relative flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
              <Sparkles className="w-2.5 h-2.5 text-teal-600 dark:text-teal-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#1e132c] dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
              {birthdayData.recipientName}
            </span>
          </motion.a>

          {/* Desktop Centered Navigation Pill */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center gap-1 p-1.5 rounded-full glass-pill border border-teal-300/70 dark:border-white/15 shadow-xl bg-white/95 dark:bg-[#130d20]/95"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.target.replace('#', '');
              return (
                <button
                  key={item.target}
                  onClick={() => scrollTo(item.target)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
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

          {/* Right Action Controls: Light/Dark Theme Switcher + Surprise Burst */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2.5 rounded-full glass-pill text-[#1e132c] dark:text-amber-300 border border-teal-300/80 dark:border-teal-500/40 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95"
              aria-label={isDark ? "Switch to romantic light mode" : "Switch to starlight dark mode"}
              title={isDark ? "Switch to romantic light mode" : "Switch to starlight dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#1e132c] hover:text-teal-600" />
              )}
            </motion.button>

            {/* Quick Confetti Burst Button */}
            <motion.button
              onClick={() => triggerRomanticConfetti()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-pill text-xs font-bold text-rose-600 dark:text-teal-300 border border-teal-300/70 dark:border-teal-500/40 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-md bg-white/95 dark:bg-[#130d20]/95"
              title="Celebrate with hearts & confetti!"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Surprise ✨</span>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full glass-pill text-[#1e132c] dark:text-white border border-teal-300/70 dark:border-white/20 lg:hidden shadow-md hover:bg-white transition-all cursor-pointer bg-white/95 dark:bg-[#130d20]/95"
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
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-3xl glass-card border border-teal-300/80 dark:border-white/15 shadow-2xl lg:hidden max-w-sm mx-auto bg-white/98 dark:bg-[#130d20]/98"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
