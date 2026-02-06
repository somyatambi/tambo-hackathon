'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Loader2 className="w-5 h-5 animate-spin text-calm-600 dark:text-calm-400" />
      <span className="text-sm text-sage-600 dark:text-sage-400">
        Thinking...
      </span>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1 px-4 py-3 glass-card inline-block rounded-2xl"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-sage-400 dark:bg-sage-600"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
