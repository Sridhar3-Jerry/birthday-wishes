import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Compass, ChevronDown } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function FutureMemories() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDream = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="future-memories" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.futureMemories.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.futureMemories.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-14 font-medium"
        >
          {birthdayData.futureMemories.subtitle}
        </motion.p>

        {/* Future Bucket List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {birthdayData.futureMemories.dreams.map((dream, index) => {
            const isExpanded = expandedId === dream.id;

            return (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => toggleDream(dream.id)}
                whileHover={{ scale: 1.02 }}
                className={`glass-card rounded-3xl p-6 border-2 transition-all cursor-pointer shadow-lg bg-white/95 dark:bg-[#150f24] overflow-hidden ${
                  isExpanded
                    ? 'border-teal-400 shadow-teal-300/30'
                    : 'border-teal-200/80 dark:border-white/10 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{dream.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-purple-900/50 text-[11px] font-extrabold text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-500/40">
                    {dream.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1e132c] dark:text-white mb-2 flex items-center justify-between">
                  <span>{dream.title}</span>
                  <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown className="w-4 h-4 text-teal-600" />
                  </motion.span>
                </h3>

                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 border-t border-teal-100 dark:border-white/10"
                    >
                      <p className="text-xs font-bold text-rose-600 dark:text-teal-300 mb-2">
                        ✨ {birthdayData.futureMemories.cardPrompt}
                      </p>
                      <p className="text-[#1e132c] dark:text-slate-200 text-sm leading-relaxed font-normal bg-teal-50/60 dark:bg-purple-950/60 p-3 rounded-xl">
                        "{dream.note}"
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold mt-1">
                      Tap to view dream... ✨
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
