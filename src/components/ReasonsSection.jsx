import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function ReasonsSection() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [unlockedCards, setUnlockedCards] = useState(new Set());
  const { isDark } = useTheme();

  const handleCardClick = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
      const newUnlocked = new Set(unlockedCards);
      newUnlocked.add(id);
      setUnlockedCards(newUnlocked);

      if (newUnlocked.size === birthdayData.reasons.length) {
        triggerRomanticConfetti();
      }
    }
  };

  return (
    <section id="reasons" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Countless Little Reasons</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            Reasons Why I Love You ❤️
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            I could list millions of reasons, but here are a few tender truths that make my heart beat for you every day. Tap each card to reveal my secret thoughts!
          </motion.p>

          {/* Progress Tracker */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-purple-950/90 border border-teal-300 dark:border-teal-500/40 text-xs font-bold text-teal-950 dark:text-teal-200 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>
              Discovered {unlockedCards.size} of {birthdayData.reasons.length} secret notes
            </span>
            {unlockedCards.size === birthdayData.reasons.length && (
              <span className="text-rose-600 dark:text-pink-400 font-extrabold ml-1">🎉 All revealed!</span>
            )}
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdayData.reasons.map((reason, index) => {
            const isExpanded = expandedCard === reason.id;
            const isUnlocked = unlockedCards.has(reason.id);

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleCardClick(reason.id)}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer shadow-xl overflow-hidden glass-card bg-white/95 dark:bg-[#150f24] ${
                  isExpanded
                    ? 'ring-2 ring-teal-500 bg-white dark:bg-[#18112b] shadow-teal-400/25 border-teal-400'
                    : 'hover:shadow-2xl hover:border-teal-400 border-teal-200/80 dark:border-white/10'
                }`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-100 via-pink-100 to-purple-100 dark:from-teal-950 dark:via-purple-900 dark:to-rose-950 flex items-center justify-center text-3xl shadow-sm border border-teal-300/60 dark:border-teal-500/30">
                    <span>{reason.icon}</span>
                  </div>
                  {isUnlocked && (
                    <div className="flex items-center gap-1 text-[11px] font-extrabold text-teal-900 dark:text-teal-200 bg-teal-100/80 dark:bg-teal-950/90 px-2.5 py-1 rounded-full border border-teal-400 dark:border-teal-500/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                      <span>Read</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white mb-1 flex items-center justify-between">
                  <span>{reason.title}</span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-teal-600 dark:text-teal-400"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </h3>

                {/* Short Summary */}
                <p className="text-xs font-bold text-rose-600 dark:text-teal-300 mb-3">
                  {reason.shortSummary}
                </p>

                {/* Collapsible Secret Message */}
                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="pt-3 border-t border-teal-200/60 dark:border-white/10"
                    >
                      <p className="text-[#1e132c] dark:text-purple-100 text-sm leading-relaxed font-sans italic bg-teal-50 dark:bg-purple-900/40 p-3.5 rounded-xl border border-teal-200 dark:border-teal-500/30 font-medium">
                        "{reason.message}"
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-teal-800 dark:text-purple-300 text-xs flex items-center gap-1 mt-2 font-semibold">
                      <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                      <span>Tap to read my secret note...</span>
                    </p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
