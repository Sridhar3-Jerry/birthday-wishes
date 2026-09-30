import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

export default function MemoryPolaroids() {
  const [cards, setCards] = useState(birthdayData.polaroids.cards);

  const removeTopCard = () => {
    if (cards.length === 0) return;
    setCards((prev) => prev.slice(1));
    if (cards.length === 1) {
      triggerRomanticConfetti();
    }
  };

  const resetStack = () => {
    setCards(birthdayData.polaroids.cards);
  };

  return (
    <section id="polaroids" className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Camera className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
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
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-12 font-medium"
        >
          {birthdayData.polaroids.subtitle}
        </motion.p>

        {/* Polaroid 3D Stacking Area */}
        <div className="relative w-72 sm:w-80 h-96 mx-auto flex items-center justify-center">
          <AnimatePresence>
            {cards.length > 0 ? (
              cards.map((card, index) => {
                const isTop = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: -150, right: 150 }}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 90) {
                        removeTopCard();
                      }
                    }}
                    onClick={() => isTop && removeTopCard()}
                    initial={{ scale: 0.85, y: 20, opacity: 0 }}
                    animate={{
                      scale: 1 - index * 0.04,
                      y: index * 6,
                      rotate: card.rotate,
                      opacity: 1
                    }}
                    exit={{
                      x: 300,
                      opacity: 0,
                      rotate: 25,
                      transition: { duration: 0.4 }
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                    style={{ zIndex: cards.length - index }}
                    className={`absolute inset-0 bg-white p-4 pb-6 rounded-2xl shadow-2xl border-4 border-[#fffdfa] select-none flex flex-col justify-between ${
                      isTop ? 'cursor-grab active:cursor-grabbing hover:scale-105 transition-transform' : 'pointer-events-none'
                    }`}
                  >
                    {/* Photo */}
                    <div className="w-full h-60 rounded-lg overflow-hidden relative shadow-inner">
                      <img
                        src={card.image}
                        alt={card.caption}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                        {card.date}
                      </div>
                    </div>

                    {/* Handwritten Caption */}
                    <div className="pt-3 text-center">
                      <p className="font-handwriting text-rose-700 text-lg sm:text-xl font-bold leading-tight">
                        "{card.caption}"
                      </p>
                      {isTop && (
                        <p className="text-[10px] text-gray-400 font-sans mt-1">
                          (Drag or Tap to throw card away 👉)
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full glass-card rounded-3xl p-8 border-2 border-teal-300 dark:border-teal-500/40 shadow-2xl text-center bg-white/95 dark:bg-[#150f24] flex flex-col items-center justify-center h-full"
              >
                <Heart className="w-14 h-14 text-rose-500 fill-rose-500 animate-pulse mb-3" />
                <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-2">
                  {birthdayData.polaroids.endMessage}
                </h3>
                <p className="text-xs text-[#334155] dark:text-slate-300 mb-6 font-medium">
                  Every picture with you is a page in my favorite story.
                </p>
                <button
                  onClick={resetStack}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-rose-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer flex items-center gap-2 border border-white/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Shuffle & Relive Memories 🔄</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
