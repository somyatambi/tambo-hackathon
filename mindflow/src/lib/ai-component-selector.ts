/**
 * AI-Powered Component Selection
 * 
 * Uses OpenRouter + Claude to intelligently select components
 * This replaces Tambo's cloud service for local development
 */

import { openRouterClient } from './openrouter-client';
import { componentGuidelines } from './tambo-registry';

export interface ComponentSelection {
  componentName: string;
  props: Record<string, any>;
  reasoning: string;
}

/**
 * Use AI to select appropriate therapeutic components based on user message
 */
export async function selectComponentsWithAI(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<{ response: string; components: ComponentSelection[] }> {
  
  const systemPrompt = `You are MindFlow, a compassionate AI mental wellness companion powered by Claude Sonnet 4.5.

${componentGuidelines}

Your task:
1. Analyze the user's emotional state from their message
2. Provide a warm, empathetic text response (2-3 sentences max)
3. Select 1-3 appropriate therapeutic components to render
4. Specify props for each component in JSON format

Response format (JSON):
{
  "response": "Your empathetic text response here",
  "components": [
    {
      "componentName": "ComponentName",
      "props": { "prop1": "value1" },
      "reasoning": "Why this component"
    }
  ]
}

Available components: BreathingExercise, JournalPrompt, MoodTracker, CognitiveReframe, MeditationGuide, AnxietyGrounding, MoodDashboard, CrisisResources, Affirmations, SleepWindDown

CRITICAL: If user mentions suicide, self-harm, or crisis keywords, ALWAYS include CrisisResources first.`;

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    ...conversationHistory.slice(-5), // Last 5 messages for context
    { role: 'user' as const, content: userMessage },
  ];

  try {
    const aiResponse = await openRouterClient.chat(messages);
    
    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        response: parsed.response || aiResponse,
        components: parsed.components || [],
      };
    }

    // Fallback if no JSON found
    return {
      response: aiResponse,
      components: fallbackComponentSelection(userMessage),
    };
  } catch (error) {
    console.error('AI component selection error:', error);
    
    // Fallback to rule-based selection
    return {
      response: "I'm here to support you. Let me share some helpful tools.",
      components: fallbackComponentSelection(userMessage),
    };
  }
}

/**
 * Fallback rule-based component selection if AI fails
 */
function fallbackComponentSelection(message: string): ComponentSelection[] {
  const lowerMessage = message.toLowerCase();
  const components: ComponentSelection[] = [];

  // Crisis detection (highest priority)
  const crisisKeywords = ['suicide', 'kill myself', 'end it', 'self-harm', 'hurt myself', 'die', "don't want to be here"];
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    components.push({
      componentName: 'CrisisResources',
      props: {},
      reasoning: 'Crisis keywords detected',
    });
    return components; // Return immediately for crisis
  }

  // Anxiety
  if (lowerMessage.match(/anxious|anxiety|panic|nervous|worried|stress/)) {
    components.push({
      componentName: 'BreathingExercise',
      props: { duration: 180, intensity: 'medium' },
      reasoning: 'Anxiety detected',
    });
    components.push({
      componentName: 'AnxietyGrounding',
      props: {},
      reasoning: 'Additional anxiety support',
    });
  }

  // Sleep issues
  if (lowerMessage.match(/sleep|insomnia|can't sleep|tired|rest/)) {
    components.push({
      componentName: 'SleepWindDown',
      props: {},
      reasoning: 'Sleep issues detected',
    });
    components.push({
      componentName: 'MeditationGuide',
      props: { style: 'sleep', duration: 10 },
      reasoning: 'Sleep meditation',
    });
  }

  // Sadness
  if (lowerMessage.match(/sad|depressed|down|hopeless|lonely/)) {
    components.push({
      componentName: 'JournalPrompt',
      props: { mood: 'sad' },
      reasoning: 'Processing sadness',
    });
    components.push({
      componentName: 'Affirmations',
      props: { mood: 'sad' },
      reasoning: 'Uplifting support',
    });
  }

  // Progress request
  if (lowerMessage.match(/progress|dashboard|history|track|stats/)) {
    components.push({
      componentName: 'MoodDashboard',
      props: {},
      reasoning: 'Progress requested',
    });
  }

  // Journal request
  if (lowerMessage.match(/journal|write|reflect|process/)) {
    components.push({
      componentName: 'JournalPrompt',
      props: { style: 'stream' },
      reasoning: 'Journaling requested',
    });
  }

  // Default: Mood tracker
  if (components.length === 0) {
    components.push({
      componentName: 'MoodTracker',
      props: {},
      reasoning: 'Default check-in',
    });
  }

  return components;
}

/**
 * Map component names to actual React components
 */
export function getComponentByName(name: string) {
  const components: Record<string, any> = {
    BreathingExercise: () => import('@/components/generative/BreathingExercise').then(m => m.default),
    JournalPrompt: () => import('@/components/generative/JournalPrompt').then(m => m.default),
    MoodTracker: () => import('@/components/generative/MoodTracker').then(m => m.default),
    CognitiveReframe: () => import('@/components/generative/CognitiveReframe').then(m => m.default),
    MeditationGuide: () => import('@/components/generative/MeditationGuide').then(m => m.default),
    AnxietyGrounding: () => import('@/components/generative/AnxietyGrounding').then(m => m.default),
    MoodDashboard: () => import('@/components/generative/MoodDashboard').then(m => m.default),
    CrisisResources: () => import('@/components/generative/CrisisResources').then(m => m.default),
    Affirmations: () => import('@/components/generative/Affirmations').then(m => m.default),
    SleepWindDown: () => import('@/components/generative/SleepWindDown').then(m => m.default),
  };

  return components[name] || null;
}
