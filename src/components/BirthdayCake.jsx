import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wind, RotateCcw, Cake as CakeIcon } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerHeartBurst, triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function BirthdayCake() {
  const { isDark } = useTheme();
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, color: '#f43f5e' }, // Rose/red candle
    { id: 2, isLit: true, color: '#0d9488' }, // Peacock Teal candle
    { id: 3, isLit: true, color: '#a855f7' }, // Lavender candle
  ]);

  const [wishMade, setWishMade] = useState(false);

  const extinguishCandle = (id) => {
    const updated = candles.map((c) => (c.id === id ? { ...c, isLit: false } : c));
    setCandles(updated);

    const allOut = updated.every((c) => !c.isLit);
    if (allOut) {
      celebrateWish();
    }
  };

  const blowAllCandles = () => {
    const updated = candles.map((c) => ({ ...c, isLit: false }));
    setCandles(updated);
    celebrateWish();
  };

  const celebrateWish = () => {
    setWishMade(true);
    triggerHeartBurst();
    triggerRomanticConfetti();
  };

  const relightCandles = () => {
    setCandles(candles.map((c) => ({ ...c, isLit: true })));
    setWishMade(false);
  };

  const litCount = candles.filter((c) => c.isLit).length;

  return (
    <section id="cake" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <CakeIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.cakeSection.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.cakeSection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.cakeSection.subtitle}
        </motion.p>

        {/* Interactive Cake Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-12 border border-teal-200/80 dark:border-white/10 shadow-2xl max-w-2xl mx-auto relative overflow-hidden bg-white/95 dark:bg-[#150f24]"
        >
          {/* Wish Granted Celebration Banner */}
          <AnimatePresence>
            {wishMade && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-teal-100 via-pink-100 to-purple-100 dark:from-teal-950/90 dark:via-purple-950/90 dark:to-pink-950/90 border border-teal-300 dark:border-teal-500/40 shadow-lg text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-700 dark:text-teal-300">
                    {birthdayData.cakeSection.wishGrantedMessage}
                  </h3>
                  <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
                </div>
                <p className="text-[#1e132c] dark:text-purple-100 text-sm sm:text-base font-medium">
                  {birthdayData.cakeSection.wishSubtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Cake & Candles */}
          <div className="relative w-72 sm:w-80 h-64 mx-auto flex flex-col items-center justify-end pb-4">
            
            {/* Candles Row */}
            <div className="flex items-end justify-center gap-8 sm:gap-12 mb-[-8px] z-20">
              {candles.map((candle) => (
                <div
                  key={candle.id}
                  onClick={() => candle.isLit && extinguishCandle(candle.id)}
                  className="flex flex-col items-center cursor-pointer group"
                  title={candle.isLit ? "Click to blow out candle" : "Extinguished"}
                >
                  {/* Candle Flame / Smoke */}
                  <div className="h-10 flex items-end justify-center relative">
                    {candle.isLit ? (
                      <div className="relative">
                        <div className="absolute -inset-2 bg-amber-400/40 rounded-full blur-sm animate-pulse" />
                        <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full rounded-b-sm flame-animation" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -25, scale: 1.5 }}
                        transition={{ duration: 1.2 }}
                        className="text-gray-400 font-bold text-xs"
                      >
                        💨
                      </motion.div>
                    )}
                  </div>

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-gray-700 dark:bg-gray-400" />

                  {/* Candle Body */}
                  <div
                    className="w-4 h-14 rounded-t-sm shadow-md transition-transform group-hover:scale-105"
                    style={{
                      background: `repeating-linear-gradient(45deg, ${candle.color}, ${candle.color} 6px, #ffffff 6px, #ffffff 12px)`
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cake Structure */}
            <div className="w-full flex flex-col items-center">
              {/* Top Layer */}
              <div className="w-48 sm:w-56 h-16 rounded-t-2xl bg-gradient-to-r from-pink-200 via-teal-100 to-pink-200 dark:from-purple-900 dark:via-teal-900 dark:to-purple-900 border-2 border-pink-300 dark:border-teal-500/40 shadow-md relative overflow-hidden flex items-center justify-center">
                {/* Frosting Drips */}
                <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-4 bg-white dark:bg-pink-200/90 rounded-b-full shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-rose-700 dark:text-teal-300 font-script text-2xl pt-2 script-safe font-semibold">
                  My Love
                </div>
              </div>

              {/* Bottom Layer */}
              <div className="w-64 sm:w-72 h-20 rounded-2xl bg-gradient-to-r from-purple-200 via-pink-200 to-teal-200 dark:from-purple-950 dark:via-pink-950 dark:to-teal-950 border-2 border-purple-300 dark:border-white/10 shadow-xl relative overflow-hidden flex items-center justify-center">
                {/* Frosting Swirls & Pearls */}
                <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-2">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-4 bg-white/90 rounded-b-full shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 text-rose-500">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-widest uppercase text-[#1e132c] dark:text-purple-100">
                    Happy Birthday
                  </span>
                  <Heart className="w-4 h-4 fill-rose-500" />
                </div>
              </div>

              {/* Cake Stand Platter */}
              <div className="w-72 sm:w-80 h-3 bg-gradient-to-r from-gray-200 via-white to-gray-200 dark:from-gray-700 dark:via-gray-500 dark:to-gray-700 rounded-full shadow-md mt-1 border border-gray-300 dark:border-gray-600" />
              <div className="w-28 h-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 rounded-b-xl shadow-inner" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {litCount > 0 ? (
              <motion.button
                onClick={blowAllCandles}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-teal-500 via-pink-500 to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/30"
              >
                <Wind className="w-4 h-4 animate-pulse" />
                <span>Blow Out All Candles 🎂</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={relightCandles}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full bg-white dark:bg-purple-900/60 hover:bg-teal-50 text-[#1e132c] dark:text-teal-300 font-bold text-sm border-2 border-teal-300 dark:border-teal-500/40 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Make Another Wish (Relight) ✨</span>
              </motion.button>
            )}
          </div>

          <p className="text-xs text-teal-900 dark:text-teal-400/80 mt-4 font-semibold">
            {litCount > 0 ? birthdayData.cakeSection.instructions : "All candles extinguished! Your wish is on its way to the stars ✨"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
