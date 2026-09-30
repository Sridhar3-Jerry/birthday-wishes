import confetti from 'canvas-confetti';

/**
 * Fires romantic confetti with hearts and pastel colors
 */
export const triggerRomanticConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#e11d48', '#f472b6', '#c084fc', '#38bdf8', '#fb7185', '#ffd1dc']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Multi-burst heart explosion for major milestones (blowing candles or surprise button)
 */
export const triggerHeartBurst = () => {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      shapes: ['circle', 'square']
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      shapes: ['circle', 'square']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
