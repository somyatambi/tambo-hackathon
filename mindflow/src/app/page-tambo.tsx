'use client';

/**
 * MindFlow - Main Application Page
 * 
 * NOW POWERED BY TAMBO SDK FOR TRUE AI-DRIVEN GENERATIVE UI
 * 
 * This is the heart of the app where users interact with the AI
 * and receive dynamically rendered therapeutic components
 */

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { TamboProvider, useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import ThemeToggle from '@/components/ThemeToggle';
import { TypingIndicator } from '@/components/LoadingIndicators';
import { tamboConfig, MINDFLOW_SYSTEM_PROMPT } from '@/lib/tambo-config';

/**
 * Inner component that has access to Tambo hooks
 */
function MindFlowChat() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread.messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (value.trim() && !isPending) {
      submit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-white" size={20} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MindFlow
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Powered by Tambo AI + Claude Sonnet 4.5
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Message */}
          {thread.messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="text-white" size={32} />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Welcome to MindFlow
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm your AI mental wellness companion. Share how you're feeling, and I'll provide personalized support with therapeutic tools and exercises.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto mt-8">
                {[
                  { emoji: '😰', text: "I'm feeling anxious", action: "I'm feeling anxious today" },
                  { emoji: '😴', text: "I can't sleep", action: "I'm having trouble falling asleep" },
                  { emoji: '😊', text: "Show my progress", action: "Can you show me my mood progress?" },
                  { emoji: '✍️', text: "I want to journal", action: "I'd like to do some journaling" },
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setValue(suggestion.action);
                      setTimeout(() => submit(), 100);
                    }}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    <span className="text-2xl">{suggestion.emoji}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Render Messages */}
          <AnimatePresence mode="popLayout">
            {thread.messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl rounded-bl-sm shadow-md'
                  } p-4`}
                >
                  {/* Message Content */}
                  {Array.isArray(message.content) ? (
                    message.content.map((part, i) =>
                      part.type === 'text' ? (
                        <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                      ) : null
                    )
                  ) : (
                    <p className="whitespace-pre-wrap">{String(message.content)}</p>
                  )}

                  {/* Rendered Component from Tambo */}
                  {message.renderedComponent && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {message.renderedComponent}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm shadow-md p-4">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share how you're feeling..."
              className="flex-1 p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending || !value.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 flex items-center gap-2 self-end"
            >
              <Send size={20} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            This is a support tool, not a replacement for professional mental health care. In crisis? Call 988.
          </p>
        </form>
      </div>
    </div>
  );
}

/**
 * Main App Component with Tambo Provider
 */
export default function Home() {
  return (
    <TamboProvider
      apiKey={tamboConfig.apiKey}
      components={tamboConfig.components}
      tools={tamboConfig.tools}
      streaming={tamboConfig.streaming}
      autoGenerateThreadName={tamboConfig.autoGenerateThreadName}
    >
      <MindFlowChat />
    </TamboProvider>
  );
}
