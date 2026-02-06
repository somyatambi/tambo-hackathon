/**
 * Demo Mode Component
 * 
 * Showcases various conversation examples and AI-driven component selection
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Sparkles } from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  userInput: string;
  expectedComponents: string[];
  description: string;
}

const demoScenarios: DemoScenario[] = [
  {
    id: 'anxiety',
    title: 'Anxiety Support',
    userInput: "I'm feeling really anxious and my heart is racing",
    expectedComponents: ['BreathingExercise', 'AnxietyGrounding'],
    description: 'AI detects anxiety and selects calming exercises',
  },
  {
    id: 'sleep',
    title: 'Sleep Issues',
    userInput: "I can't sleep, my mind won't stop racing",
    expectedComponents: ['SleepWindDown', 'MeditationGuide'],
    description: 'AI provides sleep-focused interventions',
  },
  {
    id: 'reflection',
    title: 'Reflective Journaling',
    userInput: "I want to reflect on my day and process my feelings",
    expectedComponents: ['JournalPrompt'],
    description: 'AI offers journaling prompts for self-reflection',
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    userInput: "Show me how I've been doing this week",
    expectedComponents: ['MoodDashboard'],
    description: 'AI displays mood patterns and insights',
  },
  {
    id: 'crisis',
    title: 'Crisis Detection',
    userInput: "I feel like I can't go on anymore",
    expectedComponents: ['CrisisResources'],
    description: 'AI immediately provides emergency resources',
  },
  {
    id: 'happy',
    title: 'Positive Mood',
    userInput: "I'm feeling great today! Want to celebrate",
    expectedComponents: ['Affirmations', 'JournalPrompt'],
    description: 'AI reinforces positive emotions with gratitude',
  },
];

interface DemoModeProps {
  onSelectScenario?: (scenario: DemoScenario) => void;
}

export default function DemoMode({ onSelectScenario }: DemoModeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Demo Mode Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Demo Mode"
      >
        <Play className="w-6 h-6" />
      </motion.button>

      {/* Demo Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[80vh] z-50 glass-card rounded-3xl p-6 overflow-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-sage-800 dark:text-sage-100">
                      Demo Mode
                    </h2>
                    <p className="text-sm text-sage-600 dark:text-sage-400">
                      See how AI intelligently selects therapeutic components
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-sage-200 dark:hover:bg-sage-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-sage-600 dark:text-sage-400" />
                </button>
              </div>

              {/* Scenarios Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {demoScenarios.map((scenario, idx) => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => {
                      onSelectScenario?.(scenario);
                      setIsOpen(false);
                    }}
                    className="text-left p-6 glass-card rounded-2xl hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-display font-bold text-sage-800 dark:text-sage-100 mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-sage-600 dark:text-sage-400 mb-3 italic">
                      "{scenario.userInput}"
                    </p>
                    <p className="text-xs text-sage-500 dark:text-sage-500 mb-3">
                      {scenario.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scenario.expectedComponents.map((comp) => (
                        <span
                          key={comp}
                          className="px-3 py-1 text-xs rounded-full bg-calm-100 dark:bg-calm-900/40 text-calm-700 dark:text-calm-300 border border-calm-300 dark:border-calm-700"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Info Footer */}
              <div className="mt-6 p-4 rounded-xl bg-lavender-100 dark:bg-lavender-900/20 border border-lavender-300 dark:border-lavender-700">
                <p className="text-sm text-sage-700 dark:text-sage-300">
                  <strong>💡 How it works:</strong> The AI analyzes each message, understands the emotional context,
                  and intelligently selects 1-3 complementary therapeutic components. No hardcoded rules - pure AI intelligence!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
