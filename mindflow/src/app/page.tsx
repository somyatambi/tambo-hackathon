'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

export default function MindFlowApp() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are MindFlow, a compassionate mental wellness AI assistant. Provide warm, empathetic support. Keep responses 2-4 sentences. Suggest breathing exercises for anxiety, journaling for sadness, relaxation for sleep issues. Take crisis keywords seriously.`
            },
            ...messages.map(m => ({
              role: m.role,
              content: m.content
            })),
            {
              role: 'user',
              content: currentInput
            }
          ]
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: data.message || "I'm here to help. Let me know how you're feeling.",
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I'm having trouble connecting right now, but I'm here for you. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MindFlow</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Powered by Tambo AI + Claude Sonnet 4.5</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-4xl">💭</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome to MindFlow</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
                I'm your AI mental wellness companion. Share how you're feeling, and I'll provide personalized support with therapeutic tools and exercises.
              </p>
              
              {/* Quick Start Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                <button
                  onClick={() => setInput("I'm feeling anxious")}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors text-left"
                >
                  <span className="text-2xl mb-2 block">😰</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">I'm feeling anxious</span>
                </button>
                <button
                  onClick={() => setInput("I can't sleep")}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-left"
                >
                  <span className="text-2xl mb-2 block">😴</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">I can't sleep</span>
                </button>
                <button
                  onClick={() => setInput("Show my progress")}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors text-left"
                >
                  <span className="text-2xl mb-2 block">😊</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Show my progress</span>
                </button>
                <button
                  onClick={() => setInput("I want to journal")}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors text-left"
                >
                  <span className="text-2xl mb-2 block">📝</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">I want to journal</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="I'd like to do some journaling"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}