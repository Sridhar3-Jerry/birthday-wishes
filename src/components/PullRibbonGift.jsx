import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Gift, Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';

export default function PullRibbonGift() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.35, once: false });
  
  // Stages: 'wrapping' -> 'closed' (wrapped) -> 'untying' -> 'opening' -> 'opened'
  const [stage, setStage] = useState('wrapping');
  const [wrapStep, setWrapStep] = useState(0); // 0: box, 1: vertical ribbon, 2: horizontal ribbon, 3: bow tied
  
  const wasInViewRef = useRef(false);
  const timersRef = useRef([]);

  const startWrappingAnimation = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setStage('wrapping');
    setWrapStep(0);

    // Step 1 (400ms): Vertical ribbon draws across box
    const t1 = setTimeout(() => {
      setWrapStep(1);
    }, 400);

    // Step 2 (850ms): Horizontal ribbon wraps across base
    const t2 = setTimeout(() => {
      setWrapStep(2);
    }, 850);

    // Step 3 (1300ms): Ribbon bow loops & knot tie on top
    const t3 = setTimeout(() => {
      setWrapStep(3);
    }, 1300);

    // Step 4 (1800ms): Gift is fully wrapped and ready to be opened!
    const t4 = setTimeout(() => {
      setStage('closed');
    }, 1800);

    timersRef.current = [t1, t2, t3, t4];
  }, []);

  // Automatically wrap the gift every time user visits this section
  useEffect(() => {
    if (isInView && !wasInViewRef.current) {
      wasInViewRef.current = true;
      startWrappingAnimation();
    } else if (!isInView) {
      wasInViewRef.current = false;
    }
  }, [isInView, startWrappingAnimation]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handlePullRibbon = () => {
    if (stage !== 'closed') return;
    
    // Step 1: Untie ribbon
    setStage('untying');

    // Step 2: Pop open lid & particle explosion
    setTimeout(() => {
      setStage('opening');
      triggerHeartBurst();
    }, 500);

    // Step 3: Reveal letter and launch celebration confetti
    setTimeout(() => {
      setStage('opened');
      triggerRomanticConfetti();
    }, 900);
  };

  const handleReset = () => {
    startWrappingAnimation();
  };

  const isWrapping = stage === 'wrapping';
  const isClosed = stage === 'closed';
  const isUntying = stage === 'untying';
  const isOpening = stage === 'opening';
  const isOpened = stage === 'opened';

  return (
    <section 
      id="ribbon-gift" 
      ref={sectionRef}
      className="py-24 px-4 relative z-10 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-pink-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>{birthdayData.ribbonGift.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.ribbonGift.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.ribbonGift.subtitle}
        </motion.p>

        {/* Realistic 3D Gift Box Interactive Stage */}
        <div className="relative max-w-xl mx-auto min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center">
          
          {/* Ambient Glow behind the box */}
          <div className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
            isOpened 
              ? 'bg-gradient-to-tr from-rose-500/35 via-amber-400/25 to-teal-400/25 scale-125' 
              : 'bg-gradient-to-tr from-pink-500/25 via-teal-400/20 to-purple-500/25'
          }`} />

          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* GIFT BOX (Auto-wraps, then clickable to open) */
              <motion.div
                key="gift-box-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full"
              >
                {/* 3D Box Container - Clickable when wrapped */}
                <motion.div
                  onClick={handlePullRibbon}
                  whileHover={isClosed ? { scale: 1.04, y: -4 } : {}}
                  whileTap={isClosed ? { scale: 0.97 } : {}}
                  className={`relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-end ${
                    isClosed ? 'cursor-pointer group' : 'cursor-default'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Click to open gift box"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handlePullRibbon();
                  }}
                >
                  {/* 1. FLYING / POPPING LID */}
                  <motion.div
                    animate={
                      isClosed || isWrapping
                        ? { y: 0, x: 0, rotate: 0, scale: 1 }
                        : isUntying
                        ? { y: [-2, 2, -3, 3, 0], scale: 1.03 }
                        : isOpening
                        ? { y: -90, x: -35, rotate: -24, scale: 0.85, opacity: 0 }
                        : {}
                    }
                    transition={
                      isUntying
                        ? { duration: 0.35, repeat: 1 }
                        : { duration: 0.45, ease: 'easeOut' }
                    }
                    className="absolute top-8 sm:top-10 w-full z-30 flex flex-col items-center"
                  >
                    {/* Ribbon Bow on top */}
                    <div className="relative -mb-4 flex items-center justify-center z-40">
                      {/* Left Bow Loop */}
                      <motion.div
                        animate={
                          isWrapping
                            ? { scale: wrapStep >= 3 ? 1 : 0, rotate: wrapStep >= 3 ? -15 : -90, opacity: wrapStep >= 3 ? 1 : 0 }
                            : isClosed
                            ? { scale: [1, 1.06, 1], rotate: -15 }
                            : { x: -80, y: -50, rotate: -90, scale: 0, opacity: 0 }
                        }
                        transition={{
                          duration: isWrapping ? 0.4 : isClosed ? 2 : 0.4,
                          repeat: isClosed ? Infinity : 0,
                          type: isWrapping ? 'spring' : 'tween'
                        }}
                        className="w-10 h-7 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 border-2 border-white shadow-md -mr-2 origin-right"
                      />

                      {/* Bow Center Knot */}
                      <motion.div
                        animate={
                          isWrapping
                            ? { scale: wrapStep >= 3 ? [0, 1.3, 1] : 0, opacity: wrapStep >= 3 ? 1 : 0 }
                            : isClosed
                            ? { scale: [1, 1.12, 1] }
                            : { scale: [1, 1.5, 0], opacity: [1, 1, 0], y: -30 }
                        }
                        transition={{
                          duration: isWrapping ? 0.45 : isClosed ? 2 : 0.35,
                          repeat: isClosed ? Infinity : 0
                        }}
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 border-2 border-white shadow-lg flex items-center justify-center text-xs z-10"
                      >
                        <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                      </motion.div>

                      {/* Right Bow Loop */}
                      <motion.div
                        animate={
                          isWrapping
                            ? { scale: wrapStep >= 3 ? 1 : 0, rotate: wrapStep >= 3 ? 15 : 90, opacity: wrapStep >= 3 ? 1 : 0 }
                            : isClosed
                            ? { scale: [1, 1.06, 1], rotate: 15 }
                            : { x: 80, y: -50, rotate: 90, scale: 0, opacity: 0 }
                        }
                        transition={{
                          duration: isWrapping ? 0.4 : isClosed ? 2 : 0.4,
                          repeat: isClosed ? Infinity : 0,
                          type: isWrapping ? 'spring' : 'tween'
                        }}
                        className="w-10 h-7 rounded-full bg-gradient-to-l from-teal-300 to-cyan-400 border-2 border-white shadow-md -ml-2 origin-left"
                      />
                    </div>

                    {/* Box Lid Structure */}
                    <div className="w-full h-16 sm:h-18 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-2xl border-2 border-white/70 relative overflow-hidden flex items-center justify-center transition-all">
                      {/* Vertical Ribbon on Lid */}
                      <motion.div
                        animate={
                          isWrapping
                            ? { opacity: wrapStep >= 1 ? 1 : 0, scaleY: wrapStep >= 1 ? 1 : 0 }
                            : isClosed
                            ? { opacity: 1, scaleY: 1 }
                            : { opacity: 0, scaleY: 0, y: -20 }
                        }
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top' }}
                        className="w-7 h-full bg-gradient-to-b from-teal-300 to-teal-400 shadow-sm"
                      />

                      {/* Lid Rim Highlight */}
                      <div className="absolute inset-x-0 bottom-0 h-2 bg-black/15" />
                    </div>
                  </motion.div>

                  {/* 2. BOX BASE & INTERIOR */}
                  <motion.div 
                    animate={
                      isOpening
                        ? { scale: [1, 1.05, 0.95], opacity: [1, 1, 0.4] }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                    className="relative w-[90%] h-44 sm:h-48 rounded-b-3xl bg-gradient-to-b from-rose-600 to-pink-700 shadow-2xl border-2 border-white/50 overflow-hidden flex items-center justify-center z-10 transition-all"
                  >
                    {/* Inner Cavity Depth */}
                    <div className="absolute inset-x-2 top-0 h-10 bg-gradient-to-b from-black/50 via-purple-950/40 to-transparent rounded-t-xl" />

                    {/* Radiant Light Beam when opening */}
                    {isOpening && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1.5 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-x-4 top-0 h-52 bg-gradient-to-t from-amber-300/80 via-pink-400/50 to-transparent blur-md pointer-events-none z-10"
                      />
                    )}

                    {/* Base Vertical Ribbon */}
                    <motion.div
                      animate={
                        isWrapping
                          ? { opacity: wrapStep >= 1 ? 1 : 0, scaleY: wrapStep >= 1 ? 1 : 0 }
                          : isClosed
                          ? { opacity: 1, scaleY: 1 }
                          : { opacity: 0, scaleY: 0, y: 50 }
                      }
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ transformOrigin: 'top' }}
                      className="w-7 h-full bg-gradient-to-b from-teal-300 to-teal-400 shadow-md z-10"
                    />

                    {/* Base Horizontal Ribbon */}
                    <motion.div
                      animate={
                        isWrapping
                          ? { opacity: wrapStep >= 2 ? 1 : 0, scaleX: wrapStep >= 2 ? 1 : 0 }
                          : isClosed
                          ? { opacity: 1, scaleX: 1 }
                          : { opacity: 0, scaleX: 0 }
                      }
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ transformOrigin: 'center' }}
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 shadow-md z-10"
                    />
                  </motion.div>
                </motion.div>

                {/* 3. INTERACTIVE TRIGGER BUTTON / STATUS */}
                {isWrapping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500/20 border border-teal-400 text-teal-200 font-bold text-sm backdrop-blur-md shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>Wrapping your gift with love... ✨</span>
                  </motion.div>
                )}

                {isClosed && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      scale: { type: 'spring', damping: 15 },
                      y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    onClick={handlePullRibbon}
                    className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-500 text-white font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(45,212,191,0.5)] flex items-center gap-2.5 border-2 border-white/60 cursor-pointer group"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow group-hover:scale-125 transition-transform" />
                    <span>{birthdayData.ribbonGift.ribbonPrompt}</span>
                  </motion.button>
                )}

                {/* Untying status message */}
                {(isUntying || isOpening) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500/20 border border-teal-400 text-teal-200 font-bold text-sm backdrop-blur-md animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                    <span>Untying the silky ribbon... ✨</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* REVEALED HEARTFELT CARD */
              <motion.div
                key="opened-card-revealed"
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.85 }}
                transition={{ type: 'spring', damping: 18, stiffness: 220 }}
                className="w-full glass-card rounded-3xl p-6 sm:p-10 border-2 border-teal-300 dark:border-teal-500/50 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden z-40"
              >
                {/* Celebration Header Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 via-pink-500 to-rose-500 flex items-center justify-center text-white shadow-xl mx-auto mb-5 border-2 border-white"
                >
                  <PartyPopper className="w-8 h-8 text-amber-200 animate-bounce" />
                </motion.div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mb-3">
                  {birthdayData.ribbonGift.revealTitle}
                </h3>

                {/* Love Note Message Box */}
                <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/80 dark:bg-purple-950/70 border border-teal-200/80 dark:border-white/10 mb-6 shadow-inner">
                  <p className="font-serif text-base sm:text-xl text-rose-900 dark:text-teal-200 leading-relaxed italic font-normal">
                    "{birthdayData.ribbonGift.revealMessage}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer flex items-center justify-center gap-2 border border-white/30"
                  >
                    <Heart className="w-4 h-4 fill-white text-white" />
                    <span>Celebrate More ✨</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 dark:hover:bg-purple-800 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-300 dark:border-white/15 cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-wrap Gift 🎀</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
