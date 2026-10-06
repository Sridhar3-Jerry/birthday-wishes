import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('birthday_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('birthday_theme', theme);
  }, [theme]);

  const toggleTheme = (e) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Modern View Transitions API for buttery smooth diagonal transition
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // Top-left origin (0, 0) expanding diagonally across screen
      const startX = 0;
      const startY = 0;
      const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 1.15;

      setIsTransitioning(true);

      const transition = document.startViewTransition(() => {
        // Synchronously apply class to ensure exact snapshot
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${startX}px ${startY}px)`,
              `circle(${maxRadius}px at ${startX}px ${startY}px)`
            ]
          },
          {
            duration: 950,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        anim.onfinish = () => {
          setIsTransitioning(false);
        };
      }).catch(() => {
        setIsTransitioning(false);
      });
    } else {
      // Smooth fallback diagonal wipe
      setIsTransitioning(true);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setTheme(nextTheme);
      setTimeout(() => setIsTransitioning(false), 950);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark', isTransitioning }}>
      {children}
      {/* Radiant diagonal light beam along the transition wave */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden">
          <div className="absolute -inset-[100%] bg-gradient-to-br from-transparent via-amber-300/30 dark:via-teal-300/25 to-transparent animate-diagonal-sweep" />
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
