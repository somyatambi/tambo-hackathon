/**
 * Environment Detection Utility
 * 
 * Provides utilities for detecting the current environment and logging configuration
 */

export type Environment = 'development' | 'production' | 'test';

export interface EnvironmentInfo {
  env: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  nodeEnv: string;
}

/**
 * Get current environment information
 */
export function getEnvironment(): EnvironmentInfo {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const env = nodeEnv as Environment;
  
  return {
    env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test',
    nodeEnv,
  };
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Log message only in development
 */
export function devLog(...args: unknown[]): void {
  if (isDevelopment()) {
    console.log('[DEV]', ...args);
  }
}

/**
 * Log warning only in development
 */
export function devWarn(...args: unknown[]): void {
  if (isDevelopment()) {
    console.warn('[DEV WARNING]', ...args);
  }
}

/**
 * Log error (always logged, but with different formatting in dev)
 */
export function logError(context: string, error: unknown): void {
  if (isDevelopment()) {
    console.error(`[ERROR: ${context}]`, error);
  } else {
    console.error(`Error in ${context}:`, error instanceof Error ? error.message : error);
  }
}

/**
 * Track API usage for cost monitoring (development only)
 */
interface UsageMetrics {
  timestamp: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
  endpoint: string;
}

const usageLog: UsageMetrics[] = [];

export function trackUsage(metrics: Omit<UsageMetrics, 'timestamp'>): void {
  if (isDevelopment()) {
    const entry: UsageMetrics = {
      ...metrics,
      timestamp: new Date().toISOString(),
    };
    
    usageLog.push(entry);
    
    devLog('Token Usage:', {
      model: metrics.model,
      tokens: metrics.totalTokens,
      cost: `$${metrics.estimatedCost.toFixed(6)}`,
    });
  }
}

export function getUsageStats(): {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  entries: UsageMetrics[];
} {
  if (!isDevelopment()) {
    return {
      totalRequests: 0,
      totalTokens: 0,
      totalCost: 0,
      entries: [],
    };
  }
  
  return {
    totalRequests: usageLog.length,
    totalTokens: usageLog.reduce((sum, entry) => sum + entry.totalTokens, 0),
    totalCost: usageLog.reduce((sum, entry) => sum + entry.estimatedCost, 0),
    entries: usageLog,
  };
}

export function clearUsageStats(): void {
  usageLog.length = 0;
  devLog('Usage statistics cleared');
}

/**
 * Validate required environment variables
 */
export function validateEnvVars(required: string[]): {
  valid: boolean;
  missing: string[];
} {
  const missing = required.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    devWarn('Missing required environment variables:', missing);
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get safe environment info for client-side display (no secrets)
 */
export function getSafeEnvInfo(): {
  environment: Environment;
  model: string;
  provider: string;
} {
  return {
    environment: getEnvironment().env,
    model: process.env.OPENROUTER_MODEL || 'anthropic/claude-sonnet-4.5',
    provider: 'OpenRouter',
  };
}
