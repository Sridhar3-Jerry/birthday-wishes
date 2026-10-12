import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Infinity as InfinityIcon, Activity } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function LoveSlider() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });
  
  // Motion Value for buttery 60/120fps hardware-accelerated animation
  const count = useMotionValue(0);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [currentStage, setCurrentStage] = useState('holding');
  const [isInfinity, setIsInfinity] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'holding' | 'measuring' | 'complete'
  
  const hasTriggeredRef = useRef(false);
  const timeoutRef = useRef(null);
  const animControlsRef = useRef(null);
  const { isDark } = useTheme();

  // Smooth transforms driven directly by MotionValue (GPU accelerated)
  const heartScale = useTransform(count, [0, 100], [0.85, 1.42]);
  const progressWidth = useTransform(count, (v) => `${Math.min(100, Math.max(2, v))}%`);
  const glowOpacity = useTransform(count, [0, 100], [0.2, 0.75]);

  // Sync state for stage messages & text display without blocking framerate
  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      const rounded = Math.round(latest);
      setDisplayNumber(rounded);

      if (rounded < 25) {
        setCurrentStage('stage1');
      } else if (rounded < 55) {
        setCurrentStage('stage2');
      } else if (rounded < 85) {
        setCurrentStage('stage3');
      } else if (rounded < 100) {
        setCurrentStage('stage4');
      } else {
        setCurrentStage('max');
      }
    });

    return () => unsubscribe();
  }, [count]);

  const startAutomatedMeter = useCallback(() => {
    // Stop any existing animation / timers
    if (animControlsRef.current) animControlsRef.current.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    count.set(0);
    setDisplayNumber(0);
    setIsInfinity(false);
    setStatus('holding');
    setCurrentStage('holding');

    // 1-second hold for calibration
    timeoutRef.current = setTimeout(() => {
      setStatus('measuring');

      // Ultra-smooth Framer Motion animation from 0 to 100
      animControlsRef.current = animate(count, 100, {
        duration: 3.2,
        ease: [0.25, 0.1, 0.25, 1.0], // smooth cubic easing
        onComplete: () => {
          count.set(100);
          setDisplayNumber(100);

          timeoutRef.current = setTimeout(() => {
            setIsInfinity(true);
            setStatus('complete');
            triggerRomanticConfetti();

            // Once infinity is shown, wait 5 seconds then restart automatically
            timeoutRef.current = setTimeout(() => {
              startAutomatedMeter();
            }, 5000);
          }, 350);
        }
      });
    }, 1000);
  }, [count]);

  useEffect(() => {
    if (isInView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      startAutomatedMeter();
    }
  }, [isInView, startAutomatedMeter]);

  useEffect(() => {
    return () => {
      if (animControlsRef.current) animControlsRef.current.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getStageText = () => {
    switch (currentStage) {
      case 'holding':
        return "Calibrating the Love Meter (1s)...";
      case 'stage1':
        return "Scanning all the stars across the cosmos... ✨";
      case 'stage2':
        return "Measuring every smile & precious memory... 💖";
      case 'stage3':
        return "Exceeding the boundaries of the universe... 🌌";
      case 'stage4':
        return "Breaking past 100% — Limit exceeded! 🔥";
      case 'max':
      default:
        return birthdayData.loveSlider.limitMessage;
    }
  };

  return (
    <section 
      id="love-slider" 
      ref={sectionRef}
      className="py-24 px-4 relative z-10 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-pink-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
          <span>{birthdayData.loveSlider.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.loveSlider.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.loveSlider.subtitle}
        </motion.p>

        {/* Interactive / Automated Meter Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-200/90 dark:border-teal-500/30 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden"
        >
          {/* Status Chip */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40 shadow-xs">
              <Activity className={`w-3.5 h-3.5 ${status === 'measuring' ? 'animate-pulse text-teal-500' : 'text-rose-500'}`} />
              <span>
                {status === 'holding' && 'Holding 1s for calibration...'}
                {status === 'measuring' && 'Auto-Calculating Love...'}
                {status === 'complete' && 'Calculation Complete ✨'}
                {status === 'idle' && 'Ready to Measure'}
              </span>
            </div>
          </div>

          {/* Animated Heart Scaling with MotionValue */}
          <div className="h-44 flex flex-col items-center justify-center relative mb-6">
            <motion.div
              style={{
                scale: isInfinity ? 1.6 : heartScale
              }}
              animate={{
                rotate: isInfinity ? [0, -6, 6, 0] : [0, -2.5, 2.5, 0]
              }}
              transition={{
                rotate: { duration: isInfinity ? 2 : 3.5, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative select-none"
            >
              {/* Smooth GPU Aura Glow */}
              <motion.div 
                className="absolute -inset-6 rounded-full blur-2xl"
                style={{
                  opacity: isInfinity ? 0.9 : glowOpacity,
                  background: isInfinity 
                    ? 'radial-gradient(circle, rgba(13, 148, 136, 0.8) 0%, rgba(244, 63, 94, 0.8) 100%)' 
                    : 'radial-gradient(circle, rgba(244, 63, 94, 0.85) 0%, rgba(13, 148, 136, 0.35) 100%)'
                }}
              />
              
              <Heart 
                className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl transition-colors duration-500"
                style={{
                  color: isInfinity ? '#0d9488' : '#f43f5e',
                  fill: isInfinity ? '#0d9488' : '#f43f5e'
                }}
              />
            </motion.div>
          </div>

          {/* Dynamic Value or Infinity Display */}
          <div className="mb-8 min-h-[110px] flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {isInfinity ? (
                <motion.div
                  key="infinity-view"
                  initial={{ scale: 0.4, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 220 }}
                  className="flex flex-col items-center"
                >
                  <div className="font-serif text-6xl sm:text-7xl font-extrabold flex items-center justify-center gap-3">
                    <InfinityIcon className="w-16 h-16 sm:w-20 sm:h-20 text-teal-600 dark:text-teal-400 drop-shadow-lg animate-pulse" />
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-rose-700 dark:text-teal-300 font-bold mt-2">
                    {birthdayData.loveSlider.infinityMessage}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="counter-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="font-serif text-5xl sm:text-6xl font-extrabold text-teal-950 dark:text-teal-200 tracking-tight tabular-nums">
                    {displayNumber}%
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-rose-600 dark:text-pink-400 tracking-wide mt-2">
                    {getStageText()}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Automatic Glowing Progress Meter */}
          <div className="max-w-md mx-auto relative px-2 mb-2">
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-pink-200/80 dark:border-teal-500/30 shadow-inner relative">
              {/* Animated Smooth Progress Fill */}
              <motion.div
                className="h-full rounded-full relative bg-gradient-to-r from-teal-400 via-pink-400 to-rose-500 shadow-md"
                style={{ 
                  width: isInfinity ? '100%' : progressWidth
                }}
              >
                {/* Shimmer Light Bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              </motion.div>
            </div>

            {/* Percentage Milestones */}
            <div className="flex justify-between text-xs font-bold text-[#334155] dark:text-slate-400 mt-2.5">
              <span className={displayNumber >= 0 ? "text-teal-700 dark:text-teal-300 transition-colors" : ""}>0% (Start)</span>
              <span className={displayNumber >= 50 ? "text-pink-600 dark:text-pink-300 transition-colors" : ""}>50% (Whole Universe)</span>
              <span className={isInfinity ? "text-teal-600 dark:text-teal-300 font-extrabold transition-colors" : ""}>100% (Infinite ∞)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
