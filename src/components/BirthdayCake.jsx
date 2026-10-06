import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wind, RotateCcw, Cake as CakeIcon, PartyPopper, Clock } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function BirthdayCake() {
  const { isDark } = useTheme();
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, color: '#f43f5e' }, // Rose candle
    { id: 2, isLit: true, color: '#0d9488' }, // Peacock Teal candle
    { id: 3, isLit: true, color: '#a855f7' }, // Lavender candle
  ]);

  const [isBlowing, setIsBlowing] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const autoRelightTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const blowTimeoutsRef = useRef([]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const clearAllTimers = () => {
    if (autoRelightTimerRef.current) clearTimeout(autoRelightTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    blowTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
    blowTimeoutsRef.current = [];
  };

  const toggleCandle = (id) => {
    if (isBlowing) return;
    setCandles((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isLit: !c.isLit } : c));
      const allOut = updated.every((c) => !c.isLit);
      if (allOut && !wishMade) {
        celebrateAndStartTimer();
      }
      return updated;
    });
  };

  const celebrateAndStartTimer = () => {
    setWishMade(true);
    triggerHeartBurst();
    triggerRomanticConfetti();

    if (autoRelightTimerRef.current) clearTimeout(autoRelightTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setCountdown(30);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    // After 30 seconds, automatically relight candles
    autoRelightTimerRef.current = setTimeout(() => {
      relightCandles();
    }, 30000);
  };

  // Blowing wind breeze animation across the candles
  const blowAllCandles = () => {
    if (isBlowing || wishMade) return;
    setIsBlowing(true);
    blowTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
    blowTimeoutsRef.current = [];

    // Sequential candle extinguishing as the breeze flows across from left to right
    const t1 = setTimeout(() => {
      setCandles((prev) => prev.map((c, i) => (i === 0 ? { ...c, isLit: false } : c)));
    }, 550);

    const t2 = setTimeout(() => {
      setCandles((prev) => prev.map((c, i) => (i <= 1 ? { ...c, isLit: false } : c)));
    }, 850);

    const t3 = setTimeout(() => {
      setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
    }, 1150);

    const t4 = setTimeout(() => {
      setIsBlowing(false);
      celebrateAndStartTimer();
    }, 1300);

    blowTimeoutsRef.current.push(t1, t2, t3, t4);
  };

  const relightCandles = () => {
    clearAllTimers();
    setCountdown(null);
    setIsBlowing(false);
    setWishMade(false);
    setCandles([
      { id: 1, isLit: true, color: '#f43f5e' },
      { id: 2, isLit: true, color: '#0d9488' },
      { id: 3, isLit: true, color: '#a855f7' },
    ]);
  };

  const litCount = candles.filter((c) => c.isLit).length;

  return (
    <section id="cake" className="py-24 px-4 relative z-10 select-none">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <CakeIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.cakeSection.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.cakeSection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.cakeSection.subtitle}
        </motion.p>

        {/* Interactive Cake Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-teal-200/80 dark:border-white/10 shadow-2xl max-w-3xl mx-auto relative overflow-hidden bg-white/95 dark:bg-[#150f24]"
        >
          {/* Wish Granted Celebration Banner */}
          <AnimatePresence>
            {wishMade && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-teal-100 via-pink-100 to-purple-100 dark:from-teal-950/90 dark:via-purple-950/90 dark:to-pink-950/90 border border-teal-300 dark:border-teal-500/40 shadow-lg text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <PartyPopper className="w-5 h-5 text-rose-500 animate-bounce" />
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-700 dark:text-teal-300">
                    {birthdayData.cakeSection.wishGrantedMessage}
                  </h3>
                  <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
                </div>
                <p className="text-[#1e132c] dark:text-purple-100 text-sm sm:text-base font-medium">
                  {birthdayData.cakeSection.wishSubtitle}
                </p>

                {/* 30s Countdown timer indicator */}
                {countdown !== null && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 dark:bg-black/40 text-xs font-semibold text-teal-800 dark:text-teal-300 border border-teal-300/60 dark:border-teal-500/30">
                    <Clock className="w-3.5 h-3.5 text-teal-600 animate-spin-slow" />
                    <span>Candles will relight automatically in {countdown}s</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Birthday Cake Container */}
          <div className="relative flex items-center justify-center my-4 min-h-[300px]">
            
            {/* 3D Birthday Cake */}
            <div className="relative w-72 sm:w-84 h-72 flex flex-col items-center justify-end pb-4 z-10">
              
              {/* MAGICAL BLOWING AIR / WIND GUST ANIMATION (Shown across the candles when blowing) */}
              <AnimatePresence>
                {isBlowing && (
                  <motion.div
                    key="blowing-air-gust"
                    initial={{ opacity: 0, x: -120 }}
                    animate={{ opacity: 1, x: 20 }}
                    exit={{ opacity: 0, x: 140, filter: 'blur(8px)' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute top-2 left-[-20px] right-[-20px] h-28 pointer-events-none z-30 flex items-center justify-between"
                  >
                    {/* Flowing Wind Streams SVG */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 360 100">
                      <defs>
                        <linearGradient id="windStreamGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
                          <stop offset="30%" stopColor="#2dd4bf" stopOpacity="0.9" />
                          <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.95" />
                          <stop offset="90%" stopColor="#f43f5e" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="windStreamWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.9" />
                          <stop offset="80%" stopColor="#e0e7ff" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Top Gust Line */}
                      <motion.path
                        d="M -20,30 Q 80,10 180,35 T 380,25"
                        fill="none"
                        stroke="url(#windStreamGlow)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], opacity: [0.3, 1, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                      />

                      {/* Center Main Wind Stream */}
                      <motion.path
                        d="M -40,50 Q 70,25 180,55 T 400,40"
                        fill="none"
                        stroke="url(#windStreamWhite)"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], opacity: [0.5, 1, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut', delay: 0.1 }}
                      />

                      {/* Bottom Swirl Stream */}
                      <motion.path
                        d="M -10,70 Q 90,45 200,68 T 370,60"
                        fill="none"
                        stroke="url(#windStreamGlow)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], opacity: [0.2, 0.9, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      />
                    </svg>

                    {/* Flying Breeze Particles */}
                    <div className="flex items-center justify-between w-full px-2">
                      <motion.span
                        animate={{ x: [0, 180], y: [-5, 8, -5], opacity: [0, 1, 0], scale: [0.8, 1.3, 0.8] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-2xl"
                      >
                        💨
                      </motion.span>
                      <motion.span
                        animate={{ x: [-20, 160], y: [10, -10, 5], opacity: [0, 1, 0], scale: [0.7, 1.2, 0.5] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                        className="text-xl"
                      >
                        💨
                      </motion.span>
                      <motion.div
                        animate={{ x: [-40, 140], rotate: 360, opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
                      >
                        <Sparkles className="w-5 h-5 text-teal-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candles Row */}
              <div className="flex items-end justify-center gap-8 sm:gap-12 mb-[-8px] z-20">
                {candles.map((candle) => (
                  <div
                    key={candle.id}
                    onClick={() => toggleCandle(candle.id)}
                    className="flex flex-col items-center cursor-pointer group"
                    title={candle.isLit ? "Click to blow out this candle" : "Click to relight this candle"}
                  >
                    {/* Candle Flame / Smoke Area */}
                    <div className="h-12 flex items-end justify-center relative select-none w-10">
                      <AnimatePresence mode="wait">
                        {candle.isLit ? (
                          <motion.div
                            key={`lit-flame-${candle.id}`}
                            initial={{ scale: 0, opacity: 0, y: 8 }}
                            animate={
                              isBlowing
                                ? {
                                    scale: [1, 1.2, 0.5, 0],
                                    rotate: [0, 25, 50, 70],
                                    x: [0, 6, 14, 20],
                                    opacity: [1, 0.9, 0.4, 0],
                                  }
                                : {
                                    scale: 1,
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                    x: 0,
                                  }
                            }
                            exit={{ scale: 0, opacity: 0, y: -8 }}
                            transition={
                              isBlowing
                                ? { duration: 0.45, ease: 'easeOut' }
                                : { type: 'spring', stiffness: 350, damping: 20 }
                            }
                            className="relative flex items-center justify-center cursor-pointer"
                          >
                            {/* Flame Glow Radiance */}
                            <div className="absolute -inset-3 bg-amber-400/50 dark:bg-amber-300/60 rounded-full blur-md animate-pulse pointer-events-none" />
                            <div className="absolute -inset-1 bg-rose-500/35 rounded-full blur-sm pointer-events-none" />
                            
                            {/* Teardrop Flame Body with flicker animation */}
                            <div className="w-4 h-7 bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 rounded-full rounded-b-sm flame-animation shadow-[0_0_12px_rgba(251,191,36,0.95)]" />
                            
                            {/* Inner Flame Core */}
                            <div className="absolute bottom-1 w-1.5 h-3 bg-gradient-to-t from-blue-500 via-cyan-200 to-white rounded-full opacity-80 pointer-events-none" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key={`smoke-${candle.id}`}
                            initial={{ opacity: 0.85, y: 0, scale: 0.6, x: 0 }}
                            animate={{ opacity: 0, y: -26, scale: 1.5, x: 8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.1, ease: 'easeOut' }}
                            className="text-gray-400 dark:text-gray-300 font-bold text-xs pointer-events-none flex flex-col items-center"
                          >
                            <span>💨</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Candle Wick */}
                    <div className="w-0.5 h-2 bg-gray-700 dark:bg-gray-400" />

                    {/* Candle Body */}
                    <div
                      className="w-4 h-14 rounded-t-sm shadow-md transition-transform group-hover:scale-105"
                      style={{
                        background: `repeating-linear-gradient(45deg, ${candle.color}, ${candle.color} 6px, #ffffff 6px, #ffffff 12px)`
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Cake Structure */}
              <div className="w-full flex flex-col items-center">
                {/* Top Layer with "Janu" Name */}
                <div className="w-48 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-r from-pink-200 via-teal-100 to-pink-200 dark:from-purple-900 dark:via-teal-900 dark:to-purple-900 border-2 border-pink-300 dark:border-teal-500/40 shadow-md relative overflow-hidden flex items-center justify-center">
                  {/* Frosting Drips */}
                  <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-4 bg-white dark:bg-pink-200/90 rounded-b-full shadow-sm"
                      />
                    ))}
                  </div>
                  
                  {/* Name on the Cake: Janu */}
                  <div className="text-rose-700 dark:text-teal-300 font-script text-3xl pt-2 script-safe font-bold tracking-wide drop-shadow-sm">
                    {birthdayData.cakeSection.cakeName || "Janu"}
                  </div>
                </div>

                {/* Bottom Layer with Happy Birthday */}
                <div className="w-64 sm:w-72 h-20 rounded-2xl bg-gradient-to-r from-purple-200 via-pink-200 to-teal-200 dark:from-purple-950 dark:via-pink-950 dark:to-teal-950 border-2 border-purple-300 dark:border-white/10 shadow-xl relative overflow-hidden flex items-center justify-center">
                  {/* Frosting Swirls & Pearls */}
                  <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-2">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-4 bg-white/90 rounded-b-full shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
                    <span className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase text-[#1e132c] dark:text-purple-100">
                      Happy Birthday
                    </span>
                    <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
                  </div>
                </div>

                {/* Cake Stand Platter */}
                <div className="w-72 sm:w-80 h-3 bg-gradient-to-r from-gray-200 via-white to-gray-200 dark:from-gray-700 dark:via-gray-500 dark:to-gray-700 rounded-full shadow-md mt-1 border border-gray-300 dark:border-gray-600" />
                <div className="w-28 h-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 rounded-b-xl shadow-inner" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {litCount > 0 ? (
              <motion.button
                onClick={blowAllCandles}
                disabled={isBlowing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 border border-white/30 ${
                  isBlowing ? 'opacity-85 cursor-wait' : 'cursor-pointer hover:shadow-teal-500/25'
                }`}
              >
                <Wind className={`w-4 h-4 ${isBlowing ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{isBlowing ? "Blowing out the candles... 💨✨" : "Blow Out All Candles 🎂"}</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={relightCandles}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 cursor-pointer transition-all border border-white/30 hover:shadow-amber-500/30"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>Make Another Wish (Relight Candles) ✨</span>
              </motion.button>
            )}
          </div>

          <p className="text-xs text-teal-900 dark:text-teal-400/80 mt-4 font-semibold">
            {litCount > 0 
              ? birthdayData.cakeSection.instructions 
              : "All candles extinguished! Your birthday wish is on its way to the stars, Janu ✨ (Auto-relights in 30s)"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
