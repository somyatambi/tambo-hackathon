import { z } from "zod";

export const MoodEntry = z.object({
  timestamp: z.string(),
  mood: z.enum(['joyful', 'calm', 'anxious', 'sad', 'angry', 'overwhelmed', 'peaceful', 'stressed']),
  intensity: z.number().min(1).max(10),
  activities: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type MoodEntry = z.infer<typeof MoodEntry>;

export const getMoodHistory = (): MoodEntry[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mindflow_mood_history');
  return stored ? JSON.parse(stored) : [];
};

export const saveMoodEntry = (entry: MoodEntry): void => {
  if (typeof window === 'undefined') return;
  const history = getMoodHistory();
  history.push(entry);
  // Keep last 100 entries
  const trimmed = history.slice(-100);
  localStorage.setItem('mindflow_mood_history', JSON.stringify(trimmed));
};

export const analyzeMoodPatterns = (days: number = 7) => {
  const history = getMoodHistory();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentEntries = history.filter(entry => 
    new Date(entry.timestamp) >= cutoffDate
  );

  if (recentEntries.length === 0) {
    return {
      averageIntensity: 0,
      dominantMood: 'neutral',
      trend: 'stable',
      insights: ['Start tracking your mood to see patterns over time'],
    };
  }

  const avgIntensity = recentEntries.reduce((sum, e) => sum + e.intensity, 0) / recentEntries.length;
  
  const moodCounts: Record<string, number> = {};
  recentEntries.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  const dominantMood = Object.entries(moodCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'neutral';

  // Calculate trend
  const firstHalf = recentEntries.slice(0, Math.floor(recentEntries.length / 2));
  const secondHalf = recentEntries.slice(Math.floor(recentEntries.length / 2));
  
  const firstAvg = firstHalf.reduce((sum, e) => sum + e.intensity, 0) / (firstHalf.length || 1);
  const secondAvg = secondHalf.reduce((sum, e) => sum + e.intensity, 0) / (secondHalf.length || 1);
  
  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  if (secondAvg > firstAvg + 1) trend = 'improving';
  else if (secondAvg < firstAvg - 1) trend = 'declining';

  // Generate insights
  const insights: string[] = [];
  
  if (trend === 'improving') {
    insights.push('Your mood has been trending positively - great work! 🌟');
  } else if (trend === 'declining') {
    insights.push('Your mood has been trending down. Consider reaching out to a friend or professional.');
  }
  
  if (dominantMood === 'anxious' || dominantMood === 'stressed') {
    insights.push('You\'ve experienced anxiety recently. Try breathing exercises or grounding techniques.');
  }
  
  if (avgIntensity > 7) {
    insights.push('You\'ve been experiencing intense emotions. Remember to practice self-compassion.');
  }
  
  if (recentEntries.length < 3) {
    insights.push('Keep tracking your mood daily for more detailed insights.');
  }

  return {
    averageIntensity: Math.round(avgIntensity * 10) / 10,
    dominantMood,
    trend,
    insights,
    entriesCount: recentEntries.length,
  };
};

export const getJournalPrompts = (mood: string): string[] => {
  const prompts: Record<string, string[]> = {
    anxious: [
      'What specific thoughts are making you feel anxious right now?',
      'What is one thing within your control that you can focus on?',
      'Describe a time when you overcame a similar feeling.',
    ],
    sad: [
      'What emotions are you feeling beneath the sadness?',
      'What would you say to a friend feeling this way?',
      'What small act of self-care could you do right now?',
    ],
    joyful: [
      'What contributed to this positive feeling?',
      'How can you capture this moment to revisit later?',
      'Who could you share this joy with?',
    ],
    overwhelmed: [
      'What is one small task you could complete right now?',
      'What can you let go of or delegate?',
      'What does your mind and body need most in this moment?',
    ],
    calm: [
      'What helped you reach this state of calm?',
      'What are you grateful for in this moment?',
      'How can you carry this feeling forward?',
    ],
  };

  return prompts[mood] || prompts.calm;
};
