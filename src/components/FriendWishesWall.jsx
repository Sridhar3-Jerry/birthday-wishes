import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Heart, Sparkles, Send, X } from 'lucide-react';
import { triggerRomanticConfetti } from '../utils/confetti';

const WISHES_STORAGE_KEY = 'friend_birthday_guestbook_wishes';

const DEFAULT_WISHES = [
  {
    id: 'w1',
    name: 'Alex & The Gang',
    role: 'Squad Partner',
    avatar: '🍕',
    color: 'from-amber-400 to-orange-500',
    message: 'Happy Birthday to the most chaotic yet lovable person in our squad! Still waiting for you to pay me back for that midnight pizza in 2023 😂 Have a legendary day!',
    time: '2 hours ago',
    likes: 14
  },
  {
    id: 'w2',
    name: 'Sarah M.',
    role: 'Bestie for Life',
    avatar: '✨',
    color: 'from-pink-400 to-rose-500',
    message: 'Wishing the happiest of birthdays to my favorite human! May this year bring you all the travel, success, endless iced coffees, and big wins you truly deserve! ☕💖',
    time: '4 hours ago',
    likes: 21
  },
  {
    id: 'w3',
    name: 'Dev & Rahul',
    role: 'Road Trip Crew',
    avatar: '🚗',
    color: 'from-sky-400 to-indigo-500',
    message: 'Happy Birthday bro! Still can\'t believe we survived that wild road trip last summer without GPS. Cheers to another year of terrible navigation and great memories! 🥂',
    time: 'Yesterday',
    likes: 18
  },
  {
    id: 'w4',
    name: 'Priya K.',
    role: 'Coffee Partner',
    avatar: '☕',
    color: 'from-teal-400 to-emerald-500',
    message: 'Happy Birthday!! May your day be filled with warm smiles, delicious cake, and zero stress. Never stop being the brightest light in the room! 🌟',
    time: 'Yesterday',
    likes: 12
  }
];

export default function FriendWishesWall() {
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...DEFAULT_WISHES];
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_WISHES;
  });

  const [likesMap, setLikesMap] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Friend');
  const [authorMessage, setAuthorMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎉');
  const [formError, setFormError] = useState('');

  const emojiOptions = ['🎉', '🎈', '🎂', '⭐', '🍕', '🚀', '👑', '💖', '🔥'];

  const handleLike = (id) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddWishSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !authorMessage.trim()) {
      setFormError('Please enter your name and a birthday wish.');
      return;
    }

    const newWish = {
      id: `custom_wish_${Date.now()}`,
      name: authorName.trim(),
      role: authorRole.trim() || 'Friend',
      avatar: selectedEmoji,
      color: 'from-amber-500 to-pink-500',
      message: authorMessage.trim(),
      time: 'Just now',
      likes: 1,
      isCustom: true
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      const customOnly = updated.filter((w) => w.isCustom);
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    triggerRomanticConfetti();
    setAuthorName('');
    setAuthorMessage('');
    setFormError('');
    setShowAddModal(false);
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10" id="friend-wishes">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 shadow-xs mb-4">
          <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>💌 Squad Guestbook</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#1e132c] dark:text-white tracking-tight mb-4">
          Birthday Wishes Wall
        </h2>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Warm thoughts, inside jokes, and sweet birthday messages from the best crew in the world.
        </p>

        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/40"
          >
            <Plus className="w-4 h-4" />
            <span>Leave A Birthday Wish ✍️</span>
          </motion.button>
        </div>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishes.map((wish, idx) => {
          const currentLikes = (wish.likes || 0) + (likesMap[wish.id] || 0);

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all bg-white/95 dark:bg-[#150f24]/95 flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${wish.color} flex items-center justify-center text-xl shadow-md text-white`}>
                    {wish.avatar}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1e132c] dark:text-white">
                      {wish.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-teal-400">
                      {wish.role}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-6">
                  "{wish.message}"
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                  {wish.time}
                </span>

                <button
                  onClick={() => handleLike(wish.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 hover:scale-108 transition-all cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{currentLikes}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Leave A Wish Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full glass-card rounded-3xl p-7 border-2 border-amber-300 dark:border-teal-500/40 shadow-2xl bg-white dark:bg-[#160e28]"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white">
                  Leave A Birthday Wish 💌
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium">
                Your message will be pinned to Bestie's official birthday guestbook!
              </p>

              <form onSubmit={handleAddWishSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Maya / Alex"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Role / Relationship
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="e.g. College Bestie / Partner in Crime"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Pick an Avatar Emoji
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform cursor-pointer ${
                          selectedEmoji === emoji
                            ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                            : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Birthday Message *
                  </label>
                  <textarea
                    rows={3}
                    value={authorMessage}
                    onChange={(e) => setAuthorMessage(e.target.value)}
                    placeholder="Write your heartfelt or hilarious birthday wish..."
                    required
                    className="w-full px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {formError && (
                  <p className="text-xs text-red-500 font-bold">{formError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-serif font-bold text-sm text-white shadow-md bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:scale-102 active:scale-98 transition-all cursor-pointer border border-white/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Birthday Wish ✨</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
