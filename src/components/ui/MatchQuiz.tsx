'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  q: string;
  options: string[];
}

const questions: Question[] = [
  {
    q: 'Was ist dein Blaulicht-Beruf?',
    options: ['Polizei', 'Feuerwehr', 'Sanität / Rettung', 'Anderer Beruf'],
  },
  {
    q: 'Dein ideales erstes Date?',
    options: ['Kaffee nach der Schicht', 'Wandern in den Bergen', 'Gemeinsam kochen', 'Überrasch mich!'],
  },
  {
    q: 'Was ist dir bei einem Partner am wichtigsten?',
    options: ['Verständnis für Schichtarbeit', 'Humor', 'Abenteuergeist', 'Treue & Stabilität'],
  },
];

const results: Record<string, { title: string; emoji: string; text: string }> = {
  'Polizei': {
    title: 'Der Beschützer-Typ',
    emoji: '🛡️',
    text: 'Du brauchst jemanden, der deine Stärke schätzt — und auch mal die Schwäche hinter der Uniform sieht.',
  },
  'Feuerwehr': {
    title: 'Der Held mit Herz',
    emoji: '🔥',
    text: 'Leidenschaft pur! Du suchst jemanden, der dein Feuer teilt — im Dienst und in der Liebe.',
  },
  'Sanität / Rettung': {
    title: 'Der Lebensretter',
    emoji: '💙',
    text: 'Empathie ist deine Superkraft. Du brauchst jemanden, der auch für dich da ist, wenn du nach Hause kommst.',
  },
  'default': {
    title: 'Der Allrounder',
    emoji: '⭐',
    text: 'Du weisst, was du willst. Blaulicht-Singles verstehen deinen Alltag — hier findest du deinen Match.',
  },
};

export function MatchQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const next = [...answers, answer];
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const isComplete = step >= questions.length;
  const result = isComplete
    ? results[answers[0]] || results['default']
    : null;

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div className="flex gap-1 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? 'bg-brand-orange' : 'bg-foreground/10'
                  }`}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold mb-6">{questions[step].q}</h3>
            <div className="grid gap-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="text-left px-5 py-4 rounded-xl border border-foreground/10 hover:border-brand-orange hover:bg-brand-orange/5 transition-all duration-200 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-5xl mb-4">{result.emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{result.title}</h3>
            <p className="text-foreground/70 mb-6">{result.text}</p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://blaulichtsingles.ch/registration/?AID=magazin-quiz"
                className="px-6 py-3 bg-[#429A45] text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                Jetzt Match finden
              </a>
              <button
                onClick={reset}
                className="px-6 py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-all"
              >
                Nochmal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
