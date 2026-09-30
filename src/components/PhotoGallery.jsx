import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';

export default function PhotoGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const photos = birthdayData.gallery.photos;
  const { isDark } = useTheme();

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
    <section id="gallery" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative rounded-3xl overflow-hidden glass-card cursor-pointer group shadow-xl border border-teal-200/80 dark:border-white/10 ${photo.span || ''}`}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Peacock & Rose Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b24]/90 via-[#0d9488]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3.5 py-1 rounded-full bg-teal-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                      {photo.category}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 text-pink-300 text-xs font-bold mb-1">
                      <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                      <span>Special Memory</span>
                    </div>
                    <h3 className="text-white font-serif text-xl sm:text-2xl font-bold mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-teal-100 text-xs sm:text-sm line-clamp-2 font-medium">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[70vh] w-auto">
                  <img
                    src={photos[selectedPhotoIndex].image}
                    alt={photos[selectedPhotoIndex].title}
                    className="max-h-[70vh] w-auto object-contain rounded-2xl"
                  />
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
