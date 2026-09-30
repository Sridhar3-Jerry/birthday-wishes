import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles({ count = 20, speed = 'normal', type = 'all', opacity = 0.35 }) {
  const durationMultiplier = speed === 'slow' ? 1.5 : speed === 'fast' ? 0.7 : 1.0;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      let symbol = '❤️';
      if (type === 'hearts') symbol = i % 2 === 0 ? '❤️' : '💕';
      else if (type === 'stars') symbol = i % 2 === 0 ? '✨' : '⭐';
      else {
        const types = ['❤️', '✨', '⭐', '🌸', '💙'];
        symbol = types[i % types.length];
      }

      return {
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: (Math.random() * 10 + 12) * durationMultiplier,
        delay: Math.random() * 8,
        symbol,
        opacity: Math.random() * 0.3 + opacity
      };
    });
  }, [count, durationMultiplier, type, opacity]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-110vh',
            x: [0, Math.sin(p.id) * 30, 0],
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
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
