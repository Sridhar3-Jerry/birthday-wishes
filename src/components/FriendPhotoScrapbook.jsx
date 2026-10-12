import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Plus, Heart, X, Upload, Link as LinkIcon, 
  Trash2, Check, Maximize2
} from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { triggerRomanticConfetti } from '../utils/confetti';

const STORAGE_KEY = 'friend_birthday_custom_photos';

export default function FriendPhotoScrapbook() {
  const friendConfig = birthdayData.friendPage || {};
  const defaultPhotos = friendConfig.photos || [];

  const [photos, setPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom photos on top of defaults
          return [...parsed, ...defaultPhotos];
        }
      }
    } catch {
      // ignore JSON errors
    }
    return defaultPhotos;
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [likes, setLikes] = useState({});

  // Add photo form state
  const [uploadTab, setUploadTab] = useState('file'); // 'file' | 'url'
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState('Adventures');
  const [newDate, setNewDate] = useState('Recently');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  // Extract unique categories
  const categories = ['All', 'Adventures', 'Hangouts', 'Celebrations', 'Candids'];

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  // Handle Like
  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Handle File Upload from device
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    setFormError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      setPreviewUrl(base64);
      setNewImageUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  // Handle URL input
  const handleUrlChange = (val) => {
    setNewImageUrl(val);
    setPreviewUrl(val);
  };

  // Save New Photo
  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      setFormError('Please upload an image file or enter an image URL.');
      return;
    }
    if (!newTitle.trim()) {
      setFormError('Please give this memory a title.');
      return;
    }

    const createdPhoto = {
      id: `custom_${Date.now()}`,
      title: newTitle.trim(),
      caption: newCaption.trim() || 'A golden memory that will never be forgotten.',
      category: newCategory,
      image: newImageUrl,
      date: newDate.trim() || 'Recently',
      likes: 1,
      isCustom: true,
    };

    const updatedList = [createdPhoto, ...photos];
    setPhotos(updatedList);

    // Save only custom photos to localStorage
    try {
      const customOnly = updatedList.filter((p) => p.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // localStorage may be full or blocked
    }

    // Trigger celebration confetti
    triggerRomanticConfetti();

    // Reset Form
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
    setPreviewUrl('');
    setFormError('');
    setShowAddModal(false);
  };

  // Delete Custom Photo
  const handleDeleteCustomPhoto = (id, e) => {
    e.stopPropagation();
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    try {
      const customOnly = updated.filter((p) => p.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
    } catch {
      // ignore
    }
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="friend-memories">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-teal-950/60 text-amber-900 dark:text-teal-300 border border-amber-300 dark:border-teal-500/40 shadow-xs mb-3">
          <Camera className="w-3.5 h-3.5 text-amber-600 dark:text-teal-400" />
          <span>{friendConfig.galleryBadge || '📸 Squad Scrapbook'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e132c] dark:text-white tracking-tight mb-3">
          {friendConfig.galleryTitle || 'Our Favorite Memories Together'}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
          {friendConfig.gallerySubtitle || 'Some of the best road trips, late night food runs, and unforgettable laughs captured in time.'}
        </p>

        {/* Action Row: Category Filter + Add Photo Button */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-200/60 dark:border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : 'glass-pill text-slate-600 dark:text-slate-300 hover:text-[#1e132c] dark:hover:text-white border border-slate-200/80 dark:border-white/10 hover:border-amber-400/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Add Memory Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all cursor-pointer border border-white/40 ml-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory / Photo</span>
          </motion.button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence>
          {filteredPhotos.map((photo, idx) => {
            const currentLikes = (photo.likes || 0) + (likes[photo.id] || 0);

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative glass-card rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all cursor-pointer bg-white/95 dark:bg-[#140e24]/95 flex flex-col"
              >
                {/* Scrapbook Tape / Pin Aesthetic */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 rounded-sm bg-amber-200/80 dark:bg-amber-400/30 text-[10px] font-mono font-bold tracking-widest text-amber-900 dark:text-amber-200 shadow-xs backdrop-blur-xs rotate-[-2deg]">
                  📌 {photo.date || 'Memories'}
                </div>

                {/* Photo Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 dark:bg-black/30">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                    <span className="text-xs font-bold flex items-center gap-1 drop-shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" /> View Photo
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {photo.category}
                    </span>
                  </div>

                  {/* Delete button if custom photo */}
                  {photo.isCustom && (
                    <button
                      onClick={(e) => handleDeleteCustomPhoto(photo.id, e)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors z-30"
                      title="Remove custom photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#1e132c] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {photo.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-teal-950/70 text-amber-800 dark:text-teal-300 border border-amber-300/60 dark:border-teal-500/30 shrink-0">
                        {photo.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Footer Interaction Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {photo.date || 'Golden Moments'}
                    </span>

                    <button
                      onClick={(e) => handleLike(photo.id, e)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 hover:scale-108 transition-all cursor-pointer"
                      title="Love this memory"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal (View Photo in High Res) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white dark:bg-[#160d29]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedPhoto.date}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>{(selectedPhoto.likes || 0) + (likes[selectedPhoto.id] || 0)} Likes</span>
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1e132c] dark:text-white mb-2">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Photo / Memory Modal */}
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
              className="relative max-w-lg w-full glass-card rounded-3xl p-6 sm:p-8 border-2 border-amber-300/70 dark:border-teal-500/40 shadow-2xl bg-white dark:bg-[#160e28]"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white">
                  Add A Birthday Memory 📸
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 font-medium">
                Upload a photo from your device or paste a web link to add to the scrapbook.
              </p>

              {/* Upload Method Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setUploadTab('file')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    uploadTab === 'file'
                      ? 'bg-white dark:bg-amber-500 text-amber-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadTab('url')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    uploadTab === 'url'
                      ? 'bg-white dark:bg-amber-500 text-amber-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Image URL</span>
                </button>
              </div>

              <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                {/* File Upload Tab */}
                {uploadTab === 'file' ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Choose Photo From Device
                    </label>
                    <label className="border-2 border-dashed border-amber-300 dark:border-teal-500/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-50/50 dark:hover:bg-white/5 transition-colors">
                      <Upload className="w-7 h-7 text-amber-500 mb-2" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Click to select an image
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        PNG, JPG, WEBP, GIF up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Image Web Link (URL)
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Preview Thumbnail */}
                {previewUrl && (
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-black/40">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Memory Title *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., That Sunset At The Beach"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                  />
                </div>

                {/* Category & Tag Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-[#1a1230] text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                    >
                      <option value="Adventures">Adventures</option>
                      <option value="Hangouts">Hangouts</option>
                      <option value="Celebrations">Celebrations</option>
                      <option value="Candids">Candids</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Date / Moment
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. Summer 2024"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Caption / Inside Joke
                  </label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Tell the funny or memorable story behind this picture..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[#1e132c] dark:text-white outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {/* Form Error */}
                {formError && (
                  <p className="text-xs text-red-500 font-bold">{formError}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-serif font-bold text-sm text-white shadow-md bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:scale-102 active:scale-98 transition-all cursor-pointer border border-white/30"
                >
                  Add To Scrapbook ✨
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
