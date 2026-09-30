import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, MailOpen, Feather, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDark } = useTheme();

  const toggleLetter = () => {
    if (!isOpen) {
      triggerRomanticConfetti();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-24 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/80 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-300 mb-3 shadow-md bg-white/95 dark:bg-[#140e24]/95"
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
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

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-3xl p-1 sm:p-2 bg-gradient-to-r from-teal-300/80 via-pink-300/70 to-purple-300/80 dark:from-teal-900/40 dark:via-pink-900/40 dark:to-purple-900/40 shadow-2xl">
            <div className="bg-white dark:bg-[#140e24] rounded-[22px] p-6 sm:p-12 border border-teal-200/90 dark:border-white/10 relative overflow-hidden transition-colors duration-500">
              
              {/* Paper Background Texture Decor */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pink-100/50 dark:from-teal-900/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-teal-100/50 dark:from-purple-900/20 to-transparent rounded-tr-full pointer-events-none" />

              {/* Romantic Vintage Postmark stamp */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-center border border-dashed border-rose-400 dark:border-teal-500/50 rounded-lg p-2 bg-pink-50/80 dark:bg-purple-950/60">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
                  <span className="text-[10px] uppercase tracking-wider text-rose-900 dark:text-teal-300 font-extrabold mt-1">Special Airmail</span>
                  <span className="text-[9px] text-teal-800 dark:text-purple-300 font-semibold">With All My Heart</span>
                </div>
              </div>

              {/* Envelope Toggle Button */}
              <div className="mb-6 flex justify-start">
                <button
                  onClick={toggleLetter}
                  className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-full bg-teal-50 dark:bg-purple-900/50 hover:bg-teal-100 dark:hover:bg-purple-900 text-teal-950 dark:text-teal-300 transition-colors cursor-pointer border border-teal-300 dark:border-teal-500/30 shadow-sm"
                >
                  {isOpen ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                  <span>{isOpen ? 'Fold Letter' : 'Open Letter 💌'}</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Salutation without clipping */}
                    <div className="font-script text-4xl sm:text-5xl text-rose-700 dark:text-teal-300 script-safe font-semibold">
                      {birthdayData.loveLetter.salutation}
                    </div>

                    {/* Letter Body Paragraphs */}
                    <div className="space-y-4 font-serif text-base sm:text-lg text-[#1e132c] dark:text-[#f8fafc] leading-relaxed font-normal">
                      {birthdayData.loveLetter.paragraphs.map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index }}
                          className="first-letter:text-2xl first-letter:font-bold first-letter:text-rose-600 dark:first-letter:text-teal-400"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    {/* Closing & Signature */}
                    <div className="pt-6 border-t border-teal-200/60 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-teal-900 dark:text-purple-300 font-extrabold mb-1">
                          {birthdayData.loveLetter.closing}
                        </p>
                        <p className="font-handwriting text-3xl sm:text-4xl text-rose-700 dark:text-teal-300 font-bold script-safe">
                          {birthdayData.loveLetter.signature}
                        </p>
                      </div>

                      {/* Wax Seal Stamp Aesthetic */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-teal-600 flex items-center justify-center text-white shadow-lg border-2 border-rose-300 transform rotate-12">
                          <Heart className="w-6 h-6 fill-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-purple-900/60 flex items-center justify-center mx-auto mb-4 text-rose-600 dark:text-teal-300">
                      <Mail className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-lg text-[#1e132c] dark:text-white mb-4 font-semibold">
                      The envelope is sealed with a golden wax stamp...
                    </p>
                    <button
                      onClick={toggleLetter}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer border border-white/30"
                    >
                      Break Wax Seal & Read Letter 💌
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
