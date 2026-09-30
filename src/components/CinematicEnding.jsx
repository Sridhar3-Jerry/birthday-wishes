import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import FloatingParticles from './FloatingParticles';

export default function CinematicEnding() {
  const [step, setStep] = useState(0);

  const advanceStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      triggerRomanticConfetti();
    }
  };

  return (
    <section id="cinematic-ending" className="py-28 px-4 relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-purple-100/40 to-teal-100/40 dark:via-purple-950/40 dark:to-[#080511]">
      <FloatingParticles count={25} opacity={0.3} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-teal-300/80 dark:border-teal-500/40 shadow-2xl bg-white/95 dark:bg-[#150f24] max-w-3xl mx-auto"
        >
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
            >
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white block mb-6">
                {birthdayData.cinematicEnding.waitText}
              </span>
              <button
                onClick={advanceStep}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-rose-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer border border-white/30"
              >
                What is it? ✨
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <span className="font-serif text-3xl sm:text-5xl font-bold text-rose-700 dark:text-teal-300 block mb-6">
                {birthdayData.cinematicEnding.moreThing}
              </span>
              <button
                onClick={() => {
                  advanceStep();
                  triggerRomanticConfetti();
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer border border-white/30"
              >
                Tell Me ❤️
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-purple-900/60 flex items-center justify-center text-rose-500 mx-auto shadow-inner">
                <Heart className="w-8 h-8 fill-rose-500 animate-heart-pulse" />
              </div>

              <h3 className="font-serif text-4xl sm:text-6xl font-bold text-gradient-peacock script-safe">
                {birthdayData.cinematicEnding.finalBday}
              </h3>

              <p className="font-serif text-lg sm:text-2xl text-[#1e132c] dark:text-slate-100 max-w-xl mx-auto leading-relaxed font-normal">
                "{birthdayData.cinematicEnding.message}"
              </p>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto my-4" />

              <p className="font-script text-3xl sm:text-5xl text-rose-600 dark:text-teal-300 font-bold">
                {birthdayData.cinematicEnding.closing}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
