'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Anchor, Check } from 'lucide-react';

export default function AnxietyGrounding() {
  const [completed, setCompleted] = useState<Record<string, number>>({
    see: 0,
    touch: 0,
    hear: 0,
    smell: 0,
    taste: 0,
  });

  const steps = [
    { key: 'see', label: 'things you can SEE', count: 5, color: 'text-blue-600 dark:text-blue-400' },
    { key: 'touch', label: 'things you can TOUCH', count: 4, color: 'text-green-600 dark:text-green-400' },
    { key: 'hear', label: 'things you can HEAR', count: 3, color: 'text-purple-600 dark:text-purple-400' },
    { key: 'smell', label: 'things you can SMELL', count: 2, color: 'text-orange-600 dark:text-orange-400' },
    { key: 'taste', label: 'thing you can TASTE', count: 1, color: 'text-red-600 dark:text-red-400' },
  ];

  const handleIncrement = (key: string, max: number) => {
    setCompleted(prev => ({
      ...prev,
      [key]: Math.min((prev[key] || 0) + 1, max),
    }));
  };

  const totalProgress = Object.values(completed).reduce((a, b) => a + b, 0);
  const maxProgress = steps.reduce((sum, step) => sum + step.count, 0);
  const isComplete = totalProgress === maxProgress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-calm-600 dark:text-calm-400">
          <Anchor className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">5-4-3-2-1 Grounding</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          Bring yourself back to the present moment
        </p>
      </div>

      <div className="space-y-4">
        {steps.map(({ key, label, count, color }) => {
          const itemsCompleted = completed[key] || 0;
          const items = Array.from({ length: count }, (_, i) => i);
          
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${color}`}>
                  {count} {label}
                </span>
                <span className="text-xs text-sage-500">
                  {itemsCompleted}/{count}
                </span>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {items.map((i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleIncrement(key, count)}
                    disabled={itemsCompleted < i}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      itemsCompleted > i
                        ? `bg-gradient-to-br from-calm-400 to-sage-400 text-white shadow-lg`
                        : itemsCompleted === i
                        ? 'glass-card hover:shadow-lg cursor-pointer ring-2 ring-calm-400'
                        : 'glass-card opacity-40 cursor-not-allowed'
                    }`}
                    whileHover={itemsCompleted === i ? { scale: 1.1 } : {}}
                    whileTap={itemsCompleted === i ? { scale: 0.95 } : {}}
                  >
                    {itemsCompleted > i && <Check className="w-5 h-5" />}
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 bg-calm-50 dark:bg-calm-900/20 border-calm-300 dark:border-calm-700 text-center"
        >
          <p className="text-lg font-display font-semibold text-calm-800 dark:text-calm-200">
            🌟 Well done! How do you feel now?
          </p>
          <p className="text-sm text-calm-600 dark:text-calm-300 mt-2">
            You've successfully grounded yourself in the present moment
          </p>
        </motion.div>
      )}

      <div className="w-full bg-sage-200 dark:bg-sage-800 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-calm-500 to-sage-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(totalProgress / maxProgress) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
