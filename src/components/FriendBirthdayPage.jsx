import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, PartyPopper, Eye, EyeOff, Sun, Moon, 
  Stars, Heart, Calendar, Flame, Check
} from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti, triggerHeartBurst } from '../utils/confetti';
import { useTheme } from '../context/ThemeContext';
import FriendPhotoScrapbook from './FriendPhotoScrapbook';
import FriendWishesWall from './FriendWishesWall';
import FriendQuiz from './FriendQuiz';

export default function FriendBirthdayPage({ onUnlockSecret }) {
  const { isDark, toggleTheme } = useTheme();
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState({});

  // Continuous Rapid 3-Click Trigger (must be clicked continuously without pause)
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handlePartyIconClick = () => {
    triggerRomanticConfetti();

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    lastClickTimeRef.current = now;

    // Check if clicks are continuous (within 550ms of each other)
    if (timeSinceLastClick <= 550) {
      clickCountRef.current += 1;
    } else {
      // Continuity broken by pause -> reset continuous counter to 1
      clickCountRef.current = 1;
    }

    // Trigger ONLY on 3 continuous rapid clicks
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      lastClickTimeRef.current = 0;
      setPasswordInput('');
      setPasswordError(false);
      setShowPasswordModal(true);
    }
  };

  // Countdown clock state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: 0,
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const friendConfig = birthdayData.friendPage || {
    recipientName: "Bestie",
    title: "Happy Birthday, Bestie! 🎉",
    subtitle: "Wishing you a year filled with big laughs, unforgettable adventures, great food, and endless happiness!"
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

  // Cut cake
  const handleCutCake = () => {
    setCakeCut(true);
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
    { id: 1, label: '🎈', color: '#f43f5e', name: 'Joy' },
    { id: 2, label: '🎉', color: '#0d9488', name: 'Fun' },
    { id: 3, label: '⭐', color: '#f59e0b', name: 'Success' },
    { id: 4, label: '🎁', color: '#a855f7', name: 'Wishes' },
    { id: 5, label: '🎂', color: '#0284c7', name: 'Love' },
    { id: 6, label: '🥂', color: '#e11d48', name: 'Cheers' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-teal-800 dark:selection:text-teal-100 overflow-x-hidden transition-colors duration-500 bg-gradient-to-b from-amber-50/80 via-sky-50/60 to-pink-50/80 dark:from-[#090514] dark:via-[#110826] dark:to-[#070311] text-[#1e132c] dark:text-slate-100 relative">
      
      {/* Radiant Ambient Mesh Background Orbs (Prevents black void) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-400/20 dark:bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-rose-400/20 dark:bg-purple-600/20 rounded-full blur-[160px]" />
        <div className="absolute top-2/3 left-1/3 w-[700px] h-[700px] bg-teal-400/15 dark:bg-indigo-600/15 rounded-full blur-[180px]" />
        <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-pink-400/20 dark:bg-pink-600/15 rounded-full blur-[160px]" />
      </div>

      {/* 1. Header Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-7 py-2.5 rounded-full glass-card border border-amber-300/60 dark:border-white/15 shadow-lg backdrop-blur-2xl bg-white/90 dark:bg-[#120a22]/90">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handlePartyIconClick}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md cursor-pointer select-none"
              title="Celebrate! 🎉"
            >
              <PartyPopper className="w-5 h-5 animate-bounce" />
            </motion.button>
            <div className="flex flex-col">
              <span className="font-serif font-black text-base sm:text-lg tracking-tight text-[#1e132c] dark:text-white leading-none">
                BestieBash 2026 🎉
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest">
                Official Birthday Site
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700 dark:text-slate-200">
            <a href="#highlights" className="hover:text-amber-500 transition-colors">Highlights 🌟</a>
            <a href="#friend-memories" className="hover:text-amber-500 transition-colors">Scrapbook 📸</a>
            <a href="#friend-wishes" className="hover:text-amber-500 transition-colors">Wishes 💌</a>
            <a href="#friend-cake" className="hover:text-amber-500 transition-colors">Birthday Cake 🎂</a>
            <a href="#friend-quiz" className="hover:text-amber-500 transition-colors">Bestie Quiz 🎯</a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full glass-pill text-[#1e132c] dark:text-amber-300 border border-amber-300/70 dark:border-white/15 hover:bg-white dark:hover:bg-purple-900 transition-all cursor-pointer shadow-xs"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#1e132c]" />}
            </button>

            <button
              onClick={() => triggerRomanticConfetti()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md hover:scale-105 transition-all cursor-pointer border border-white/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Celebrate!</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Grand Hero Section */}
      <section className="pt-36 sm:pt-44 pb-20 px-4 relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Top Celebratory Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 shadow-sm mb-6"
        >
          <PartyPopper className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-bounce" />
          <span>✨ CELEBRATING THE ONE AND ONLY BESTIE ✨</span>
          <Stars className="w-4 h-4 text-pink-500" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#1e132c] dark:text-white max-w-4xl mx-auto mb-6 leading-[1.08]"
        >
          {friendConfig.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-medium"
        >
          {friendConfig.subtitle}
        </motion.p>

        {/* Live Party Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-full max-w-xl glass-card rounded-3xl p-5 sm:p-7 border border-amber-300/70 dark:border-white/15 shadow-xl bg-white/90 dark:bg-[#150e26]/90 mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>Today Is The Big Day! Celebration Clock</span>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((t, idx) => (
              <div key={idx} className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-amber-50 dark:bg-white/5 border border-amber-200/80 dark:border-white/10 shadow-xs">
                <span className="font-serif font-black text-2xl sm:text-4xl text-[#1e132c] dark:text-white leading-none">
                  {String(t.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Balloon Arcade Row */}
        <div className="mb-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
            🎈 Click the balloons to pop birthday confetti!
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {balloons.map((b) => (
              <motion.button
                key={b.id}
                whileHover={{ scale: 1.25, rotate: 10 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handlePopBalloon(b.id)}
                className="p-3 sm:p-4 rounded-2xl glass-card border border-white/60 dark:border-white/10 shadow-md text-3xl sm:text-4xl cursor-pointer transition-transform hover:shadow-xl bg-white/80 dark:bg-white/5"
                title={`Pop ${b.name}!`}
              >
                {poppedBalloons[b.id] ? '💥' : b.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <a
            href="#friend-memories"
            className="px-6 py-3.5 rounded-full font-serif font-bold text-sm sm:text-base text-white shadow-lg bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:scale-105 transition-transform"
          >
            Explore Squad Memories 📸
          </a>
          <a
            href="#friend-cake"
            className="px-6 py-3.5 rounded-full font-serif font-bold text-sm sm:text-base text-[#1e132c] dark:text-white glass-card border border-amber-300 dark:border-white/15 hover:bg-white transition-all shadow-md"
          >
            Blow The Candles 🎂
          </a>
          <a
            href="#friend-wishes"
            className="px-6 py-3.5 rounded-full font-serif font-bold text-sm sm:text-base text-amber-800 dark:text-amber-300 glass-card border border-amber-300 dark:border-amber-600/40 hover:bg-white transition-all shadow-md"
          >
            Leave A Wish 💌
          </a>
        </div>
      </section>

      {/* 3. Section: Bestie Squad Highlights & Badges */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative z-10" id="highlights">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-teal-400">
            The Official Squad Dossier
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mt-2">
            Why You Are A Certified Legend 🌟
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 font-medium">
            Recognized and verified by the squad as the most awesome human on the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🍕',
              title: 'Foodie In Crime',
              badge: '99+ Food Runs',
              stat: '10,000+ Calories Shared',
              desc: 'Always down for midnight fast food runs, spicy tacos, and deep life talks in the car with 0 regrets!'
            },
            {
              icon: '🚀',
              title: 'Chief Chaos Officer',
              badge: 'Legendary Status',
              stat: '100% Spontaneous',
              desc: 'Turns simple boring weekend plans into spontaneous, chaotic, unforgettable core memories.'
            },
            {
              icon: '🎧',
              title: 'Aux Cord Royalty',
              badge: 'Never Skips',
              stat: '10/10 Music Taste',
              desc: 'Guaranteed top-tier playlist curator. Drives with windows down screaming lyrics off-key.'
            },
            {
              icon: '👑',
              title: '100% Ride Or Die',
              badge: 'Day 1 Partner',
              stat: 'Infinite Loyalty',
              desc: 'Shows up when it matters most, listens to 3-hour rants, and never lets you face anything alone.'
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl p-7 border-2 border-amber-200/80 dark:border-white/10 shadow-xl flex flex-col justify-between bg-white/95 dark:bg-[#150f24]/95 text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/10 to-pink-500/10 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-2 rounded-2xl bg-amber-50 dark:bg-white/5 border border-amber-200/50 dark:border-white/10">
                    {card.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 dark:bg-teal-950 text-amber-800 dark:text-teal-300">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#1e132c] dark:text-white mb-2">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/10 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-between">
                <span>{card.stat}</span>
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Squad Scrapbook Photo Memories Section */}
      <FriendPhotoScrapbook />

      {/* 5. Squad Birthday Wishes Wall / Guestbook */}
      <FriendWishesWall />

      {/* 6. Interactive Grand Birthday Cake & Blow Candles */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="friend-cake">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border-2 border-amber-300 dark:border-white/15 shadow-2xl bg-white/95 dark:bg-[#150f26]/95">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 shadow-xs mb-3">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Make Your Birthday Wish 🎂</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3">
            Blow Out The Candles! 🕯️
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 font-medium">
            Close your eyes, make the biggest wish of your life, and tap to blow out the candles!
          </p>

          <div className="relative my-10 flex items-center justify-center">
            {/* Grand Cake Graphic */}
            <div className="relative flex flex-col items-center">
              {/* Candle Flames */}
              <div className="flex gap-4 mb-1">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="flex flex-col items-center">
                    {!candlesBlown ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 0.95, 1.1, 1],
                          y: [0, -3, 1, -2, 0],
                        }}
                        transition={{ duration: 1 + c * 0.2, repeat: Infinity }}
                        className="w-5 h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_20px_rgba(251,191,36,1)]"
                      />
                    ) : (
                      <div className="h-8 flex items-center justify-center text-slate-400 text-xs font-bold animate-pulse">
                        💨
                      </div>
                    )}
                    <div className="w-2.5 h-8 bg-gradient-to-b from-sky-300 to-indigo-400 rounded-t-sm shadow-xs" />
                  </div>
                ))}
              </div>

              {/* Top Tier */}
              <div className="w-48 h-14 rounded-2xl bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 border-2 border-white shadow-md flex items-center justify-center text-xs font-extrabold text-rose-900 tracking-wider">
                🍓 Fresh Berries Cream 🍓
              </div>

              {/* Middle Tier */}
              <div className="w-64 h-16 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 border-2 border-white shadow-lg flex items-center justify-center text-xs font-extrabold text-amber-900 tracking-wider -mt-2">
                ✨ Belgian White Chocolate ✨
              </div>

              {/* Bottom Tier */}
              <div className="w-80 h-20 rounded-3xl bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 border-2 border-white shadow-xl flex items-center justify-center text-xs font-extrabold text-rose-900 tracking-wider -mt-2">
                🎂 Golden Vanilla Delight 🎂
              </div>

              {/* Plate */}
              <div className="w-96 h-4 rounded-full bg-slate-300 dark:bg-slate-700 shadow-xl mt-1" />
            </div>
          </div>

          {/* Cake Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="px-8 py-4 rounded-full font-serif font-bold text-base text-white shadow-xl bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 cursor-pointer border border-white/40"
            >
              {candlesBlown ? 'Candles Blown! Blow Again 💨' : 'Blow Candles & Make Wish 🎂'}
            </motion.button>

            {candlesBlown && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCutCake}
                className="px-8 py-4 rounded-full font-serif font-bold text-base text-amber-900 dark:text-white glass-card border border-amber-300 dark:border-white/20 shadow-xl hover:bg-white transition-all cursor-pointer"
              >
                {cakeCut ? 'Cake Sliced! Enjoy 🍰' : 'Cut The Cake 🍰'}
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* 7. Interactive Bestie Trivia Quiz */}
      <FriendQuiz />

      {/* 8. Cheerful Birthday Conclusion Toast */}
      <section className="py-20 px-4 text-center relative z-10 max-w-3xl mx-auto">
        <div className="glass-card rounded-3xl p-9 sm:p-12 border-2 border-amber-300/80 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#150f24]/95">
          {/* Party Icon - Click continuously 3 times to unlock the secret password modal */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.88 }}
            onClick={handlePartyIconClick}
            className="w-16 h-16 rounded-2xl bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-600/40 flex items-center justify-center mx-auto mb-4 text-amber-500 cursor-pointer shadow-sm hover:shadow-md transition-all select-none group"
            title="Celebrate! 🎉"
            aria-label="Party Celebration"
          >
            <PartyPopper className="w-9 h-9 animate-bounce text-amber-500 group-hover:scale-110 transition-transform" />
          </motion.button>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e132c] dark:text-white mb-3">
            Cheers To Another Amazing Year! 🥂
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-xl mx-auto mb-6">
            May this year bring endless happiness, unforgettable laughs, great health, and all your biggest dreams coming true. Stay legendary!
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
            <span>Signed with all the love from the squad</span>
            <span>⭐</span>
          </div>
        </div>
      </section>

      {/* 9. Secret Password Gatekeeper Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
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

      {/* 11. Authentic Website Footer */}
      <footer className="py-10 px-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-white/10 relative z-10 bg-white/50 dark:bg-[#0c0617]/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#1e132c] dark:text-white">
              BestieBash 2026 🎉
            </span>
            <span className="text-slate-400">|</span>
            <span>Created with all the love by the Squad</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#highlights" className="hover:underline">Highlights</a>
            <a href="#friend-memories" className="hover:underline">Scrapbook</a>
            <a href="#friend-wishes" className="hover:underline">Wishes Wall</a>
            <a href="#friend-quiz" className="hover:underline">Quiz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
