'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Save } from 'lucide-react';
import { saveMoodEntry } from '@/lib/mood-tools';
import { useTamboComponentState } from '@tambo-ai/react';

interface JournalPromptProps {
  prompt?: string;
  style?: 'gratitude' | 'stream' | 'structured';
  mood?: string;
}

export default function JournalPrompt({ 
  prompt = "What's on your mind?",
  style = 'stream',
  mood = 'calm'
}: JournalPromptProps) {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  
  // Tambo integration - report journaling activity
  const { updateState } = useTamboComponentState();

  const handleSave = () => {
    if (entry.trim()) {
      const moodEntry = {
        timestamp: new Date().toISOString(),
        mood: mood as any,
        intensity: 5,
        notes: entry,
      };
      saveMoodEntry(moodEntry);
      
      // Report to Tambo AI
      if (updateState) {
        updateState({
          journalEntryCompleted: true,
          wordCount: entry.split(/\s+/).length,
          style,
          timestamp: new Date().toISOString(),
        });
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const getStyleInstructions = () => {
    switch (style) {
      case 'gratitude':
        return 'Write about things you\'re grateful for today, big or small.';
      case 'structured':
        return 'Try answering: What happened? How did it make me feel? What can I learn?';
      case 'stream':
        return 'Let your thoughts flow freely without judgment or editing.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-lavender-600 dark:text-lavender-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Journal</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">{getStyleInstructions()}</p>
      </div>

      <div className="space-y-4">
        <div className="glass-card p-4 bg-lavender-50/50 dark:bg-lavender-900/20 border-lavender-200 dark:border-lavender-800">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-lavender-600 dark:text-lavender-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-lavender-800 dark:text-lavender-200 italic">
              {prompt}
            </p>
          </div>
        </div>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Start writing..."
          className="journal-textarea min-h-[200px] text-base leading-relaxed"
          autoFocus
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-sage-500 dark:text-sage-400">
            {entry.length} characters
          </div>
          <button
            onClick={handleSave}
            disabled={!entry.trim()}
            className={`flex items-center gap-2 ${entry.trim() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Entry'}
          </button>
        </div>
      </div>

      <div className="text-xs text-center text-sage-400 dark:text-sage-500 pt-2 border-t border-sage-200 dark:border-sage-800">
        Your journal entries are private and stored only on your device
      </div>
    </motion.div>
  );
}
