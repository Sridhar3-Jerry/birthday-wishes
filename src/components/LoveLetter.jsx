import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, MailOpen, Sparkles, Feather, Send, Stamp, CheckCircle2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(true);

  const playPaperRustle = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio fallback
    }
  };

  const toggleLetter = () => {
    playPaperRustle();
    if (!isOpen) {
      triggerRomanticConfetti();
      triggerHeartBurst();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Background Warm Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[550px] bg-gradient-to-r from-rose-500/10 via-amber-400/15 to-teal-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/80 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-300 mb-3 shadow-md bg-white/95 dark:bg-[#140e24]/95"
          >
            <Mail className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{birthdayData.loveLetter.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            {birthdayData.loveLetter.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            {birthdayData.loveLetter.subtitle}
          </motion.p>
        </div>

        {/* Interactive Love Letter / Sealed Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              /* OPENED STATE: LUXURY VINTAGE PARCHMENT STATIONERY */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, type: 'spring', damping: 22 }}
                className="relative rounded-[28px] p-6 sm:p-12 md:p-14 bg-[#fffdf9] dark:bg-[#170f26] border-2 border-amber-200/90 dark:border-teal-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(245,158,11,0.15)] text-left relative overflow-hidden"
              >
                {/* Double Gold Foil Border Inset */}
                <div className="absolute inset-3 sm:inset-4 rounded-[20px] border border-amber-300/40 dark:border-teal-400/20 pointer-events-none" />
                <div className="absolute inset-4 sm:inset-5 rounded-[18px] border border-dashed border-amber-400/30 dark:border-teal-400/15 pointer-events-none" />

                {/* Subtle Parchment Corner Ornaments */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />

                {/* Top Actions & Vintage Postage Header */}
                <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-white/10 pb-6 mb-8 relative z-10">
                  {/* Fold / Seal Button */}
                  <button
                    onClick={toggleLetter}
                    className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-amber-100/80 dark:bg-purple-950/70 hover:bg-amber-200/80 dark:hover:bg-purple-900 text-amber-900 dark:text-teal-300 transition-all cursor-pointer border border-amber-300/80 dark:border-teal-500/30 shadow-xs group"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-600 group-hover:scale-110 transition-transform" />
                    <span>Fold Into Envelope 💌</span>
                  </button>

                  {/* Vintage Airmail Postage Stamp & Postmark */}
                  <div className="flex items-center gap-3">
                    {/* Postal Postmark Ink Ring */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-full border border-dashed border-rose-400/70 text-rose-600 dark:text-rose-400 text-[8px] font-extrabold uppercase tracking-tighter transform -rotate-12 opacity-80">
                      <span>PAR AVION</span>
                      <span className="font-sans text-[7px] text-amber-600">SPECIAL</span>
                      <span>★ 2026 ★</span>
                    </div>

                    {/* Perforated Postage Stamp */}
                    <div className="relative p-2 rounded-md bg-white dark:bg-purple-950 border-2 border-dashed border-rose-300 dark:border-teal-500/60 shadow-sm flex flex-col items-center text-center">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-rose-700 dark:text-teal-300 mt-0.5">Airmail</span>
                      <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400">1st Class</span>
                    </div>
                  </div>
                </div>

                {/* Calligraphy Salutation */}
                <div className="mb-6 relative z-10">
                  <span className="font-script text-5xl sm:text-6xl text-rose-700 dark:text-teal-300 script-safe font-semibold drop-shadow-xs">
                    {birthdayData.loveLetter.salutation}
                  </span>
                </div>

                {/* Letter Body Paragraphs with Illuminated Drop Cap */}
                <div className="space-y-6 font-serif text-base sm:text-lg text-[#2a1c2e] dark:text-[#f1f5f9] leading-relaxed relative z-10">
                  {birthdayData.loveLetter.paragraphs.map((paragraph, index) => {
                    const firstChar = paragraph.charAt(0);
                    const restText = paragraph.slice(1);

                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="relative leading-relaxed"
                      >
                        {index === 0 ? (
                          <>
                            <span className="float-left text-4xl sm:text-5xl font-serif font-bold text-rose-600 dark:text-teal-400 leading-none mr-2 mt-1 drop-shadow-xs">
                              {firstChar}
                            </span>
                            {restText}
                          </>
                        ) : (
                          paragraph
                        )}
                      </motion.p>
                    );
                  })}
                </div>

                {/* Ornate Gold Heart Divider */}
                <div className="my-8 flex items-center justify-center gap-3 text-amber-400/60 dark:text-teal-500/40 relative z-10">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-300 dark:via-teal-500/40 to-transparent flex-1" />
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-300 dark:via-teal-500/40 to-transparent flex-1" />
                </div>

                {/* Closing, Handwritten Signature & 3D Wax Seal */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-amber-900 dark:text-teal-400 font-extrabold mb-1">
                      {birthdayData.loveLetter.closing}
                    </p>
                    <p className="font-handwriting text-3xl sm:text-4xl text-rose-700 dark:text-teal-300 font-bold script-safe">
                      {birthdayData.loveLetter.signature}
                    </p>
                  </div>

                  {/* 3D Realistic Ruby Wax Seal Stamp */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="relative cursor-pointer self-end sm:self-center group"
                    title="Click to Send Heart Sparks"
                  >
                    {/* Wax Stamp Ambient Glow */}
                    <div className="absolute -inset-3 bg-rose-500/30 rounded-full blur-md group-hover:blur-lg transition-all" />
                    
                    {/* Realistic Glossy Carmine Wax Seal */}
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#e11d48] via-[#be123c] to-[#881337] p-1 shadow-[0_10px_25px_rgba(225,29,72,0.45),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-[#fda4af] flex items-center justify-center transform rotate-6">
                      {/* Wax Rim Texture */}
                      <div className="w-11 h-11 rounded-full border border-rose-300/50 flex items-center justify-center bg-gradient-to-tr from-[#9f1239] to-[#e11d48] shadow-inner">
                        <Heart className="w-6 h-6 text-white fill-white drop-shadow-md" />
                      </div>
                    </div>

                    <div className="absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-full bg-black/70 text-[8px] font-bold text-amber-300 tracking-wider">
                      SEALED
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* CLOSED STATE: VINTAGE SEALED AIRMAIL ENVELOPE */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                className="relative rounded-[26px] p-8 sm:p-12 bg-gradient-to-br from-[#fffdfa] to-[#f7f0e6] dark:from-[#1b122c] dark:to-[#120a20] border-2 border-amber-300/80 dark:border-teal-500/50 shadow-2xl text-center overflow-hidden"
              >
                {/* Vintage Airmail Striped Border */}
                <div className="absolute inset-0 border-8 border-dashed border-rose-300/40 dark:border-teal-500/20 rounded-[24px] pointer-events-none" />

                {/* Envelope Flap Illustration */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 p-1 mx-auto mb-5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#150e24] flex items-center justify-center text-rose-500">
                    <Mail className="w-9 h-9" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-purple-950/70 border border-rose-300 dark:border-teal-500/40 text-xs font-extrabold uppercase tracking-widest text-rose-800 dark:text-teal-300 mb-3">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Personal & Confidential</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#1e132c] dark:text-white mb-3">
                  Sealed with an Unbreakable Love Seal
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-medium">
                  A private letter handwritten from the soul, waiting for you to break the seal and read every word...
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLetter}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-base shadow-xl inline-flex items-center gap-2.5 border border-white/40 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
                  <span>Break Wax Seal & Read Letter 💌</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
