import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

const heartSymbols = ['❤️', '💗', '💕', '💖', '💘', '💙'];

export default function CatchHeartsGame() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const gameAreaRef = useRef(null);
  const target = birthdayData.catchHeartsGame.winTarget || 10;

  // Spawns falling hearts periodically when game is active
  useEffect(() => {
    if (!gameActive || hasWon) return;

    const spawnInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 85 + 5, // percentage
        symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
        duration: Math.random() * 2 + 3.5, // seconds to fall
        size: Math.random() * 12 + 28
      };

      setFallingHearts((prev) => [...prev.slice(-12), newHeart]);
    }, 850);

    return () => clearInterval(spawnInterval);
  }, [gameActive, hasWon]);

  const handleCatchHeart = (id) => {
    setFallingHearts((prev) => prev.filter((h) => h.id !== id));
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
    setGameActive(true);
  };

  return (
    <section id="catch-hearts" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
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

        {/* Game Box */}
        <div 
          ref={gameAreaRef}
          className="relative max-w-2xl mx-auto h-[420px] rounded-3xl glass-card border-2 border-teal-300/80 dark:border-white/10 shadow-2xl overflow-hidden bg-white/95 dark:bg-[#150f24] flex flex-col items-center justify-between p-6"
        >
          {/* Game Top Bar: Score & Progress */}
          <div className="w-full flex items-center justify-between z-20 px-4 py-2 rounded-2xl bg-teal-50/90 dark:bg-purple-950/80 border border-teal-200/80 dark:border-teal-500/30 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-sm text-teal-950 dark:text-teal-200">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Love Collected: {score} / {target}</span>
            </div>

            <div className="w-32 sm:w-44 h-2.5 rounded-full bg-teal-200/80 dark:bg-purple-900 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(100, (score / target) * 100)}%` }}
              />
            </div>
          </div>

          {/* Falling Interactive Hearts Area */}
          <div className="relative flex-1 w-full overflow-hidden">
            {gameActive && !hasWon && fallingHearts.map((heart) => (
              <motion.button
                key={heart.id}
                onClick={() => handleCatchHeart(heart.id)}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 340, opacity: [0, 1, 1, 0] }}
                transition={{ duration: heart.duration, ease: 'linear' }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.7 }}
                className="absolute cursor-pointer select-none filter drop-shadow-md z-10"
                style={{
                  left: `${heart.x}%`,
                  fontSize: `${heart.size}px`
                }}
              >
                {heart.symbol}
              </motion.button>
            ))}

            {/* Start Screen */}
            {!gameActive && !hasWon && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 z-20">
                <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-purple-900/60 flex items-center justify-center text-3xl mb-4">
                  💖
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-2">
                  Ready to catch my love?
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 max-w-sm mb-6 font-medium">
                  Tap 10 falling hearts before they reach the bottom!
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer border border-white/30"
                >
                  Start Game 🎮❤️
                </button>
              </div>
            )}

            {/* Win Screen */}
            {hasWon && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-6 z-20"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white text-3xl mb-4 shadow-xl">
                  🏆
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-700 dark:text-teal-300 mb-3">
                  {birthdayData.catchHeartsGame.winMessage}
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 mb-6 font-medium">
                  You caught every single drop of love!
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 text-[#1e132c] dark:text-white font-bold text-sm border-2 border-teal-300 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-teal-600" />
                  <span>Play Again 🔄</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
