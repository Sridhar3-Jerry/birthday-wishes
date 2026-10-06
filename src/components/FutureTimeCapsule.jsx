import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hourglass, Sparkles, Mail, Lock, Unlock, Heart, Clock, ShieldCheck, RotateCcw, Orbit } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

export default function FutureTimeCapsule() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const playTimeChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const frequencies = [440, 554.37, 659.25, 880, 1108.73]; // A4, C#5, E5, A5, C#6
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.65);
      });
    } catch {
      // Audio fallback
    }
  };

  const handleOpenCapsule = () => {
    playTimeChime();
    setIsOpen(true);
    triggerRomanticConfetti();
    triggerHeartBurst();
  };

  const handleCloseCapsule = () => {
    setIsOpen(false);
  };

  return (
    <section id="time-capsule" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Dynamic Cosmic Chrono-Aura Background */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-1000 pointer-events-none"
        style={{
          background: isOpen 
            ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.18) 0%, rgba(168, 85, 247, 0.15) 45%, rgba(244, 63, 94, 0.1) 85%, transparent 100%)' 
            : 'radial-gradient(circle at 50% 50%, rgba(13, 148, 136, 0.1) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 80%)'
        }}
      />

      {isOpen ? (
        <FloatingParticles count={25} type="hearts" opacity={0.4} />
      ) : (
        <FloatingParticles count={15} type="hearts" opacity={0.2} />
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Hourglass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
          <span>{birthdayData.timeCapsule.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3 tracking-tight"
        >
          {birthdayData.timeCapsule.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-12 font-medium"
        >
          {birthdayData.timeCapsule.subtitle}
        </motion.p>

        {/* 3D Cosmic Time Capsule Center Stage */}
        <div className="relative max-w-2xl mx-auto min-h-[440px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED STATE: 3D CELESTIAL CHRONO-VAULT */
              <motion.div
                key="sealed-capsule"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center"
              >
                {/* 3D Celestial Chrono Sphere */}
                <div 
                  className="relative flex items-center justify-center cursor-pointer group mb-10"
                  onClick={handleOpenCapsule}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Temporal Pulse Ripples */}
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1.75],
                      opacity: [0.6, 0.2, 0]
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                    className="absolute w-56 h-56 rounded-full border border-teal-400/40 pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1.6],
                      opacity: [0.5, 0.15, 0]
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: 'easeOut'
                    }}
                    className="absolute w-56 h-56 rounded-full border border-purple-400/30 pointer-events-none"
                  />

                  {/* Outer Orbital Ring with Temporal Stardust */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-64 h-64 rounded-full border border-dashed border-teal-300/40 dark:border-teal-400/30 pointer-events-none"
                  >
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,1)]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,1)]" />
                  </motion.div>

                  {/* Counter-Rotating Gold Dial Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-72 h-72 rounded-full border border-amber-400/20 pointer-events-none hidden sm:block"
                  >
                    <div className="absolute top-1/2 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)]" />
                  </motion.div>

                  {/* Deep Multi-Layer Ambient Bloom */}
                  <div className="absolute -inset-8 bg-gradient-to-tr from-teal-500/30 via-purple-500/25 to-pink-500/25 rounded-full blur-3xl group-hover:blur-4xl group-hover:scale-110 transition-all duration-700" />

                  {/* Main Time Capsule Orb */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.08 : [1, 1.05, 1, 1.04, 1],
                    }}
                    transition={{
                      duration: isHovered ? 0.3 : 2.0,
                      repeat: isHovered ? 0 : Infinity,
                      ease: 'easeInOut'
                    }}
                    className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#0e7490] via-[#06b6d4] to-[#4c1d95] p-1.5 shadow-[0_20px_50px_rgba(6,182,212,0.35),0_0_30px_rgba(147,51,234,0.3)] border-2 border-white/70 dark:border-white/30 flex items-center justify-center backdrop-blur-xl"
                  >
                    {/* Inner Glass Texture */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-t from-black/25 via-transparent to-white/40 pointer-events-none" />

                    {/* Central Hourglass Hologram */}
                    <motion.div
                      animate={{
                        rotate: [0, 180, 180, 360],
                        scale: [1, 1.08, 1, 1.08, 1]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="relative z-10 flex items-center justify-center text-white"
                    >
                      <Hourglass className="w-20 h-20 sm:w-24 sm:h-24 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
                    </motion.div>

                    {/* Golden Time Seal Lock Badge */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="absolute -top-1 -right-1 w-11 h-11 rounded-full bg-gradient-to-tr from-teal-400 via-emerald-400 to-amber-300 border-2 border-white shadow-lg flex items-center justify-center text-teal-950 z-20"
                    >
                      <Lock className="w-5 h-5 text-teal-950" />
                    </motion.div>

                    {/* Sealed Temporal Record Tag */}
                    <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-[10px] font-bold text-teal-300 tracking-wider flex items-center gap-1 shadow-md">
                      <Clock className="w-3 h-3 text-teal-400" />
                      <span>SEALED FOR ETERNITY</span>
                    </div>
                  </motion.div>
                </div>

                {/* Primary Unlock CTA Button */}
                <motion.button
                  onClick={handleOpenCapsule}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative px-8 sm:px-10 py-4 rounded-full text-white font-bold text-base sm:text-lg shadow-xl cursor-pointer overflow-hidden border border-white/50 bg-gradient-to-r from-teal-500 via-cyan-500 to-rose-500"
                >
                  {/* Shimmer light sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
                    <span>{birthdayData.timeCapsule.buttonText}</span>
                    <Unlock className="w-5 h-5 text-white group-hover:scale-125 transition-transform" />
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              /* OPENED STATE: ENCHANTING FUTURE LETTER PARCHMENT */
              <motion.div
                key="opened-capsule"
                initial={{ scale: 0.75, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.75, opacity: 0, y: 30 }}
                transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                className="w-full glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-300/90 dark:border-teal-500/60 shadow-[0_25px_60px_rgba(6,182,212,0.25)] bg-white/95 dark:bg-[#140e26]/95 relative overflow-hidden text-center"
              >
                {/* Background Ambient Celestial Glows */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-teal-400/25 to-blue-500/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-tr from-pink-400/25 to-purple-500/25 rounded-full blur-3xl pointer-events-none" />

                {/* Top Holographic Hourglass Crest */}
                <div className="flex justify-center items-center gap-3 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-rose-500 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#120a22] flex items-center justify-center text-teal-600 dark:text-teal-300">
                      <Hourglass className="w-8 h-8 animate-spin-slow" />
                    </div>
                  </div>
                </div>

                {/* Header Tag */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 dark:bg-teal-950/70 border border-teal-300/80 text-[11px] font-extrabold uppercase tracking-widest text-teal-900 dark:text-teal-300 mb-4 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Decrypted From Our Future Selves</span>
                </div>

                {/* Future Quote Box */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-teal-50/90 via-purple-50/50 to-pink-50/80 dark:from-white/5 dark:to-white/5 border border-teal-200/90 dark:border-white/10 mb-6 text-center shadow-inner relative">
                  <p className="font-serif text-xl sm:text-2xl text-[#1e132c] dark:text-purple-100 leading-relaxed italic mb-4 font-normal">
                    "{birthdayData.timeCapsule.quote}"
                  </p>
                  
                  {/* Decorative Gradient Line */}
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto my-3" />
                  
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {birthdayData.timeCapsule.note}
                  </p>
                </div>

                {/* Romantic Seal & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playTimeChime();
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-teal-600 via-cyan-500 to-rose-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 border border-white/40 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Send Future Love 💖</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseCapsule}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-white dark:bg-purple-950/70 hover:bg-slate-50 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-200 dark:border-white/15 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reseal Time Capsule 🔒</span>
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
