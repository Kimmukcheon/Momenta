import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const Splash: React.FC = () => {
  const { setScreen, onboardingCompleted } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(onboardingCompleted ? 'home' : 'onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen, onboardingCompleted]);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-base)] bg-radial-glow z-50"
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Circle Graphic */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-[48px] h-[48px] rounded-full border border-[var(--color-accent-warm)] flex items-center justify-center relative"
        >
          <div className="w-[6px] h-[6px] bg-[var(--color-accent-warm)] rounded-full"></div>
        </motion.div>
        
        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-6 text-[24px] text-[var(--color-text-primary)] text-display"
        >
          Momenta
        </motion.div>
      </div>
    </motion.div>
  );
};
