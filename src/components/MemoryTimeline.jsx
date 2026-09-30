import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Calendar } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useTheme } from '../context/ThemeContext';

export default function MemoryTimeline() {
  const { isDark } = useTheme();

  return (
    <section id="memories" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-teal-300/90 dark:border-teal-500/30 text-xs font-bold text-teal-950 dark:text-teal-200 mb-3 shadow-md bg-white/95 dark:bg-[#150f24]/95"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Cherished Moments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white mb-3"
          >
            Our Beautiful Memories ✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base max-w-lg mx-auto font-medium"
          >
            Every step with you is a treasure I hold close to my heart. Here are a few chapters from our unforgettable journey.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Glowing Line with Peacock Teal + Pink + Lavender */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-teal-400 via-pink-400 to-purple-400 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(13,148,136,0.4)]" />

          <div className="space-y-12 md:space-y-16">
            {birthdayData.memories.map((memory, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={memory.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node with Animated Pulsing Heart */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="w-10 h-10 rounded-full bg-white dark:bg-purple-950 shadow-lg border-2 border-teal-500 flex items-center justify-center text-rose-500 cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-rose-500" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className={`w-full pl-12 md:pl-0 md:w-[45%] ${
                      isEven ? 'md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="glass-card glass-card-hover rounded-3xl p-5 sm:p-6 border border-teal-200/80 dark:border-white/10 shadow-xl overflow-hidden group bg-white/95 dark:bg-[#150f24]">
                      
                      {/* Memory Image */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5 shadow-sm">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Tag Pill */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 dark:bg-purple-950/95 backdrop-blur-md text-[11px] font-extrabold text-teal-900 dark:text-teal-300 shadow-md border border-teal-300/80 dark:border-teal-500/50">
                          {memory.tag}
                        </div>
                      </div>

                      {/* Date / Memory Occasion */}
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-pink-400 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{memory.date}</span>
                      </div>

                      {/* Memory Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                        {memory.title}
                      </h3>

                      {/* Memory Description */}
                      <p className="text-[#334155] dark:text-[#cbd5e1] text-sm sm:text-base leading-relaxed font-normal">
                        {memory.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
