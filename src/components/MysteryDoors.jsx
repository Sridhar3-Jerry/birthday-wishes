import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorClosed, DoorOpen, Sparkles, X, Heart, Gift, Mail, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

export default function MysteryDoors() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [openedDoors, setOpenedDoors] = useState(new Set());

  const handleDoorClick = (door) => {
    setSelectedDoor(door);
    const newOpened = new Set(openedDoors);
    newOpened.add(door.id);
    setOpenedDoors(newOpened);
    triggerRomanticConfetti();
  };

  return (
    <section id="mystery-doors" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>{birthdayData.mysteryDoors.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
        >
          {birthdayData.mysteryDoors.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto mb-14 font-medium"
        >
          {birthdayData.mysteryDoors.subtitle}
        </motion.p>

        {/* 3 Floating Doors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {birthdayData.mysteryDoors.doors.map((door, index) => {
            const isUnlocked = openedDoors.has(door.id);

            return (
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.04, y: -6 }}
                onClick={() => handleDoorClick(door)}
                className="group relative cursor-pointer"
              >
                <div className="glass-card rounded-3xl p-8 border-2 border-teal-200/90 dark:border-white/10 shadow-xl hover:shadow-2xl hover:border-teal-400 transition-all bg-white/95 dark:bg-[#150f24] flex flex-col items-center text-center overflow-hidden">
                  
                  {/* Top Door Number */}
                  <div className="text-xs uppercase font-extrabold tracking-widest text-rose-600 dark:text-teal-300 mb-4 px-3 py-1 rounded-full bg-pink-50 dark:bg-purple-900/40 border border-pink-200/60 dark:border-teal-500/30">
                    Door {door.number}
                  </div>

                  {/* 3D-styled Door Icon container */}
                  <div className="w-24 h-32 rounded-2xl bg-gradient-to-tr from-teal-500 via-pink-500 to-purple-600 p-1 mb-6 shadow-xl group-hover:shadow-teal-400/30 transition-all">
                    <div className="w-full h-full rounded-xl bg-white dark:bg-[#181128] flex flex-col items-center justify-center p-3 relative overflow-hidden">
                      <div className="text-3xl mb-1">{door.icon}</div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute right-3 top-1/2 -translate-y-1/2 shadow-sm" />
                      <DoorClosed className="w-6 h-6 text-teal-600 dark:text-teal-400 group-hover:hidden" />
                      <DoorOpen className="w-6 h-6 text-rose-500 dark:text-pink-400 hidden group-hover:block animate-pulse" />
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-2">
                    {door.category}
                  </h3>

                  <p className="text-xs font-semibold text-[#334155] dark:text-slate-300 mb-4">
                    "{door.preview}"
                  </p>

                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300 inline-flex items-center gap-1 group-hover:text-rose-600 transition-colors">
                    <span>{isUnlocked ? "Opened (Tap to View)" : "Tap to Unlock 🗝️"}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Revealed Door Modal / Fullscreen Card */}
        <AnimatePresence>
          {selectedDoor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedDoor(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                className="relative max-w-lg w-full bg-white dark:bg-[#160f29] rounded-3xl p-8 sm:p-10 border-2 border-teal-400 dark:border-teal-500/50 shadow-2xl text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDoor(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-teal-100 dark:bg-purple-900/60 hover:bg-teal-200 text-[#1e132c] dark:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Door Header */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 via-pink-500 to-purple-600 flex items-center justify-center text-3xl text-white mx-auto mb-5 shadow-xl">
                  {selectedDoor.icon}
                </div>

                <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800 dark:text-teal-300 block mb-1">
                  Door {selectedDoor.number} • {selectedDoor.category}
                </span>

                <h3 className="font-serif text-3xl font-bold text-[#1e132c] dark:text-white mb-4">
                  {selectedDoor.title}
                </h3>

                <div className="p-6 rounded-2xl bg-teal-50 dark:bg-purple-950/70 border border-teal-200 dark:border-white/10 mb-6 text-left">
                  <p className="font-serif text-lg text-[#1e132c] dark:text-purple-100 leading-relaxed italic">
                    "{selectedDoor.content}"
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDoor(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-rose-500 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer inline-flex items-center gap-2 border border-white/30"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Close & Choose Another Door 🚪</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
