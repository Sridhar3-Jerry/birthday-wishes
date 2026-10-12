import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Lock, 
  Eye, EyeOff, Sun, Moon, Stars, Heart
} from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';

export default function FriendBirthdayPage({ onUnlockSecret }) {
  const { isDark, toggleTheme } = useTheme();
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState({});

  const friendConfig = birthdayData.friendPage || {
    recipientName: "Bestie",
    title: "Happy Birthday, Bestie! 🎉",
    subtitle: "Wishing you a year filled with big laughs, unforgettable adventures, and endless happiness!"
  };

  const secretGateConfig = birthdayData.secretGate || {
    passwords: ["love", "143", "janu", "mylove", "secret"],
    defaultPassword: "love",
    hint: "What this entire secret is all about... 4 letters: 'love' ❤️",
  };

  // Blow cake candles
  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerRomanticConfetti();
  };

  // Balloon pop interaction
  const handlePopBalloon = (id) => {
    setPoppedBalloons((prev) => ({ ...prev, [id]: true }));
    triggerRomanticConfetti();
  };

  // Password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    const accepted = secretGateConfig.passwords || ["love", "143", "janu", "mylove"];

    if (accepted.includes(cleanInput)) {
      setPasswordError(false);
      triggerHeartBurst();
      triggerRomanticConfetti();
      setShowPasswordModal(false);
      if (onUnlockSecret) {
        onUnlockSecret();
      }
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const balloons = [
    { id: 1, color: '#f43f5e', label: '🎈', delay: 0 },
    { id: 2, color: '#0d9488', label: '🎉', delay: 0.3 },
    { id: 3, color: '#f59e0b', label: '⭐', delay: 0.6 },
    { id: 4, color: '#a855f7', label: '🎁', delay: 0.9 },
    { id: 5, color: '#0284c7', label: '🎂', delay: 1.2 },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-teal-200 selection:text-teal-950 dark:selection:bg-teal-800 dark:selection:text-teal-100 overflow-x-hidden transition-colors duration-500 bg-gradient-to-b from-amber-50/70 via-sky-50/50 to-pink-50/70 dark:from-[#0c0817] dark:via-[#130b24] dark:to-[#080511] text-[#1e132c] dark:text-slate-100">
      
      {/* 1. Friend Page Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 rounded-full glass-card border border-teal-300/60 dark:border-white/15 shadow-md backdrop-blur-xl bg-white/90 dark:bg-[#130d20]/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-sm">
              <PartyPopper className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-sm sm:text-base text-[#1e132c] dark:text-white">
              Birthday Vibes 🎉
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-pill text-[#1e132c] dark:text-amber-300 border border-teal-300/80 dark:border-teal-500/40 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-xs"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#1e132c]" />}
            </button>

            <button
              onClick={() => triggerRomanticConfetti()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-bold text-teal-800 dark:text-teal-200 border border-teal-300/70 hover:bg-white transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Celebrate!</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section: Festive Friend Birthday Greeting */}
      <section className="pt-32 pb-16 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient Balloon Animation floating in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-25">
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: '100vh', x: `${b.id * 18}vw` }}
              animate={{ y: '-20vh' }}
              transition={{ duration: 14 + b.id * 2, repeat: Infinity, delay: b.delay, ease: 'linear' }}
              className="absolute text-3xl sm:text-4xl select-none"
            >
              {b.label}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 shadow-xs mb-6"
        >
          <PartyPopper className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-bounce" />
          <span>It's Time To Celebrate! 🎂</span>
          <Stars className="w-4 h-4 text-pink-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1e132c] dark:text-white max-w-4xl mx-auto mb-6 leading-tight"
        >
          {friendConfig.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
        >
          {friendConfig.subtitle}
        </motion.p>

        {/* Interactive Balloon Popping Row */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 z-10">
          {balloons.map((b) => (
            <motion.button
              key={b.id}
              whileHover={{ scale: 1.25, rotate: 10 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handlePopBalloon(b.id)}
              className="p-3 sm:p-4 rounded-2xl glass-card border border-white/60 dark:border-white/10 shadow-md text-2xl sm:text-3xl cursor-pointer transition-transform hover:shadow-lg"
              title="Click to pop with confetti!"
            >
              {poppedBalloons[b.id] ? '💥' : b.label}
            </motion.button>
          ))}
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Tap any balloon to pop confetti! 🎈
        </span>
      </section>

      {/* 3. Friendship Highlights Cards */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Why You Are Awesome
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mt-1">
            Top Tier Human Being 🌟
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: '🍕',
              title: 'Partner in Crime',
              desc: 'For all the spontaneous food runs, hilarious gossip, and unstoppable laughter!'
            },
            {
              icon: '🎧',
              title: 'Best Listener',
              desc: 'Always ready with thoughtful advice, good playlists, and an open heart.'
            },
            {
              icon: '🚀',
              title: 'Always Down for Fun',
              desc: 'Never saying no to new adventures, silly plans, and memorable road trips!'
            },
            {
              icon: '👑',
              title: 'Absolute Legend',
              desc: 'The world is 100x brighter and cooler with you around. Happy Birthday!'
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 border border-teal-200/80 dark:border-teal-500/25 shadow-md flex flex-col items-center text-center bg-white/90 dark:bg-[#150f24]/90"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-serif font-bold text-lg text-[#1e132c] dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Friend Birthday Cake */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-amber-300/80 dark:border-teal-500/30 shadow-xl bg-white/95 dark:bg-[#150f24]/95">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-2">
            Make A Birthday Wish
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mb-6">
            Blow The Candles! 🎂
          </h2>

          <div className="relative my-8 flex items-center justify-center">
            {/* Cake Graphic */}
            <div className="relative flex flex-col items-center">
              {/* Animated Candle Flame */}
              {!candlesBlown ? (
                <motion.div
                  animate={{
                    scale: [1, 1.15, 0.95, 1.05, 1],
                    y: [0, -2, 1, -1, 0]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-5 h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_rgba(251,191,36,1)] mb-1"
                />
              ) : (
                <div className="h-8 flex items-center justify-center text-slate-400 text-xs mb-1 font-bold">
                  💨 Pfffft!
                </div>
              )}
              
              {/* Candle Stick */}
              <div className="w-3 h-10 bg-gradient-to-b from-sky-400 to-indigo-500 rounded-t-sm shadow-sm" />

              {/* Cake Top Tier */}
              <div className="w-36 h-12 rounded-2xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-rose-800 -mt-1">
                🍓 Fresh Berries 🍓
              </div>

              {/* Cake Bottom Tier */}
              <div className="w-48 h-16 rounded-3xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-amber-900 -mt-2">
                ✨ Vanilla Cream ✨
              </div>

              {/* Plate */}
              <div className="w-56 h-3 rounded-full bg-slate-300 dark:bg-slate-700 shadow-md mt-1" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlowCandles}
            className="px-8 py-3.5 rounded-full font-serif font-bold text-sm sm:text-base text-white shadow-lg bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 cursor-pointer border border-white/40"
          >
            {candlesBlown ? 'Wish Made! Blow Again 💨' : 'Blow Candles & Make a Wish 🎂'}
          </motion.button>
        </div>
      </section>

      {/* 5. Cheerful Birthday Conclusion */}
      <section className="py-16 px-4 text-center relative z-10 max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-teal-200/80 dark:border-white/10 shadow-lg bg-white/90 dark:bg-[#150f24]/90">
          <PartyPopper className="w-10 h-10 mx-auto text-amber-500 mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e132c] dark:text-white mb-2">
            Cheers to Another Amazing Year! 🥂
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            May this birthday bring endless happiness, unforgettable laughs, and all your favorite dreams into reality. Have a blast!
          </p>
        </div>
      </section>

      {/* 6. AT THE VERY END: Just ONE discreet icon */}
      <div className="pt-4 pb-12 flex flex-col items-center justify-center relative z-20">
        <motion.button
          whileHover={{ scale: 1.18, rotate: 12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setPasswordInput('');
            setPasswordError(false);
            setShowPasswordModal(true);
          }}
          className="w-10 h-10 rounded-full glass-card border border-slate-300/60 dark:border-white/15 flex items-center justify-center text-slate-400 hover:text-pink-500 dark:text-slate-500 dark:hover:text-pink-400 hover:border-pink-300/80 dark:hover:border-pink-500/40 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          title="✨"
          aria-label="Secret"
        >
          <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* 6. Secret Password Gatekeeper Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-card rounded-3xl p-7 sm:p-9 border-2 border-pink-400/60 dark:border-purple-500/50 shadow-2xl bg-white dark:bg-[#160d29] text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>

              <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-purple-950/80 border border-rose-300 dark:border-purple-500/40 flex items-center justify-center mx-auto mb-4 text-rose-500">
                <Heart className="w-7 h-7 fill-rose-500 animate-heart-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e132c] dark:text-white mb-2">
                Unlock Secret Love 💖
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">
                Enter the secret passcode to enter our private universe of love.
              </p>

              {/* Password Form */}
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter secret passcode..."
                    autoFocus
                    className={`w-full px-5 py-3.5 pr-12 rounded-full text-sm font-bold tracking-wide outline-none transition-all border ${
                      passwordError
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200'
                        : 'border-pink-300/80 dark:border-purple-500/50 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Error Shake Message */}
                {passwordError && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: [0, -8, 8, -6, 6, 0] }}
                    className="text-xs font-bold text-red-600 dark:text-red-400"
                  >
                    Incorrect secret passcode! Try again 🤫
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-serif font-bold text-base text-white shadow-lg bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:scale-102 active:scale-98 transition-transform cursor-pointer border border-white/40"
                >
                  Enter Secret World ❤️
                </button>
              </form>

              {/* Secret Hint Accordion */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-purple-600 dark:text-purple-300 font-bold hover:underline cursor-pointer"
                >
                  {showHint ? 'Hide Hint 🤫' : 'Need a hint? 💡'}
                </button>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 text-xs font-medium border border-purple-200 dark:border-purple-800"
                  >
                    {secretGateConfig.hint}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10">
        Created for an amazing friend's birthday celebration 🎂
      </footer>
    </div>
  );
}
