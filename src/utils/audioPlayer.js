/**
 * Romantic Ambient Audio Player & Web Audio Synthesizer Fallback
 * 
 * Plays audio from public/music/ if available, or generates a soft,
 * relaxing romantic piano / chime ambient melody using Web Audio API.
 */

class RomanticAudioManager {
  constructor() {
    this.audioElement = null;
    this.audioContext = null;
    this.isPlaying = false;
    this.synthInterval = null;
    this.volume = 0.4;
    this.listeners = new Set();
  }

  init(audioUrl) {
    if (typeof window === 'undefined') return;

    this.audioUrl = audioUrl || '/music/romantic-melody.mp3';
    this.audioElement = new Audio();
    this.audioElement.src = this.audioUrl;
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;

    this.audioElement.addEventListener('ended', () => {
      this.audioElement.currentTime = 0;
      this.audioElement.play().catch(() => {});
    });
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  async togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  async play() {
    if (this.isPlaying) return;

    // Try HTML5 Audio element first
    if (this.audioElement && this.audioElement.src) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Fall back to Web Audio romantic synth melody
        this.startSynthMelody();
        this.isPlaying = true;
        this.notify();
        return;
      }
    }

    this.startSynthMelody();
    this.isPlaying = true;
    this.notify();
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthMelody();
    this.isPlaying = false;
    this.notify();
  }

  startSynthMelody() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Romantic chord progression frequencies (C major 7th / F maj9 / G sus / Am9)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
      ];

      let chordIndex = 0;
      let noteStep = 0;

      const playChimeNote = (freq, duration = 2.5, timeOffset = 0) => {
        if (!this.audioContext || this.audioContext.state === 'closed') return;
        const now = this.audioContext.currentTime + timeOffset;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft romantic envelope
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08 * this.volume, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      const step = () => {
        if (!this.isPlaying) return;
        const currentChord = chords[chordIndex % chords.length];
        const freq = currentChord[noteStep % currentChord.length];
        
        // Play gentle arpeggio note
        playChimeNote(freq, 2.8);

        // Soft octave embellishment
        if (noteStep === 0) {
          playChimeNote(freq * 0.5, 4.0, 0.05);
        }

        noteStep++;
        if (noteStep >= currentChord.length) {
          noteStep = 0;
          chordIndex++;
        }
      };

      // Play immediate first note
      step();
      this.synthInterval = setInterval(step, 900);
    } catch (e) {
      console.warn("Audio synthesis note:", e);
    }
  }

  stopSynthMelody() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const audioManager = new RomanticAudioManager();
