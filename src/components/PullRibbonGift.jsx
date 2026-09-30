import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';

export default function PullRibbonGift() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const handlePullRibbon = () => {
    if (isOpened) return;
    setIsPulling(true);

    setTimeout(() => {
      setIsOpened(true);
      setIsPulling(false);
      triggerHeartBurst();
      triggerRomanticConfetti();
    }, 800);
  };

  const handleReset = () => {
    setIsOpened(false);
    setIsPulling(false);
  };

  return (
    <section id="ribbon-gift" className="py-24 px-4 relative z-10 overflow-hidden">
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
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-12 font-medium"
        >
          {birthdayData.ribbonGift.subtitle}
        </motion.p>

        {/* Interactive 3D Gift Box with Ribbon */}
        <div className="relative max-w-xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="wrapped-box"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: isPulling ? [-2, 2, -3, 3, 0] : [0, -1, 1, 0]
                }}
                transition={{
                  rotate: isPulling ? { duration: 0.4, repeat: 2 } : { duration: 4, repeat: Infinity }
                }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="relative cursor-pointer group flex flex-col items-center"
                onClick={handlePullRibbon}
              >
                {/* 3D Gift Box SVG Structure */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                  
                  {/* Glowing halo */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500/30 via-teal-400/30 to-purple-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />

                  {/* Gift Box Lid */}
                  <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-xl border-2 border-white/60 dark:border-white/20 relative z-20 flex items-center justify-center">
                    {/* Ribbon Bow on top of lid */}
                    <div className="absolute -top-7 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: isPulling ? [1, 1.4, 0.8] : [1, 1.08, 1]
                        }}
                        transition={{ duration: 1.5, repeat: isPulling ? 0 : Infinity }}
                        className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 border-2 border-white shadow-lg flex items-center justify-center text-xl"
                      >
                        🎀
                      </motion.div>
                    </div>

                    {/* Vertical Ribbon across lid */}
                    <div className="w-8 h-full bg-gradient-to-b from-teal-300 to-teal-400 shadow-sm" />
                  </div>

                  {/* Gift Box Base */}
                  <div className="w-[92%] mx-auto h-44 rounded-b-3xl bg-gradient-to-b from-rose-600 to-pink-600 shadow-2xl border-2 border-white/40 dark:border-white/10 relative -mt-2 overflow-hidden flex items-center justify-center">
                    {/* Vertical Ribbon */}
                    <div className="w-8 h-full bg-gradient-to-b from-teal-300 to-teal-400 shadow-md" />
                    {/* Horizontal Ribbon */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 shadow-md" />
                  </div>
                </div>

                {/* Prompt Button */}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-rose-500 text-white font-bold text-base shadow-xl flex items-center gap-2 border border-white/40"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span>{isPulling ? "Untying the ribbon... ✨" : birthdayData.ribbonGift.ribbonPrompt}</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-box"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                className="w-full glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-300 dark:border-teal-500/40 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden"
              >
                {/* Celebration Header */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 via-pink-500 to-rose-500 flex items-center justify-center text-white shadow-xl mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-amber-200 animate-spin-slow" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mb-4">
                  {birthdayData.ribbonGift.revealTitle}
                </h3>

                <div className="p-6 rounded-2xl bg-teal-50 dark:bg-purple-950/70 border border-teal-200/80 dark:border-white/10 mb-8">
                  <p className="font-serif text-lg sm:text-xl text-rose-800 dark:text-teal-200 leading-relaxed italic font-normal">
                    "{birthdayData.ribbonGift.revealMessage}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 border border-white/30"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Celebrate More ✨</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-300 dark:border-white/15 cursor-pointer flex items-center gap-1.5"
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
