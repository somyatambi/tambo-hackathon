/**
 * OpenRouter Client for Direct AI Calls
 * 
 * Since we don't have a Tambo API key, we'll call OpenRouter directly
 * and handle component selection ourselves
 */

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenRouterClient {
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '';
    this.baseURL = 'https://openrouter.ai/api/v1';
    this.model = 'anthropic/claude-sonnet-4.5';

    if (!this.apiKey) {
      console.warn('⚠️  OpenRouter API key not found. AI features will not work.');
    }
  }

  async chat(messages: Message[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://mindflow-app.com',
          'X-Title': process.env.OPENROUTER_SITE_NAME || 'MindFlow',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
      }

      const data: OpenRouterResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  /**
   * Streaming chat (for future implementation)
   */
  async *chatStream(messages: Message[]): AsyncGenerator<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'https://mindflow-app.com',
        'X-Title': process.env.OPENROUTER_SITE_NAME || 'MindFlow',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data:'));

        for (const line of lines) {
          const data = line.replace('data:', '').trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export const openRouterClient = new OpenRouterClient();
