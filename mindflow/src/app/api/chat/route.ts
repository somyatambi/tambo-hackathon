/**
 * OpenRouter Chat API Route
 * 
 * Secure server-side endpoint for communicating with OpenRouter API
 * All OpenRouter calls MUST go through this endpoint to protect the API key
 */

import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouter, OpenRouterMessage } from '@/lib/ai-config';
import { devLog, logError, trackUsage } from '@/lib/env-utils';

// Input validation
interface ChatRequest {
  messages: OpenRouterMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

function validateRequest(body: any): body is ChatRequest {
  if (!body || typeof body !== 'object') {
    return false;
  }
  
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return false;
  }
  
  // Validate each message
  for (const msg of body.messages) {
    if (!msg.role || !msg.content) {
      return false;
    }
    if (!['system', 'user', 'assistant'].includes(msg.role)) {
      return false;
    }
    if (typeof msg.content !== 'string') {
      return false;
    }
  }
  
  return true;
}

// Sanitize user input to prevent injection attacks
function sanitizeMessage(content: string): string {
  // Remove any potentially harmful patterns
  // This is a basic sanitization - adjust based on your security needs
  return content
    .trim()
    .slice(0, 10000); // Limit message length
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request
    if (!validateRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected { messages: [...] }' },
        { status: 400 }
      );
    }
    
    // Sanitize messages
    const sanitizedMessages = body.messages.map(msg => ({
      ...msg,
      content: sanitizeMessage(msg.content),
    }));
    
    devLog('Chat request received:', {
      messageCount: sanitizedMessages.length,
      temperature: body.temperature,
      maxTokens: body.maxTokens,
    });
    
    // Call OpenRouter API
    const response = await callOpenRouter(sanitizedMessages, {
      temperature: body.temperature,
      maxTokens: body.maxTokens,
      stream: body.stream,
    });
    
    // Track usage for cost monitoring
    trackUsage({
      model: response.model,
      promptTokens: response.usage.prompt_tokens,
      completionTokens: response.usage.completion_tokens,
      totalTokens: response.usage.total_tokens,
      estimatedCost: (response.usage.total_tokens / 1_000_000) * 15,
      endpoint: '/api/chat',
    });
    
    // Return response
    return NextResponse.json({
      success: true,
      message: response.choices[0]?.message?.content || '',
      model: response.model,
      usage: response.usage,
    });
    
  } catch (error) {
    logError('Chat API', error);
    
    // Return user-friendly error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
