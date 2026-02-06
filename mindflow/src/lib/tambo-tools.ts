/**
 * Tambo Tools Registration for MindFlow
 * 
 * Local tools that Tambo AI can call to access user data and context
 */

import { z } from 'zod';
import { type TamboTool } from '@tambo-ai/react';
import { analyzeMoodPatterns, getJournalPrompts } from './mood-tools';

/**
 * Tool definitions for Tambo AI to use
 * These allow the AI to access user mood history and provide contextual support
 */
export const mindflowTools: TamboTool<any, any, any>[] = [
  {
    name: 'analyzeMoodPatterns',
    description: 'Analyze user mood patterns over the specified number of days. Returns insights about mood trends, triggers, and patterns. Use this to provide data-driven insights and personalized recommendations.',
    inputSchema: z.object({
      days: z.number().min(1).max(90).default(7)
        .describe('Number of days to analyze (1-90, default 7)'),
    }),
    outputSchema: z.any(),
    tool: async ({ days }: { days: number }) => {
      try {
        const analysis = analyzeMoodPatterns(days);
        return {
          success: true,
          data: analysis,
          insights: generateInsights(analysis),
        };
      } catch (error) {
        return {
          success: false,
          error: 'Unable to analyze mood patterns',
          fallback: 'No mood data available yet. Encourage user to start tracking.',
        };
      }
    },
  },
  
  {
    name: 'getJournalPrompts',
    description: 'Get contextual journaling prompts based on user\'s current emotional state. Returns 3-5 thoughtful prompts tailored to the mood.',
    inputSchema: z.object({
      mood: z.enum(['anxious', 'sad', 'joyful', 'overwhelmed', 'calm', 'stressed', 'angry', 'peaceful'])
        .describe('Current emotional state of the user'),
    }),
    outputSchema: z.any(),
    tool: async ({ mood }: { mood: string }) => {
      try {
        const prompts = getJournalPrompts(mood);
        return {
          success: true,
          prompts,
          mood,
          guidance: `These prompts are designed to help process ${mood} feelings.`,
        };
      } catch (error) {
        return {
          success: false,
          error: 'Unable to generate prompts',
          fallback: ['What are you feeling right now?', 'What triggered this emotion?', 'What would help you feel better?'],
        };
      }
    },
  },
  
  {
    name: 'getEmergencyResources',
    description: 'CRITICAL: Get emergency mental health resources. Use IMMEDIATELY if user expresses suicidal ideation, self-harm thoughts, or severe crisis. Returns crisis hotlines and emergency contacts.',
    inputSchema: z.object({
      location: z.string().optional()
        .describe('User location for localized resources (optional)'),
      urgency: z.enum(['medium', 'high', 'critical']).default('high')
        .describe('Severity level: medium (struggling), high (crisis), critical (immediate danger)'),
    }),
    outputSchema: z.any(),
    tool: async ({ location, urgency }: { location?: string; urgency: string }) => {
      const resources = {
        crisis: [
          {
            name: 'National Suicide Prevention Lifeline',
            contact: '988',
            description: 'Free, confidential support 24/7',
            available: '24/7',
            method: 'Call or text',
          },
          {
            name: 'Crisis Text Line',
            contact: 'Text HOME to 741741',
            description: 'Text-based crisis support',
            available: '24/7',
            method: 'Text message',
          },
          {
            name: 'SAMHSA National Helpline',
            contact: '1-800-662-4357',
            description: 'Treatment referral and information service',
            available: '24/7',
            method: 'Phone call',
          },
          {
            name: 'Veterans Crisis Line',
            contact: '988 then press 1',
            description: 'Support for veterans and their families',
            available: '24/7',
            method: 'Call or text',
          },
        ],
        immediate: [
          {
            name: 'Emergency Services',
            contact: '911',
            description: 'IMMEDIATE danger - police/ambulance',
            when: 'In immediate danger of self-harm or harm to others',
          },
          {
            name: 'Emergency Room',
            description: 'Visit nearest hospital emergency room',
            when: 'Experiencing psychiatric emergency',
          },
        ],
        urgencyLevel: urgency,
        location: location || 'United States',
        message: urgency === 'critical'
          ? '🚨 If you\'re in immediate danger, please call 911 or go to your nearest emergency room right now.'
          : urgency === 'high'
          ? '⚠️ Please reach out to a crisis hotline. You don\'t have to go through this alone.'
          : '💙 Support is available 24/7. It\'s okay to ask for help.',
      };
      
      return {
        success: true,
        resources,
        instructions: 'Display these resources prominently. Keep the interface calm and clear. Show that help is available.',
      };
    },
  },
  
  {
    name: 'getMoodContext',
    description: 'Get current session context including recent moods, time of day, and usage patterns. Helps personalize the experience.',
    inputSchema: z.object({
      includeHistory: z.boolean().default(false)
        .describe('Include historical mood data'),
    }),
    outputSchema: z.any(),
    tool: async ({ includeHistory }: { includeHistory: boolean }) => {
      try {
        // Get time-based context
        const now = new Date();
        const hour = now.getHours();
        const timeContext = 
          hour < 6 ? 'late night/early morning' :
          hour < 12 ? 'morning' :
          hour < 17 ? 'afternoon' :
          hour < 21 ? 'evening' :
          'late evening';
        
        // Get stored mood data from localStorage (if available)
        let recentMoods: any[] = [];
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('mindflow_moods');
            if (stored) {
              const allMoods = JSON.parse(stored);
              recentMoods = allMoods.slice(-5); // Last 5 moods
            }
          } catch (e) {
            // localStorage not available or error
          }
        }
        
        return {
          success: true,
          context: {
            timeOfDay: timeContext,
            currentHour: hour,
            recentMoods: includeHistory ? recentMoods : [],
            sessionStart: now.toISOString(),
            hasHistoricalData: recentMoods.length > 0,
          },
          suggestions: getTimeBasedSuggestions(hour),
        };
      } catch (error) {
        return {
          success: false,
          error: 'Unable to get context',
          fallback: { timeOfDay: 'unknown' },
        };
      }
    },
  },
  
  {
    name: 'trackInteraction',
    description: 'Track user interaction with components for learning and optimization. Records which components were helpful.',
    inputSchema: z.object({
      componentName: z.string()
        .describe('Name of the component user interacted with'),
      helpful: z.boolean()
        .describe('Whether the user found it helpful'),
      feedback: z.string().optional()
        .describe('Optional user feedback'),
    }),
    outputSchema: z.any(),
    tool: async ({ componentName, helpful, feedback }: { componentName: string; helpful: boolean; feedback?: string }) => {
      try {
        // Store interaction data
        if (typeof window !== 'undefined') {
          const interactions = JSON.parse(localStorage.getItem('mindflow_interactions') || '[]');
          interactions.push({
            component: componentName,
            helpful,
            feedback,
            timestamp: new Date().toISOString(),
          });
          
          // Keep last 100 interactions
          if (interactions.length > 100) {
            interactions.shift();
          }
          
          localStorage.setItem('mindflow_interactions', JSON.stringify(interactions));
        }
        
        return {
          success: true,
          message: 'Interaction tracked',
          learning: `Noted: ${componentName} was ${helpful ? 'helpful' : 'not helpful'}`,
        };
      } catch (error) {
        return {
          success: false,
          error: 'Unable to track interaction',
        };
      }
    },
  },
];

/**
 * Generate insights from mood analysis data
 */
function generateInsights(analysis: any): string[] {
  const insights: string[] = [];
  
  if (analysis.trend === 'improving') {
    insights.push('Your mood has been improving over this period. Keep up the good work!');
  } else if (analysis.trend === 'declining') {
    insights.push('Your mood has been challenging lately. Consider reaching out for additional support.');
  }
  
  if (analysis.mostCommon) {
    insights.push(`You've been feeling ${analysis.mostCommon} most often recently.`);
  }
  
  if (analysis.volatility === 'high') {
    insights.push('Your mood has been varying significantly. Grounding exercises might help.');
  }
  
  return insights;
}

/**
 * Get time-based suggestions
 */
function getTimeBasedSuggestions(hour: number): string[] {
  if (hour < 6) {
    return ['Having trouble sleeping? Try the Sleep Wind Down routine.', 'Consider gentle breathing exercises to calm your mind.'];
  } else if (hour < 12) {
    return ['Start your day with positive affirmations.', 'Morning is a great time for mood tracking.'];
  } else if (hour < 17) {
    return ['Take a mindful break with a short meditation.', 'Check in with your mood.'];
  } else if (hour < 21) {
    return ['Evening is perfect for journaling and reflection.', 'Wind down with gratitude practice.'];
  } else {
    return ['Prepare for restful sleep with our wind-down routine.', 'Gentle breathing can help transition to sleep.'];
  }
}

/**
 * Export combined tool configuration for Tambo
 */
export function getToolsConfig() {
  return {
    tools: mindflowTools,
    onCallUnregisteredTool: (toolName: string) => {
      console.warn(`[MindFlow] Attempted to call unregistered tool: ${toolName}`);
      return {
        success: false,
        error: `Tool "${toolName}" is not available`,
        suggestion: 'Try using analyzeMoodPatterns, getJournalPrompts, or getMoodContext',
      };
    },
  };
}
