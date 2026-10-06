import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Calendar, ChevronLeft, ChevronRight, Play, Pause, Clock, Camera } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function MemoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedMemories, setLikedMemories] = useState({});
  const memories = birthdayData.memories || [];
  const activeMemory = memories[activeIndex] || memories[0];
  const { isDark } = useTheme();

  // Auto-walk story progression
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memories.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, memories.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLikeMemory = (id, e) => {
    e.stopPropagation();
    setLikedMemories((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    triggerRomanticConfetti();
  };

  return (
    <section id="memories" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
            <span>Cherished Moments Timeline</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            Our Beautiful Memories ✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            Every step with you is a treasure I hold close to my heart. Step through our unforgettable story.
          </motion.p>
        </div>

        {/* 1. Interactive Horizontal Chapter Time Scrubber */}
        <div className="relative mb-10 max-w-4xl mx-auto px-2">
          {/* Glowing Connecting Timeline Bar */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 via-pink-400 to-rose-500 shadow-md"
              initial={false}
              animate={{
                width: `${(activeIndex / (memories.length - 1)) * 100}%`
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            />
          </div>

          {/* Chapter Milestone Nodes */}
          <div className="relative flex justify-between items-center z-10">
            {memories.map((mem, idx) => {
              const isActive = activeIndex === idx;
              const isPast = activeIndex >= idx;

              return (
                <button
                  key={mem.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  aria-label={`Jump to chapter ${idx + 1}: ${mem.title}`}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive
                        ? '#f43f5e'
                        : isPast
                        ? '#0d9488'
                        : isDark
                        ? '#1e1435'
                        : '#ffffff'
                    }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                      isActive
                        ? 'border-white text-white shadow-[0_0_20px_rgba(244,63,94,0.7)] ring-4 ring-pink-300/40'
                        : isPast
                        ? 'border-teal-300 text-white'
                        : 'border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isActive ? (
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    ) : (
                      <span className="text-xs sm:text-sm font-extrabold">{idx + 1}</span>
                    )}
                  </motion.div>

                  {/* Node Subtitle Tag */}
                  <span
                    className={`hidden md:block text-[11px] font-bold mt-2 whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? 'text-rose-600 dark:text-pink-300 font-extrabold scale-105'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {mem.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Cinematic Memory Showcase Card */}
        <div className="relative max-w-4xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory.id}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-teal-200/90 dark:border-teal-500/30 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden"
            >
              {/* Background Ambient Glow */}
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/15 via-teal-500/15 to-purple-500/10 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Memory Photo with Glass Frame & Tag */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border-2 border-white/60 dark:border-white/10 group">
                    <img
                      src={activeMemory.image}
                      alt={activeMemory.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay for photo depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Tag Badge on Image */}
                    <div className="absolute top-3.5 left-3.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#150f24]/95 backdrop-blur-md text-xs font-extrabold text-teal-900 dark:text-teal-300 shadow-md border border-teal-300/80 dark:border-teal-500/50 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-pink-500" />
                      <span>{activeMemory.tag}</span>
                    </div>

                    {/* Heart Reaction Badge on Photo */}
                    <button
                      onClick={(e) => handleLikeMemory(activeMemory.id, e)}
                      className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      title="Send love to this memory"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>{likedMemories[activeMemory.id] || 1}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Memory Story Details */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left">
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-pink-300 border border-rose-200/60 dark:border-rose-800/40 text-xs font-bold mb-3 self-start shadow-xs">
                    <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{activeMemory.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mb-4 leading-tight">
                    {activeMemory.title}
                  </h3>

                  {/* Story Description */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 dark:bg-purple-950/40 border border-teal-200/60 dark:border-teal-500/20 mb-6 shadow-inner">
                    <p className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base leading-relaxed font-normal">
                      "{activeMemory.description}"
                    </p>
                  </div>

                  {/* Story Step Indicator & Chapter Info */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      <span>Chapter {activeIndex + 1} of {memories.length}</span>
                    </div>

                    <button
                      onClick={(e) => handleLikeMemory(activeMemory.id, e)}
                      className="text-rose-500 hover:text-rose-600 font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cherish This Memory ❤️</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Interactive Journey Controls & Thumbnail Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Navigation Arrows & Auto Play Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white dark:bg-[#150f24] hover:bg-teal-50 dark:hover:bg-purple-900/60 text-teal-900 dark:text-teal-200 border-2 border-teal-200/80 dark:border-teal-500/30 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous Memory"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/40 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Walk</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Auto-Walk Story ✨</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white dark:bg-[#150f24] hover:bg-teal-50 dark:hover:bg-purple-900/60 text-teal-900 dark:text-teal-200 border-2 border-teal-200/80 dark:border-teal-500/30 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Next Memory"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mini Thumbnail Strip Preview */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {memories.map((mem, idx) => (
              <button
                key={mem.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-rose-500 scale-110 shadow-lg ring-2 ring-rose-400/40'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
