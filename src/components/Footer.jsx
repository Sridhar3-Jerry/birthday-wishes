import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-teal-200/40 dark:border-white/10 relative z-10 bg-white/40 dark:bg-purple-950/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Left Side: Love Note */}
        <div className="flex items-center gap-2 text-purple-900/90 dark:text-purple-200/90 text-sm font-medium">
          <span>{birthdayData.footer.madeWith}</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse inline" />
        </div>

        {/* Center: Recipient Dedicated Tag */}
        <div className="text-xs text-teal-700 dark:text-teal-300 font-serif italic">
          Forever dedicated to {birthdayData.recipientName} • {birthdayData.footer.year}
        </div>

        {/* Right Side: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:bg-white dark:hover:bg-purple-900 text-purple-950 dark:text-purple-100 text-xs font-bold shadow-sm transition-all hover:scale-105 cursor-pointer border border-teal-200/60 dark:border-teal-500/30"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        </button>
      </div>
    </footer>
  );
}
