import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Stars, Infinity as InfinityIcon } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

const INFINITY_PATH = "M 250,130 C 295,45 440,45 440,130 C 440,215 295,215 250,130 C 205,45 60,45 60,130 C 60,215 205,215 250,130 Z";

export default function OurUniverse() {
  const [pointYou, setPointYou] = useState({ x: 250, y: 130 });
  const [pointMe, setPointMe] = useState({ x: 250, y: 130 });
  const [isTogether, setIsTogether] = useState(true);
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const lastPhaseRef = useRef(null);

  // Timeline with 2-second hold at the center heart:
  // Phase 1 (0-2s): Together at Center Heart (Pause 2s)
  // Phase 2 (2-7s): Orbiting Right Loop (5s)
  // Phase 3 (7-9s): Together at Center Heart (Pause 2s)
  // Phase 4 (9-14s): Orbiting Left Loop (5s)
  useEffect(() => {
    let animationFrameId;
    let start = null;
    
    const PAUSE_DURATION = 2000; // 2 seconds pause together at heart
    const TRAVEL_DURATION = 5000; // 5 seconds per loop
    const CYCLE_DURATION = PAUSE_DURATION * 2 + TRAVEL_DURATION * 2; // 14,000ms

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const cycleTime = elapsed % CYCLE_DURATION;

      let t = 0;
      let together = false;
      let phase = '';

      if (cycleTime < PAUSE_DURATION) {
        // Phase 1: Paused at Center Heart (t = 0.0)
        phase = 'pause1';
        t = 0.0;
        together = true;
      } else if (cycleTime < PAUSE_DURATION + TRAVEL_DURATION) {
        // Phase 2: Traveling Right Loop (t: 0.0 -> 0.5)
        phase = 'travel_right';
        const progress = (cycleTime - PAUSE_DURATION) / TRAVEL_DURATION;
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        t = 0.0 + 0.5 * eased;
        together = false;
      } else if (cycleTime < PAUSE_DURATION * 2 + TRAVEL_DURATION) {
        // Phase 3: Paused at Center Heart (t = 0.5)
        phase = 'pause2';
        t = 0.5;
        together = true;
      } else {
        // Phase 4: Traveling Left Loop (t: 0.5 -> 1.0)
        phase = 'travel_left';
        const progress = (cycleTime - (PAUSE_DURATION * 2 + TRAVEL_DURATION)) / TRAVEL_DURATION;
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        t = 0.5 + 0.5 * eased;
        together = false;
      }

      setIsTogether(together);

      // Trigger confetti once whenever entering a 2-second together pause
      if (phase !== lastPhaseRef.current) {
        if ((phase === 'pause1' || phase === 'pause2') && lastPhaseRef.current !== null) {
          triggerRomanticConfetti();
        }
        lastPhaseRef.current = phase;
      }

      if (pathRef.current) {
        try {
          const totalLength = pathRef.current.getTotalLength();
          if (totalLength > 0) {
            if (together) {
              // Perfectly united at the center heart
              const centerPt = pathRef.current.getPointAtLength(t * totalLength);
              setPointYou({
                x: centerPt.x + 38,
                y: centerPt.y
              });
              setPointMe({
                x: centerPt.x - 38,
                y: centerPt.y
              });
            } else {
              // Me follows You (You -> Me direction)
              const normT = t % 0.5;
              const distToCenter = Math.min(normT, 0.5 - normT);
              const baseOffset = 0.085;
              const catchUpFactor = Math.min(1, distToCenter / 0.085);
              const currentOffset = baseOffset * catchUpFactor;

              const tYou = t;
              const tMe = (t - currentOffset + 1) % 1;

              const ptYou = pathRef.current.getPointAtLength(tYou * totalLength);
              const ptMe = pathRef.current.getPointAtLength(tMe * totalLength);

              setPointYou({ x: ptYou.x, y: ptYou.y });
              setPointMe({ x: ptMe.x, y: ptMe.y });
            }
          }
        } catch {
          // fallback gracefully
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleHeartClick = () => {
    triggerRomanticConfetti();
  };

  return (
    <section 
      id="our-universe" 
      ref={containerRef}
      className="py-28 px-4 relative z-10 overflow-hidden bg-gradient-to-b from-[#0c0818] via-[#120e29] to-[#0a0714] text-white select-none"
    >
      {/* Cosmic Nebula Glow */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-teal-500/20 via-purple-600/20 to-pink-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-cyan-500/20 via-rose-600/20 to-purple-500/15 blur-[120px] pointer-events-none" />

      {/* Starfield & Constellation Points */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: (i % 5) * 0.15 + 0.3
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i % 3) * 0.7
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-teal-400/40 text-xs font-bold text-teal-300 mb-6 shadow-lg backdrop-blur-md"
        >
          <Stars className="w-3.5 h-3.5 text-teal-400" />
          <span>{birthdayData.ourUniverse.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
        >
          {birthdayData.ourUniverse.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-teal-100/90 font-serif text-xl sm:text-2xl max-w-xl mx-auto mb-12 italic"
        >
          "{birthdayData.ourUniverse.quote}"
        </motion.p>

        {/* Infinity Heart Interactive Cosmic Canvas */}
        <div className="relative w-full max-w-2xl aspect-[500/260] mx-auto flex items-center justify-center mb-6">
          
          {/* SVG Infinity Path Layer */}
          <div className="absolute inset-0 w-full h-full">
            <svg
              viewBox="0 0 500 260"
              className="w-full h-full overflow-visible pointer-events-none"
            >
              <defs>
                {/* Luminous Neon Gradient */}
                <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="25%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="75%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>

                {/* Ambient Halo Filter */}
                <filter id="infinityHalo" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="9" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Deep Glow */}
              <path
                d={INFINITY_PATH}
                fill="none"
                stroke="url(#infinityGrad)"
                strokeWidth="16"
                opacity="0.22"
                filter="url(#infinityHalo)"
              />

              {/* Constellation Stardust Track (Dashed) */}
              <path
                d={INFINITY_PATH}
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />

              {/* Core Neon Infinity Ribbon */}
              <path
                ref={pathRef}
                d={INFINITY_PATH}
                fill="none"
                stroke="url(#infinityGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Floating Orbit Sparkles along the curve */}
              <circle cx="60" cy="130" r="3" fill="#2dd4bf" opacity="0.8" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="440" cy="130" r="3" fill="#f43f5e" opacity="0.8" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              <circle cx="155" cy="58" r="2" fill="#ffffff" opacity="0.6" />
              <circle cx="345" cy="202" r="2" fill="#ffffff" opacity="0.6" />
            </svg>
          </div>

          {/* Central Heart Intersection (Where You and Me Meet) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            {/* Heart Pulsing Ripples - Amplified when Together during 2s pause */}
            <div 
              className={`absolute rounded-full transition-all duration-500 pointer-events-none ${
                isTogether 
                  ? 'w-36 h-36 bg-rose-500/40 blur-xl animate-ping' 
                  : 'w-24 h-24 bg-rose-500/20 animate-ping'
              }`} 
              style={{ animationDuration: isTogether ? '1.2s' : '2.5s' }} 
            />
            <div 
              className={`absolute rounded-full pointer-events-none transition-all duration-500 ${
                isTogether 
                  ? 'w-32 h-32 bg-gradient-to-r from-teal-400/40 via-rose-500/50 to-pink-500/50 blur-2xl scale-125' 
                  : 'w-20 h-20 bg-pink-500/25 blur-md'
              }`} 
            />

            {/* Floating Black & Blue Sparkle Hearts bursting when Together */}
            {isTogether && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[-60, -20, 20, 60].map((angle, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1.2, 0.7],
                      x: Math.cos(angle * Math.PI / 180) * 58,
                      y: Math.sin(angle * Math.PI / 180) * 58 - 15,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute"
                  >
                    <Heart 
                      className={`w-4 h-4 drop-shadow-md ${
                        idx % 2 === 0 
                          ? 'text-black fill-black' 
                          : 'text-sky-400 fill-sky-400'
                      }`} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Interactive Glowing Heart Core */}
            <motion.button
              onClick={handleHeartClick}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isTogether ? [1.1, 1.28, 1.1] : [1, 1.08, 1]
              }}
              transition={{
                duration: isTogether ? 0.9 : 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center text-white border-2 border-white/80 cursor-pointer group transition-all duration-500 ${
                isTogether
                  ? 'bg-gradient-to-tr from-teal-500 via-rose-500 to-pink-500 shadow-[0_0_55px_rgba(244,63,94,1)]'
                  : 'bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.85)]'
              }`}
              aria-label="Infinite Love Heart"
            >
              <Heart className="w-8 h-8 fill-white text-white drop-shadow-md group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-widest text-pink-100 opacity-90 -mt-0.5">∞</span>
            </motion.button>
          </div>

          {/* Orbiting Beacon 1: YOU (Cyan/Teal - Leading the path) */}
          <div
            style={{
              left: `${(pointYou.x / 500) * 100}%`,
              top: `${(pointYou.y / 260) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-30 pointer-events-none"
          >
            {/* Soft Stardust Tail Glow */}
            <div className="absolute inset-0 rounded-full bg-teal-400/40 blur-md scale-150 animate-pulse" />
            
            <div className="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-purple-950 font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(45,212,191,0.9)] border-2 border-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>{birthdayData.ourUniverse.star1Label}</span>
            </div>
          </div>

          {/* Orbiting Beacon 2: ME (Rose/Pink - Following behind You) */}
          <div
            style={{
              left: `${(pointMe.x / 500) * 100}%`,
              top: `${(pointMe.y / 260) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-30 pointer-events-none"
          >
            {/* Soft Stardust Tail Glow */}
            <div className="absolute inset-0 rounded-full bg-rose-500/40 blur-md scale-150 animate-pulse" />

            <div className="relative px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(244,63,94,0.9)] border-2 border-white flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{birthdayData.ourUniverse.star2Label}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Popup Effect With Black & Blue Hearts */}
        <div className="min-h-[58px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {isTogether && (
              <motion.div
                key="together-popup"
                initial={{ opacity: 0, scale: 0.6, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0.6, 1.08, 1], 
                  y: 0 
                }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 22 
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500/90 via-rose-500/95 to-purple-600/90 border-2 border-white/70 text-white text-xs sm:text-sm font-extrabold shadow-[0_0_35px_rgba(244,63,94,0.85)] backdrop-blur-xl"
              >
                <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200 animate-spin-slow" />
                <span>Two souls, one infinite orbit • Together Forever</span>
                <div className="inline-flex items-center gap-1.5 ml-0.5">
                  <Heart className="w-4 h-4 text-black fill-black drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] animate-pulse" />
                  <Heart className="w-4 h-4 text-sky-400 fill-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-medium"
        >
          {birthdayData.ourUniverse.subquote}
        </motion.p>
      </div>
    </section>
  );
}
