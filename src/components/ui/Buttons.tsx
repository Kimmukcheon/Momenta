import { motion } from 'motion/react';
import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97, filter: 'brightness(0.9)' }}
      className={`h-[56px] px-8 rounded-full bg-[var(--color-accent-warm)] text-[var(--color-text-inverse)] text-[16px] font-medium shadow-[var(--shadow-accent)] transition-all duration-150 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const SecondaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileTap={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      className={`h-[48px] px-6 rounded-full bg-transparent border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[14px] transition-all duration-150 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const IconButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const TopNav: React.FC<{
  onBack?: () => void;
  rightIcon?: React.ReactNode;
  rightAction?: () => void;
  title?: string;
  step?: React.ReactNode;
}> = ({ onBack, rightIcon, rightAction, title, step }) => {
  return (
    <div className="h-[56px] flex items-center justify-between px-2 shrink-0 z-10 w-full relative">
      <div className="w-[48px] flex items-center justify-center">
        {onBack && (
          <IconButton onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </IconButton>
        )}
      </div>
      <div className="flex-1 flex justify-center text-[18px] text-display">
        {title}
        {step && <div className="text-[12px] text-[var(--color-text-tertiary)] font-sans mt-0.5">{step}</div>}
      </div>
      <div className="w-[48px] flex items-center justify-center">
        {rightIcon && (
          <IconButton onClick={rightAction}>
            {rightIcon}
          </IconButton>
        )}
      </div>
    </div>
  );
};
