import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Eye, Compass, RotateCw } from 'lucide-react';
import CircularCarousel from './CircularCarousel';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const photos = birthdayData.gallery.photos;
  const { isDark } = useTheme();

  // Map photos to CircularCarousel item format
  const carouselItems = useMemo(() => {
    return photos.map(photo => ({
      src: photo.image,
      alt: photo.caption || photo.title,
      title: photo.title,
      subtitle: photo.category ? `🌸 ${photo.category}` : '❤️ Special Memory',
      caption: photo.caption,
      category: photo.category
    }));
  }, [photos]);

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  }, [selectedPhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  }, [selectedPhotoIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNext, handlePrev]);

  return (
    <section id="gallery" className="py-20 px-3 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-300 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{birthdayData.gallery.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            {birthdayData.gallery.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            {birthdayData.gallery.subtitle}
          </motion.p>
        </div>

        {/* 3D Panorama Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative w-full rounded-3xl p-3 sm:p-6 bg-gradient-to-b from-white/40 to-white/10 dark:from-white/5 dark:to-transparent border border-white/60 dark:border-white/10 shadow-2xl backdrop-blur-sm"
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-teal-400/15 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-pink-400/15 dark:bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Circular Carousel Component - Exclusively Panorama Mode */}
          <div className="w-full h-[520px] sm:h-[620px] lg:h-[660px] relative">
            <CircularCarousel
              items={carouselItems}
              preset="panorama"
              intro="rise"
              cardWidth={295}
              aspectRatio={1.15}
              gap={28}
              speed={12}
              draggable={true}
              momentum={0.65}
              snap={true}
              pauseOnHover={true}
              focusOnClick={true}
              parallax={0.35}
              stretch={0.4}
              depthFade={isDark ? 0.6 : 0.45}
              fadeColor={isDark ? '#090514' : '#f8f4ff'}
              cornerRadius={18}
              captions={true}
              onItemClick={(item, index) => {
                setSelectedPhotoIndex(index);
              }}
            />
          </div>

          {/* Interactive Guidance Bar */}
          <div className="flex items-center justify-center gap-2 pt-3 pb-1 text-xs text-[#64748b] dark:text-[#94a3b8] font-medium text-center">
            <RotateCw className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Drag or flick to rotate 3D panorama • Click any photo for full view</span>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Image & Caption */}
              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="max-w-3xl max-h-[88vh] w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[68vh] w-auto bg-black/40">
                  <img
                    src={photos[selectedPhotoIndex].image}
                    alt={photos[selectedPhotoIndex].title}
                    className="max-h-[68vh] w-auto max-w-full object-contain rounded-2xl"
                  />
                  {photos[selectedPhotoIndex].category && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-teal-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                      {photos[selectedPhotoIndex].category}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center px-4 max-w-xl">
                  <h3 className="font-serif text-2xl text-white font-bold mb-1 flex items-center justify-center gap-2">
                    <span>{photos[selectedPhotoIndex].title}</span>
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  </h3>
                  <p className="text-teal-200 text-sm font-medium">
                    {photos[selectedPhotoIndex].caption}
                  </p>
                  <p className="text-white/60 text-xs mt-2 font-semibold">
                    {selectedPhotoIndex + 1} of {photos.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
