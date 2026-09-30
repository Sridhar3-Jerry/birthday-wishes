import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Infinity as InfinityIcon, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function LoveSlider() {
  const [value, setValue] = useState(30);
  const [isInfinity, setIsInfinity] = useState(false);
  const { isDark } = useTheme();

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setValue(val);

    if (val >= 98 && !isInfinity) {
      setIsInfinity(true);
      triggerRomanticConfetti();
    } else if (val < 90 && isInfinity) {
      setIsInfinity(false);
    }
  };

  const heartScale = isInfinity ? 1.6 : 0.8 + (value / 100) * 0.7;

  return (
    <section id="love-slider" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-pink-300/80 dark:border-teal-500/40 text-xs font-bold text-rose-700 dark:text-teal-300 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>{birthdayData.loveSlider.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.loveSlider.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.loveSlider.subtitle}
        </motion.p>

        {/* Interactive Slider Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-teal-200/90 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#150f24] relative overflow-hidden"
        >
          {/* Animated Heart Scaling with slider */}
          <div className="h-44 flex flex-col items-center justify-center relative mb-6">
            <motion.div
              animate={{
                scale: heartScale,
                rotate: [0, -4, 4, 0]
              }}
              transition={{
                scale: { type: 'spring', damping: 15, stiffness: 200 },
                rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative"
            >
              <div 
                className="absolute -inset-4 rounded-full blur-xl transition-all duration-300"
                style={{
                  background: isInfinity 
                    ? 'radial-gradient(circle, rgba(13, 148, 136, 0.6) 0%, rgba(244, 63, 94, 0.6) 100%)' 
                    : `rgba(244, 63, 94, ${0.15 + (value / 100) * 0.4})`
                }}
              />
              <Heart 
                className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl transition-colors duration-300"
                style={{
                  color: isInfinity ? '#0d9488' : '#f43f5e',
                  fill: isInfinity ? '#0d9488' : '#f43f5e'
                }}
              />
            </motion.div>
          </div>

          {/* Dynamic Value or Infinity Display */}
          <div className="mb-6">
            {isInfinity ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="font-serif text-6xl sm:text-7xl font-extrabold text-gradient-peacock flex items-center justify-center gap-2">
                  <InfinityIcon className="w-16 h-16 sm:w-20 sm:h-20 text-teal-600 animate-pulse" />
                </div>
                <p className="font-serif text-xl sm:text-2xl text-rose-700 dark:text-teal-300 font-bold mt-2">
                  {birthdayData.loveSlider.infinityMessage}
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="font-serif text-5xl sm:text-6xl font-extrabold text-teal-950 dark:text-teal-200">
                  {value}%
                </div>
                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-widest mt-1">
                  {value > 85 ? birthdayData.loveSlider.limitMessage : "Keep sliding further..."}
                </p>
              </div>
            )}
          </div>

          {/* Custom Range Slider */}
          <div className="max-w-md mx-auto relative px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gradient-to-r from-teal-200 via-pink-200 to-rose-400 rounded-lg appearance-none cursor-pointer accent-rose-500 shadow-inner"
            />
            <div className="flex justify-between text-xs font-bold text-[#334155] dark:text-slate-400 mt-2">
              <span>0% (A lot)</span>
              <span>50% (Whole Universe)</span>
              <span>100% (Infinite ∞)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
