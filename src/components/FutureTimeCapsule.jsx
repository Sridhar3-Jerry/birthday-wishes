import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hourglass, Sparkles, Mail, Lock, Unlock, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

export default function FutureTimeCapsule() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCapsule = () => {
    setIsOpen(true);
    triggerRomanticConfetti();
  };

  return (
    <section id="time-capsule" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
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
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
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

        {/* Time Capsule Container */}
        <div className="relative max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="sealed-capsule"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-300/80 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#150f24] flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl mb-6">
                  <Lock className="w-9 h-9" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-3">
                  Digital Time Capsule Sealed
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 mb-8 font-medium max-w-sm">
                  A timeless message preserved across years, decades, and lifetimes.
                </p>

                <motion.button
                  onClick={handleOpenCapsule}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 via-pink-500 to-rose-500 text-white font-bold text-base shadow-xl flex items-center gap-2 border border-white/40 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{birthdayData.timeCapsule.buttonText}</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-capsule"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-300 dark:border-teal-500/40 shadow-2xl bg-white/95 dark:bg-[#150f24] text-center"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-purple-900/60 flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-300">
                  <Mail className="w-7 h-7" />
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-800 dark:text-teal-300 block mb-2">
                  Message From Future Me ⏳
                </span>

                <div className="p-6 sm:p-8 rounded-2xl bg-teal-50/80 dark:bg-purple-950/70 border border-teal-200 dark:border-white/10 mb-6">
                  <p className="font-serif text-xl sm:text-2xl text-rose-800 dark:text-teal-200 leading-relaxed italic mb-4 font-normal">
                    "{birthdayData.timeCapsule.quote}"
                  </p>
                  <div className="w-16 h-0.5 bg-teal-400 mx-auto my-3" />
                  <p className="text-sm text-[#1e132c] dark:text-slate-200 font-medium">
                    {birthdayData.timeCapsule.note}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-rose-600 font-bold text-sm">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>Always & Forever Yours</span>
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
