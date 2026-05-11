import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { useAppStore, Card } from '../../store/useAppStore';

export const CardDetail: React.FC = () => {
  const { activeCardDetail, setActiveCardDetail, saveCard, savedCards } = useAppStore();

  const handleClose = () => setActiveCardDetail(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!activeCardDetail) return null;

  const card = activeCardDetail;
  const isSaved = !!savedCards.find(c => c.id === card.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end">
        {/* Overlay */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.4 }}
           className="absolute inset-0 bg-[var(--color-bg-overlay)]"
           onClick={handleClose}
        />

        {/* Bottom Sheet */}
        <motion.div
           initial={{ y: '100%' }}
           animate={{ y: 0 }}
           exit={{ y: '100%' }}
           transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} /* cubic-bezier for bottom sheet */
           className="relative w-full h-[85vh] bg-[var(--color-bg-elevated)] rounded-t-[32px] flex flex-col items-center"
           onClick={e => e.stopPropagation()}
        >
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-4 pb-2" onClick={handleClose}>
            <div className="w-[40px] h-[4px] bg-[var(--color-border)] rounded-full" />
          </div>

          <div className="flex-1 w-full overflow-y-auto px-6 pb-32">
             <div className="bg-[rgba(255,255,255,0.06)] rounded-full px-3 py-1 text-[12px] inline-flex items-center gap-1 text-[var(--color-text-secondary)] mb-4 mt-2">
               <span>{card.categoryEmoji}</span>
               <span>{card.category}</span>
             </div>

             <h2 className="text-display text-[26px] text-[var(--color-text-primary)] mb-6 leading-snug">
               {card.title}
             </h2>

             <div className="flex items-center gap-4 text-[13px] text-[var(--color-text-secondary)] mb-6">
                <span className="flex items-center gap-1 font-mono text-[var(--color-accent-warm)]">⏱ {card.duration}</span>
                <span>🌙 夜间适合</span>
                <span>💰 几乎免费</span>
             </div>

             <div className="h-[0.5px] bg-[var(--color-border)] my-6" />

             <p className="text-[16px] text-[var(--color-text-secondary)] leading-[1.7]">
               {card.reason}
             </p>

             <div className="h-[0.5px] bg-[var(--color-border)] my-6" />

             <div className="flex flex-wrap gap-2">
               {card.benefits?.map(benefit => (
                 <span key={benefit} className="bg-[rgba(255,255,255,0.06)] rounded-full px-3.5 py-1.5 text-[13px] text-[var(--color-text-secondary)]">
                   {benefit}
                 </span>
               ))}
             </div>

             {card.tip && (
               <>
                 <div className="h-[0.5px] bg-[var(--color-border)] my-6" />
                 <div className="bg-[rgba(212,168,83,0.05)] rounded-[16px] p-4 text-[14px]">
                    <div className="font-medium text-[var(--color-accent-warm)] mb-1">💡 小贴士</div>
                    <div className="text-[var(--color-text-secondary)]">{card.tip}</div>
                 </div>
               </>
             )}
          </div>

          {/* Fixed Bottom Operations */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[var(--color-bg-elevated)] via-[var(--color-bg-elevated)] to-transparent safe-area-pb">
            <PrimaryButton className="w-full mb-3" onClick={() => { handleClose(); }}>去试试 &rarr;</PrimaryButton>
            <div className="flex gap-3">
               <SecondaryButton className="flex-1" onClick={handleClose}>换一个</SecondaryButton>
               <SecondaryButton 
                  className="flex-1 !border-[var(--color-border)] font-medium gap-2"
                  onClick={() => !isSaved && saveCard(card)}
                >
                 <Heart size={16} fill={isSaved ? "var(--color-accent-warm)" : "none"} color={isSaved ? "var(--color-accent-warm)" : "currentColor"} />
                 {isSaved ? '已收藏' : '收藏'}
               </SecondaryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
