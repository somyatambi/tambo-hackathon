'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';
import { analyzeMoodPatterns } from '@/lib/mood-tools';

export default function MoodDashboard() {
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeMoodPatterns> | null>(null);
  const [days, setDays] = useState(7);

  useEffect(() => {
    setAnalysis(analyzeMoodPatterns(days));
  }, [days]);

  if (!analysis) return null;

  const getTrendIcon = () => {
    switch (analysis.trend) {
      case 'improving': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'declining': return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'stable': return <Minus className="w-5 h-5 text-sage-600" />;
    }
  };

  const getTrendColor = () => {
    switch (analysis.trend) {
      case 'improving': return 'text-green-600 dark:text-green-400';
      case 'declining': return 'text-red-600 dark:text-red-400';
      case 'stable': return 'text-sage-600 dark:text-sage-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-calm-600 dark:text-calm-400">
          <Calendar className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Your Mood Journey</h3>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-1 text-sm rounded-lg glass-card cursor-pointer"
        >
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center space-y-1">
          <div className="text-2xl font-display font-bold text-calm-600 dark:text-calm-400">
            {analysis.entriesCount}
          </div>
          <div className="text-xs text-sage-600 dark:text-sage-400">Check-ins</div>
        </div>

        <div className="glass-card p-4 text-center space-y-1">
          <div className={`text-2xl font-display font-bold capitalize ${getTrendColor()}`}>
            {analysis.trend}
          </div>
          <div className="text-xs text-sage-600 dark:text-sage-400">Trend</div>
        </div>

        <div className="glass-card p-4 text-center space-y-1">
          <div className="text-2xl font-display font-bold text-lavender-600 dark:text-lavender-400">
            {analysis.averageIntensity}/10
          </div>
          <div className="text-xs text-sage-600 dark:text-sage-400">Avg Intensity</div>
        </div>
      </div>

      <div className="glass-card p-4 bg-lavender-50/50 dark:bg-lavender-900/20 border-lavender-200 dark:border-lavender-800">
        <div className="flex items-start gap-3">
          {getTrendIcon()}
          <div className="flex-1 space-y-1">
            <div className="text-sm font-medium text-sage-800 dark:text-sage-200">
              Most Common: <span className="capitalize">{analysis.dominantMood}</span>
            </div>
            <div className="text-xs text-sage-600 dark:text-sage-400">
              in the last {days} days
            </div>
          </div>
        </div>
      </div>

      {analysis.insights.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-sage-700 dark:text-sage-300">
            Insights & Suggestions
          </div>
          <div className="space-y-2">
            {analysis.insights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 text-sm text-sage-600 dark:text-sage-400 glass-card p-3"
              >
                <span className="text-calm-600 dark:text-calm-400">•</span>
                <span>{insight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-center text-sage-400 dark:text-sage-500 pt-2 border-t border-sage-200 dark:border-sage-800">
        Continue tracking daily for more accurate insights
      </div>
    </motion.div>
  );
}
