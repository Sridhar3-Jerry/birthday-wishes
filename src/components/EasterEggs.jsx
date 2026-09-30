import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Stars, X } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

export default function EasterEggs({ logoClicks, onResetLogoClicks }) {
  const [modalContent, setModalContent] = useState(null);
  const [keyBuffer, setKeyBuffer] = useState('');

  // Easter Egg 1: Logo 5 Clicks
  useEffect(() => {
    if (logoClicks >= 5) {
      setModalContent({
        title: "Hidden Secret Found! 💖",
        message: birthdayData.easterEggs.logoMessage,
        icon: "🥰"
      });
      triggerHeartBurst();
      triggerRomanticConfetti();
      onResetLogoClicks();
    }
  }, [logoClicks, onResetLogoClicks]);

  // Easter Egg 2: Secret Keyboard Typing "love"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key.length === 1 && /[a-z]/.test(key)) {
        const nextBuffer = (keyBuffer + key).slice(-4);
        setKeyBuffer(nextBuffer);

        if (nextBuffer === birthdayData.easterEggs.secretCode) {
          setModalContent({
            title: "Secret Word Unlocked: LOVE 💌",
            message: "You typed the magic word! My heart belongs to you in every world and language. ❤️",
            icon: "🗝️"
          });
          triggerHeartBurst();
          triggerRomanticConfetti();
          setKeyBuffer('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyBuffer]);

  // Easter Egg 3: Secret Star Click
  const handleSecretStarClick = () => {
    setModalContent({
      title: "Secret Star Discovered ✨",
      message: birthdayData.easterEggs.starMessage,
      icon: "⭐"
    });
    triggerHeartBurst();
  };

  return (
    <>
      {/* Tiny Hidden Secret Star (fixed subtle decor in bottom-left corner) */}
      <motion.button
        onClick={handleSecretStarClick}
        whileHover={{ scale: 1.5, rotate: 180 }}
        whileTap={{ scale: 0.8 }}
        className="fixed bottom-6 left-6 z-40 p-2 text-teal-400/40 hover:text-amber-400 transition-colors cursor-pointer"
        title="✨"
      >
        <Stars className="w-4 h-4 animate-pulse" />
      </motion.button>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setModalContent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-md w-full bg-white dark:bg-[#160f29] rounded-3xl p-8 border-2 border-teal-400 shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-teal-50 dark:bg-purple-900/60 text-[#1e132c] dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-4xl mb-3">{modalContent.icon}</div>
              <h3 className="font-serif text-2xl font-bold text-rose-700 dark:text-teal-300 mb-3">
                {modalContent.title}
              </h3>
              <p className="text-base text-[#1e132c] dark:text-slate-100 mb-6 font-normal">
                "{modalContent.message}"
              </p>

              <button
                onClick={() => setModalContent(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-rose-500 text-white font-bold text-sm shadow-md"
              >
                Close & Keep Exploring ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
