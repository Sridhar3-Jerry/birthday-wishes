import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioPlayer';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

export default function LoveIntroScreen({ onStartOpen, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const recipient = birthdayData.recipientName || 'My Love';

  // Romantic story narrative phases
  const romanticPhases = [
    {
      badge: '✨ A Story Crafted With Love ✨',
      title: `For ${recipient}`,
      quote: 'Before you enter this world... there is something my heart needs to tell you.',
      symbol: '❤️',
      glowColor: '#f43f5e'
    },
    {
      badge: '🌌 In A Universe of 8 Billion Souls 🌌',
      title: 'My Heart Chose You',
      quote: 'Across all time and space, every single heartbeat of mine has only ever whispered your name.',
      symbol: '💖',
      glowColor: '#ec4899'
    },
    {
      badge: '🌹 Pure Romance & Magic 🌹',
      title: 'You Are My Forever',
      quote: 'Your smile brings light to my darkest days, and your love makes every moment feel like a miracle.',
      symbol: '✨',
      glowColor: '#0d9488'
    },
    {
      badge: '🎂 Today We Celebrate You 🎂',
      title: 'Welcome To Our Love Story',
      quote: 'Step inside the magical world I created just for you. Every detail was made with infinite love.',
      symbol: '🎁',
      glowColor: '#a855f7'
    }
  ];

  // Handler for opening the application slowly and majestically
  const handleOpenApp = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // 1. Play romantic melody
    try {
      audioManager.play();
    } catch {
      // Audio playback might be handled by user action
    }

    // 2. Trigger celebratory love confetti & heart explosion
    triggerRomanticConfetti();
    setTimeout(() => {
      triggerHeartBurst();
    }, 450);

    // 3. Inform parent that opening has started (to prepare main app scaling/blur)
    if (onStartOpen) {
      onStartOpen();
    }

    // 4. Slow, luxurious transition: wait 2.2 seconds before completing unmount
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2200);
  }, [isOpening, onStartOpen, onComplete]);

  // Auto-advance phases every 2.5 seconds
  useEffect(() => {
    if (isOpening) return;

    timerRef.current = setInterval(() => {
      setPhase((prev) => {
        if (prev < romanticPhases.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpening, romanticPhases.length]);

  // Smooth progress bar to auto-unlock in ~9.5 seconds if user doesn't click
  useEffect(() => {
    if (isOpening) return;

    const totalDurationMs = 9500;
    const intervalMs = 50;
    const increment = (intervalMs / totalDurationMs) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressIntervalRef.current);
          handleOpenApp();
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isOpening, handleOpenApp]);

  const currentPhaseData = romanticPhases[phase] || romanticPhases[0];

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-hidden select-none flex items-center justify-center pointer-events-auto"
      style={{
        background: '#07030e',
      }}
    >
      {/* 1. Left Grand Satin Velvet Curtain */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isOpening ? '-102%' : '0%' }}
        transition={{ 
          duration: 2.1, 
          ease: [0.22, 1, 0.36, 1], // Cinematic silky smooth easing
          delay: 0.15 
        }}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #090312 0%, #150824 50%, #1b072e 100%)',
          boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.8), 20px 0 60px rgba(244,63,94,0.15)',
          borderRight: '1px solid rgba(244, 63, 94, 0.25)',
        }}
      />

      {/* 2. Right Grand Satin Velvet Curtain */}
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: isOpening ? '102%' : '0%' }}
        transition={{ 
          duration: 2.1, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15 
        }}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(225deg, #090312 0%, #150824 50%, #1b072e 100%)',
          boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.8), -20px 0 60px rgba(13,148,136,0.15)',
          borderLeft: '1px solid rgba(13, 148, 136, 0.25)',
        }}
      />

      {/* 3. Central Beam of Radiant Light when Curtains Part */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: isOpening ? [0, 1, 0.9, 0] : 0, 
          scaleX: isOpening ? [0.1, 4, 18] : 0 
        }}
        transition={{ 
          duration: 2.1, 
          ease: 'easeInOut' 
        }}
        className="absolute inset-y-0 w-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none blur-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(244, 63, 94, 0.6) 40%, rgba(13, 148, 136, 0.3) 70%, transparent 100%)'
        }}
      />

      {/* 4. Warm Radial Glowing Orbs in Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Rose Glow */}
        <div 
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 animate-pulse"
          style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)', animationDuration: '6s' }}
        />
        {/* Deep Peacock Glow */}
        <div 
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-[150px] opacity-35 animate-pulse"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)', animationDuration: '7s' }}
        />
        {/* Center Violet Aura */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
        />
      </div>

      {/* 5. Floating Ambient Hearts & Twinkling Stardust */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: 22 }).map((_, i) => {
          const size = (i % 3 === 0 ? 18 : i % 2 === 0 ? 13 : 24);
          const left = (i * 4.6 + (i % 5) * 2) % 100;
          const delay = (i * 0.45) % 6;
          const duration = 9 + (i % 7) * 1.5;
          const icons = ['❤️', '💖', '✨', '💕', '🌹', '💫'];
          const icon = icons[i % icons.length];

          return (
            <motion.div
              key={i}
              className="absolute select-none opacity-40"
              style={{
                left: `${left}%`,
                bottom: '-30px',
                fontSize: `${size}px`,
                filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.4))'
              }}
              animate={{
                y: '-110vh',
                x: [0, (i % 2 === 0 ? 30 : -30), 0],
                rotate: [0, (i % 2 === 0 ? 45 : -45), 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut'
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </div>

      {/* 7. Central Romantic Content Container */}
      <motion.div
        animate={{
          opacity: isOpening ? [1, 0] : 1,
          scale: isOpening ? [1, 1.15, 0.9] : 1,
          filter: isOpening ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut'
        }}
        className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto"
      >
        {/* Animated Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhaseData.badge}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-rose-200 bg-rose-950/60 border border-rose-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.3)] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
            <span>{currentPhaseData.badge}</span>
            <Stars className="w-3.5 h-3.5 text-teal-300" />
          </motion.div>
        </AnimatePresence>

        {/* 8. Pulsating 3D Glowing Heart Centerpiece */}
        <div 
          onClick={handleOpenApp}
          className="relative my-4 flex items-center justify-center cursor-pointer group"
          title="Click to Open Our World ❤️"
        >
          {/* Concentric Sonic Love Pulse Waves */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-rose-500/30 pointer-events-none"
              style={{
                width: `${120 + ring * 55}px`,
                height: `${120 + ring * 55}px`,
              }}
              animate={{
                scale: [0.85, 1.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: ring * 0.65,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Heart Core Glow Halo */}
          <div 
            className="absolute w-36 h-36 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, #f43f5e 0%, #ec4899 50%, transparent 80%)'
            }}
          />

          {/* Main Pulsing Heart */}
          <motion.div
            animate={{
              scale: isOpening ? [1, 1.4, 25] : [1, 1.15, 1.05, 1.22, 1],
            }}
            transition={{
              duration: isOpening ? 1.6 : 1.4,
              repeat: isOpening ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 p-5 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 shadow-[0_0_50px_rgba(244,63,94,0.8),inset_0_2px_10px_rgba(255,255,255,0.4)] border border-white/40 flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[0_0_70px_rgba(244,63,94,1)]"
          >
            <Heart 
              className="w-16 h-16 sm:w-20 sm:h-20 text-white fill-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105" 
            />

            {/* Glossy Reflection Highlight */}
            <div className="absolute top-2 left-4 w-7 h-4 bg-white/40 rounded-full blur-[1px] rotate-[-35deg] pointer-events-none" />

            {/* Floating Mini Sparkle inside Heart */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-2 bg-teal-400 text-teal-950 p-1.5 rounded-full shadow-lg border border-white"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-950" />
            </motion.div>
          </motion.div>
        </div>

        {/* 9. Romantic Poetic Text Container */}
        <div className="min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center mt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                {currentPhaseData.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-rose-100/90 max-w-md mx-auto leading-relaxed font-normal px-2">
                "{currentPhaseData.quote}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 10. Step Dot Indicators */}
        <div className="flex items-center gap-2 my-5">
          {romanticPhases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPhase(idx)}
              aria-label={`Jump to message ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                phase === idx 
                  ? 'w-7 bg-gradient-to-r from-rose-500 to-teal-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]' 
                  : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* 11. Grand "Open With Love" Action Button */}
        <div className="w-full flex flex-col items-center gap-3">
          <motion.button
            onClick={handleOpenApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isOpening}
            className="relative group overflow-hidden px-8 sm:px-10 py-4 rounded-full font-serif text-base sm:text-lg font-bold tracking-wide text-white cursor-pointer shadow-[0_0_40px_rgba(244,63,94,0.6)] border border-rose-300/40 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #ec4899 50%, #0d9488 100%)',
            }}
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-2.5 drop-shadow-md">
              <Heart className="w-5 h-5 text-rose-200 fill-rose-200 animate-pulse" />
              <span>{isOpening ? 'Opening Our Universe of Love...' : 'Open With Love ❤️'}</span>
              <Sparkles className="w-5 h-5 text-teal-200" />
            </div>
          </motion.button>

          {/* 12. Gentle Love Progress Indicator */}
          <div className="w-56 flex flex-col items-center gap-1.5 mt-2">
            <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-teal-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] text-rose-200/60 font-sans tracking-wide">
              {isOpening ? '✨ Unfolding with love...' : 'Tap heart or button to enter 💕'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
