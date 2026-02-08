/**
 * Tambo Component Registry for MindFlow
 * 
 * Registers all therapeutic components with Tambo SDK
 * for AI-driven dynamic component selection
 */

import { type TamboComponent } from '@tambo-ai/react';
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
 * All therapeutic components registered with Tambo
 * The AI will intelligently select and render these based on user needs
 */
export const mindflowComponents: TamboComponent[] = [
  {
    name: 'BreathingExercise',
    description: 'Guided breathing exercise to reduce anxiety and promote calmness. Includes timed inhale/hold/exhale cycles with visual guides. Best for: anxiety, panic, stress, overwhelm, nervousness.',
    component: BreathingExercise,
    propsSchema: z.object({
      intensity: z.enum(['gentle', 'medium', 'deep']).default('medium')
        .describe('Breathing intensity: gentle (4-4-4), medium (4-7-8), deep (4-8-8)'),
      duration: z.number().min(60).max(600).default(180)
        .describe('Duration in seconds (1-10 minutes)'),
      guidance: z.string().optional()
        .describe('Optional personalized guidance message'),
    }),
  },
  
  {
    name: 'JournalPrompt',
    description: 'Thoughtful journaling prompts for emotional processing and self-reflection. Helps users express feelings and gain insights. Best for: reflection, processing emotions, self-discovery, exploring feelings.',
    component: JournalPrompt,
    propsSchema: z.object({
      mood: z.enum(['anxious', 'sad', 'joyful', 'overwhelmed', 'calm', 'stressed', 'angry', 'peaceful']).optional()
        .describe('Current emotional state to tailor prompts'),
      prompts: z.array(z.string()).optional()
        .describe('Specific journal prompts to present'),
      theme: z.enum(['gratitude', 'challenges', 'growth', 'relationships', 'goals']).optional()
        .describe('Thematic focus for journaling'),
    }),
  },
  
  {
    name: 'MoodTracker',
    description: 'Interactive mood logging and tracking interface. Records emotional states over time for pattern recognition. Best for: daily check-ins, mood logging, emotional awareness, tracking progress.',
    component: MoodTracker,
    propsSchema: z.object({
      showHistory: z.boolean().default(false)
        .describe('Whether to display recent mood history'),
      suggestActions: z.boolean().default(true)
        .describe('Suggest actions based on current mood'),
    }),
  },
  
  {
    name: 'CognitiveReframe',
    description: 'Cognitive Behavioral Therapy (CBT) tool for reframing negative thoughts into balanced perspectives. Best for: negative thinking, self-criticism, cognitive distortions, rumination.',
    component: CognitiveReframe,
    propsSchema: z.object({
      situation: z.string().optional()
        .describe('Specific situation or thought to reframe'),
      distortionType: z.enum([
        'all-or-nothing',
        'overgeneralization',
        'catastrophizing',
        'should-statements',
        'labeling',
      ]).optional()
        .describe('Type of cognitive distortion detected'),
    }),
  },
  
  {
    name: 'MeditationGuide',
    description: 'Guided meditation session with audio cues and timer. Includes mindfulness, body scan, and loving-kindness practices. Best for: relaxation, mindfulness, centering, spiritual practice.',
    component: MeditationGuide,
    propsSchema: z.object({
      type: z.enum(['mindfulness', 'body-scan', 'loving-kindness', 'breath-focus']).default('mindfulness')
        .describe('Type of meditation practice'),
      duration: z.number().min(300).max(1800).default(600)
        .describe('Meditation duration in seconds (5-30 minutes)'),
      voiceGuidance: z.boolean().default(true)
        .describe('Include voice guidance cues'),
    }),
  },
  
  {
    name: 'AnxietyGrounding',
    description: '5-4-3-2-1 grounding technique for acute anxiety and panic. Engages senses to return to present moment. Best for: panic attacks, acute anxiety, dissociation, overwhelming feelings.',
    component: AnxietyGrounding,
    propsSchema: z.object({
      intensity: z.enum(['gentle', 'standard', 'intensive']).default('standard')
        .describe('Intensity of grounding exercise'),
      customPrompts: z.array(z.string()).optional()
        .describe('Custom sensory prompts'),
    }),
  },
  
  {
    name: 'MoodDashboard',
    description: 'Visual dashboard showing mood patterns, insights, and progress over time. Includes charts and trend analysis. Best for: tracking progress, seeing patterns, understanding triggers, celebrating wins.',
    component: MoodDashboard,
    propsSchema: z.object({
      timeframe: z.enum(['week', 'month', 'quarter', 'year']).default('week')
        .describe('Time period to analyze'),
      showInsights: z.boolean().default(true)
        .describe('Display AI-generated insights'),
      compareToBaseline: z.boolean().default(false)
        .describe('Compare to personal baseline'),
    }),
  },
  
  {
    name: 'CrisisResources',
    description: 'Emergency mental health resources and crisis hotlines. ALWAYS show when user expresses crisis, suicidal ideation, or self-harm thoughts. Best for: crisis, emergency, suicidal thoughts, self-harm, severe distress.',
    component: CrisisResources,
    propsSchema: z.object({
      location: z.string().optional()
        .describe('User location for localized resources'),
      urgency: z.enum(['low', 'medium', 'high', 'critical']).default('high')
        .describe('Level of urgency detected'),
    }),
  },
  
  {
    name: 'Affirmations',
    description: 'Positive affirmations and self-compassion statements. Builds self-esteem and positive self-talk. Best for: positive mood, gratitude, building confidence, celebrating progress, morning routine.',
    component: Affirmations,
    propsSchema: z.object({
      theme: z.enum(['self-love', 'strength', 'gratitude', 'courage', 'peace']).default('self-love')
        .describe('Theme of affirmations'),
      count: z.number().min(3).max(10).default(5)
        .describe('Number of affirmations to display'),
      personalized: z.boolean().default(true)
        .describe('Personalize based on user context'),
    }),
  },
  
  {
    name: 'SleepWindDown',
    description: 'Evening wind-down routine for better sleep. Includes relaxation techniques and sleep hygiene tips. Best for: insomnia, trouble sleeping, bedtime, restlessness, tired but wired.',
    component: SleepWindDown,
    propsSchema: z.object({
      bedtime: z.string().optional()
        .describe('Target bedtime (e.g., "10:30 PM")'),
      currentTime: z.string().optional()
        .describe('Current time for timing the routine'),
      includeStretches: z.boolean().default(true)
        .describe('Include gentle stretching routine'),
    }),
  },
];

/**
 * Component selection guidelines for the AI
 * This helps Tambo understand when and how to combine components
 */
export const componentGuidelines = `
COMPONENT SELECTION GUIDELINES FOR MINDFLOW:

CRISIS DETECTION (HIGHEST PRIORITY):
- Keywords: suicide, self-harm, kill myself, end it all, no point, can't go on
- ALWAYS render CrisisResources immediately
- Keep UI simple and calming
- Do not combine with other complex components

ANXIETY & PANIC:
- Keywords: anxious, panic, worried, nervous, can't breathe, heart racing
- Primary: BreathingExercise (medium intensity)
- Secondary: AnxietyGrounding (for acute episodes)
- Optional: MeditationGuide (for sustained calm)

SLEEP ISSUES:
- Keywords: can't sleep, insomnia, tired, restless, bedtime, exhausted
- Primary: SleepWindDown
- Secondary: MeditationGuide (body-scan type)
- Optional: BreathingExercise (gentle intensity)

SAD OR DEPRESSED:
- Keywords: sad, depressed, down, hopeless, empty, lonely
- Primary: JournalPrompt (challenges or growth theme)
- Secondary: CognitiveReframe
- Optional: Affirmations (self-love theme)

OVERWHELMED OR STRESSED:
- Keywords: overwhelmed, stressed, too much, can't handle, drowning
- Primary: BreathingExercise (deep intensity)
- Secondary: JournalPrompt (to process)
- Tertiary: CognitiveReframe
- Keep UI minimal - user needs simplicity

POSITIVE MOOD:
- Keywords: happy, grateful, joyful, excited, proud, accomplished
- Primary: Affirmations (gratitude theme)
- Secondary: MoodTracker (to log positive state)
- Optional: JournalPrompt (gratitude theme)

REFLECTION & INSIGHT:
- Keywords: thinking, reflecting, understanding, why, patterns, realize
- Primary: JournalPrompt
- Secondary: MoodDashboard (for patterns)
- Optional: CognitiveReframe (for insights)

PROGRESS TRACKING:
- Keywords: progress, how am I doing, patterns, trends, getting better
- Primary: MoodDashboard
- Secondary: MoodTracker (with history)

ANGRY OR FRUSTRATED:
- Keywords: angry, mad, frustrated, irritated, rage, annoyed
- Primary: BreathingExercise (deep intensity)
- Secondary: JournalPrompt (to express safely)
- Optional: CognitiveReframe

COMPONENT COMBINATION RULES:
1. NEVER combine more than 3 components at once
2. For overwhelmed users, show only 1-2 simple components
3. For calm exploration, can show 2-3 components
4. Crisis resources always appear alone
5. Breathing exercises pair well with most interventions
6. Dashboards and trackers work better when user is calm

PROGRESSIVE COMPLEXITY:
- First interaction: Show 1 primary component
- User engaging well: Add secondary component
- User calm and exploring: Show dashboard/insights
- User overwhelmed: Remove components, simplify

ALWAYS remember: User is seeking help. Be compassionate, clear, and supportive.
`;
