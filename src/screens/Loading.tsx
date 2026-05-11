import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const LOADING_TEXTS = [
  "正在感受你的状态...",
  "看了看今天的天气...",
  "想了一些有趣的事...",
  "快好了..."
];

export const Loading: React.FC = () => {
  const { setScreen } = useAppStore();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < LOADING_TEXTS.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    const finishTimer = setTimeout(() => {
      setScreen('recommendations');
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(finishTimer);
    };
  }, [setScreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-base)]"
    >
      <div className="relative w-[80px] h-[80px] mb-[32px]">
        {/* Base Ring */}
        <div className="absolute inset-0 rounded-full border border-[rgba(212,168,83,0.15)]" />
        
        {/* Animated Highlight Ring */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           className="absolute inset-[-1px] rounded-full"
           style={{
             background: 'conic-gradient(from 0deg, rgba(212,168,83,0.8) 0deg, rgba(212,168,83,0) 60deg, transparent 60deg)'
           }}
        />
        {/* Inner mask to make it a ring */}
        <div className="absolute inset-[1px] bg-[var(--color-bg-base)] rounded-full" />
      </div>

      <div className="h-[24px] relative w-full flex justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[16px] text-[var(--color-text-secondary)] absolute"
          >
            {LOADING_TEXTS[textIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
