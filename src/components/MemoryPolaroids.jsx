import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

const secretNotes = [
  "I still remember the butterflies in my stomach when we took this picture. You looked so breathtakingly radiant, and I knew right then that you were someone truly special.",
  "No matter where in the world we go, as long as your hand is in mine, every single journey feels like the greatest adventure of my life.",
  "I captured this candid snapshot when you weren't looking, just because your genuine smile is my favorite piece of art in the entire universe.",
  "Whenever I look at this sunset memory, I'm reminded that the sky could never compare to the warmth and light you bring into my world every single day."
];

const tapeColors = [
  'bg-pink-400/80 border-pink-300',
  'bg-teal-400/80 border-teal-300',
  'bg-amber-400/80 border-amber-300',
  'bg-purple-400/80 border-purple-300'
];

export default function MemoryPolaroids() {
  const [flippedCards, setFlippedCards] = useState({});
  const [lovedCards, setLovedCards] = useState({});

  const cards = birthdayData.polaroids.cards || [];

  const handleFlip = (id, e) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLoveCard = (id, e) => {
    e.stopPropagation();
    setLovedCards((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    triggerRomanticConfetti();
  };

  return (
    <section id="polaroids" className="py-24 px-4 relative z-10 overflow-hidden select-none">
      {/* Background Fairy Lights Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75vw] h-52 bg-gradient-to-r from-amber-400/15 via-rose-500/20 to-teal-400/15 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Camera className="w-3.5 h-3.5 text-pink-500" />
          <span>{birthdayData.polaroids.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.polaroids.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-10 font-medium"
        >
          {birthdayData.polaroids.subtitle}
        </motion.p>

        {/* FAIRY LIGHTS HANGING CLOTHESLINE */}
        <div className="relative max-w-5xl mx-auto pt-6 pb-8 px-2">
          {/* Natural Curved Fairy Light Wire */}
          <div className="absolute top-10 left-0 right-0 h-12 pointer-events-none z-10">
            <svg viewBox="0 0 1000 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <path
                d="M 0,15 Q 250,38 500,45 Q 750,38 1000,15"
                fill="none"
                stroke="rgba(251, 191, 36, 0.75)"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Glowing Warm Fairy Light Bulbs along the Wire */}
          <div className="absolute top-8 left-4 right-4 flex justify-around pointer-events-none z-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.9, 1.25, 0.9]
                }}
                transition={{
                  duration: 2 + (i % 4) * 0.4,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,1),0_0_8px_rgba(245,158,11,0.9)]"
              />
            ))}
          </div>

          {/* Hanging Polaroids Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20 pt-8">
            {cards.map((card, idx) => {
              const isFlipped = !!flippedCards[card.id];
              const loves = lovedCards[card.id] || 0;
              const tapeClass = tapeColors[idx % tapeColors.length];

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30, rotate: card.rotate * 1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="flex flex-col items-center group cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  {/* Realistic Wooden Clothespin Clip */}
                  <div className="w-4 h-8 rounded-sm bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 shadow-lg -mb-3.5 z-30 border border-amber-900/50 relative">
                    <div className="absolute top-2.5 left-0 right-0 h-1 bg-zinc-300 shadow-xs" />
                  </div>

                  {/* Flippable 3D Polaroid Card Container */}
                  <div
                    className="relative w-64 h-88 transition-transform duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                    onClick={(e) => handleFlip(card.id, e)}
                  >
                    {/* FRONT OF POLAROID (Authentic Creamy White Classic Polaroid Frame) */}
                    <div
                      className="absolute inset-0 bg-[#fffdfa] text-slate-900 p-3.5 pb-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35),0_5px_15px_rgba(0,0,0,0.2)] border border-amber-100/60 flex flex-col justify-between"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Washi Tape Header */}
                      <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-xs ${tapeClass} border shadow-xs -rotate-2 z-20 opacity-90`} />

                      {/* Photo Box */}
                      <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-inner bg-slate-100">
                        <img
                          src={card.image}
                          alt={card.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Occasion Date Pill */}
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/65 text-white text-[10px] font-bold backdrop-blur-xs">
                          {card.date}
                        </div>
                      </div>

                      {/* Handwritten Front Caption */}
                      <div className="pt-2 text-center flex flex-col items-center justify-center flex-1">
                        <p className="font-handwriting text-rose-700 text-xl font-bold leading-snug">
                          "{card.caption}"
                        </p>

                        <div className="flex items-center justify-between w-full mt-2 px-1 text-[11px] text-slate-500 font-sans">
                          <span className="flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700">
                            <RotateCcw className="w-3 h-3" /> Tap to read note ✉️
                          </span>

                          <button
                            onClick={(e) => handleLoveCard(card.id, e)}
                            className="flex items-center gap-1 text-rose-500 hover:scale-125 transition-transform cursor-pointer"
                            title="Send Love"
                          >
                            <Heart className="w-3.5 h-3.5 fill-rose-500" />
                            <span className="font-bold text-rose-600">{loves > 0 ? loves : ''}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* BACK OF POLAROID (Secret Handwritten Love Note) */}
                    <div
                      className="absolute inset-0 bg-[#fffdf7] text-slate-900 p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-amber-200/80 flex flex-col justify-between text-left"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Stamp Header */}
                      <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-800">
                          Private Love Note 💌
                        </span>
                        <span className="text-[11px] font-bold text-rose-600">
                          {card.date}
                        </span>
                      </div>

                      {/* Handwritten Letter Note */}
                      <p className="font-handwriting text-rose-950 text-lg sm:text-xl leading-relaxed my-auto italic">
                        "{secretNotes[idx % secretNotes.length]}"
                      </p>

                      {/* Wax Seal Stamp & Flip Back Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-rose-200">
                        <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                          ❤️
                        </div>

                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" /> Flip to photo
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* End Message Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500/15 via-rose-500/15 to-purple-500/15 border border-teal-300/60 dark:border-teal-500/40 text-rose-700 dark:text-teal-300 font-serif text-sm sm:text-base font-bold shadow-sm"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-heart-pulse" />
          <span>{birthdayData.polaroids.endMessage}</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>
      </div>
    </section>
  );
}
