'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useTamboComponentState } from '@tambo-ai/react';

interface BreathingExerciseProps {
  duration?: number; // in seconds
  instruction?: string;
  intensity?: 'gentle' | 'medium' | 'deep';
  guidance?: string;
}

export default function BreathingExercise({ 
  duration = 4, 
  instruction = "Let's take a moment to breathe together",
  intensity = 'medium',
  guidance
}: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  
  // Tambo integration - report state back to AI
  const { updateState } = useTamboComponentState();

  useEffect(() => {
    if (!isActive) return;

    const phases: ('inhale' | 'hold' | 'exhale')[] = ['inhale', 'hold', 'exhale'];
    const durations = {
      inhale: duration * 1000,
      hold: duration * 1000,
      exhale: duration * 1000,
    };

    let phaseIndex = 0;
    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPhase = phases[phaseIndex];
      
      if (elapsed >= durations[currentPhase]) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        setPhase(phases[phaseIndex]);
        startTime = Date.now();
        
        if (phaseIndex === 0) {
          setCount(c => c + 1);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return `Breathe In (${duration}s)`;
      case 'hold': return `Hold (${duration}s)`;
      case 'exhale': return `Breathe Out (${duration}s)`;
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'inhale': return 1.3;
      case 'hold': return 1.3;
      case 'exhale': return 0.8;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-calm-600 dark:text-calm-400">
          <Wind className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">Breathing Exercise</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">{instruction}</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 py-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div
            className="breathing-circle absolute inset-0"
            animate={{
              scale: isActive ? getScale() : 1,
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
            }}
          />
          <div className="relative z-10 text-center text-white font-display font-semibold">
            {isActive ? (
              <>
                <div className="text-2xl">{getPhaseText()}</div>
                <div className="text-sm mt-2 opacity-80">{count} cycles</div>
              </>
            ) : (
              <div className="text-lg">Ready</div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            const newActiveState = !isActive;
            setIsActive(newActiveState);
            
            // Report to Tambo AI
            if (updateState) {
              updateState({
                exerciseStarted: newActiveState,
                timestamp: new Date().toISOString(),
                cyclesCompleted: count,
                duration,
                intensity,
              });
            }
          }}
          className={isActive ? "btn-secondary" : "btn-primary"}
        >
          {isActive ? 'Pause' : 'Start Breathing'}
        </button>
      </div>

      <div className="text-center text-sm text-sage-500 dark:text-sage-400">
        <p>Follow the circle's rhythm. Breathe deeply and naturally.</p>
      </div>
    </motion.div>
  );
}
