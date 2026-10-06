import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, Unlock, RotateCcw, Key, Sparkle, ShieldCheck } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

export default function OpenMyHeart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const playHeartbeatSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playThump = (time, freq, gainVal) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.12);
        gain.gain.setValueAtTime(gainVal, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
      };

      const now = ctx.currentTime;
      playThump(now, 85, 0.3);
      playThump(now + 0.18, 70, 0.25);
    } catch {
      // Audio context fallback
    }
  };

  const handleOpenHeart = () => {
    playHeartbeatSound();
    setIsOpen(true);
    triggerHeartBurst();
    triggerRomanticConfetti();
  };

  const handleCloseHeart = () => {
    setIsOpen(false);
  };

  return (
    <section id="open-heart" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Dynamic Background Atmosphere Glow */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-1000 pointer-events-none"
        style={{
          background: isOpen 
            ? 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.18) 0%, rgba(168, 85, 247, 0.14) 40%, rgba(6, 182, 212, 0.08) 80%, transparent 100%)' 
            : 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.08) 0%, rgba(13, 148, 136, 0.05) 50%, transparent 80%)'
        }}
      />

      {/* Ambient Stardust particles */}
      {isOpen ? (
        <FloatingParticles count={25} type="hearts" opacity={0.45} />
      ) : (
        <FloatingParticles count={12} type="hearts" opacity={0.2} />
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-rose-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>{birthdayData.openHeart.badge}</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-2 tracking-tight"
        >
          {birthdayData.openHeart.prompt}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-10 font-medium"
        >
          Locked behind a lifetime of affection, guarded just for you...
        </motion.p>

        {/* Interactive Center Stage */}
        <div className="relative py-4 flex flex-col items-center justify-center min-h-[420px]">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED STATE: 3D GLOWING HEART LOCKET VAULT */
              <motion.div
                key="closed-vault"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                {/* 3D Heart Locket Chamber */}
                <div 
                  className="relative flex items-center justify-center cursor-pointer group mb-10"
                  onClick={handleOpenHeart}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Radial Heartbeat Shockwave Pulses */}
                  <motion.div
                    animate={{
                      scale: [1, 1.45, 1.8],
                      opacity: [0.6, 0.25, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                    className="absolute w-56 h-56 rounded-full border border-rose-400/40 pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1.6],
                      opacity: [0.5, 0.15, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: 0.4,
                      ease: 'easeOut'
                    }}
                    className="absolute w-56 h-56 rounded-full border border-teal-400/30 pointer-events-none"
                  />

                  {/* Outer Orbiting Celestial Ring with Gold Stardust */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-64 h-64 rounded-full border border-dashed border-amber-300/40 dark:border-amber-400/30 pointer-events-none"
                  >
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,1)]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,1)]" />
                  </motion.div>

                  {/* Counter-Rotating Cyan Accent Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-72 h-72 rounded-full border border-teal-400/20 pointer-events-none hidden sm:block"
                  >
                    <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,1)]" />
                  </motion.div>

                  {/* Deep Multi-Layer Ambient Bloom */}
                  <div className="absolute -inset-8 bg-gradient-to-tr from-rose-500/35 via-pink-500/25 to-teal-400/25 rounded-full blur-3xl group-hover:blur-4xl group-hover:scale-110 transition-all duration-700" />

                  {/* Main Beating Locket Orb */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.08 : [1, 1.06, 1, 1.04, 1],
                    }}
                    transition={{
                      duration: isHovered ? 0.3 : 1.6,
                      repeat: isHovered ? 0 : Infinity,
                      ease: 'easeInOut'
                    }}
                    className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#ff2e63] via-[#ff007f] to-[#79005a] p-1.5 shadow-[0_20px_50px_rgba(244,63,94,0.4),0_0_30px_rgba(255,46,99,0.3)] border-2 border-white/70 dark:border-white/30 flex items-center justify-center backdrop-blur-xl"
                  >
                    {/* Inner Glass Facet Texture */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-t from-black/20 via-transparent to-white/40 pointer-events-none" />

                    {/* Central Glowing Crystal Vector Heart */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1, 1.08, 1],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                        fill="url(#heart-gold-gradient)"
                      >
                        <defs>
                          <linearGradient id="heart-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="45%" stopColor="#ffe4e6" />
                            <stop offset="100%" stopColor="#fecdd3" />
                          </linearGradient>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>

                      {/* Glossy heart highlight */}
                      <div className="absolute top-4 left-6 w-7 h-4 bg-white/70 rounded-full blur-[1px] rotate-[-35deg] pointer-events-none" />
                    </motion.div>

                    {/* Golden Padlock Badge with Glowing Keyhole */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="absolute -top-1 -right-1 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 border-2 border-white shadow-lg flex items-center justify-center text-amber-950 z-20"
                    >
                      <Lock className="w-5 h-5 text-amber-950" />
                    </motion.div>

                    {/* Secret Key Hint Badge at Bottom */}
                    <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-[10px] font-bold text-amber-300 tracking-wider flex items-center gap-1 shadow-md">
                      <Key className="w-3 h-3 text-amber-400" />
                      <span>TAP TO UNLOCK</span>
                    </div>
                  </motion.div>
                </div>

                {/* Primary Unlock CTA Button */}
                <motion.button
                  onClick={handleOpenHeart}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.6)' }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative px-8 sm:px-10 py-4 rounded-full text-white font-bold text-base sm:text-lg shadow-xl cursor-pointer overflow-hidden border border-white/50 bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500"
                >
                  {/* Shimmer light sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
                    <span>{birthdayData.openHeart.buttonText}</span>
                    <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              /* OPENED STATE: ENCHANTING REVEAL LOCKET CARD */
              <motion.div
                key="opened-vault"
                initial={{ scale: 0.75, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.75, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                className="w-full max-w-xl glass-card rounded-3xl p-8 sm:p-12 border-2 border-rose-300/80 dark:border-teal-500/50 shadow-[0_25px_60px_rgba(244,63,94,0.25)] bg-white/95 dark:bg-[#140c24]/95 relative overflow-hidden text-center"
              >
                {/* Background Golden Foil Filigree Glow */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-amber-400/25 to-rose-500/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-tr from-teal-400/25 to-purple-500/25 rounded-full blur-3xl pointer-events-none" />

                {/* Opened Locket Crest Animation */}
                <div className="flex justify-center items-center gap-3 mb-6 relative">
                  {/* Left Wing Heart */}
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: -22, rotate: -20 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 flex items-center justify-center shadow-md">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    </div>
                  </motion.div>
                  
                  {/* Center Golden Unlock Medallion */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', damping: 15 }}
                    className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-pink-500/30 border-2 border-white"
                  >
                    <Unlock className="w-8 h-8 text-amber-200" />
                  </motion.div>

                  {/* Right Wing Heart */}
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: 22, rotate: 20 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-500/40 flex items-center justify-center shadow-md">
                      <Heart className="w-6 h-6 text-teal-500 fill-teal-500" />
                    </div>
                  </motion.div>
                </div>

                {/* Secret Vault Header Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/80 text-[11px] font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-300 mb-3 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>The Only Treasure Found Inside</span>
                </div>

                {/* The Revealed Word: YOU ❤️ */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, type: 'spring', damping: 14 }}
                  className="mb-4"
                >
                  <span className="font-script text-6xl sm:text-8xl text-gradient-peacock script-safe font-normal drop-shadow-sm block">
                    {birthdayData.openHeart.insideWord}
                  </span>
                </motion.div>

                {/* Handwritten Romantic Note */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-white/5 border border-amber-200/80 dark:border-white/10 mb-8 text-center"
                >
                  <Sparkle className="w-4 h-4 text-amber-400 absolute top-3 left-3" />
                  <Sparkle className="w-4 h-4 text-rose-400 absolute bottom-3 right-3" />
                  
                  <p className="text-base sm:text-lg font-serif text-[#1e132c] dark:text-slate-100 leading-relaxed italic">
                    "{birthdayData.openHeart.insideMessage}"
                  </p>
                </motion.div>

                {/* Interactive Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playHeartbeatSound();
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 border border-white/40 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Send More Love Sparkles 💖</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseHeart}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-white dark:bg-purple-950/70 hover:bg-slate-50 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-200 dark:border-white/15 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lock Back Inside 🔒</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
