/**
 * Test Endpoint for OpenRouter Connection
 * 
 * Use this endpoint to verify that OpenRouter is properly configured
 * Returns connection status, model info, and usage statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkOpenRouterHealth, getOpenRouterConfig } from '@/lib/ai-config';
import { getSafeEnvInfo, getUsageStats, isDevelopment } from '@/lib/env-utils';

export async function GET(request: NextRequest) {
  try {
    // Only allow in development mode
    if (!isDevelopment()) {
      return NextResponse.json(
        { error: 'Test endpoint only available in development mode' },
        { status: 403 }
      );
    }
    
    // Get configuration (without exposing API key)
    const config = getOpenRouterConfig();
    const envInfo = getSafeEnvInfo();
    const usageStats = getUsageStats();
    
    // Run health check
    const healthCheck = await checkOpenRouterHealth();
    
    // Return comprehensive test results
    return NextResponse.json({
      status: healthCheck.status,
      message: healthCheck.status === 'ok' 
        ? 'OpenRouter connection is working!' 
        : 'OpenRouter connection failed',
      environment: envInfo,
      configuration: {
        baseUrl: config.baseUrl,
        model: config.model,
        siteUrl: config.siteUrl,
        siteName: config.siteName,
        apiKeyPresent: !!config.apiKey,
        apiKeyPrefix: config.apiKey.substring(0, 10) + '...',
      },
      healthCheck: healthCheck.details,
      usageStats: {
        totalRequests: usageStats.totalRequests,
        totalTokens: usageStats.totalTokens,
        totalCost: `$${usageStats.totalCost.toFixed(6)}`,
        recentEntries: usageStats.entries.slice(-5), // Last 5 entries
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('[Test Endpoint] Error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// Simple POST test that actually calls the AI
export async function POST(request: NextRequest) {
  try {
    if (!isDevelopment()) {
      return NextResponse.json(
        { error: 'Test endpoint only available in development mode' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const testPrompt = body.prompt || 'Say "Hello from OpenRouter!" in a friendly way.';
    
    // Make a test call to the chat endpoint
    const chatResponse = await fetch(new URL('/api/chat', request.url).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: testPrompt,
          },
        ],
        temperature: 0.7,
        maxTokens: 150,
      }),
    });
    
    const result = await chatResponse.json();
    
    return NextResponse.json({
      status: result.success ? 'ok' : 'error',
      message: 'Test completion successful',
      testPrompt,
      response: result.message,
      model: result.model,
      usage: result.usage,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('[Test Endpoint] POST Error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error: error,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
