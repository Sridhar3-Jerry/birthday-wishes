import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Smile, CheckCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';

export default function SmileQuestion() {
  const [answered, setAnswered] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState('');

  const handleAnswer = (ans) => {
    setChosenAnswer(ans);
    setAnswered(true);
    triggerHeartBurst();
    triggerRomanticConfetti();
  };

  return (
    <section id="smile-check" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-pink-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Smile className="w-3.5 h-3.5 text-rose-500" />
          <span>{birthdayData.smileQuestion.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.smileQuestion.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] font-serif text-2xl sm:text-3xl max-w-lg mx-auto mb-10 font-bold"
        >
          "{birthdayData.smileQuestion.question}"
        </motion.p>

        {/* Interactive Answer Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-300/80 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#150f24] max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {!answered ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  onClick={() => handleAnswer(birthdayData.smileQuestion.yesBtn)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{birthdayData.smileQuestion.yesBtn}</span>
                </motion.button>

                <motion.button
                  onClick={() => handleAnswer(birthdayData.smileQuestion.ofCourseBtn)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/40"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>{birthdayData.smileQuestion.ofCourseBtn}</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="answered"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-teal-500 flex items-center justify-center text-white text-3xl mb-4 shadow-xl">
                  🥰
                </div>

                <div className="px-4 py-1 rounded-full bg-teal-100 dark:bg-purple-900/60 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
                  You chose: {chosenAnswer}
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-rose-700 dark:text-teal-300 mb-2">
                  {birthdayData.smileQuestion.response}
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 font-medium">
                  Your smile is the greatest gift in the universe to me.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
