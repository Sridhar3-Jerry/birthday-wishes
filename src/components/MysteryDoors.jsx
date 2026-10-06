import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Key, Lock, Unlock, ArrowLeft, Gem, Gift, Mail, Star, Flame } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

const doorThemes = [
  {
    id: 1,
    accent: 'from-amber-500 via-rose-500 to-pink-500',
    borderGlow: 'hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    doorGradient: 'from-[#2a1b18] via-[#1a0f2e] to-[#0f0a1e]',
    doorBorder: 'border-amber-400/60',
    lightBeam: 'from-amber-400/30 via-rose-400/20 to-transparent',
    gemColor: 'text-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    tag: 'Secret Memory ✨'
  },
  {
    id: 2,
    accent: 'from-rose-500 via-pink-500 to-purple-500',
    borderGlow: 'hover:border-rose-400/80 hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    doorGradient: 'from-[#2d1124] via-[#1c0d29] to-[#0f0a1e]',
    doorBorder: 'border-rose-400/60',
    lightBeam: 'from-rose-400/30 via-pink-400/20 to-transparent',
    gemColor: 'text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    tag: 'Soul Letter 💌'
  },
  {
    id: 3,
    accent: 'from-teal-400 via-emerald-500 to-cyan-500',
    borderGlow: 'hover:border-teal-400/80 hover:shadow-[0_0_35px_rgba(45,212,191,0.35)]',
    doorGradient: 'from-[#0e272a] via-[#0d1c2b] to-[#0a1220]',
    doorBorder: 'border-teal-400/60',
    lightBeam: 'from-teal-400/30 via-cyan-400/20 to-transparent',
    gemColor: 'text-teal-400',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    tag: 'Golden Coupon 🎁'
  }
];

export default function MysteryDoors() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [openedDoors, setOpenedDoors] = useState(new Set());
  const [hoveredDoor, setHoveredDoor] = useState(null);

  const playChimeSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + i * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.55);
      });
    } catch {
      // Audio fallback
    }
  };

  const handleDoorClick = (door) => {
    playChimeSound();
    setSelectedDoor(door);
    const newOpened = new Set(openedDoors);
    newOpened.add(door.id);
    setOpenedDoors(newOpened);
    triggerRomanticConfetti();
    triggerHeartBurst();
  };

  return (
    <section id="mystery-doors" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Ambient Stardust Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-96 bg-gradient-to-r from-amber-500/10 via-rose-500/15 to-teal-500/10 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.mysteryDoors.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.mysteryDoors.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-14 font-medium"
        >
          {birthdayData.mysteryDoors.subtitle}
        </motion.p>

        {/* 3 Arched Magical Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {birthdayData.mysteryDoors.doors.map((door, index) => {
            const isUnlocked = openedDoors.has(door.id);
            const isHover = hoveredDoor === door.id;
            const theme = doorThemes[index % doorThemes.length];

            return (
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredDoor(door.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => handleDoorClick(door)}
                className="group relative cursor-pointer flex flex-col"
              >
                {/* Outer Glass Card Container */}
                <div className={`relative flex-1 rounded-3xl p-6 sm:p-7 border-2 border-white/40 dark:border-white/10 shadow-xl transition-all duration-500 bg-white/90 dark:bg-[#150f24]/90 backdrop-blur-md flex flex-col items-center text-center ${theme.borderGlow}`}>
                  
                  {/* Floating Door Number Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-teal-500/10 to-rose-500/10 border border-teal-300/60 dark:border-teal-500/30 text-teal-900 dark:text-teal-200 mb-6 shadow-xs">
                    <Key className="w-3 h-3 text-amber-500" />
                    <span>Door {door.number}</span>
                  </div>

                  {/* 3D ARCHED DOORWAY CONTAINER */}
                  <div 
                    className="relative w-44 h-60 sm:w-48 sm:h-64 mb-6 rounded-t-[90px] rounded-b-2xl p-1.5 bg-gradient-to-b from-amber-300/80 via-rose-300/50 to-teal-400/80 shadow-2xl overflow-hidden"
                    style={{ perspective: 1000 }}
                  >
                    {/* Interior Room Behind the Door (Revealed when door swings open) */}
                    <div className="absolute inset-1.5 rounded-t-[84px] rounded-b-xl bg-[#090514] flex flex-col items-center justify-center overflow-hidden">
                      {/* Deep Interior Ambient Light Beam */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${theme.lightBeam} opacity-80`} />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

                      {/* Glowing Floating Icon in the Room */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          y: [0, -6, 0]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="relative z-10 text-5xl sm:text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                      >
                        {door.icon}
                      </motion.div>

                      {/* Sparkle Embers inside */}
                      <div className="absolute bottom-4 flex items-center gap-1 text-amber-300 text-[10px] font-bold tracking-widest uppercase">
                        <Sparkles className="w-3 h-3 animate-spin-slow" />
                        <span>REVEAL ME</span>
                      </div>
                    </div>

                    {/* 3D SWINGING DOOR LEAF PANEL */}
                    <motion.div
                      className={`absolute inset-1.5 rounded-t-[84px] rounded-b-xl bg-gradient-to-b ${theme.doorGradient} border-2 ${theme.doorBorder} shadow-2xl flex flex-col items-center justify-between p-4 z-20`}
                      style={{
                        transformOrigin: 'left center',
                        transformStyle: 'preserve-3d'
                      }}
                      animate={{
                        rotateY: isHover || isUnlocked ? -62 : 0,
                        boxShadow: isHover || isUnlocked 
                          ? '-10px 10px 30px rgba(0,0,0,0.8)' 
                          : '0 10px 25px rgba(0,0,0,0.4)'
                      }}
                      transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                    >
                      {/* Top Ornate Arch Carving */}
                      <div className="w-10 h-10 rounded-full border border-amber-400/40 flex items-center justify-center mt-3 shadow-inner">
                        <Gem className={`w-4 h-4 ${theme.gemColor} animate-pulse`} />
                      </div>

                      {/* Door Paneling Texture */}
                      <div className="w-full flex-1 my-2 border border-white/10 rounded-lg p-2 flex flex-col justify-around">
                        <div className="h-10 border border-white/5 rounded-md bg-white/5" />
                        <div className="h-10 border border-white/5 rounded-md bg-white/5" />
                      </div>

                      {/* Ornate Vintage Golden Handle & Keyhole */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                        <div className="w-3 h-8 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-md border border-amber-200/60" />
                        <div className="w-2.5 h-3 rounded-xs bg-amber-950 border border-amber-400/80 shadow-xs flex items-center justify-center">
                          <div className="w-0.5 h-1 bg-amber-300 rounded-full" />
                        </div>
                      </div>

                      {/* Bottom Threshold Seal */}
                      <div className="w-full flex items-center justify-between px-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>LOCKED</span>
                        <Lock className="w-2.5 h-2.5 text-amber-400" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-1.5">
                    {door.category}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-300 mb-5">
                    "{door.preview}"
                  </p>

                  {/* Interactive Action Pill at Bottom */}
                  <div className="mt-auto pt-2">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isUnlocked
                        ? 'bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-300/80'
                        : 'bg-gradient-to-r from-rose-500/10 to-teal-500/10 text-rose-700 dark:text-teal-300 border border-rose-300/70 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-md'
                    }`}>
                      {isUnlocked ? (
                        <>
                          <Unlock className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                          <span>Secret Unlocked (View)</span>
                        </>
                      ) : (
                        <>
                          <Key className="w-3 h-3 text-amber-500 group-hover:text-white" />
                          <span>Tap to Unlock 🗝️</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Revealed Secret Modal (Royal Golden Parchment Card) */}
        <AnimatePresence>
          {selectedDoor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedDoor(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, y: 30 }}
                transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                className="relative max-w-lg w-full bg-white dark:bg-[#160e29] rounded-3xl p-8 sm:p-10 border-2 border-amber-300/90 dark:border-teal-500/60 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Ambient Warm Glows */}
                <div className="absolute -top-20 -right-20 w-52 h-52 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedDoor(null)}
                  className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 dark:bg-purple-900/60 hover:bg-slate-200 text-[#1e132c] dark:text-white transition-colors cursor-pointer shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Door Header Icon Crest */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-500 to-teal-500 p-1 mx-auto mb-5 shadow-xl">
                  <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#120a22] flex items-center justify-center text-4xl shadow-inner">
                    {selectedDoor.icon}
                  </div>
                </div>

                {/* Top Door Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300/80 text-[11px] font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-300 mb-2 shadow-xs">
                  <Unlock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Door {selectedDoor.number} • {selectedDoor.category}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl font-bold text-[#1e132c] dark:text-white mb-4">
                  {selectedDoor.title}
                </h3>

                {/* Content Box */}
                <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/80 dark:bg-white/5 border border-amber-200/80 dark:border-white/10 mb-6 text-center relative shadow-inner">
                  <p className="font-serif text-lg sm:text-xl text-[#1e132c] dark:text-purple-100 leading-relaxed italic">
                    "{selectedDoor.content}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 border border-white/40 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Claim With Love 💖</span>
                  </motion.button>

                  <button
                    onClick={() => setSelectedDoor(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 dark:bg-purple-950/70 hover:bg-slate-200 text-[#1e132c] dark:text-slate-200 font-bold text-sm border border-teal-200 dark:border-white/15 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Choose Another Door 🚪</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
