import React from 'react';

export default function SectionDivider({ flip = false, variant = 'wave' }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none opacity-40 dark:opacity-20 ${flip ? 'transform rotate-180' : ''}`}>
      {variant === 'wave' ? (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-teal-300/40 dark:text-purple-800/30 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-pink-300/40 dark:text-teal-900/30 fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.31,200.77,112.5,242.47,107.25,283.47,93.47,321.39,56.44Z" />
        </svg>
      )}
    </div>
  );
}
