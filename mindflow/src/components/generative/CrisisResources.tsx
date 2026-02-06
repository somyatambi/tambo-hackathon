'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare, ExternalLink, AlertTriangle } from 'lucide-react';
import { useTamboComponentState } from '@tambo-ai/react';
import { useEffect } from 'react';

export default function CrisisResources() {
  // Tambo integration - report crisis component shown
  const { updateState } = useTamboComponentState();
  
  useEffect(() => {
    // Immediately report to AI that crisis resources were shown
    if (updateState) {
      updateState({
        crisisResourcesShown: true,
        timestamp: new Date().toISOString(),
        priority: 'critical',
      });
    }
  }, [updateState]);
  const resources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      contact: '988',
      type: 'Call',
      icon: Phone,
      description: '24/7 free and confidential support',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      type: 'Text',
      icon: MessageSquare,
      description: 'Text with a trained crisis counselor',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'SAMHSA Helpline',
      contact: '1-800-662-4357',
      type: 'Call',
      icon: Phone,
      description: 'Treatment referral and information',
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6 border-2 border-red-300 dark:border-red-800"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-display font-semibold">You're Not Alone</h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          If you're in crisis, please reach out. Help is available 24/7.
        </p>
      </div>

      <div className="glass-card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <p className="text-sm font-medium text-red-800 dark:text-red-200">
          🚨 If you're in immediate danger, call 911 or go to your nearest emergency room.
        </p>
      </div>

      <div className="space-y-3">
        {resources.map((resource, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <resource.icon className={`w-5 h-5 mt-1 ${resource.color}`} />
              <div className="flex-1 space-y-1">
                <div className="font-display font-semibold text-sage-800 dark:text-sage-200">
                  {resource.name}
                </div>
                <div className={`text-lg font-mono font-bold ${resource.color}`}>
                  {resource.contact}
                </div>
                <div className="text-sm text-sage-600 dark:text-sage-400">
                  {resource.description}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-sage-400" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-sage-200 dark:border-sage-800">
        <div className="text-sm font-medium text-sage-700 dark:text-sage-300">
          Additional Resources
        </div>
        <div className="space-y-2 text-sm text-sage-600 dark:text-sage-400">
          <div>• The Trevor Project (LGBTQ+ Youth): 1-866-488-7386</div>
          <div>• Veterans Crisis Line: Call 988, then press 1</div>
          <div>• RAINN Sexual Assault Hotline: 1-800-656-4673</div>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-sage-600 dark:text-sage-400 italic">
          Your life matters. These trained professionals want to help.
        </p>
      </div>
    </motion.div>
  );
}
