/**
 * Centralized Birthday Surprise Configuration
 * 
 * Edit this file to easily customize all messages, photos, memories,
 * reasons, countdown dates, and romantic details!
 */

export const birthdayData = {
  // Personal Details
  recipientName: "My Dearest",
  senderName: "With all my love",
  
  // Birthday Date (Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)
  // Set this to your girlfriend's upcoming birthday!
  birthdayDate: "2026-10-15T00:00:00",

  // Music Settings
  music: {
    audioUrl: "/music/romantic-melody.mp3", // Place your MP3 in public/music/romantic-melody.mp3
    trackTitle: "Romantic Piano Melody",
    artist: "For You"
  },

  // 1. Hero / Welcome Section
  hero: {
    badge: "✨ A Special Celebration For Someone Extraordinary",
    title: "Happy Birthday, My Love ❤️",
    subtitle: "Today isn't just another day... it's the day someone incredibly special came into this world to fill my life with magic.",
    ctaText: "Start Our Story ❤️",
    secondaryCta: "Make a Wish 🎂",
  },

  // 2. Birthday Countdown Section
  countdown: {
    badge: "⏳ Counting Down The Moments",
    waitingTitle: "Something Special Is Waiting For You...",
    waitingSubtitle: "Every second brings us closer to celebrating the most beautiful soul.",
    celebrationTitle: "Today Is Your Special Day! 🎂❤️",
    celebrationSubtitle: "May your day be overflowing with laughter, sweet surprises, and unconditional love.",
  },

  // 3. Love Letter Section
  loveLetter: {
    badge: "💌 From The Depths Of My Heart",
    title: "A Little Message From My Heart",
    subtitle: "Words will never be enough, but here is a piece of my soul written just for you...",
    salutation: "My Darling,",
    paragraphs: [
      "From the first moment you stepped into my life, everything became brighter, warmer, and so much sweeter. Your gentle laugh is my favorite melody, and your kindness inspires me to be a better person every single day.",
      "Whenever life gets chaotic, you are my peaceful sanctuary. When things feel heavy, you bring light and remind me of all the beauty in this world. Your smile is my daily dose of joy, and your hand in mine is where I feel most at home.",
      "On this special birthday, I want to thank you for every shared laugh, every late-night conversation, every quiet moment, and every dream we've whispered together. I promise to keep celebrating you—not just today, but in all the days and years ahead."
    ],
    closing: "Forever & always yours,",
    signature: "Your Love ❤️"
  },

  // 4. Memory Timeline Section
  memories: [
    {
      id: 1,
      date: "The Day We Met ❤️",
      title: "Where Our Story Began",
      description: "A moment I will never forget. A simple hello that quietly changed my entire universe and brought you into my life.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      tag: "The Beginning",
      accentColor: "from-pink-400 to-rose-400"
    },
    {
      id: 2,
      date: "Our First Adventure 🌸",
      title: "Exploring Hand in Hand",
      description: "One of my favorite memories with you. Getting lost in new places, laughing until our stomachs hurt, and discovering magic in simple things.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      tag: "Adventures",
      accentColor: "from-purple-400 to-indigo-400"
    },
    {
      id: 3,
      date: "That Crazy Day 😂",
      title: "Uncontrollable Laughter",
      description: "Still makes me smile whenever I remember it. Even when unexpected mishaps happened, being with you made everything a hilarious joy.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      tag: "Pure Joy",
      accentColor: "from-sky-400 to-blue-400"
    },
    {
      id: 4,
      date: "Sunset & Stargazing ✨",
      title: "Quiet Romantic Evenings",
      description: "Sitting side by side watching the sky turn pink and lavender. Wrapped in warmth, realizing that home is wherever you are.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      tag: "Magic Hours",
      accentColor: "from-rose-400 to-purple-400"
    },
    {
      id: 5,
      date: "Cozy Coffee Dates ☕",
      title: "Our Favorite Little Talks",
      description: "Sharing warm drinks, whispered secrets, and dreams for our future. The simplest moments with you are my absolute favorite treasures.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      tag: "Sweet Comfort",
      accentColor: "from-pink-400 to-sky-400"
    }
  ],

  // 5. Photo Gallery Section
  gallery: {
    badge: "📸 Capturing Our Happiness",
    title: "Our Little World",
    subtitle: "A collection of beautiful frames that capture the joy and sweetness we create together.",
    photos: [
      {
        id: 1,
        title: "Golden Hour Glow",
        caption: "Your smile outshines every sunset I've ever seen.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
        category: "Sunset",
        span: "col-span-1 md:col-span-2 row-span-2"
      },
      {
        id: 2,
        title: "Holding Hands",
        caption: "In your hand, my whole world finds its balance.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
        category: "Love",
        span: "col-span-1 row-span-1"
      },
      {
        id: 3,
        title: "Fresh Blooms for You",
        caption: "Sweet pink and lavender blossoms, just like your gentle heart.",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
        category: "Flowers",
        span: "col-span-1 row-span-1"
      },
      {
        id: 4,
        title: "Beachside Romance",
        caption: "Walking near the gentle waves with the cool ocean breeze.",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&w=800&q=80",
        category: "Travel",
        span: "col-span-1 row-span-1"
      },
      {
        id: 5,
        title: "Fairy Lights & Starlight",
        caption: "Every night sparkles a little brighter because of you.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        category: "Nights",
        span: "col-span-1 md:col-span-2 row-span-1"
      },
      {
        id: 6,
        title: "Sweet Delights",
        caption: "Celebrating all the sweet moments we cherish.",
        image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
        category: "Celebration",
        span: "col-span-1 row-span-1"
      }
    ]
  },

  // 6. Reasons Why I Love You Section
  reasons: [
    {
      id: 1,
      icon: "😊",
      title: "Your Radiant Smile",
      shortSummary: "Lights up even the gloomiest day",
      message: "The instant you smile, whatever stress or doubt I have simply melts away. It is genuine, contagious, and the most captivating sight in the world.",
      color: "from-pink-100 to-rose-100 border-pink-200 text-pink-700"
    },
    {
      id: 2,
      icon: "🌸",
      title: "Your Endless Kindness",
      shortSummary: "How gently you treat the world",
      message: "You treat people and animals with so much empathy and warmth. Your sweet heart makes this whole planet a softer and kinder place to be.",
      color: "from-purple-100 to-lavender-100 border-purple-200 text-purple-700"
    },
    {
      id: 3,
      icon: "❤️",
      title: "The Way You Care",
      shortSummary: "Always thinking of the little details",
      message: "From checking if I ate to remembering the tiniest things I mention in passing, your care and thoughtfulness mean more than words can say.",
      color: "from-rose-100 to-pink-100 border-rose-200 text-rose-700"
    },
    {
      id: 4,
      icon: "💕",
      title: "Your Beautiful Heart",
      shortSummary: "Pure, honest, and truly golden",
      message: "You possess a rare innocence and strength. Loving you is the easiest, most natural and rewarding decision of my life.",
      color: "from-sky-100 to-blue-100 border-sky-200 text-sky-700"
    },
    {
      id: 5,
      icon: "✨",
      title: "How You Make Me Happy",
      shortSummary: "My favorite person to be around",
      message: "With you, I can be 100% my true self. We can be goofy, silly, serious, or romantic, and every second feels extraordinary.",
      color: "from-amber-100 to-peach-100 border-orange-200 text-amber-800"
    },
    {
      id: 6,
      icon: "🥰",
      title: "Every Little Thing About You",
      shortSummary: "From your cute quirks to your dreams",
      message: "The way you scrunch your nose when laughing, your passion for things you love, and the spark in your eyes. I adore every single piece of you.",
      color: "from-indigo-100 to-purple-100 border-indigo-200 text-indigo-700"
    }
  ],

  // 7. Interactive Birthday Cake Section
  cakeSection: {
    badge: "🎂 Make A Special Wish",
    title: "Blow Out The Candles",
    subtitle: "Click each candle or press the button to blow them out, make your heartfelt wish, and start the celebration!",
    instructions: "Tap on the flames to extinguish each candle ✨",
    wishGrantedMessage: "Your wish is waiting to come true... ❤️",
    wishSubtitle: "May all your secret dreams and highest hopes bloom into reality this year!",
    candleCount: 3
  },

  // 8. Surprise Section
  surprise: {
    badge: "💝 One Final Secret",
    buttonText: "I Have One More Surprise For You 💝",
    modalTitle: "A Promise To You On Your Birthday 💖",
    message: "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Then you would know just how incredibly special, gorgeous, and deeply cherished you are to me.",
    extraNote: "No matter how many years pass, my love for you will always grow stronger, deeper, and truer. Happy Birthday, my whole world! 🌹✨",
    giftIcon: "🎁"
  },

  // 9. Final Birthday Message Section
  finalMessage: {
    badge: "🌹 Forever And Always",
    title: "Happy Birthday, My Beautiful Girl ❤️",
    paragraph1: "Thank you for being such a breathtaking part of my life. Every memory with you is something I want to keep forever in the treasure chest of my heart.",
    paragraph2: "Here's to more memories, more laughs, more adventures, and more birthdays together hand in hand.",
    loveStatement: "I Love You ❤️",
    subscript: "Today, tomorrow, and for all our tomorrows."
  },

  // Footer Details
  footer: {
    madeWith: "Crafted with infinite love, just for you",
    year: "2026"
  }
};
