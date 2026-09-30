import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Cake, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
  const { isDark } = useTheme();

  const scrollToNext = () => {
    triggerRomanticConfetti();
    const nextEl = document.querySelector('#countdown');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCake = () => {
    const cakeEl = document.querySelector('#cake');
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden"
    >
      {/* Soft Glow Spotlight with Peacock Blue + Rose glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] rounded-full blur-[100px] pointer-events-none -z-10 transition-colors duration-700 ${
        isDark 
          ? 'bg-gradient-to-tr from-teal-600/15 via-purple-600/20 to-rose-600/15' 
          : 'bg-gradient-to-tr from-teal-300/30 via-pink-300/25 to-sky-300/30'
      }`} />

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 w-full">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/40 text-xs sm:text-sm font-bold text-teal-950 dark:text-teal-200 mb-6 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-spin-slow" />
          <span>{birthdayData.hero.badge}</span>
          <Stars className="w-4 h-4 text-pink-500" />
        </motion.div>

        {/* Grand Romantic Title with 100% Guaranteed Contrast */}
        <div className="mb-6 w-full overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1e132c] dark:text-white leading-tight drop-shadow-sm"
          >
            <span className="block mb-2 text-[#1e132c] dark:text-white font-serif">
              Happy Birthday,
            </span>
            
            {/* Cursive Name with Vibrant Peacock-Rose gradient */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 overflow-visible py-1">
              <span className="font-script font-normal text-6xl sm:text-7xl md:text-8xl text-gradient-peacock script-safe drop-shadow-sm">
                {birthdayData.recipientName}
              </span>
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="inline-flex items-center justify-center"
              >
                <Heart className="w-10 h-10 sm:w-16 sm:h-16 text-rose-500 fill-rose-500 drop-shadow-md" />
              </motion.div>
            </div>
          </motion.h1>
        </div>

        {/* Emotionally Touching Subtitle with Crisp Bold Contrast */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl text-[#334155] dark:text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed mb-10 font-medium px-4"
        >
          {birthdayData.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
        >
          {/* Primary CTA */}
          <motion.button
            id="start-story-btn"
            onClick={scrollToNext}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 30px -10px rgba(13, 148, 136, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-600 text-white font-bold text-base shadow-xl shadow-teal-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/40"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-heart-pulse" />
            <span>{birthdayData.hero.ctaText}</span>
          </motion.button>

          {/* Secondary CTA (Solid White in Light Mode with Dark Text) */}
          <motion.button
            onClick={scrollToCake}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-[#150f24] hover:bg-teal-50 dark:hover:bg-purple-900/60 text-[#1e132c] dark:text-white font-bold text-base border-2 border-teal-300 dark:border-teal-500/50 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Cake className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>{birthdayData.hero.secondaryCta}</span>
          </motion.button>
        </motion.div>

        {/* Romantic Polaroid Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-14 relative w-full max-w-sm sm:max-w-md px-4"
        >
          <div className="glass-card p-3.5 sm:p-4 rounded-3xl shadow-2xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300 border border-teal-300/80 dark:border-white/10 bg-white/95 dark:bg-[#150f24]">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
                alt="Romantic Celebration"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs sm:text-sm font-handwriting tracking-wide">
                  ✨ The most wonderful girl in the universe
                </span>
              </div>
            </div>
            <div className="pt-3 pb-1 text-center">
              <p className="font-handwriting text-rose-700 dark:text-teal-300 text-base sm:text-lg font-bold">
                "Every day with you is a gift I cherish."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Mouse-Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={scrollToNext}
        className="mt-12 flex flex-col items-center gap-1.5 cursor-pointer text-teal-800 dark:text-teal-400 hover:text-rose-500 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-teal-600/70 dark:border-teal-400/60 flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-2 rounded-full bg-rose-500" />
        </motion.div>
        <ChevronDown className="w-4 h-4 animate-bounce text-rose-500" />
      </motion.div>
    </section>
  );
}
