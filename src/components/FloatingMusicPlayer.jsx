import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audioPlayer';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    audioManager.init(birthdayData.music?.audioUrl);
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = async () => {
    await audioManager.togglePlay();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-purple-950/85 backdrop-blur-md border border-teal-300/80 dark:border-teal-500/40 shadow-lg text-xs font-bold text-teal-800 dark:text-teal-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500 animate-spin-slow" />
            <span>{birthdayData.music?.trackTitle || 'Romantic Melody'}</span>
            
            {/* Animated Peacock/Rose Equalizer Waves */}
            <div className="flex items-center gap-0.5 h-3.5 ml-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className={`w-0.5 rounded-full ${i % 2 === 0 ? 'bg-teal-500' : 'bg-rose-500'}`}
                  animate={{
                    height: ['25%', '100%', '35%', '85%', '25%']
                  }}
                  transition={{
                    duration: 0.7 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="floating-music-btn"
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pause music" : "Play romantic music"}
        className={`relative p-3.5 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-teal-500 via-rose-500 to-purple-600 text-white border-teal-300 shadow-teal-400/30 ring-4 ring-teal-200/40 dark:ring-teal-500/30'
            : 'bg-white/90 dark:bg-purple-950/90 text-teal-700 dark:text-teal-300 border-teal-200/70 dark:border-teal-500/30 hover:bg-teal-50 dark:hover:bg-purple-900 shadow-teal-300/20'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <Music className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
        )}

        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 bottom-full mb-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-900/90 text-white text-xs shadow-xl pointer-events-none font-medium"
            >
              {isPlaying ? 'Pause romantic music' : 'Play romantic music 🎵'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
