'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';

export default function CognitiveReframe() {
  const [negativeThought, setNegativeThought] = useState('');
  const [reframe, setReframe] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const questions = [
    'Is this thought based on facts or feelings?',
    'What would I tell a friend thinking this?',
    'What evidence contradicts this thought?',
    'What\'s a more balanced way to see this?',
  ];

  const handleContinue = () => {
    if (step === 1 && negativeThought.trim()) {
      setStep(2);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-calm-600 dark:text-calm-400">
          <Brain className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Cognitive Reframing</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          Let's challenge and reframe unhelpful thoughts
        </p>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2">
                What negative thought are you having?
              </label>
              <textarea
                value={negativeThought}
                onChange={(e) => setNegativeThought(e.target.value)}
                placeholder="I always mess things up..."
                className="journal-textarea min-h-[120px]"
                autoFocus
              />
            </div>
            <button
              onClick={handleContinue}
              disabled={!negativeThought.trim()}
              className={`w-full flex items-center justify-center gap-2 ${
                negativeThought.trim() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200 italic">
                "{negativeThought}"
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-sage-700 dark:text-sage-300">
                Consider these questions:
              </p>
              {questions.map((question, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-sage-600 dark:text-sage-400">
                  <span className="text-calm-600 dark:text-calm-400">•</span>
                  <span>{question}</span>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-700 dark:text-sage-300 mb-2">
                Write a more balanced thought:
              </label>
              <textarea
                value={reframe}
                onChange={(e) => setReframe(e.target.value)}
                placeholder="I'm learning and growing. Everyone makes mistakes, and that's okay..."
                className="journal-textarea min-h-[120px]"
              />
            </div>

            {reframe.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-4 bg-calm-50 dark:bg-calm-900/20 border-calm-200 dark:border-calm-800"
              >
                <p className="text-sm text-calm-800 dark:text-calm-200">
                  ✓ Great work! Notice how this thought feels different?
                </p>
              </motion.div>
            )}

            <button
              onClick={() => {
                setStep(1);
                setNegativeThought('');
                setReframe('');
              }}
              className="btn-secondary w-full"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
