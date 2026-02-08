'use client';

import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import confetti from 'canvas-confetti';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function MindFlowApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) {
      console.log('Empty input or already loading, skipping send');
      return;
    }
    
    console.log('handleSend called with input:', input);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);
    
    // 🎉 Confetti celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#6366f1', '#f59e0b', '#10b981'],
    });

    try {
      console.log('Sending to OpenRouter API...');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();
      
      if (data.success && data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        console.log('Response received and displayed');
      } else {
        throw new Error('API request failed');
      }
      
    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I'm having trouble connecting right now 😅 Please try again!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    setInput(text);
    // Auto-send quick actions
    setTimeout(() => {
      // Manually trigger send with the quick action text
      if (!isLoading) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: text,
        };
        
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#a855f7', '#6366f1', '#f59e0b', '#10b981'],
        });
        
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: messages.map(m => ({ role: m.role, content: m.content }))
          }),
        })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.response) {
            setMessages((prev) => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: data.response,
            }]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setMessages((prev) => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "Oops! I'm having trouble connecting right now 😅 Please try again!",
          }]);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 bg-[length:200%_200%] animate-gradient">
      {/* 🎨 PLAYFUL HEADER */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b-4 border-purple-500 p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated sparkle icon */}
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform rotate-12 hover:rotate-0">
              <span className="text-3xl animate-pulse">✨</span>
            </div>
            <div>
              <h1 className="text-3xl font-black font-heading bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                MindFlow 🌈
              </h1>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                Powered by Tambo AI ⚡
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* 🎯 MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            /* 🎪 SUPER PLAYFUL WELCOME SCREEN */
            <div className="flex flex-col items-center justify-center h-full py-12 px-4 animate-fade-in">
              {/* Big animated emoji */}
              <div className="text-9xl mb-6 animate-bounce">
                🎨
              </div>
              
              <h2 className="text-5xl font-black font-heading text-center mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Hey! Welcome to MindFlow! 🌟
              </h2>
              
              <p className="text-xl text-gray-800 dark:text-gray-200 text-center max-w-2xl mb-8 font-bold">
                I'm your super fun AI wellness buddy! 🤗 Tell me how you're feeling, and I'll help you out with cool exercises and activities! 🎉
              </p>
              
              {/* 🎮 Colorful quick action cards */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mb-8">
                <button 
                  onClick={() => handleQuickAction("I'm feeling anxious")}
                  className="group p-6 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transform transition-all duration-300 border-4 border-pink-300"
                >
                  <span className="text-5xl mb-3 block group-hover:scale-125 transition-transform">😰</span>
                  <span className="text-lg font-black text-white">Feeling Anxious</span>
                </button>
                
                <button 
                  onClick={() => handleQuickAction("I can't sleep")}
                  className="group p-6 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-3xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform transition-all duration-300 border-4 border-purple-300"
                >
                  <span className="text-5xl mb-3 block group-hover:scale-125 transition-transform">😴</span>
                  <span className="text-lg font-black text-white">Can't Sleep</span>
                </button>
                
                <button 
                  onClick={() => handleQuickAction("Show me my progress")}
                  className="group p-6 bg-gradient-to-br from-green-400 to-teal-600 rounded-3xl shadow-2xl hover:shadow-green-500/50 hover:scale-105 transform transition-all duration-300 border-4 border-green-300"
                >
                  <span className="text-5xl mb-3 block group-hover:scale-125 transition-transform">📊</span>
                  <span className="text-lg font-black text-white">My Progress</span>
                </button>
                
                <button 
                  onClick={() => handleQuickAction("I want to journal")}
                  className="group p-6 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-3xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transform transition-all duration-300 border-4 border-yellow-300"
                >
                  <span className="text-5xl mb-3 block group-hover:scale-125 transition-transform">📝</span>
                  <span className="text-lg font-black text-white">Journal Time</span>
                </button>
              </div>
              
              {/* 🎭 Fun decorative elements */}
              <div className="flex gap-4">
                <span className="text-4xl animate-spin-slow">🌟</span>
                <span className="text-4xl animate-bounce">💫</span>
                <span className="text-4xl animate-pulse">✨</span>
                <span className="text-4xl animate-spin-slow">🎈</span>
              </div>
            </div>
          ) : (
            /* 💬 CHAT MESSAGES - PLAYFUL STYLE */
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="animate-slide-up"
                >
                  {message.role === 'user' ? (
                    /* 💭 User message - fun bubble */
                    <div className="flex justify-end">
                      <div className="max-w-[80%] p-5 rounded-3xl rounded-br-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl transform hover:scale-105 transition-transform border-4 border-white">
                        <p className="font-bold text-lg">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    /* 🤖 AI message - playful bot style */
                    <div className="flex justify-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div className="max-w-[80%]">
                        {/* AI text response */}
                        <div className="p-5 rounded-3xl rounded-bl-sm bg-white dark:bg-gray-800 shadow-2xl border-4 border-purple-300 dark:border-purple-700">
                          <p className="text-gray-800 dark:text-white font-semibold text-lg whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* 🎭 Loading animation - super fun */}
              {isLoading && (
                <div className="flex justify-start gap-3 animate-slide-up">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border-4 border-purple-300">
                    <div className="flex gap-2 items-center">
                      <span className="text-2xl animate-bounce">🤔</span>
                      <span className="text-2xl animate-bounce delay-100">💭</span>
                      <span className="text-2xl animate-bounce delay-200">✨</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* 🚀 INPUT AREA - EXCITING & FUN */}
      <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t-4 border-purple-500 p-6 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && input.trim() && !isLoading) {
                  handleSend();
                }
              }}
              placeholder="Tell me how you're feeling... 🌈"
              className="flex-1 px-6 py-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 border-4 border-purple-300 dark:border-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 text-gray-900 dark:text-white placeholder-purple-500 dark:placeholder-purple-400 font-bold text-lg shadow-xl"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white rounded-full font-black text-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 border-4 border-white"
            >
              {isLoading ? '⏳' : 'Send 🚀'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}