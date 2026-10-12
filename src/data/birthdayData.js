/**
 * Centralized Birthday Surprise Configuration
 * 
 * Edit this file to easily customize all messages, photos, memories,
 * reasons, countdown dates, and romantic details!
 */

export const birthdayData = {
  // Personal Details
  recipientName: "My Dearest Janu",
  senderName: "With all my love",
  
  // Birthday Date (Format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)
  birthdayDate: "2026-10-24T00:00:00",

  // Music Settings
  music: {
    audioUrl: "/music/romantic-melody.mp3",
    trackTitle: "Romantic Piano Melody",
    artist: "For You"
  },

  // Secret Love Gateway & Friend Page Configuration
  secretGate: {
    passwords: ["love", "143", "janu", "mylove", "secret"],
    defaultPassword: "love",
    hint: "What this entire secret universe is all about... 4 letters: 'love' ❤️",
    portalTitle: "A Secret World Lies Beyond 🗝️",
    portalSubtitle: "To anyone else, this is a happy birthday greeting. But for the one who holds my heart... enter our secret passcode.",
    buttonText: "Unlock Secret Love World 🔐"
  },

  friendPage: {
    recipientName: "Bestie",
    title: "Happy Birthday, Bestie! 🎉",
    subtitle: "Wishing you a year filled with big laughs, unforgettable adventures, great food, and endless happiness!"
  },

  // 1. Hero / Welcome Section
  hero: {
    badge: "✨ A Special Celebration For Someone Extraordinary",
    title: "Happy Birthday, My Love ❤️",
    subtitle: "Today isn't just another day... it's the day someone incredibly special came into this world to fill my life with magic.",
    ctaText: "Start Our Story ❤️",
    secondaryCta: "Make a Wish 🎂",
  },

  // 2. Open My Heart Interactive Section
  openHeart: {
    badge: "❤️ Hidden Deep Inside",
    prompt: "There is something inside my heart...",
    buttonText: "Open My Heart ❤️",
    insideWord: "You ❤️",
    insideMessage: "In all of time and space, my heart chose you. You are my favorite thought, my deepest comfort, and the sweetest part of every day.",
  },

  // 3. How Much Do You Mean To Me? Slider Section
  loveSlider: {
    badge: "💕 An Infinite Measurement",
    title: "How Much Do You Mean To Me?",
    subtitle: "Watch as my love for you measures beyond the infinite universe...",
    limitMessage: "Still not enough to explain it ❤️",
    infinitySymbol: "∞",
    infinityMessage: "Because my love for you doesn't have a limit.",
  },

  // 4. Mystery Doors Section
  mysteryDoors: {
    badge: "🚪 3 Hidden Treasures",
    title: "I Have 3 Little Secrets For You...",
    subtitle: "Pick any door to reveal a special secret stored just for you...",
    doors: [
      {
        id: 1,
        number: "01",
        category: "A Memory",
        preview: "Where time stopped",
        icon: "✨",
        title: "The Moment I Knew",
        content: "I remember looking at you during a quiet moment and realizing: my whole world is right here in front of me. Everything suddenly made sense."
      },
      {
        id: 2,
        number: "02",
        category: "A Message",
        preview: "Written from the soul",
        icon: "💌",
        title: "A Lifetime Promise",
        content: "I promise to hold your hand through every storm, celebrate every victory with you, and love you a little more with each sunrise."
      },
      {
        id: 3,
        number: "03",
        category: "A Surprise",
        preview: "Your Golden Coupon",
        icon: "🎁",
        title: "Golden Birthday Pass",
        content: "Redeemable anytime: Unlimited warm hugs, midnight ice cream dates, free foot rubs, and unconditional love forever and ever!"
      }
    ]
  },

  // 5. Our Universe Cosmic Section
  ourUniverse: {
    badge: "🌌 Cosmic Destiny",
    title: "Our Universe",
    quote: "Somehow, in this huge universe, our paths crossed.",
    subquote: "Out of billions of stars and trillions of galaxies, meeting you is the sweetest miracle of my life.",
    star1Label: "You",
    star2Label: "Me"
  },

  // 6. Pull The Ribbon Gift Section
  ribbonGift: {
    badge: "🎀 Handcrafted For You",
    title: "I Wrapped Something For You...",
    subtitle: "Pull the silky ribbon to untie the magic ✨",
    ribbonPrompt: "Tap or Pull Ribbon 🎀",
    revealTitle: "Another year of being amazing. ❤️",
    revealMessage: "May this year bring you all the warmth, laughter, and high dreams you've ever wished for. You deserve the entire world!"
  },

  // 7. Catch The Hearts Mini Game
  catchHeartsGame: {
    badge: "🎮 Interactive Mini-Game",
    title: "Catch My Love ❤️",
    subtitle: "Tap the falling hearts to collect all my love before they drift away!",
    winTarget: 10,
    winMessage: "You collected all my love... but somehow I still have so much more to give! ❤️"
  },

  // 8. Memory Polaroids 3D Stack
  polaroids: {
    badge: "📸 Interactive Snapshots",
    title: "Memory Polaroids",
    subtitle: "Click any Polaroid to flip it over and read our private handwritten memory...",
    cards: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
        caption: "The day my heart found its home ❤️",
        date: "Sweet Beginning",
        rotate: -3
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
        caption: "Adventures are always sweeter hand in hand 🌸",
        date: "First Adventure",
        rotate: 4
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        caption: "Laughing till our stomachs hurt 😂",
        date: "Unfiltered Joy",
        rotate: -2
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        caption: "Watching the sunset paint the sky for you ✨",
        date: "Golden Sunset",
        rotate: 3
      }
    ],
    endMessage: "I'd choose these memories again and again."
  },

  // 9. Playlist Section
  playlist: {
    badge: "🎵 Our Soundtrack",
    title: "Songs That Remind Me Of You",
    subtitle: "Melodies that echo the warmth and sweetness of being with you.",
    tracks: [
      {
        id: 1,
        title: "Can't Help Falling in Love",
        artist: "Sweet Piano Melody",
        duration: "3:02",
        cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 2,
        title: "Perfect For Me",
        artist: "Acoustic Romance",
        duration: "4:15",
        cover: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 3,
        title: "Until I Found You",
        artist: "Romantic Chimes",
        duration: "2:58",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 4,
        title: "Lover's Lullaby",
        artist: "Midnight Starlight",
        duration: "3:30",
        cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },

  // 10. Future Memories Bucket List
  futureMemories: {
    badge: "✨ Our Unwritten Chapters",
    title: "Things I Still Want To Do With You...",
    subtitle: "A little bucket list of dreams waiting for us in the future.",
    dreams: [
      {
        id: 1,
        icon: "🌅",
        title: "Watch a sunrise together",
        tag: "Early Mornings",
        note: "Wrapped in warm blankets with hot cocoa, watching the world awaken quietly."
      },
      {
        id: 2,
        icon: "✈️",
        title: "Travel somewhere new",
        tag: "Adventures",
        note: "Getting delightfully lost in new cities, finding cute cafes and capturing memories."
      },
      {
        id: 3,
        icon: "🌊",
        title: "Walk beside the sea",
        tag: "Ocean Breeze",
        note: "Barefoot in the cool sand with the sound of waves and your hand in mine."
      },
      {
        id: 4,
        icon: "🍿",
        title: "Cozy random movie night",
        tag: "Comfort",
        note: "Blanket fort, fairy lights, endless popcorn, and falling asleep watching our favorite show."
      },
      {
        id: 5,
        icon: "🌧️",
        title: "Get caught in the rain",
        tag: "Cinematic",
        note: "Running under shelter laughing without caring about getting soaked in the summer shower."
      },
      {
        id: 6,
        icon: "🎂",
        title: "Celebrate 100 more birthdays",
        tag: "Forever",
        note: "Growing older, wiser, and deeper in love, blowing out candles year after year."
      }
    ],
    cardPrompt: "This isn't a memory yet... maybe one day it will be."
  },

  // 11. Message From Future Me (Time Capsule)
  timeCapsule: {
    badge: "⏳ Time Capsule",
    title: "A Message From The Future...",
    subtitle: "A digital letter locked away for our future selves to discover.",
    buttonText: "Open Future Message ✉️",
    quote: "If you're reading this years from now, I hope we're still making each other laugh the same way.",
    note: "No matter how many seasons pass, my heart will always know its way back to you. Happy Birthday, always."
  },

  // 12. One Last Question...
  smileQuestion: {
    badge: "💗 One Little Check",
    title: "Before You Leave...",
    question: "Did I Make You Smile Today?",
    yesBtn: "YES ❤️",
    ofCourseBtn: "OF COURSE 🥰",
    response: "Then my mission is complete. ❤️"
  },

  // 13. Final Cinematic Ending
  cinematicEnding: {
    waitText: "Wait...",
    moreThing: "One More Thing.",
    finalBday: "Happy Birthday, My Love ❤️",
    message: "I hope this little corner of the internet reminds you of how incredibly special, cherished, and loved you are.",
    closing: "Until our next memory... ❤️"
  },

  // 14. Easter Eggs
  easterEggs: {
    logoClickCount: 5,
    logoMessage: "Okay... you found me. ❤️ (I love you more than code and words can say!)",
    secretCode: "love",
    starMessage: "You discovered the secret starlight ✨ My wish upon this star is you, always."
  },

  // Existing sections
  countdown: {
    badge: "⏳ Counting Down The Moments",
    waitingTitle: "Something Special Is Waiting For You...",
    waitingSubtitle: "Every second brings us closer to celebrating the most beautiful soul.",
    celebrationTitle: "Today Is Your Special Day! 🎂❤️",
    celebrationSubtitle: "May your day be overflowing with laughter, sweet surprises, and unconditional love.",
  },

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

  cakeSection: {
    badge: "🎂 Make A Special Wish",
    title: "Blow Out The Candles",
    subtitle: "Click each candle or press the button to blow them out, make your heartfelt wish, and start the celebration!",
    instructions: "Tap on the flames or press the button to blow out the candles ✨",
    wishGrantedMessage: "Your wish is waiting to come true, Janu! ❤️",
    wishSubtitle: "May all your secret dreams and highest hopes bloom into reality this year, Janu!",
    candleCount: 3,
    cakeName: "Janu"
  },

  surprise: {
    badge: "💝 One Final Secret",
    buttonText: "I Have One More Surprise For You 💝",
    modalTitle: "A Promise To You On Your Birthday 💖",
    message: "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Then you would know just how incredibly special, gorgeous, and deeply cherished you are to me.",
    extraNote: "No matter how many years pass, my love for you will always grow stronger, deeper, and truer. Happy Birthday, my whole world! 🌹✨",
    giftIcon: "🎁"
  },

  finalMessage: {
    badge: "🌹 Forever And Always",
    title: "Happy Birthday, My Beautiful Girl ❤️",
    paragraph1: "Thank you for being such a breathtaking part of my life. Every memory with you is something I want to keep forever in the treasure chest of my heart.",
    paragraph2: "Here's to more memories, more laughs, more adventures, and more birthdays together hand in hand.",
    loveStatement: "I Love You ❤️",
    subscript: "Today, tomorrow, and for all our tomorrows."
  },

  footer: {
    madeWith: "Crafted with infinite love, just for you",
    year: "2026"
  }
};
