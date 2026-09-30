import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Stars } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function OurUniverse() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="our-universe" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-28 px-4 relative z-10 overflow-hidden bg-gradient-to-b from-[#0c0818] via-[#120e29] to-[#0a0714] text-white"
    >
      {/* Cosmic Nebula Glow */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-teal-500/20 via-purple-600/20 to-pink-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-cyan-500/20 via-rose-600/20 to-purple-500/15 blur-[120px] pointer-events-none" />

      {/* Starfield & Constellation Points */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: (i % 5) * 0.15 + 0.3
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i % 3) * 0.7
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-teal-400/40 text-xs font-bold text-teal-300 mb-6 shadow-lg backdrop-blur-md"
        >
          <Stars className="w-3.5 h-3.5 text-teal-400" />
          <span>{birthdayData.ourUniverse.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
        >
          {birthdayData.ourUniverse.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-teal-100/90 font-serif text-xl sm:text-2xl max-w-xl mx-auto mb-16 italic"
        >
          "{birthdayData.ourUniverse.quote}"
        </motion.p>

        {/* Orbiting Stars Interaction Container */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto flex items-center justify-center mb-12">
          
          {/* Constellation Circular Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-teal-400/25 border-dashed animate-spin-slow pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-pink-400/20 pointer-events-none" />

          {/* Central Heart Core */}
          <motion.div
            style={{
              x: mousePos.x * 0.5,
              y: mousePos.y * 0.5
            }}
            animate={{
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(244,63,94,0.6)] z-10"
          >
            <Heart className="w-8 h-8 fill-white" />
          </motion.div>

          {/* Orbiting Star 1: YOU */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 flex items-center justify-start pointer-events-none"
          >
            <motion.div
              style={{
                x: mousePos.x,
                y: mousePos.y
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-purple-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(45,212,191,0.8)] border-2 border-white flex items-center gap-1.5 transform -rotate-12"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{birthdayData.ourUniverse.star1Label}</span>
            </motion.div>
          </motion.div>

          {/* Orbiting Star 2: ME */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 flex items-center justify-end pointer-events-none"
          >
            <motion.div
              style={{
                x: -mousePos.x,
                y: -mousePos.y
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(244,63,94,0.8)] border-2 border-white flex items-center gap-1.5 transform rotate-12"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{birthdayData.ourUniverse.star2Label}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed"
        >
          {birthdayData.ourUniverse.subquote}
        </motion.p>
      </div>
    </section>
  );
}
