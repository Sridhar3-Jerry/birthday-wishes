import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function BackgroundEffects() {
  const { isDark } = useTheme();

  // Generate floating particles (hearts, sparkles, stars, glowing dots)
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 14 + 12,
      delay: Math.random() * 8,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'sparkle' : i % 4 === 2 ? 'star' : 'circle',
      opacity: Math.random() * 0.4 + 0.25,
      color: i % 5 === 0 
        ? '#0d9488' // Peacock Teal
        : i % 5 === 1 
        ? '#f43f5e' // Rose
        : i % 5 === 2 
        ? '#a855f7' // Lavender
        : i % 5 === 3 
        ? '#0284c7' // Peacock / Sky Blue
        : '#ec4899' // Pink
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-700">
      {/* Soft Romantic Ambient Mesh Orbs */}
      <div 
        className={`absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-colors duration-700 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-br from-teal-500/15 via-purple-600/15 to-transparent' 
            : 'bg-gradient-to-br from-teal-300/25 via-purple-300/20 to-transparent'
        }`}
        style={{ animation: 'floatSlow 16s infinite ease-in-out' }}
      />
      <div 
        className={`absolute top-[35%] right-[-15%] w-[55vw] h-[55vw] rounded-full blur-[120px] transition-colors duration-700 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-bl from-pink-500/15 via-teal-600/15 to-transparent' 
            : 'bg-gradient-to-bl from-pink-300/25 via-teal-300/20 to-transparent'
        }`}
        style={{ animation: 'floatSlow 18s infinite ease-in-out 4s' }}
      />
      <div 
        className={`absolute bottom-[-15%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-colors duration-700 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-tr from-purple-600/15 via-rose-500/15 to-transparent' 
            : 'bg-gradient-to-tr from-purple-300/25 via-rose-300/20 to-transparent'
        }`}
        style={{ animation: 'floatSlow 20s infinite ease-in-out 8s' }}
      />

      {/* Floating Interactive Hearts, Stars, Peacock Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: '-60px',
            color: p.color,
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-115vh',
            x: [0, Math.sin(p.id) * 35, 0],
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 45, -45, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        >
          {p.type === 'heart' && '❤️'}
          {p.type === 'sparkle' && '✨'}
          {p.type === 'star' && '⭐'}
          {p.type === 'circle' && (
            <div 
              className="rounded-full blur-[1px]" 
              style={{
                width: `${p.size / 2}px`,
                height: `${p.size / 2}px`,
                backgroundColor: p.color,
                opacity: isDark ? 0.75 : 0.55
              }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
