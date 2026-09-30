import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function FinalMessage() {
  const { isDark } = useTheme();

  return (
    <section className="relative py-28 px-4 overflow-hidden z-10">
      {/* Background Gradient Mesh with Lavender -> Pink -> Peacock Blue */}
      <div className={`absolute inset-0 transition-colors duration-700 -z-10 ${
        isDark 
          ? 'bg-gradient-to-b from-purple-950/50 via-teal-950/40 to-[#080511]' 
          : 'bg-gradient-to-b from-purple-100/50 via-pink-100/50 to-teal-100/50'
      }`} />

      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-300 mb-6 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.finalMessage.badge}</span>
        </motion.div>

        {/* Cinematic Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#1e132c] dark:text-white mb-8 leading-tight drop-shadow-sm px-4"
        >
          <span>{birthdayData.finalMessage.title}</span>
        </motion.h2>

        {/* Emotional Message Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-teal-200/80 dark:border-white/10 shadow-2xl max-w-3xl mx-auto mb-10 text-center bg-white/95 dark:bg-[#150f24]"
        >
          <p className="font-serif text-lg sm:text-2xl text-[#1e132c] dark:text-purple-100 leading-relaxed mb-6 font-normal">
            "{birthdayData.finalMessage.paragraph1}"
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto my-6" />

          <p className="font-serif text-lg sm:text-2xl text-[#1e132c] dark:text-purple-100 leading-relaxed mb-8 font-normal">
            "{birthdayData.finalMessage.paragraph2}"
          </p>

          {/* Grand Love Statement with Safe Script and Pulsing Heart */}
          <div className="pt-4 flex flex-col items-center justify-center overflow-visible">
            <motion.div
              whileHover={{ scale: 1.08 }}
              onClick={() => triggerRomanticConfetti()}
              className="cursor-pointer flex flex-col items-center overflow-visible py-2"
            >
              <div className="relative mb-3">
                <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-heart-pulse drop-shadow-xl" />
                <Sparkles className="w-6 h-6 text-teal-500 dark:text-teal-400 absolute -top-2 -right-2 animate-spin-slow" />
              </div>

              <div className="font-script text-6xl sm:text-7xl md:text-8xl text-gradient-peacock script-safe drop-shadow-sm">
                {birthdayData.finalMessage.loveStatement}
              </div>
            </motion.div>

            <p className="text-xs sm:text-sm font-sans text-teal-900 dark:text-teal-300 tracking-widest uppercase mt-4 font-bold">
              {birthdayData.finalMessage.subscript}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
