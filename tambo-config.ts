/**
 * Tambo Configuration for MindFlow
 * 
 * Configures Tambo SDK with OpenRouter and Claude Sonnet 4.5
 * for AI-driven generative UI in mental wellness app
 */

import { mindflowComponents, componentGuidelines } from './tambo-registry';
import { mindflowTools } from './tambo-tools';

/**
 * System prompt that guides Tambo's AI in component selection
 * This is critical for proper mental wellness support
 */
export const MINDFLOW_SYSTEM_PROMPT = `You are MindFlow, a compassionate AI mental wellness companion powered by Claude Sonnet 4.5.

YOUR ROLE:
- Understand the user's emotional state through their messages
- Intelligently select and render therapeutic components
- Provide warm, non-judgmental support
- Adapt the interface to their needs in real-time
- Use tools to access mood history and provide personalized insights

${componentGuidelines}

CONVERSATION STYLE:
- Be warm, empathetic, and supportive
- Use person-first language
- Never diagnose or replace professional help
- Validate emotions before suggesting solutions
- Keep responses conversational and natural
- Show that you're listening and understanding

COMPONENT RENDERING:
- Render 1-3 components per response
- Explain briefly why you're showing each component
- Allow users to guide the experience
- Remember what components were shown before
- Don't overwhelm - less is more when user is distressed

SAFETY PROTOCOLS:
- ALWAYS render CrisisResources for crisis keywords
- Take all mentions of self-harm seriously
- Encourage professional help when appropriate
- Remind users this is a support tool, not emergency services

You have access to these components: ${mindflowComponents.map(c => c.name).join(', ')}

You can call these tools: analyzeMoodPatterns, getJournalPrompts, getEmergencyResources, getMoodContext, trackInteraction

Be the supportive companion they need right now.`;

/**
 * Tambo Provider Configuration
 * This object is passed to TamboProvider in the app
 */
export const tamboConfig = {
  // Use OpenRouter API key as Tambo API key
  // Tambo will use this to call OpenRouter's Claude Sonnet 4.5
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '',
  
  // DON'T set tamboUrl - let Tambo use its default API endpoint
  // The tamboUrl should only be set if you're using Tambo Cloud or self-hosted Tambo backend
  // For local development with OpenRouter, we rely on Tambo's default routing
  
  // Component Registry
  components: mindflowComponents,
  
  // Tools Registry
  tools: mindflowTools,
  
  // Configuration options
  streaming: true, // Enable streaming for better UX
  autoGenerateThreadName: false, // We'll manage our own session names
};

/**
 * Additional headers for OpenRouter
 * These help with OpenRouter's ranking and analytics
 */
export const openrouterHeaders = {
  'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://mindflow-app.com',
  'X-Title': process.env.OPENROUTER_SITE_NAME || 'MindFlow',
};

/**
 * Model configuration for OpenRouter
 * Using Claude Sonnet 4.5 for best reasoning and empathy
 */
export const MODEL_CONFIG = {
  model: process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5',
  temperature: 0.7, // Balanced creativity and consistency
  maxTokens: 2000, // Sufficient for thoughtful responses
};

/**
 * Validate configuration on load
 */
if (typeof window === 'undefined') {
  // Server-side validation
  if (!tamboConfig.apiKey) {
    console.warn('[MindFlow] WARNING: OPENROUTER_API_KEY not set. Tambo features will not work.');
  }
}

/**
 * Export everything needed for the app
 */
export {
  mindflowComponents,
  mindflowTools,
  componentGuidelines,
};
