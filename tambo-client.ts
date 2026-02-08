/**
 * Tambo Client Instance
 * 
 * Clean, reusable Tambo client for MindFlow
 * Configured to work with OpenRouter and Claude Sonnet 4.5
 */

import { MINDFLOW_SYSTEM_PROMPT } from './tambo-config';

/**
 * Get the API key from environment variables
 * Supports both client-side (NEXT_PUBLIC_) and server-side keys
 */
function getApiKey(): string {
  const key = 
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 
    process.env.OPENROUTER_API_KEY || 
    '';
  
  if (!key && typeof window === 'undefined') {
    console.warn('⚠️  OPENROUTER_API_KEY not found in environment variables');
  }
  
  return key;
}

/**
 * Tambo Client Configuration
 * This is used throughout the app for AI-driven component generation
 */
export const tamboClientConfig = {
  // API Configuration
  apiKey: getApiKey(),
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  
  // Model Configuration
  model: process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5',
  
  // System Prompt - guides AI in component selection
  systemPrompt: MINDFLOW_SYSTEM_PROMPT,
  
  // OpenRouter specific headers
  defaultHeaders: {
    'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://mindflow-app.com',
    'X-Title': process.env.OPENROUTER_SITE_NAME || 'MindFlow - AI Mental Wellness Companion',
  },
  
  // Generation settings
  temperature: 0.7, // Balanced creativity and consistency
  maxTokens: 2000, // Sufficient for thoughtful responses
  streaming: true, // Enable streaming for better UX
};

/**
 * Validate configuration
 */
export function validateTamboConfig() {
  const issues: string[] = [];
  
  if (!tamboClientConfig.apiKey) {
    issues.push('Missing API key (OPENROUTER_API_KEY or NEXT_PUBLIC_OPENROUTER_API_KEY)');
  }
  
  if (!tamboClientConfig.baseURL) {
    issues.push('Missing base URL');
  }
  
  if (!tamboClientConfig.model) {
    issues.push('Missing model configuration');
  }
  
  if (issues.length > 0) {
    console.error('❌ Tambo Configuration Issues:', issues);
    return false;
  }
  
  console.log('✅ Tambo client configuration validated');
  return true;
}

/**
 * Log configuration in development
 */
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔧 Tambo Client Configuration:');
  console.log('  - API Key:', tamboClientConfig.apiKey ? '✓ Set' : '✗ Missing');
  console.log('  - Base URL:', tamboClientConfig.baseURL);
  console.log('  - Model:', tamboClientConfig.model);
  console.log('  - Streaming:', tamboClientConfig.streaming);
  validateTamboConfig();
}
