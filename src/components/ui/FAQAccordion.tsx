'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: readonly FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 my-8">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="rounded-xl bg-surface overflow-hidden ambient-shadow">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground hover:text-brand-orange transition-colors"
            >
              <span>{item.question}</span>
              <motion.svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 shrink-0"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-foreground/70 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
