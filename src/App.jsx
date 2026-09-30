import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import LoveLetter from './components/LoveLetter';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import ReasonsSection from './components/ReasonsSection';
import BirthdayCake from './components/BirthdayCake';
import SurpriseSection from './components/SurpriseSection';
import FinalMessage from './components/FinalMessage';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen selection:bg-teal-200 selection:text-teal-950 dark:selection:bg-teal-800 dark:selection:text-teal-100 font-sans transition-colors duration-500 overflow-x-hidden">
        {/* Custom Romantic Sparkle & Glow Cursor */}
        <CustomCursor />

        {/* Floating Animated Background with Hearts, Stars & Peacock Orbs */}
        <BackgroundEffects />

        {/* Balanced Glassmorphic Header & Theme Switcher */}
        <Navbar />

        {/* Always Accessible Floating Ambient Music Control */}
        <FloatingMusicPlayer />

        {/* Main Experience Journey */}
        <main className="relative z-10 w-full overflow-hidden">
          {/* 1. Welcome / Hero Section */}
          <HeroSection />

          {/* 2. Birthday Countdown Section */}
          <CountdownSection />

          {/* 3. Handwritten Love Letter Section */}
          <LoveLetter />

          {/* 4. Memory Timeline */}
          <MemoryTimeline />

          {/* 5. Romantic Photo Gallery & Lightbox */}
          <PhotoGallery />

          {/* 6. Reasons Why I Love You */}
          <ReasonsSection />

          {/* 7. Interactive Birthday Cake & Make A Wish */}
          <BirthdayCake />

          {/* 8. Secret Surprise Box & Modal */}
          <SurpriseSection />

          {/* 9. Cinematic Final Love Declaration */}
          <FinalMessage />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
