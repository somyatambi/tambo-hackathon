'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Cloud, Sun, AlertCircle, Heart, Zap } from 'lucide-react';
import { saveMoodEntry } from '@/lib/mood-tools';
import { useTamboComponentState } from '@tambo-ai/react';

const moodOptions = [
  { mood: 'joyful', icon: Sun, label: 'Joyful', color: 'text-yellow-500' },
  { mood: 'calm', icon: Cloud, label: 'Calm', color: 'text-calm-500' },
  { mood: 'peaceful', icon: Heart, label: 'Peaceful', color: 'text-lavender-500' },
  { mood: 'stressed', icon: Zap, label: 'Stressed', color: 'text-orange-500' },
  { mood: 'anxious', icon: AlertCircle, label: 'Anxious', color: 'text-red-500' },
  { mood: 'sad', icon: Frown, label: 'Sad', color: 'text-blue-500' },
  { mood: 'angry', icon: Zap, label: 'Angry', color: 'text-red-600' },
  { mood: 'overwhelmed', icon: AlertCircle, label: 'Overwhelmed', color: 'text-purple-500' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [saved, setSaved] = useState(false);
  
  // Tambo integration - report mood data back to AI
  const { updateState } = useTamboComponentState();

  const handleSave = () => {
    if (selectedMood) {
      saveMoodEntry({
        timestamp: new Date().toISOString(),
        mood: selectedMood as any,
        intensity,
      });
      
      // Report to Tambo AI
      if (updateState) {
        updateState({
          moodLogged: true,
          mood: selectedMood,
          intensity,
          timestamp: new Date().toISOString(),
        });
      }
      
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setSelectedMood(null);
        setIntensity(5);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sage-600 dark:text-sage-400">
          <Smile className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Mood Check-In</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">How are you feeling right now?</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {moodOptions.map(({ mood, icon: Icon, label, color }) => (
          <motion.button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={`mood-button p-4 flex flex-col items-center gap-2 ${
              selectedMood === mood ? 'ring-2 ring-calm-500 bg-calm-50 dark:bg-calm-900' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={`w-6 h-6 ${color}`} />
            <span className="text-xs font-medium text-sage-700 dark:text-sage-300">{label}</span>
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-sage-700 dark:text-sage-300">
              Intensity: {intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-sage-200 dark:bg-sage-700 rounded-lg appearance-none cursor-pointer accent-calm-500"
            />
            <div className="flex justify-between text-xs text-sage-500">
              <span>Mild</span>
              <span>Intense</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary w-full"
          >
            {saved ? '✓ Saved!' : 'Log Mood'}
          </button>
        </motion.div>
      )}

      <div className="text-xs text-center text-sage-400 dark:text-sage-500 pt-2 border-t border-sage-200 dark:border-sage-800">
        Track your mood over time to identify patterns
      </div>
    </motion.div>
  );
}
