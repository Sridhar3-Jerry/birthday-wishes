import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, Unlock, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

export default function OpenMyHeart() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenHeart = () => {
    setIsOpen(true);
    triggerHeartBurst();
    triggerRomanticConfetti();
  };

  const handleCloseHeart = () => {
    setIsOpen(false);
  };

  return (
    <section id="open-heart" className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Dynamic Background Transition */}
      <motion.div
        className="absolute inset-0 -z-10 transition-colors duration-1000"
        animate={{
          background: isOpen 
            ? 'radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.25) 0%, rgba(192, 132, 252, 0.2) 50%, rgba(56, 189, 248, 0.15) 100%)' 
            : 'transparent'
        }}
      />

      {isOpen && <FloatingParticles count={25} type="hearts" opacity={0.4} />}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{birthdayData.openHeart.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-8"
        >
          {birthdayData.openHeart.prompt}
        </motion.h2>

        {/* Big Interactive Heart Container */}
        <div className="relative py-8 flex flex-col items-center justify-center min-h-[360px]">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed-heart"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="flex flex-col items-center"
              >
                {/* Beating Heart Icon with glowing aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1, 1.12, 1],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="relative cursor-pointer group mb-8"
                  onClick={handleOpenHeart}
                >
                  <div className="absolute -inset-6 bg-gradient-to-tr from-rose-500/40 via-pink-400/30 to-teal-400/30 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-500 flex items-center justify-center shadow-2xl border-4 border-white/60 dark:border-white/20">
                    <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-white fill-white drop-shadow-xl" />
                  </div>
                  <div className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-purple-900/80 shadow-md">
                    <Lock className="w-4 h-4 text-rose-600 dark:text-teal-300" />
                  </div>
                </motion.div>

                {/* Open Heart Button */}
                <motion.button
                  onClick={handleOpenHeart}
                  whileHover={{ scale: 1.06, boxShadow: '0 20px 35px -10px rgba(225, 29, 72, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-600 text-white font-bold text-base shadow-xl flex items-center gap-2 cursor-pointer border border-white/40"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
                  <span>{birthdayData.openHeart.buttonText}</span>
                  <Heart className="w-5 h-5 fill-white" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-heart"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                className="w-full max-w-xl glass-card rounded-3xl p-8 sm:p-12 border-2 border-rose-300 dark:border-teal-500/40 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden text-center"
              >
                {/* Splitting Heart Wings Decor */}
                <div className="flex justify-center items-center gap-3 mb-6">
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: -20, rotate: -15 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                  >
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-500/70" />
                  </motion.div>
                  
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-pink-500/30">
                    <Sparkles className="w-8 h-8 animate-spin-slow text-amber-200" />
                  </div>

                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: 20, rotate: 15 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                  >
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-500/70" />
                  </motion.div>
                </div>

                {/* The Revealed Person: YOU ❤️ */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mb-4"
                >
                  <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800 dark:text-teal-300 block mb-1">
                    Inside my heart is only...
                  </span>
                  <span className="font-script text-6xl sm:text-8xl text-gradient-peacock script-safe font-normal drop-shadow-sm">
                    {birthdayData.openHeart.insideWord}
                  </span>
                </motion.div>

                {/* Personal Emotional Note */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-base sm:text-xl font-serif text-[#1e132c] dark:text-purple-100 leading-relaxed max-w-lg mx-auto mb-8 font-normal"
                >
                  "{birthdayData.openHeart.insideMessage}"
                </motion.p>

                {/* Reclose & Celebration actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 border border-white/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Send More Heart Sparkles ✨</span>
                  </button>

                  <button
                    onClick={handleCloseHeart}
                    className="px-5 py-2.5 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-300 dark:border-white/10 cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Lock Back Inside 🔒</span>
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
