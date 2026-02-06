'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Pause } from 'lucide-react';

interface MeditationGuideProps {
  duration?: number; // in minutes
  type?: 'breath' | 'body-scan' | 'loving-kindness';
}

export default function MeditationGuide({ 
  duration = 5,
  type = 'breath'
}: MeditationGuideProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [currentPhase, setCurrentPhase] = useState(0);

  const meditationPhases = {
    breath: [
      { text: 'Find a comfortable position', duration: 20 },
      { text: 'Close your eyes gently', duration: 10 },
      { text: 'Notice your natural breath', duration: 30 },
      { text: 'Breathe deeply and slowly', duration: 60 },
      { text: 'Let thoughts pass like clouds', duration: 60 },
      { text: 'Return to your breath', duration: 60 },
      { text: 'Feel gratitude for this moment', duration: 30 },
      { text: 'Slowly open your eyes', duration: 10 },
    ],
    'body-scan': [
      { text: 'Lie down comfortably', duration: 20 },
      { text: 'Notice your feet and toes', duration: 40 },
      { text: 'Feel your legs relaxing', duration: 40 },
      { text: 'Release tension in your core', duration: 40 },
      { text: 'Soften your chest and shoulders', duration: 40 },
      { text: 'Relax your neck and face', duration: 40 },
      { text: 'Feel your whole body at peace', duration: 40 },
      { text: 'Take your time returning', duration: 20 },
    ],
    'loving-kindness': [
      { text: 'Think of someone you love', duration: 30 },
      { text: 'May they be happy', duration: 40 },
      { text: 'May they be healthy', duration: 40 },
      { text: 'May they be safe', duration: 40 },
      { text: 'Now direct these wishes to yourself', duration: 40 },
      { text: 'May I be happy and healthy', duration: 60 },
      { text: 'Extend compassion to all beings', duration: 40 },
      { text: 'Rest in loving kindness', duration: 30 },
    ],
  };

  const phases = meditationPhases[type];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Calculate current phase based on elapsed time
  useEffect(() => {
    const elapsed = (duration * 60) - timeRemaining;
    let phaseTime = 0;
    let phase = 0;
    
    for (let i = 0; i < phases.length; i++) {
      if (elapsed >= phaseTime && elapsed < phaseTime + phases[i].duration) {
        phase = i;
        break;
      }
      phaseTime += phases[i].duration;
      if (i === phases.length - 1) phase = i;
    }
    
    setCurrentPhase(phase);
  }, [timeRemaining, phases, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'breath': return 'Breath Awareness';
      case 'body-scan': return 'Body Scan';
      case 'loving-kindness': return 'Loving Kindness';
    }
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
          <h3 className="text-xl font-display font-semibold">Guided Meditation</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">{getTypeLabel()} • {duration} minutes</p>
      </div>

      <div className="flex flex-col items-center space-y-8 py-8">
        <div className="text-center space-y-4">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display text-sage-800 dark:text-sage-200 px-8"
          >
            {isActive ? phases[currentPhase].text : 'Ready to begin'}
          </motion.div>

          <div className="text-4xl font-display font-semibold text-calm-600 dark:text-calm-400">
            {formatTime(timeRemaining)}
          </div>
        </div>

        <motion.button
          onClick={() => setIsActive(!isActive)}
          className={`${isActive ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {timeRemaining === duration * 60 ? 'Begin' : 'Resume'}
            </>
          )}
        </motion.button>
      </div>

      <div className="flex justify-center gap-1">
        {phases.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx <= currentPhase && isActive
                ? 'bg-calm-500 w-3'
                : 'bg-sage-300 dark:bg-sage-700 w-2'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
