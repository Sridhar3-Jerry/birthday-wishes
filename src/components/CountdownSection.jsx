import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function CountdownSection() {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false
  });

  const [forceBirthdayMode, setForceBirthdayMode] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(birthdayData.birthdayDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0 || forceBirthdayMode) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isBirthday: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isBirthday: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [forceBirthdayMode]);

  const handleCelebrateToggle = () => {
    setForceBirthdayMode(!forceBirthdayMode);
    triggerRomanticConfetti();
  };

  const isToday = timeLeft.isBirthday || forceBirthdayMode;

  return (
    <section id="countdown" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.countdown.badge}</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {isToday ? (
            <span className="text-gradient-peacock">
              {birthdayData.countdown.celebrationTitle}
            </span>
          ) : (
            <span>{birthdayData.countdown.waitingTitle}</span>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-12 font-medium"
        >
          {isToday ? birthdayData.countdown.celebrationSubtitle : birthdayData.countdown.waitingSubtitle}
        </motion.p>

        {/* Countdown Cards or Birthday Celebration Banner */}
        {!isToday ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { 
                label: 'Days', 
                value: timeLeft.days, 
                lightBg: 'from-teal-100/95 via-cyan-50/90 to-pink-100/95', 
                darkBg: 'from-teal-950/70 via-cyan-950/60 to-purple-950/70',
                border: 'border-teal-300 dark:border-teal-500/40', 
                text: 'text-teal-950 dark:text-teal-300' 
              },
              { 
                label: 'Hours', 
                value: timeLeft.hours, 
                lightBg: 'from-pink-100/95 via-rose-50/90 to-purple-100/95', 
                darkBg: 'from-rose-950/70 via-pink-950/60 to-purple-950/70',
                border: 'border-pink-300 dark:border-pink-500/40', 
                text: 'text-rose-950 dark:text-pink-300' 
              },
              { 
                label: 'Minutes', 
                value: timeLeft.minutes, 
                lightBg: 'from-purple-100/95 via-indigo-50/90 to-teal-100/95', 
                darkBg: 'from-purple-950/70 via-indigo-950/60 to-teal-950/70',
                border: 'border-purple-300 dark:border-purple-500/40', 
                text: 'text-purple-950 dark:text-purple-300' 
              },
              { 
                label: 'Seconds', 
                value: timeLeft.seconds, 
                lightBg: 'from-cyan-100/95 via-sky-50/90 to-pink-100/95', 
                darkBg: 'from-cyan-950/70 via-sky-950/60 to-pink-950/70',
                border: 'border-cyan-300 dark:border-cyan-500/40', 
                text: 'text-cyan-950 dark:text-cyan-300' 
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`glass-card p-5 sm:p-7 rounded-3xl border ${item.border} bg-gradient-to-b ${isDark ? item.darkBg : item.lightBg} shadow-xl text-center relative overflow-hidden`}
              >
                <div className="absolute top-2.5 right-2.5 text-teal-600/50 dark:text-teal-300/30">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <div className={`font-serif text-3xl sm:text-5xl font-extrabold ${item.text} mb-1 tracking-tight`}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase font-extrabold tracking-widest text-purple-950/90 dark:text-purple-300/80">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-10 rounded-3xl border border-teal-300/90 dark:border-teal-500/40 bg-gradient-to-r from-teal-100 via-purple-100 to-pink-100 dark:from-teal-950/80 dark:via-purple-950/80 dark:to-pink-950/80 shadow-2xl max-w-2xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              <span className="text-5xl animate-bounce">🎂</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-700 dark:text-teal-300 mb-2">
              The Day We Celebrate You Has Arrived!
            </h3>
            <p className="text-[#1e132c] dark:text-purple-100 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              May every single second of today be wrapped in warmth, sweet memories, lots of cake, and all the love you deserve.
            </p>
            <button
              onClick={() => triggerRomanticConfetti()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer inline-flex items-center gap-2 border border-white/30"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Celebrate With Confetti! ✨</span>
            </button>
          </motion.div>
        )}

        {/* Demo / Toggle Celebration Switcher */}
        <div className="mt-8">
          <button
            onClick={handleCelebrateToggle}
            className="text-xs text-teal-800 dark:text-teal-400 hover:text-rose-600 dark:hover:text-teal-300 underline font-semibold transition-colors cursor-pointer"
          >
            {isToday ? "Switch back to Countdown view" : "Preview 'Birthday Is Today' celebration mode ✨"}
          </button>
        </div>
      </div>
    </section>
  );
}
