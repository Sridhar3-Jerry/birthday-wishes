import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Compass, ChevronDown, CheckCircle2, Bookmark, Star, ArrowUpRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';

const dreamVisuals = [
  {
    id: 1,
    gradient: 'from-amber-500/20 via-orange-500/15 to-rose-500/10',
    borderGlow: 'group-hover:border-amber-400/80 group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]',
    badgeStyle: 'bg-amber-100/90 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300',
    iconBg: 'from-amber-400 to-rose-500'
  },
  {
    id: 2,
    gradient: 'from-sky-500/20 via-blue-500/15 to-teal-500/10',
    borderGlow: 'group-hover:border-sky-400/80 group-hover:shadow-[0_15px_35px_rgba(14,165,233,0.25)]',
    badgeStyle: 'bg-sky-100/90 dark:bg-sky-950/70 border-sky-300 dark:border-sky-500/40 text-sky-900 dark:text-sky-300',
    iconBg: 'from-sky-400 to-teal-500'
  },
  {
    id: 3,
    gradient: 'from-teal-500/20 via-cyan-500/15 to-blue-500/10',
    borderGlow: 'group-hover:border-teal-400/80 group-hover:shadow-[0_15px_35px_rgba(20,184,166,0.25)]',
    badgeStyle: 'bg-teal-100/90 dark:bg-teal-950/70 border-teal-300 dark:border-teal-500/40 text-teal-900 dark:text-teal-300',
    iconBg: 'from-teal-400 to-cyan-500'
  },
  {
    id: 4,
    gradient: 'from-pink-500/20 via-rose-500/15 to-purple-500/10',
    borderGlow: 'group-hover:border-pink-400/80 group-hover:shadow-[0_15px_35px_rgba(236,72,153,0.25)]',
    badgeStyle: 'bg-pink-100/90 dark:bg-pink-950/70 border-pink-300 dark:border-pink-500/40 text-pink-900 dark:text-pink-300',
    iconBg: 'from-pink-400 to-purple-500'
  },
  {
    id: 5,
    gradient: 'from-indigo-500/20 via-purple-500/15 to-pink-500/10',
    borderGlow: 'group-hover:border-indigo-400/80 group-hover:shadow-[0_15px_35px_rgba(99,102,241,0.25)]',
    badgeStyle: 'bg-indigo-100/90 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-500/40 text-indigo-900 dark:text-indigo-300',
    iconBg: 'from-indigo-400 to-pink-500'
  },
  {
    id: 6,
    gradient: 'from-rose-500/20 via-pink-500/15 to-amber-500/10',
    borderGlow: 'group-hover:border-rose-400/80 group-hover:shadow-[0_15px_35px_rgba(244,63,94,0.25)]',
    badgeStyle: 'bg-rose-100/90 dark:bg-rose-950/70 border-rose-300 dark:border-rose-500/40 text-rose-900 dark:text-rose-300',
    iconBg: 'from-rose-500 to-amber-400'
  }
];

export default function FutureMemories() {
  const [expandedId, setExpandedId] = useState(null);
  const [promisedDreams, setPromisedDreams] = useState(new Set([1, 6])); // Default couple promises

  const toggleDream = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const togglePromise = (id, e) => {
    e.stopPropagation();
    const next = new Set(promisedDreams);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      triggerHeartBurst();
      triggerRomanticConfetti();
    }
    setPromisedDreams(next);
  };

  const totalDreams = birthdayData.futureMemories.dreams.length;
  const promisedCount = promisedDreams.size;

  return (
    <section id="future-memories" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Background Celestial Aurora Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[600px] bg-gradient-to-r from-teal-500/10 via-pink-500/15 to-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
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
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-6 font-medium"
        >
          {birthdayData.futureMemories.subtitle}
        </motion.p>

        {/* Progress Promise Tracker Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 dark:bg-[#160e28]/90 border border-teal-300/70 dark:border-teal-500/30 shadow-md backdrop-blur-md mb-12 text-xs font-bold"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-heart-pulse" />
          <span className="text-slate-700 dark:text-slate-200">
            {promisedCount} of {totalDreams} Future Dreams Sealed With Love 💍
          </span>
        </motion.div>

        {/* Future Bucket List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 text-left items-start">
          {birthdayData.futureMemories.dreams.map((dream, index) => {
            const isExpanded = expandedId === dream.id;
            const isPromised = promisedDreams.has(dream.id);
            const visual = dreamVisuals[index % dreamVisuals.length];

            return (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => toggleDream(dream.id)}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`group relative rounded-3xl p-6 sm:p-7 border-2 transition-all duration-400 cursor-pointer shadow-xl bg-white/95 dark:bg-[#150f24]/95 backdrop-blur-md overflow-hidden flex flex-col justify-between ${
                  isExpanded 
                    ? 'border-teal-400/90 dark:border-teal-400/80 shadow-[0_20px_40px_rgba(20,184,166,0.2)]' 
                    : `border-slate-200/80 dark:border-white/10 ${visual.borderGlow}`
                }`}
              >
                {/* Background Dream Atmospheric Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${visual.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700`} />

                {/* Top Bar: Icon Medallion + Tag + Promise Action */}
                <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                  {/* Glowing 3D Icon Medallion */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${visual.iconBg} p-0.5 shadow-md group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                    <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#181028] flex items-center justify-center text-3xl shadow-inner">
                      {dream.icon}
                    </div>
                  </div>

                  {/* Right Header Badges */}
                  <div className="flex items-center gap-2">
                    {/* Tag Pill */}
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border shadow-xs ${visual.badgeStyle}`}>
                      {dream.tag}
                    </span>

                    {/* Promise Toggle Button */}
                    <button
                      onClick={(e) => togglePromise(dream.id, e)}
                      className={`p-2 rounded-full border transition-all cursor-pointer ${
                        isPromised
                          ? 'bg-rose-500 border-rose-400 text-white shadow-md scale-105'
                          : 'bg-white/80 dark:bg-purple-950/60 border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-300'
                      }`}
                      title={isPromised ? "Promised with Love" : "Click to Promise"}
                    >
                      <Heart className={`w-4 h-4 ${isPromised ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Dream Title */}
                <div className="mb-2 relative z-10">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white group-hover:text-rose-600 dark:group-hover:text-teal-300 transition-colors flex items-center justify-between">
                    <span>{dream.title}</span>
                    <motion.span 
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-1 rounded-full bg-slate-100 dark:bg-purple-950/60 text-slate-500 dark:text-slate-300"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </h3>
                </div>

                {/* Expandable Story Note */}
                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 pt-4 mt-3 border-t border-teal-100 dark:border-white/10"
                    >
                      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-white/5 border border-amber-200/80 dark:border-white/10 text-left shadow-inner">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Our Unwritten Promise</span>
                        </div>
                        <p className="font-serif text-base text-[#1e132c] dark:text-purple-100 leading-relaxed italic">
                          "{dream.note}"
                        </p>
                      </div>

                      {/* Promised Status Footer */}
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-teal-300">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isPromised ? "Sealed in Our Bucket List ❤️" : "Tap Heart to Seal Promise"}
                        </span>
                        <span className="text-[11px] text-slate-400">Someday Soon ✨</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="relative z-10 mt-3 pt-2 flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-400 group-hover:text-rose-600 dark:group-hover:text-teal-300 transition-colors">
                      <span>{isPromised ? "💍 Promised • Tap to read note" : "Tap to open dream note... ✨"}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
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
