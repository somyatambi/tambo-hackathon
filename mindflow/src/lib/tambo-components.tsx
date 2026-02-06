/**
 * Tambo Component Registry
 * 
 * Register all therapeutic components with Tambo SDK for AI-driven selection
 */

import { registerComponent } from '@tambo-ai/react';
import { z } from 'zod';

// Import all therapeutic components
import BreathingExercise from '@/components/generative/BreathingExercise';
import JournalPrompt from '@/components/generative/JournalPrompt';
import MoodTracker from '@/components/generative/MoodTracker';
import CognitiveReframe from '@/components/generative/CognitiveReframe';
import MeditationGuide from '@/components/generative/MeditationGuide';
import AnxietyGrounding from '@/components/generative/AnxietyGrounding';
import MoodDashboard from '@/components/generative/MoodDashboard';
import CrisisResources from '@/components/generative/CrisisResources';
import Affirmations from '@/components/generative/Affirmations';
import SleepWindDown from '@/components/generative/SleepWindDown';

/**
 * Initialize all component registrations
 * Call this once at app startup
 */
export function initializeTamboComponents() {
  // 1. Breathing Exercise - For anxiety, stress, panic
  registerComponent({
    name: 'BreathingExercise',
    component: BreathingExercise,
    description: 'An interactive, animated breathing exercise with visual guidance. Helps users calm anxiety, reduce stress, and regulate their nervous system through guided breathing patterns (4-7-8 technique).',
    props: z.object({}).optional(),
    triggers: [
      'anxious',
      'anxiety',
      'panic',
      'stressed',
      'nervous',
      'overwhelmed',
      'breathe',
      'breathing',
      'calm down',
    ],
  });

  // 2. Journal Prompt - For reflection, processing emotions
  registerComponent({
    name: 'JournalPrompt',
    component: JournalPrompt,
    description: 'A journaling interface with thoughtful prompts for self-reflection. Helps users process emotions, explore thoughts, practice gratitude, or engage in stream-of-consciousness writing.',
    props: z.object({
      mood: z.enum(['anxious', 'sad', 'joyful', 'overwhelmed', 'calm', 'stressed', 'angry', 'peaceful']).optional(),
    }).optional(),
    triggers: [
      'journal',
      'write',
      'reflect',
      'think',
      'thoughts',
      'feelings',
      'express',
      'gratitude',
      'grateful',
    ],
  });

  // 3. Mood Tracker - For logging current emotional state
  registerComponent({
    name: 'MoodTracker',
    component: MoodTracker,
    description: 'An interactive mood logging tool with visual sliders and activity tracking. Allows users to record their current emotional state, intensity, and related activities for pattern analysis.',
    props: z.object({}).optional(),
    triggers: [
      'mood',
      'feeling',
      'emotion',
      'check in',
      'track',
      'log',
      'record',
      'how am i',
    ],
  });

  // 4. Cognitive Reframe - For challenging negative thoughts
  registerComponent({
    name: 'CognitiveReframe',
    component: CognitiveReframe,
    description: 'A cognitive behavioral therapy tool that helps users identify, challenge, and reframe negative thought patterns. Guides users through evidence-based cognitive restructuring.',
    props: z.object({}).optional(),
    triggers: [
      'negative thought',
      'thinking',
      'reframe',
      'challenge',
      'cognitive',
      'thought pattern',
      'ruminating',
      'overthinking',
    ],
  });

  // 5. Meditation Guide - For mindfulness and calm
  registerComponent({
    name: 'MeditationGuide',
    component: MeditationGuide,
    description: 'A guided meditation experience with timed sessions and visual guidance. Offers various meditation lengths and styles for mindfulness practice.',
    props: z.object({
      duration: z.number().optional(),
    }).optional(),
    triggers: [
      'meditate',
      'meditation',
      'mindfulness',
      'peace',
      'peaceful',
      'center',
      'present',
      'awareness',
    ],
  });

  // 6. Anxiety Grounding - For panic and acute anxiety
  registerComponent({
    name: 'AnxietyGrounding',
    component: AnxietyGrounding,
    description: 'An interactive 5-4-3-2-1 grounding technique to help users reconnect with the present moment during anxiety or panic. Walks through identifying 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
    props: z.object({}).optional(),
    triggers: [
      'panic',
      'panic attack',
      'grounding',
      'overwhelmed',
      'anxiety attack',
      'dissociate',
      'present moment',
    ],
  });

  // 7. Mood Dashboard - For progress tracking and insights
  registerComponent({
    name: 'MoodDashboard',
    component: MoodDashboard,
    description: 'A comprehensive dashboard showing mood patterns, trends, and insights over time. Visualizes the user\'s emotional journey with charts and analytics.',
    props: z.object({
      days: z.number().default(7),
    }).optional(),
    triggers: [
      'progress',
      'dashboard',
      'stats',
      'patterns',
      'history',
      'trends',
      'analytics',
      'insights',
    ],
  });

  // 8. Crisis Resources - For emergencies and severe distress
  registerComponent({
    name: 'CrisisResources',
    component: CrisisResources,
    description: 'CRITICAL: Emergency mental health resources including suicide hotlines, crisis text lines, and immediate help contacts. ALWAYS render this for any mention of self-harm, suicide, or crisis.',
    props: z.object({}).optional(),
    triggers: [
      'suicide',
      'suicidal',
      'self harm',
      'self-harm',
      'kill myself',
      'end it all',
      'crisis',
      'emergency',
      'help me',
      'desperate',
    ],
  });

  // 9. Affirmations - For positive reinforcement
  registerComponent({
    name: 'Affirmations',
    component: Affirmations,
    description: 'Daily positive affirmations and uplifting messages tailored to the user\'s emotional state. Helps build self-compassion and positive self-talk.',
    props: z.object({
      mood: z.enum(['anxious', 'sad', 'joyful', 'overwhelmed', 'calm', 'stressed', 'angry', 'peaceful']).optional(),
    }).optional(),
    triggers: [
      'affirmation',
      'positive',
      'encourage',
      'uplift',
      'happy',
      'joyful',
      'grateful',
      'celebrate',
    ],
  });

  // 10. Sleep Wind-Down - For sleep issues
  registerComponent({
    name: 'SleepWindDown',
    component: SleepWindDown,
    description: 'A bedtime routine checklist and wind-down sequence to prepare for restful sleep. Includes relaxation techniques and sleep hygiene recommendations.',
    props: z.object({}).optional(),
    triggers: [
      'sleep',
      'insomnia',
      'can\'t sleep',
      'tired',
      'bedtime',
      'wind down',
      'rest',
      'sleepy',
    ],
  });
}

/**
 * Component metadata for reference
 */
export const componentRegistry = {
  BreathingExercise: {
    name: 'Breathing Exercise',
    category: 'Anxiety Relief',
    interactive: true,
  },
  JournalPrompt: {
    name: 'Journal Prompt',
    category: 'Self-Reflection',
    interactive: true,
  },
  MoodTracker: {
    name: 'Mood Tracker',
    category: 'Emotional Awareness',
    interactive: true,
  },
  CognitiveReframe: {
    name: 'Cognitive Reframe',
    category: 'Thought Work',
    interactive: true,
  },
  MeditationGuide: {
    name: 'Meditation Guide',
    category: 'Mindfulness',
    interactive: true,
  },
  AnxietyGrounding: {
    name: 'Anxiety Grounding',
    category: 'Anxiety Relief',
    interactive: true,
  },
  MoodDashboard: {
    name: 'Mood Dashboard',
    category: 'Progress Tracking',
    interactive: false,
  },
  CrisisResources: {
    name: 'Crisis Resources',
    category: 'Emergency Support',
    interactive: false,
  },
  Affirmations: {
    name: 'Affirmations',
    category: 'Positive Psychology',
    interactive: false,
  },
  SleepWindDown: {
    name: 'Sleep Wind-Down',
    category: 'Sleep Support',
    interactive: true,
  },
} as const;
