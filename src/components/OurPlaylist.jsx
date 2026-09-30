import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Sparkles, Heart, Volume2, Disc } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioManager } from '../utils/audioPlayer';

export default function OurPlaylist() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tracks = birthdayData.playlist.tracks;

  const handlePlayTrack = async (index) => {
    if (activeTrackIndex === index && isPlaying) {
      audioManager.pause();
      setIsPlaying(false);
    } else {
      setActiveTrackIndex(index);
      setIsPlaying(true);
      await audioManager.play();
    }
  };

  const currentTrack = tracks[activeTrackIndex];

  return (
    <section id="playlist" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-4 shadow-md bg-white/95 dark:bg-[#150f24]/95"
          >
            <Disc className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
            <span>{birthdayData.playlist.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            {birthdayData.playlist.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            {birthdayData.playlist.subtitle}
          </motion.p>
        </div>

        {/* Music Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-teal-200/90 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#150f24]"
        >
          {/* Active Track Highlight Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-teal-100/80 via-pink-100/80 to-purple-100/80 dark:from-teal-950/80 dark:via-purple-950/80 dark:to-pink-950/80 border border-teal-300 dark:border-teal-500/40 mb-8">
            {/* Spinning Vinyl / Album Art */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0"
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="w-5 h-5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md" />
            </div>

            {/* Track Info & Equalizer */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-between mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-900 dark:text-teal-300">
                  Now Playing
                </span>
                {isPlaying && (
                  <div className="hidden sm:flex items-center gap-1 h-3">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 bg-rose-500 rounded-full"
                        animate={{ height: ['20%', '100%', '30%', '90%', '20%'] }}
                        transition={{ duration: 0.6 + i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white">
                {currentTrack.title}
              </h3>
              <p className="text-xs font-semibold text-rose-600 dark:text-pink-400 mb-3">
                {currentTrack.artist}
              </p>

              {/* Progress bar fake */}
              <div className="w-full h-2 rounded-full bg-white/80 dark:bg-purple-900 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-rose-500 rounded-full"
                  animate={{ width: isPlaying ? ['10%', '100%'] : '35%' }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Play/Pause Main Button */}
            <button
              onClick={() => handlePlayTrack(activeTrackIndex)}
              className="p-4 rounded-full bg-gradient-to-tr from-rose-500 to-teal-500 text-white shadow-xl hover:scale-110 transition-transform cursor-pointer border-2 border-white"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>

          {/* Playlist Track List */}
          <div className="space-y-3">
            {tracks.map((track, idx) => {
              const isSelected = activeTrackIndex === idx;

              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(idx)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-teal-50 dark:bg-purple-900/60 border-teal-400 shadow-md'
                      : 'hover:bg-teal-50/50 dark:hover:bg-purple-950/40 border-transparent hover:border-teal-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1e132c] dark:text-white">
                        {track.title}
                      </h4>
                      <p className="text-xs text-[#334155] dark:text-slate-400 font-medium">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#334155] dark:text-slate-400 font-bold">
                      {track.duration}
                    </span>
                    <button className="p-2 rounded-full bg-white dark:bg-purple-800 text-teal-700 dark:text-teal-300 shadow-sm hover:scale-105">
                      {isSelected && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
