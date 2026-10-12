import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function CupidBowArrow({ onHit, isLocked = true, targetRef }) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullY, setPullY] = useState(0); // 0 to 45px
  const [isFlying, setIsFlying] = useState(false);
  const [trailParticles, setTrailParticles] = useState([]);
  const [swingParticles, setSwingParticles] = useState([]);
  const [aimAngle, setAimAngle] = useState(42); // default diagonal angle
  const [flightDistance, setFlightDistance] = useState(280); // default flight distance
  const bowWrapperRef = useRef(null);

  // Dynamically calculate diagonal angle and distance to centered heart
  const updateTrajectory = useCallback(() => {
    if (!bowWrapperRef.current) return;
    const bowRect = bowWrapperRef.current.getBoundingClientRect();

    let targetX = window.innerWidth / 2;
    let targetY = bowRect.top - 180;

    if (targetRef?.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      targetX = targetRect.left + targetRect.width / 2;
      targetY = targetRect.top + targetRect.height / 2;
    }

    const bowX = bowRect.left + bowRect.width / 2;
    const bowY = bowRect.top + bowRect.height / 2;

    const dx = targetX - bowX;
    const dy = targetY - bowY;

    const dist = Math.hypot(dx, dy);
    // Angle in degrees where 0deg = UP, positive is clockwise (towards top-right)
    const angle = Math.atan2(dx, -dy) * (180 / Math.PI);

    if (dist > 40) {
      setFlightDistance(Math.min(650, dist));
      setAimAngle(angle);
    }
  }, [targetRef]);

  useEffect(() => {
    updateTrajectory();
    const handleEvents = () => {
      requestAnimationFrame(updateTrajectory);
    };

    window.addEventListener('resize', handleEvents);
    window.addEventListener('scroll', handleEvents);
    const timer = setTimeout(updateTrajectory, 250);
    const interval = setInterval(updateTrajectory, 1200);

    return () => {
      window.removeEventListener('resize', handleEvents);
      window.removeEventListener('scroll', handleEvents);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [updateTrajectory]);

  // Sound effects via Web Audio API
  const playShootSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.38);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // Audio fallback
    }
  };

  const playHitChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.75);
      });
    } catch {
      // Audio fallback
    }
  };

  // Trigger shooting animation
  const fireArrow = () => {
    if (isFlying || !isLocked) return;

    setIsFlying(true);
    setIsPulling(false);
    playShootSound();

    // Generate trail particles along initial diagonal path
    const particles = Array.from({ length: 18 }).map((_, i) => ({
      id: Math.random(),
      offsetY: i * 16,
      offsetX: (Math.random() - 0.5) * 18,
      delay: i * 0.02,
      scale: Math.random() * 0.5 + 0.6,
    }));
    setTrailParticles(particles);

    // 1. Arrow reaches heart at ~420ms (42% of flight time)
    setTimeout(() => {
      playHitChime();
      if (onHit) onHit();

      // Sparkles spawned at the heart as arrow begins swinging away
      const swingStars = Array.from({ length: 10 }).map((_, i) => ({
        id: Math.random(),
        offsetX: (Math.random() - 0.2) * 60 + i * 8,
        offsetY: -flightDistance + (Math.random() - 0.5) * 30 - i * 6,
        scale: Math.random() * 0.4 + 0.6,
        delay: i * 0.03,
      }));
      setSwingParticles(swingStars);
    }, 420);

    // 2. Full smooth flight + swing completion at ~1100ms
    setTimeout(() => {
      setIsFlying(false);
      setPullY(0);
      setTrailParticles([]);
      setSwingParticles([]);
    }, 1100);
  };

  // Drag handlers for pulling the bow
  const handlePointerDown = () => {
    if (isFlying || !isLocked) return;
    setIsPulling(true);
  };

  const handlePointerMove = (e) => {
    if (!isPulling || isFlying) return;
    if (bowWrapperRef.current) {
      const rect = bowWrapperRef.current.getBoundingClientRect();
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientY) {
        const relativeY = clientY - rect.top;
        const clampedPull = Math.max(0, Math.min(45, relativeY - 30));
        setPullY(clampedPull);
      }
    }
  };

  const handlePointerUp = () => {
    if (isPulling) {
      if (pullY > 15) {
        fireArrow();
      } else {
        setIsPulling(false);
        setPullY(0);
      }
    }
  };

  useEffect(() => {
    const onUp = () => handlePointerUp();
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  });

  return (
    <div 
      onPointerMove={handlePointerMove}
      className="relative flex flex-col items-center justify-center select-none"
    >
      {/* Rotated Diagonal Bow & Aiming Trajectory Stage */}
      <div 
        ref={bowWrapperRef}
        className="relative flex items-center justify-center"
        style={{
          transform: `rotate(${aimAngle}deg)`,
          transformOrigin: 'center 45px',
          width: '180px',
          height: '110px'
        }}
      >
        {/* Aiming Laser Guide Line directly pointing diagonally at the Heart */}
        <div 
          className="absolute w-1 pointer-events-none flex flex-col items-center z-10"
          style={{
            bottom: '45px',
            height: `${flightDistance}px`,
          }}
        >
          {/* Animated Dashed Trajectory */}
          <motion.div
            animate={{
              opacity: isPulling ? [0.7, 1, 0.7] : [0.35, 0.75, 0.35],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-0.5 h-full border-l-2 border-dashed border-rose-400/90 dark:border-teal-400/90"
          />

          {/* Target crosshair / sparkle indicator right at the Heart */}
          <motion.div
            animate={{
              scale: isPulling ? [1.1, 1.4, 1.1] : [1, 1.2, 1],
              rotate: 360,
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute -top-3.5 w-7 h-7 rounded-full border border-rose-400 bg-rose-500/20 backdrop-blur-xs flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.9)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>
        </div>

        {/* Flying Arrow Stage with Smooth Swing after hitting the heart */}
        <AnimatePresence>
          {isFlying && (
            <motion.div
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{ 
                // Phase 1 (0 to 42%): Straight diagonal flight from bow to heart
                // Phase 2 (42% to 100%): Smooth swing and curve in the other direction
                x: [0, 0, 45, 150, 280],
                y: [0, -flightDistance, -flightDistance - 20, -flightDistance - 65, -flightDistance - 120],
                rotate: [0, 0, 32, 72, 108], // Smooth swing angle as it glides away
                opacity: [1, 1, 1, 0.75, 0],
                scale: [1, 1.1, 1.04, 0.85, 0.35]
              }}
              transition={{ 
                duration: 1.05, 
                times: [0, 0.42, 0.58, 0.8, 1],
                ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeIn']
              }}
              className="absolute z-30 pointer-events-none flex flex-col items-center"
              style={{ bottom: '45px' }}
            >
              {/* Flying Heart-Tipped Arrow */}
              <div className="relative flex flex-col items-center">
                {/* Glowing Heart Arrowhead */}
                <div className="relative -mb-1">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,1)] animate-pulse" />
                  <div className="absolute inset-0 bg-rose-400 blur-sm opacity-80" />
                </div>

                {/* Arrow Shaft with Golden Aura */}
                <div className="w-1.5 h-16 bg-gradient-to-b from-amber-200 via-amber-400 to-rose-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.9)]" />

                {/* Peacock Feather Fletching */}
                <div className="flex items-center gap-1 -mt-1">
                  <div className="w-2.5 h-4 bg-teal-400 rounded-tl-full rounded-bl-sm opacity-90 shadow-sm" />
                  <div className="w-1 h-3 bg-amber-400 rounded-full" />
                  <div className="w-2.5 h-4 bg-teal-400 rounded-tr-full rounded-br-sm opacity-90 shadow-sm" />
                </div>
              </div>

              {/* Glowing Stardust Launch Trail */}
              {trailParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0.9, scale: p.scale }}
                  animate={{ opacity: 0, scale: 0.2, y: p.offsetY + 30 }}
                  transition={{ duration: 0.45, delay: p.delay }}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-amber-300 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,1)]"
                  style={{
                    left: `calc(50% + ${p.offsetX}px)`,
                    top: `${p.offsetY}px`
                  }}
                />
              ))}

              {/* Glowing Stardust Swing Trail after Impact */}
              {swingParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0.95, scale: p.scale }}
                  animate={{ opacity: 0, scale: 0.2, x: p.offsetX * 1.5, y: p.offsetY * 0.8 }}
                  transition={{ duration: 0.6, delay: p.delay }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,1)]"
                  style={{
                    left: `calc(50% + ${p.offsetX}px)`,
                    top: `calc(50% + ${p.offsetY}px)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cupid's Bow SVG and Resting Arrow */}
        <div 
          onPointerDown={handlePointerDown}
          className="relative cursor-grab active:cursor-grabbing p-1 transition-transform hover:scale-105"
          title="Pull back diagonally to shoot, or click the button below!"
        >
          <svg 
            width="170" 
            height="90" 
            viewBox="0 0 170 90" 
            className="overflow-visible filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
          >
            <defs>
              <linearGradient id="bowGoldGradDiag" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="30%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              <linearGradient id="stringGradDiag" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>
            </defs>

            {/* Bow Limb (Classic Curved Arc) */}
            <path
              d="M 12 45 C 40 8, 130 8, 158 45"
              stroke="url(#bowGoldGradDiag)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Bow Limb Golden Highlight */}
            <path
              d="M 18 42 C 44 12, 126 12, 152 42"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Left & Right Bow Tip Ornaments */}
            <circle cx="12" cy="45" r="4.5" fill="#f43f5e" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="158" cy="45" r="4.5" fill="#f43f5e" stroke="#fbbf24" strokeWidth="2" />

            {/* Elastic Bowstring */}
            <path
              d={`M 12 45 Q 85 ${45 + (isFlying ? -8 : pullY)}, 158 45`}
              stroke="url(#stringGradDiag)"
              strokeWidth="2.2"
              fill="none"
              className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            />
          </svg>

          {/* Resting Arrow on String */}
          {!isFlying && (
            <motion.div 
              className="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center"
              style={{
                transform: `translate(-50%, ${pullY}px)`,
                transition: isPulling ? 'none' : 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Arrowhead */}
              <div className="relative -mb-1">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.9)]" />
              </div>

              {/* Arrow Shaft */}
              <div className="w-1 h-14 bg-gradient-to-b from-amber-200 via-amber-400 to-rose-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]" />

              {/* Peacock Feather Fletching */}
              <div className="flex items-center gap-0.5 -mt-1">
                <div className="w-2 h-3.5 bg-teal-400 rounded-tl-full rounded-bl-sm opacity-90 shadow-sm" />
                <div className="w-0.5 h-2.5 bg-amber-400 rounded-full" />
                <div className="w-2 h-3.5 bg-teal-400 rounded-tr-full rounded-br-sm opacity-90 shadow-sm" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Unrotated Clean Interactive Controls under the Bow */}
      <div className="flex flex-col items-center gap-1.5 mt-2 z-20">
        <div className="text-[11px] font-bold text-rose-300 dark:text-teal-300 tracking-wide">
          {isPulling ? '🎯 Aiming... Release to shoot!' : '🏹 Aiming diagonally at your heart ✨'}
        </div>

        {/* Primary Shoot Action Button */}
        <motion.button
          type="button"
          onClick={fireArrow}
          disabled={isFlying || !isLocked}
          whileHover={{ scale: 1.05, boxShadow: '0 15px 35px -5px rgba(244, 63, 94, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-6 sm:px-8 py-3 rounded-full text-white font-serif font-bold text-sm sm:text-base shadow-xl cursor-pointer overflow-hidden border border-white/50 bg-gradient-to-r from-rose-500 via-pink-500 to-teal-500 transition-all disabled:opacity-50"
        >
          {/* Shimmer light sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
            <span className="text-lg">🏹</span>
            <span>{isFlying ? 'Arrow Flying... 💘' : "Shoot Arrow into Heart ❤️"}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
