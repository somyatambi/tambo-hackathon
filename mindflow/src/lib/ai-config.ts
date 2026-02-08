/**
 * OpenRouter AI Configuration for MindFlow
 * 
 * This module configures the connection to OpenRouter API for Claude Sonnet 4.5
 * Handles environment detection, model selection, and error handling
 */

// Type definitions for OpenRouter API
export interface OpenRouterConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  siteUrl?: string;
  siteName?: string;
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenRouterError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}

// Environment validation
function validateEnvironment(): void {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set in environment variables');
  }
  
  if (!process.env.OPENROUTER_BASE_URL) {
    console.warn('OPENROUTER_BASE_URL not set, using default');
  }
}

// Get environment-based configuration
export function getOpenRouterConfig(): OpenRouterConfig {
  validateEnvironment();
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Both dev and prod use Claude Sonnet 4.5 as specified
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5';
  
  const config: OpenRouterConfig = {
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    model,
    siteUrl: process.env.OPENROUTER_SITE_URL,
    siteName: process.env.OPENROUTER_SITE_NAME,
  };
  
  // Log configuration in development mode (without exposing API key)
  if (isDevelopment) {
    console.log('[AI Config] Environment:', process.env.NODE_ENV);
    console.log('[AI Config] Model:', config.model);
    console.log('[AI Config] Base URL:', config.baseUrl);
    console.log('[AI Config] API Key present:', !!config.apiKey);
  }
  
  return config;
}

// Retry logic for API calls
interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
}

async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = options;
  
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx)
      if (error instanceof Response && error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Calculate exponential backoff delay
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      if (attempt < maxRetries - 1) {
        console.warn(`[AI Config] Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// Main function to call OpenRouter API
export async function callOpenRouter(
  messages: OpenRouterMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  } = {}
): Promise<OpenRouterResponse> {
  const config = getOpenRouterConfig();
  
  const requestBody: OpenRouterRequest = {
    model: config.model,
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 2000,
    stream: options.stream ?? false,
  };
  
  return withRetry(async () => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': config.siteUrl || '',
          'X-Title': config.siteName || 'MindFlow',
        },
        body: JSON.stringify(requestBody),
      });
      
      const duration = Date.now() - startTime;
      
      if (!response.ok) {
        const errorData: OpenRouterError = await response.json();
        console.error('[AI Config] API Error:', errorData);
        
        // Handle specific error types
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenRouter configuration.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. Please check your OpenRouter account permissions.');
        } else {
          throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }
      }
      
      const data: OpenRouterResponse = await response.json();
      
      // Log usage in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[AI Config] Request completed in', duration, 'ms');
        console.log('[AI Config] Token usage:', {
          prompt: data.usage.prompt_tokens,
          completion: data.usage.completion_tokens,
          total: data.usage.total_tokens,
        });
        
        // Estimate cost (approximate - check OpenRouter pricing for accurate rates)
        const costPerMillionTokens = 15; // $15 per 1M tokens for Claude Sonnet 4.5 (input + output blended)
        const estimatedCost = (data.usage.total_tokens / 1_000_000) * costPerMillionTokens;
        console.log('[AI Config] Estimated cost: $', estimatedCost.toFixed(6));
      }
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('[AI Config] Request failed:', error.message);
        throw error;
      }
      throw new Error('Unknown error occurred during API request');
    }
  });
}

// Helper function for simple text completion
export async function completeText(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const messages: OpenRouterMessage[] = [];
  
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  
  messages.push({ role: 'user', content: prompt });
  
  try {
    const response = await callOpenRouter(messages);
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('[AI Config] Text completion failed:', error);
    
    // Return user-friendly fallback message
    return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment.';
  }
}

// Health check function
export async function checkOpenRouterHealth(): Promise<{
  status: 'ok' | 'error';
  message: string;
  details?: unknown;
}> {
  try {
    const response = await callOpenRouter([
      {
        role: 'user',
        content: 'Hello! Please respond with "ok" if you can read this.',
      },
    ], {
      maxTokens: 100,
    });
    
    return {
      status: 'ok',
      message: 'OpenRouter connection successful',
      details: {
        model: response.model,
        responseLength: response.choices[0]?.message?.content?.length || 0,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error,
    };
  }
}

// Export configuration for use in other modules
export const AI_CONFIG = {
  provider: 'OpenRouter',
  model: 'anthropic/claude-sonnet-4.5',
  capabilities: {
    textGeneration: true,
    streaming: true,
    functionCalling: false, // Claude via OpenRouter supports this, but keeping simple for now
  },
};
