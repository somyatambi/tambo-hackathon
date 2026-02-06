'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Music, Book, Coffee, Check } from 'lucide-react';

export default function SleepWindDown() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const routine = [
    {
      id: 'screens',
      icon: Moon,
      title: 'Put away screens',
      description: 'No phones or devices for 30 mins before bed',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'tea',
      icon: Coffee,
      title: 'Have herbal tea',
      description: 'Chamomile, lavender, or peppermint',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'calm',
      icon: Music,
      title: 'Calming sounds',
      description: 'Play soft music or nature sounds',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'journal',
      icon: Book,
      title: 'Quick journal',
      description: 'Write 3 things from today',
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  const toggle = (id: string) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const allComplete = completedCount === routine.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-lavender-600 dark:text-lavender-400">
          <Moon className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Sleep Wind-Down Routine</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          Prepare your mind and body for restful sleep
        </p>
      </div>

      <div className="space-y-3">
        {routine.map((item, idx) => {
          const isComplete = completed[item.id];
          
          return (
            <motion.button
              key={item.id}
              onClick={() => toggle(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`w-full glass-card p-4 hover:shadow-lg transition-all text-left ${
                isComplete ? 'bg-calm-50 dark:bg-calm-900/20 border-calm-300 dark:border-calm-700' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white dark:bg-sage-800 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isComplete ? 'line-through text-sage-500' : 'text-sage-800 dark:text-sage-200'}`}>
                      {item.title}
                    </span>
                    {isComplete && (
                      <Check className="w-4 h-4 text-calm-600 dark:text-calm-400" />
                    )}
                  </div>
                  <p className="text-sm text-sage-600 dark:text-sage-400 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-sage-600 dark:text-sage-400">Progress</span>
          <span className="font-medium text-sage-700 dark:text-sage-300">
            {completedCount} / {routine.length}
          </span>
        </div>
        <div className="w-full bg-sage-200 dark:bg-sage-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-calm-500 to-lavender-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / routine.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 bg-lavender-50 dark:bg-lavender-900/20 border-lavender-300 dark:border-lavender-700 text-center"
        >
          <p className="text-lg font-display font-semibold text-lavender-800 dark:text-lavender-200">
            ✨ Perfect! You're ready for sleep
          </p>
          <p className="text-sm text-lavender-600 dark:text-lavender-300 mt-1">
            Sweet dreams and restful night ahead
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
