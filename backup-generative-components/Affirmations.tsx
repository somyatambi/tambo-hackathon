'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

const affirmationsBank = [
  'I am worthy of love and respect',
  'My feelings are valid and important',
  'I am growing and learning every day',
  'I choose peace over perfection',
  'I am enough, exactly as I am',
  'I trust in my ability to handle challenges',
  'I deserve rest and self-care',
  'My past does not define my future',
  'I am resilient and strong',
  'I choose to focus on what I can control',
  'I am proud of how far I\'ve come',
  'I give myself permission to feel joy',
  'I am doing my best, and that is enough',
  'I release what no longer serves me',
  'I am worthy of good things',
];

export default function Affirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [saved, setSaved] = useState(false);

  const generateNew = () => {
    const random = affirmationsBank[Math.floor(Math.random() * affirmationsBank.length)];
    setCurrentAffirmation(random);
    setSaved(false);
  };

  useEffect(() => {
    generateNew();
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-lavender-600 dark:text-lavender-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Daily Affirmation</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          Positive thoughts to carry with you
        </p>
      </div>

      <motion.div
        key={currentAffirmation}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 bg-gradient-to-br from-lavender-50 to-calm-50 dark:from-lavender-900/20 dark:to-calm-900/20 border-lavender-200 dark:border-lavender-800 min-h-[160px] flex items-center justify-center"
      >
        <p className="text-2xl font-display text-center text-sage-800 dark:text-sage-200 leading-relaxed">
          "{currentAffirmation}"
        </p>
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={generateNew}
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New Affirmation
        </button>
        <button
          onClick={handleSave}
          className="btn-primary flex-1"
        >
          {saved ? '✓ Saved!' : 'Save to Favorites'}
        </button>
      </div>

      <div className="text-center text-sm text-sage-600 dark:text-sage-400 space-y-2">
        <p>💡 Repeat this affirmation throughout your day</p>
        <p className="text-xs text-sage-500 dark:text-sage-500">
          The more you practice, the more natural it becomes
        </p>
      </div>
    </motion.div>
  );
}
