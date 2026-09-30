import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function SurpriseSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();

  const openSurprise = () => {
    setModalOpen(true);
    triggerHeartBurst();
    triggerRomanticConfetti();
  };

  return (
    <section id="surprise" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Surprise Teaser Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-tr from-teal-200/80 via-pink-200/80 to-purple-200/80 dark:from-teal-950/60 dark:via-purple-950/80 dark:to-rose-950/60 border border-teal-300/80 dark:border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Decorative floating shapes */}
          <div className="absolute -top-6 -left-6 w-36 h-36 bg-teal-400/25 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-pink-400/25 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-purple-900/90 backdrop-blur-md text-xs font-bold text-teal-950 dark:text-teal-200 mb-6 shadow-md border border-teal-300 dark:border-teal-500/30">
              <Gift className="w-3.5 h-3.5 text-rose-500" />
              <span>{birthdayData.surprise.badge}</span>
            </div>

            {/* Pulsing Gift Box Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -3, 3, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500 via-rose-500 to-purple-600 flex items-center justify-center text-4xl text-white shadow-xl shadow-teal-500/30 mb-6 cursor-pointer border border-white/40"
              onClick={openSurprise}
            >
              <span>{birthdayData.surprise.giftIcon}</span>
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-4 max-w-xl">
              A Secret Note Stored Just For This Moment
            </h2>

            <p className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mb-8 leading-relaxed font-medium">
              Before this magical day wraps up, there is one last heartfelt message locked inside this box for you.
            </p>

            {/* Grand Surprise Trigger Button */}
            <motion.button
              id="surprise-btn"
              onClick={openSurprise}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(13, 148, 136, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-teal-600 via-rose-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-teal-400/30 flex items-center gap-3 cursor-pointer border border-white/40"
            >
              <Heart className="w-6 h-6 fill-white animate-heart-pulse" />
              <span>{birthdayData.surprise.buttonText}</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </motion.button>
          </div>
        </motion.div>

        {/* Modal Window with Heartfelt Surprise Message */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-xl w-full bg-white dark:bg-[#181329] rounded-3xl p-6 sm:p-10 border-2 border-teal-300 dark:border-teal-500/40 shadow-2xl text-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-teal-100 dark:bg-purple-900/60 hover:bg-teal-200 text-[#1e132c] dark:text-purple-200 transition-colors cursor-pointer"
                  aria-label="Close surprise modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Animated Heart Icon */}
                <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-500/40 flex items-center justify-center mx-auto mb-5 text-rose-500 shadow-inner">
                  <Heart className="w-8 h-8 fill-rose-500 animate-heart-pulse" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e132c] dark:text-white mb-4">
                  {birthdayData.surprise.modalTitle}
                </h3>

                {/* Main Emotional Message */}
                <div className="p-6 rounded-2xl bg-teal-50/70 dark:bg-purple-950/70 border border-teal-200/80 dark:border-white/10 shadow-sm mb-6">
                  <p className="font-serif text-lg sm:text-xl text-rose-800 dark:text-teal-200 leading-relaxed italic font-normal">
                    "{birthdayData.surprise.message}"
                  </p>
                </div>

                {/* Secondary heartfelt note */}
                <p className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  {birthdayData.surprise.extraNote}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      triggerHeartBurst();
                      triggerRomanticConfetti();
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-600 via-rose-500 to-pink-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 border border-white/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Send More Hearts & Confetti ❤️</span>
                  </button>

                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 text-[#1e132c] dark:text-purple-200 font-bold text-sm border-2 border-teal-300 dark:border-white/15 cursor-pointer"
                  >
                    Close & Keep Smiling 😊
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
