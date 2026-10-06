import React, { useEffect, useRef } from 'react';
import './SwarmCursor.css';

// 7 Distinct Romantic Heart Colors including Black Heart
const SEVEN_HEART_PALETTE = [
  { color: '#09090b', glow: 'rgba(255, 255, 255, 0.45)', name: 'Black Heart', isBlack: true },
  { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.9)', name: 'Rose Red' },
  { color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.9)', name: 'Peacock Cyan' },
  { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.9)', name: 'Cosmic Purple' },
  { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.9)', name: 'Golden Amber' },
  { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.9)', name: 'Royal Blue' },
  { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.9)', name: 'Vibrant Magenta' }
];

// Helper to draw a glowing vector heart with glossy highlight & black heart definition
function drawHeart(ctx, x, y, size, angle, heartInfo, alpha = 1, isMobile = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.shadowColor = heartInfo.glow || heartInfo.color;
  ctx.shadowBlur = isMobile ? (heartInfo.isBlack ? 1.5 : 3) : (heartInfo.isBlack ? 5 : 9);

  const s = size / 32;
  ctx.beginPath();
  ctx.moveTo(0, s * -8);
  ctx.bezierCurveTo(s * 12, s * -22, s * 24, s * -6, s * 22, s * 8);
  ctx.bezierCurveTo(s * 20, s * 18, s * 10, s * 24, 0, s * 30);
  ctx.bezierCurveTo(s * -10, s * 24, s * -20, s * 18, s * -22, s * 8);
  ctx.bezierCurveTo(s * -24, s * -6, s * -12, s * -22, 0, s * -8);
  ctx.closePath();

  ctx.fillStyle = heartInfo.color;
  ctx.fill();

  // Subtle border outline for Black Heart to ensure high contrast & crisp visibility
  if (heartInfo.isBlack) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = Math.max(0.6, s * 1.3);
    ctx.stroke();
  }

  // Glossy reflection shine
  ctx.shadowBlur = 0;
  ctx.fillStyle = heartInfo.isBlack ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.ellipse(s * -6, s * -4, s * 3.5, s * 2, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function SwarmCursor({
  count = 7, // 7 colorful hearts including Black Heart
  size = 13,
  mobileSize = 5, // Very small, cute miniature size on mobile
  speed = 1.6, // Smooth, fluid, balanced speed (neither too fast nor sluggish)
  spread = 55,
  mobileSpread = 24, // Very compact orbit on mobile
  separation = 0.2,
  wander = 0.16,
  trail = 0.6,
  scatterOnClick = true,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isMobile = width < 768;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 768;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const N = Math.min(7, count);
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const vx = new Float32Array(N);
    const vy = new Float32Array(N);
    const scale = new Float32Array(N);
    const handed = new Float32Array(N);
    const phase = new Float32Array(N);
    
    // Trail history for 7 hearts
    const TRAIL_LEN = 10;
    const historyX = Array.from({ length: N }, () => new Float32Array(TRAIL_LEN));
    const historyY = Array.from({ length: N }, () => new Float32Array(TRAIL_LEN));

    const cursor = {
      x: width * 0.5,
      y: height * 0.5,
      has: false,
      isHovered: false
    };

    let burst = 0;

    // Initialize 7 hearts with balanced initial positions
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const radius = (isMobile ? 15 : 24) + Math.random() * (isMobile ? 12 : 20);
      px[i] = cursor.x + Math.cos(angle) * radius;
      py[i] = cursor.y + Math.sin(angle) * radius;
      vx[i] = (Math.random() - 0.5) * 8;
      vy[i] = (Math.random() - 0.5) * 8;
      scale[i] = 0.88 + (i % 3) * 0.12;
      handed[i] = i % 2 === 0 ? 1 : -1;
      phase[i] = Math.random() * Math.PI * 2;

      for (let h = 0; h < TRAIL_LEN; h++) {
        historyX[i][h] = px[i];
        historyY[i][h] = py[i];
      }
    }

    const onMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.has = true;

      // Check hover on interactive items
      const target = e.target;
      const isInteractive = !!target?.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, .group');
      cursor.isHovered = isInteractive;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      cursor.x = e.touches[0].clientX;
      cursor.y = e.touches[0].clientY;
      cursor.has = true;
    };

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      cursor.x = e.touches[0].clientX;
      cursor.y = e.touches[0].clientY;
      cursor.has = true;

      if (scatterOnClick && enabled) {
        onScatter(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      // Soft delayed fade on touch release
      setTimeout(() => {
        cursor.has = false;
      }, 1500);
    };

    const onLeave = () => {
      cursor.has = false;
    };

    const onScatter = (cx, cy) => {
      const escape = (isMobile ? 140 : 200) + speed * 25;

      for (let i = 0; i < N; i++) {
        let dx = px[i] - cx;
        let dy = py[i] - cy;
        let d = Math.hypot(dx, dy);
        if (d < 1e-2) {
          const a = (i / N) * Math.PI * 2;
          dx = Math.cos(a);
          dy = Math.sin(a);
          d = 1;
        }
        const kick = escape * (0.8 + Math.random() * 0.4);
        vx[i] = (dx / d) * kick;
        vy[i] = (dy / d) * kick;
      }
      burst = 1;
    };

    const onDown = (e) => {
      if (!scatterOnClick || !enabled) return;
      onScatter(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('pointerdown', onDown);

    let rafId = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const loop = (now) => {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      frameCount++;

      ctx.clearRect(0, 0, width, height);

      if (!enabled || !cursor.has) return;

      burst = Math.max(0, burst - dt / 0.7);
      
      // Dynamic spread: Very small on mobile (24px), balanced on desktop (55px)
      const baseSpread = isMobile ? mobileSpread : spread;
      const activeSpread = cursor.isHovered ? baseSpread * 0.75 : baseSpread;
      
      // Responsive base speed & dynamic distance catch-up
      const baseSpeed = isMobile ? 80 : 65 + speed * 28;
      const steerRate = 2.3 + speed * 0.3;
      const sepDist = activeSpread * (0.35 + separation);

      // Record trail history every 2 frames
      if (frameCount % 2 === 0) {
        for (let i = 0; i < N; i++) {
          for (let h = TRAIL_LEN - 1; h > 0; h--) {
            historyX[i][h] = historyX[i][h - 1];
            historyY[i][h] = historyY[i][h - 1];
          }
          historyX[i][0] = px[i];
          historyY[i][0] = py[i];
        }
      }

      // Dynamic size: Very small (5px) on mobile, clear (13px) on desktop
      const effectiveBaseSize = isMobile ? mobileSize : size;

      // Physics update & render for 7 colorful hearts
      for (let i = 0; i < N; i++) {
        const heartInfo = SEVEN_HEART_PALETTE[i % SEVEN_HEART_PALETTE.length];
        
        // Swarm steering calculations
        const dx = cursor.x - px[i];
        const dy = cursor.y - py[i];
        const dist = Math.hypot(dx, dy) || 1e-4;
        const ux = dx / dist;
        const uy = dy / dist;

        // Adaptive speed: accelerates naturally when cursor moves across screen, glides gently when close
        const speedBoost = Math.min(2.4, 1 + dist / 160);
        const currentMaxSpeed = baseSpeed * speedBoost * (cursor.isHovered ? 1.15 : 1);

        const time = now * 0.0013;
        const orbitRadius = activeSpread * (0.5 + 0.5 * Math.sin(time + phase[i]));
        const radial = Math.max(-1, Math.min(1, (dist - orbitRadius) / (activeSpread * 0.8)));
        const swirl = Math.sqrt(Math.max(0, 1 - radial * radial)) * handed[i];

        let wishX = ux * radial - uy * swirl;
        let wishY = uy * radial + ux * swirl;

        // Gentle natural wander drift
        wishX += Math.cos(time * 1.3 + i) * wander;
        wishY += Math.sin(time * 1.3 + i) * wander;

        const wl = Math.hypot(wishX, wishY) || 1e-4;
        wishX /= wl;
        wishY /= wl;

        const rate = steerRate * (1 - burst * 0.5);
        let ax = (wishX * currentMaxSpeed - vx[i]) * rate;
        let ay = (wishY * currentMaxSpeed - vy[i]) * rate;

        if (burst > 0.001) {
          ax -= ux * currentMaxSpeed * burst * 2.5;
          ay -= uy * currentMaxSpeed * burst * 2.5;
        }

        // Boid separation between 7 hearts
        for (let j = 0; j < N; j++) {
          if (j === i) continue;
          const sx = px[i] - px[j];
          const sy = py[i] - py[j];
          const d2 = sx * sx + sy * sy;
          if (d2 > 1e-4 && d2 < sepDist * sepDist) {
            const d = Math.sqrt(d2);
            const f = (1 - d / sepDist) * currentMaxSpeed * 2.2 * separation;
            ax += (sx / d) * f;
            ay += (sy / d) * f;
          }
        }

        vx[i] += ax * dt;
        vy[i] += ay * dt;

        const currentSpeed = Math.hypot(vx[i], vy[i]);
        const cap = currentMaxSpeed * (1 + burst * 1.6);
        if (currentSpeed > cap) {
          vx[i] = (vx[i] / currentSpeed) * cap;
          vy[i] = (vy[i] / currentSpeed) * cap;
        }

        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;

        // Draw soft stardust trail for each heart
        if (trail > 0.1) {
          for (let h = 1; h < TRAIL_LEN; h += 2) {
            const alpha = (1 - h / TRAIL_LEN) * 0.3 * trail;
            const trailSize = (effectiveBaseSize * scale[i] * 0.32) * (1 - h / TRAIL_LEN);
            if (trailSize > 0.4) {
              ctx.save();
              ctx.globalAlpha = alpha;
              ctx.fillStyle = heartInfo.isBlack ? 'rgba(255, 255, 255, 0.45)' : heartInfo.color;
              ctx.beginPath();
              ctx.arc(historyX[i][h], historyY[i][h], trailSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }

        // Natural gentle heart tilt
        const heartAngle = Math.atan2(vy[i], vx[i]) + Math.PI / 2 + (Math.sin(now * 0.002 + i) * 0.1);
        const heartSize = effectiveBaseSize * scale[i] * (cursor.isHovered ? 1.15 : 1);

        // Render the colorful glowing heart
        drawHeart(
          ctx,
          px[i],
          py[i],
          heartSize,
          heartAngle,
          heartInfo,
          1,
          isMobile
        );
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [count, size, mobileSize, speed, spread, mobileSpread, separation, wander, trail, scatterOnClick, enabled]);

  return (
    <div ref={containerRef} className={`swarm-cursor ${className}`.trim()} style={style} {...rest}>
      <canvas ref={canvasRef} className="swarm-cursor__canvas" />
      {children ? <div className="swarm-cursor__content">{children}</div> : null}
    </div>
  );
}
