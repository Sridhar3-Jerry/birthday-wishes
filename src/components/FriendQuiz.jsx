import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { triggerRomanticConfetti } from '../utils/confetti';

const QUESTIONS = [
  {
    question: "What is Bestie's greatest superpower?",
    options: [
      { text: "Turning a bad day into pure laughter 😂", correct: true },
      { text: "Finding the best food in any neighborhood 🍕", correct: false },
      { text: "Sleeping for 14 hours straight without moving 😴", correct: false },
    ],
    hint: "Think about why they are the heart of the squad!"
  },
  {
    question: "What happens during a 'quick 10-minute coffee' with Bestie?",
    options: [
      { text: "We actually leave after 10 minutes", correct: false },
      { text: "It turns into a 4-hour podcast about life & drama ☕", correct: true },
      { text: "We accidentally order 5 pastries each", correct: false },
    ],
    hint: "Time does not exist when we talk!"
  },
  {
    question: "What is guaranteed to happen on any trip with Bestie?",
    options: [
      { text: "Taking 300 photos until one looks aesthetic 📸", correct: false },
      { text: "Uncontrollable fits of giggles at midnight 🌙", correct: false },
      { text: "Both A & B, plus stopping for snacks every 20 miles 🚗", correct: true },
    ],
    hint: "It's always an unforgettable adventure!"
  }
];

export default function FriendQuiz() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUESTIONS[currentQIndex];

  const handleSelectOption = (idx, isCorrect) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      triggerRomanticConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      triggerRomanticConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10" id="friend-quiz">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 shadow-xs mb-3">
          <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>🎯 Interactive Mini-Game</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1e132c] dark:text-white tracking-tight mb-3">
          The Ultimate Bestie Quiz
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
          How well do you really know our birthday legend? Test your knowledge below!
        </p>
      </div>

      <div className="glass-card rounded-3xl p-7 sm:p-10 border-2 border-amber-300/80 dark:border-white/10 shadow-xl bg-white/95 dark:bg-[#150f24]/95">
        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div
              key={currentQIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                <span>Question {currentQIndex + 1} of {QUESTIONS.length}</span>
                <span>Score: {score} / {QUESTIONS.length}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e132c] dark:text-white">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'border-slate-200 dark:border-white/10 hover:border-amber-400 bg-slate-50 dark:bg-white/5';

                  if (isAnswered) {
                    if (option.correct) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400';
                    } else if (selectedOption === idx) {
                      btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx, option.correct)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option.text}</span>
                      {isAnswered && option.correct && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="pt-4 flex justify-end">
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-full font-serif font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-rose-500 shadow-md hover:scale-105 cursor-pointer"
                  >
                    {currentQIndex + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results 🏆'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-600/40 flex items-center justify-center mx-auto text-amber-500">
                <Award className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-[#1e132c] dark:text-white">
                Certified Best Friend! 🏆
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                You scored <span className="font-bold text-amber-600 dark:text-amber-400">{score} out of {QUESTIONS.length}</span>! Your friendship bond is officially 100% certified and verified by the squad.
              </p>

              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
