import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import SwarmCursor from './components/SwarmCursor';
import CustomCursor from './components/CustomCursor';
import BackgroundEffects from './components/BackgroundEffects';
import EasterEggs from './components/EasterEggs';
import Navbar from './components/Navbar';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import SectionDivider from './components/SectionDivider';

// Section Components
import HeroSection from './components/HeroSection';
import OpenMyHeart from './components/OpenMyHeart';
import LoveSlider from './components/LoveSlider';
import CountdownSection from './components/CountdownSection';
import LoveLetter from './components/LoveLetter';
import MysteryDoors from './components/MysteryDoors';
import OurUniverse from './components/OurUniverse';
import PullRibbonGift from './components/PullRibbonGift';
import CatchHeartsGame from './components/CatchHeartsGame';
import MemoryTimeline from './components/MemoryTimeline';
import MemoryPolaroids from './components/MemoryPolaroids';
import PhotoGallery from './components/PhotoGallery';
import OurPlaylist from './components/OurPlaylist';
import ReasonsSection from './components/ReasonsSection';
import FutureMemories from './components/FutureMemories';
import FutureTimeCapsule from './components/FutureTimeCapsule';
import BirthdayCake from './components/BirthdayCake';
import SurpriseSection from './components/SurpriseSection';
import SmileQuestion from './components/SmileQuestion';
import FinalMessage from './components/FinalMessage';
import CinematicEnding from './components/CinematicEnding';
import Footer from './components/Footer';

export default function App() {
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    setLogoClicks((prev) => prev + 1);
  };

  const handleResetLogoClicks = () => {
    setLogoClicks(0);
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen font-sans selection:bg-teal-200 selection:text-teal-950 dark:selection:bg-teal-800 dark:selection:text-teal-100 overflow-x-hidden transition-colors duration-500">
        
        {/* 7 Colorful Hearts Swarm Cursor from React Bits - Fluid balanced speed & miniature on mobile */}
        <SwarmCursor 
          count={7} 
          size={13} 
          mobileSize={5}
          speed={1.6} 
          spread={55} 
          mobileSpread={24}
          wander={0.16} 
          trail={0.6} 
          scatterOnClick={true} 
        />

        {/* Custom Romantic Sparkle & Glow Cursor */}
        <CustomCursor />

        {/* Secret Easter Egg Event Manager */}
        <EasterEggs 
          logoClicks={logoClicks} 
          onResetLogoClicks={handleResetLogoClicks} 
        />

        {/* Ambient Floating Hearts & Gradients */}
        <BackgroundEffects />

        {/* Floating Glass Navigation */}
        <Navbar onLogoClick={handleLogoClick} />

        {/* Floating Ambient Music Control */}
        <FloatingMusicPlayer />

        {/* Main Experience Journey */}
        <main className="relative z-10 w-full overflow-hidden">
          
          {/* 1. Hero / Welcome Section */}
          <HeroSection />

          <SectionDivider variant="wave" />

          {/* 2. Open My Heart Interactive Heart Reveal */}
          <OpenMyHeart />

          {/* 3. How Much Do You Mean To Me? Slider to Infinity */}
          <LoveSlider />

          <SectionDivider variant="curve" />

          {/* 4. Birthday Countdown / Celebration */}
          <CountdownSection />

          {/* 5. Handwritten Love Letter with Wax Seal */}
          <LoveLetter />

          <SectionDivider variant="wave" />

          {/* 6. Choose A Door Mystery Section */}
          <MysteryDoors />

          {/* 7. Our Universe Cosmic Section */}
          <OurUniverse />

          <SectionDivider variant="curve" />

          {/* 8. Pull The Ribbon Interactive 3D Gift Box */}
          <PullRibbonGift />

          {/* 9. Catch The Hearts Mini Game */}
          <CatchHeartsGame />

          <SectionDivider variant="wave" />

          {/* 10. Our Beautiful Memories Timeline */}
          <MemoryTimeline />

          {/* 11. Memory Polaroids 3D Draggable Stack */}
          <MemoryPolaroids />

          {/* 12. Romantic Photo Gallery & Lightbox */}
          <PhotoGallery />

          <SectionDivider variant="curve" />

          {/* 13. Our Playlist Section */}
          <OurPlaylist />

          {/* 14. Reasons Why I Love You */}
          <ReasonsSection />

          {/* 15. Future Memories / Bucket List */}
          <FutureMemories />

          {/* 16. Message From Future Me (Time Capsule) */}
          <FutureTimeCapsule />

          <SectionDivider variant="wave" />

          {/* 17. Interactive Birthday Cake & Blow Candles */}
          <BirthdayCake />

          {/* 18. Secret Surprise Box & Modal */}
          <SurpriseSection />

          {/* 19. One Last Question... Did I Make You Smile? */}
          <SmileQuestion />

          {/* 20. Final Birthday Message */}
          <FinalMessage />

          {/* 21. Cinematic Ending Sequence */}
          <CinematicEnding />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
