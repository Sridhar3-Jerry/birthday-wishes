import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Only enable on devices that have fine pointer (desktop / mouse)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Throttled particle trail
      const now = Date.now();
      if (now - lastTrailTime.current > 70) {
        lastTrailTime.current = now;
        const newParticle = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          symbol: Math.random() > 0.6 ? '✨' : Math.random() > 0.5 ? '💙' : '🌸',
          size: Math.random() * 8 + 10,
          color: Math.random() > 0.5 ? '#00b4d8' : '#f43f5e' // Peacock / Rose
        };

        setTrail((prev) => [...prev.slice(-12), newParticle]);
      }

      // Check if hovering over interactive elements
      const target = e.target;
      const interactive = target?.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, .group');
      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up stale trail particles
    const trailInterval = setInterval(() => {
      setTrail((prev) => prev.filter((p) => Date.now() - p.id < 600));
    }, 150);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(trailInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Floating Sparkle Trail */}
      {trail.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0.9, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.3, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: 'translate(-50%, -50%)',
            color: p.color
          }}
        >
          {p.symbol}
        </motion.span>
      ))}

      {/* Trailing Outer Ring (Peacock Blue & Rose Aura) */}
      <motion.div
        className="fixed rounded-full pointer-events-none border border-teal-400/60 dark:border-cyan-400/80"
        style={{
          boxShadow: isHovered 
            ? '0 0 20px rgba(13, 148, 136, 0.6), inset 0 0 10px rgba(244, 63, 94, 0.4)' 
            : '0 0 10px rgba(6, 182, 212, 0.4)',
          background: isHovered 
            ? 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, rgba(244, 63, 94, 0.1) 100%)' 
            : 'transparent',
        }}
        animate={{
          x: mousePos.x - (isHovered ? 24 : 16),
          y: mousePos.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.2
        }}
      />

      {/* Main Core Dot (Peacock Blue / Rose Gradient) */}
      <motion.div
        className="fixed rounded-full pointer-events-none bg-gradient-to-tr from-rose-500 via-teal-500 to-sky-400 shadow-md"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 1.5 : isHovered ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 600,
          mass: 0.1
        }}
        style={{
          width: 8,
          height: 8,
        }}
      />
    </div>
  );
}
