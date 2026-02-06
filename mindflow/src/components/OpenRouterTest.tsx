/**
 * OpenRouter Test Component
 * 
 * Simple component to test OpenRouter integration
 * Shows connection status and allows testing the AI
 */

'use client';

import { useState } from 'react';

interface TestResult {
  status: string;
  message: string;
  response?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

export function OpenRouterTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [testPrompt, setTestPrompt] = useState('Tell me a brief mindfulness tip');

  const checkConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-openrouter');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to connect to test endpoint',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const testCompletion = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-openrouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: testPrompt }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to test completion',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          🧪 OpenRouter Connection Test
        </h2>
        
        <p className="text-gray-600 mb-6">
          Test your OpenRouter API integration with Claude Sonnet 4.5
        </p>

        <div className="space-y-4">
          {/* Check Connection Button */}
          <button
            onClick={checkConnection}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? '⏳ Testing...' : '🔍 Check Connection Status'}
          </button>

          {/* Test Completion Section */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Prompt:
            </label>
            <input
              type="text"
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a test prompt..."
            />
            <button
              onClick={testCompletion}
              disabled={loading || !testPrompt.trim()}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? '⏳ Generating...' : '🚀 Test AI Completion'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div className={`rounded-lg shadow-lg p-6 ${
          result.status === 'ok' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          <h3 className="text-xl font-bold mb-3">
            {result.status === 'ok' ? '✅ Success!' : '❌ Error'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <strong className="text-gray-700">Message:</strong>
              <p className="text-gray-800 mt-1">{result.message}</p>
            </div>

            {result.response && (
              <div>
                <strong className="text-gray-700">AI Response:</strong>
                <p className="text-gray-800 mt-1 p-3 bg-white rounded border">
                  {result.response}
                </p>
              </div>
            )}

            {result.usage && (
              <div>
                <strong className="text-gray-700">Token Usage:</strong>
                <div className="mt-1 text-sm text-gray-700 space-y-1">
                  <div>Prompt tokens: {result.usage.prompt_tokens}</div>
                  <div>Completion tokens: {result.usage.completion_tokens}</div>
                  <div>Total tokens: {result.usage.total_tokens}</div>
                  <div className="font-semibold">
                    Estimated cost: ${((result.usage.total_tokens / 1_000_000) * 15).toFixed(6)}
                  </div>
                </div>
              </div>
            )}

            {result.error && (
              <div>
                <strong className="text-red-700">Error Details:</strong>
                <p className="text-red-800 mt-1 font-mono text-sm">
                  {result.error}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-bold mb-2 text-blue-900">
          📝 Testing Instructions
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Check Connection</strong>: Verifies OpenRouter is configured correctly</li>
          <li>• <strong>Test Completion</strong>: Sends a prompt to Claude Sonnet 4.5</li>
          <li>• Make sure your <code className="bg-blue-100 px-1 rounded">.env.local</code> has OPENROUTER_API_KEY set</li>
          <li>• This test page only works in development mode</li>
          <li>• Check the browser console and terminal for detailed logs</li>
        </ul>
      </div>
    </div>
  );
}
