import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy, RotateCcw, Play, Gamepad2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

const heartTypes = [
  { 
    id: 'rose',
    bg: 'from-rose-500 to-pink-600',
    glow: 'rgba(244, 63, 94, 0.85)'
  },
  { 
    id: 'teal',
    bg: 'from-teal-400 to-cyan-500',
    glow: 'rgba(45, 212, 191, 0.85)'
  },
  { 
    id: 'purple',
    bg: 'from-purple-500 to-indigo-600',
    glow: 'rgba(168, 85, 247, 0.85)'
  },
  { 
    id: 'amber',
    bg: 'from-amber-400 to-rose-500',
    glow: 'rgba(245, 158, 11, 0.85)'
  },
  { 
    id: 'pink',
    bg: 'from-pink-400 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.85)'
  },
  { 
    id: 'cyan',
    bg: 'from-sky-400 to-blue-600',
    glow: 'rgba(56, 189, 248, 0.85)'
  }
];

export default function CatchHeartsGame() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [tapBursts, setTapBursts] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const gameAreaRef = useRef(null);
  const target = birthdayData.catchHeartsGame.winTarget || 10;

  // Spawns highly visible glowing falling hearts
  useEffect(() => {
    if (!gameActive || hasWon) return;

    const spawnInterval = setInterval(() => {
      const chosenType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 78 + 8, // percentage across arena
        type: chosenType,
        duration: Math.random() * 1.5 + 2.8, // 2.8s - 4.3s fall
        sway: Math.random() * 20 - 10
      };

      setFallingHearts((prev) => [...prev.slice(-9), newHeart]);
    }, 650);

    return () => clearInterval(spawnInterval);
  }, [gameActive, hasWon]);

  const handleCatchHeart = (e, heart) => {
    e.stopPropagation();

    // Spawn floating score burst
    const rect = gameAreaRef.current?.getBoundingClientRect();
    const clickX = e.clientX && rect ? e.clientX - rect.left : (heart.x / 100) * 400;
    const clickY = e.clientY && rect ? e.clientY - rect.top : 200;

    const burstId = Date.now() + Math.random();
    setTapBursts((prev) => [
      ...prev,
      { id: burstId, x: clickX, y: clickY }
    ]);

    setTimeout(() => {
      setTapBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 750);

    // Remove caught heart
    setFallingHearts((prev) => prev.filter((h) => h.id !== heart.id));
    
    const newScore = score + 1;
    setScore(newScore);

    if (newScore >= target && !hasWon) {
      setHasWon(true);
      setGameActive(false);
      triggerHeartBurst();
      triggerRomanticConfetti();
    }
  };

  const startGame = () => {
    setScore(0);
    setHasWon(false);
    setFallingHearts([]);
    setTapBursts([]);
    setGameActive(true);
  };

  return (
    <section id="catch-hearts" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-rose-500" />
          <span>{birthdayData.catchHeartsGame.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.catchHeartsGame.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-8 font-medium"
        >
          {birthdayData.catchHeartsGame.subtitle}
        </motion.p>

        {/* Game Arena Box */}
        <div 
          ref={gameAreaRef}
          className="relative max-w-2xl mx-auto h-[440px] rounded-3xl glass-card border-2 border-teal-300/80 dark:border-teal-500/30 shadow-2xl overflow-hidden bg-white/95 dark:bg-[#150f24] flex flex-col items-center justify-between p-6"
        >
          {/* Animated Background Ambience */}
          <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-teal-500/10 pointer-events-none" />

          {/* Game Top Bar: Score & Progress */}
          <div className="w-full flex items-center justify-between z-30 px-5 py-2.5 rounded-2xl bg-teal-50/95 dark:bg-purple-950/80 border border-teal-200/80 dark:border-teal-500/30 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 font-bold text-sm text-teal-950 dark:text-teal-200">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Love Collected: <span className="text-rose-600 dark:text-rose-400 font-extrabold">{score}</span> / {target}</span>
            </div>

            <div className="w-32 sm:w-48 h-3 rounded-full bg-slate-200 dark:bg-purple-900/80 p-0.5 overflow-hidden shadow-inner relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-teal-400 via-pink-400 to-rose-500 rounded-full relative shadow-sm"
                animate={{ width: `${Math.min(100, (score / target) * 100)}%` }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Falling Interactive Hearts Play Area */}
          <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
            {/* Highly Visible Crystal Glowing Hearts */}
            {gameActive && !hasWon && fallingHearts.map((heart) => (
              <motion.button
                key={heart.id}
                onClick={(e) => handleCatchHeart(e, heart)}
                initial={{ y: -60, opacity: 1, scale: 0.9 }}
                animate={{ 
                  y: 330, 
                  opacity: 1, // Stay 100% visible throughout entire fall
                  x: [0, heart.sway, -heart.sway, 0],
                  rotate: [0, -8, 8, 0]
                }}
                transition={{ 
                  y: { duration: heart.duration, ease: 'linear' },
                  x: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.75 }}
                className="absolute cursor-pointer select-none z-20 group p-1"
                style={{
                  left: `${heart.x}%`,
                }}
                aria-label="Catch Love Heart"
              >
                {/* Glowing Vibrant Crystal Heart Orb */}
                <div 
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${heart.type.bg} flex items-center justify-center border-2 border-white transform group-hover:scale-110 transition-transform relative`}
                  style={{
                    boxShadow: `0 0 22px ${heart.type.glow}, 0 4px 12px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.6)`
                  }}
                >
                  {/* Glass Shimmer Highlight */}
                  <div className="absolute top-1.5 left-2.5 w-3.5 h-2 rounded-full bg-white/70 blur-[0.5px]" />
                  
                  {/* Large High-Contrast White Heart */}
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white drop-shadow-md animate-pulse" />
                </div>
              </motion.button>
            ))}

            {/* Tap +1 Particles Bursts */}
            {tapBursts.map((burst) => (
              <motion.div
                key={burst.id}
                initial={{ opacity: 1, scale: 0.7, y: 0 }}
                animate={{ opacity: 0, scale: 1.4, y: -45 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                style={{
                  left: burst.x,
                  top: burst.y
                }}
                className="absolute z-30 pointer-events-none font-extrabold text-sm sm:text-base text-rose-500 flex items-center gap-1 drop-shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>+1 Love! 💖</span>
              </motion.div>
            ))}

            {/* 1. START SCREEN */}
            {!gameActive && !hasWon && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-6 z-20"
              >
                {/* Floating Heart Hero Icon */}
                <motion.div 
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-teal-400 p-0.5 shadow-xl mb-4 flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#1b122e] flex items-center justify-center shadow-inner">
                    <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-heart-pulse" />
                  </div>
                </motion.div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e132c] dark:text-white mb-2">
                  Ready to catch my love?
                </h3>
                
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 max-w-sm mb-6 font-medium">
                  Tap all 10 falling hearts before they drift away!
                </p>

                {/* PROPER PLAY GAME BUTTON */}
                <motion.button
                  onClick={startGame}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(244,63,94,0.5)] flex items-center gap-2.5 border-2 border-white/70 cursor-pointer group"
                >
                  <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>Start Catching Love</span>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                </motion.button>
              </motion.div>
            )}

            {/* 2. WIN SCREEN */}
            {hasWon && (
              <motion.div 
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 220 }}
                className="h-full flex flex-col items-center justify-center text-center p-6 z-20"
              >
                {/* Rotating Sunburst Trophy */}
                <div className="relative mb-4 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-teal-400/20 blur-md pointer-events-none"
                  />
                  
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-2xl border-2 border-white relative z-10"
                  >
                    <Trophy className="w-10 h-10 text-amber-200 drop-shadow-md" />
                  </motion.div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-700 dark:text-teal-300 mb-2 max-w-md">
                  {birthdayData.catchHeartsGame.winMessage}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 mb-6 font-medium">
                  You caught every single drop of love! ✨
                </p>

                {/* PROPER PLAY AGAIN BUTTON */}
                <motion.button
                  onClick={startGame}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-500 text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(13,148,136,0.5)] flex items-center gap-2.5 border-2 border-white/70 cursor-pointer group"
                >
                  <RotateCcw className="w-4 h-4 text-white group-hover:-rotate-90 transition-transform duration-300" />
                  <span>Play Again</span>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
