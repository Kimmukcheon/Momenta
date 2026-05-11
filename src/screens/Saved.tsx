import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark } from 'lucide-react';
import React from 'react';
import { TopNav, IconButton } from '../components/ui/Buttons';
import { useAppStore } from '../store/useAppStore';

export const Saved: React.FC = () => {
  const { setScreen, savedCards, removeSavedCard } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col bg-[var(--color-bg-base)] safe-area-pt safe-area-pb"
    >
      <TopNav onBack={() => setScreen('home')} title="已收藏" />

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {savedCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pb-20">
             <div className="text-[var(--color-text-tertiary)] mb-6">
                <Bookmark size={80} strokeWidth={1} />
             </div>
             <div className="text-[16px] text-[var(--color-text-secondary)] mb-2">还没有收藏</div>
             <div className="text-[14px] text-[var(--color-text-tertiary)]">喜欢的活动，点 ♡ 存起来</div>
          </div>
        ) : (
          <AnimatePresence>
            {savedCards.map(card => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full bg-[var(--color-bg-surface)] rounded-[20px] p-5 mb-3 flex items-start justify-between border-[0.5px] border-[var(--color-border)]"
              >
                <div className="flex-1 right-padding-4 mr-4">
                   <div className="flex items-center gap-3 mb-2">
                     <span className="text-[12px] text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 rounded-full">{card.categoryEmoji} {card.category}</span>
                     <span className="text-[12px] font-mono text-[var(--color-accent-warm)]">{card.duration}</span>
                   </div>
                   <div className="text-[16px] text-display text-[var(--color-text-primary)] leading-snug">
                     {card.title}
                   </div>
                </div>
                
                <IconButton onClick={() => removeSavedCard(card.id)} className="w-[32px] h-[32px] shrink-0 border border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.02)]">
                  <X size={14} />
                </IconButton>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};
