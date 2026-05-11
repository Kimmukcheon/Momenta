import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Heart, X, Check } from 'lucide-react';
import React, { useState } from 'react';
import { IconButton, SecondaryButton, TopNav } from '../components/ui/Buttons';
import { useAppStore, Card } from '../store/useAppStore';

const MOCK_RECOMMENDATIONS: Card[] = [
  {
    id: 'card_001',
    title: '戴耳机去便利店夜间散步',
    category: '深夜散步',
    categoryEmoji: '🌙',
    duration: '30 min',
    reason: '你今晚很累，而且外面在下雨。比起继续刷手机，低刺激的夜间走动更适合现在的你。',
    benefits: ['放松', '恢复能量', '低刺激', '独处'],
    tip: '可以搭配：Lo-fi 夜间歌单'
  },
  {
    id: 'card_002',
    title: '整理桌面一角',
    category: '轻量整理',
    categoryEmoji: '🧹',
    duration: '15 min',
    reason: '你觉得精力一般，不如把视线最常落下的地方清理干净，微小的控制感会带来平静。',
    benefits: ['平静', '秩序感', '低耗能'],
    tip: '只整理一个角，不要大扫除'
  },
  {
    id: 'card_003',
    title: '泡一杯热茶，写下三件小事',
    category: '思绪记录',
    categoryEmoji: '☕',
    duration: '20 min',
    reason: '今天似乎有点杂乱，安静独处时，把脑子里的东西具象化写出来，有助于找回内心的节奏。',
    benefits: ['解压', '心流', '温暖'],
    tip: '不用在乎逻辑，想到什么写什么'
  }
];

export const Recommendations: React.FC = () => {
  const { setScreen, saveCard, savedCards, setActiveCardDetail } = useAppStore();
  const [cards, setCards] = useState<Card[]>(MOCK_RECOMMENDATIONS);

  const handleSkip = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col bg-[var(--color-bg-base)] safe-area-pt safe-area-pb"
    >
      <TopNav 
        onBack={() => setScreen('home')} 
        rightIcon={<Bookmark size={20} />} 
        rightAction={() => setScreen('saved')} 
      />

      <div className="px-4 pb-4">
         <div className="text-[14px] text-[var(--color-text-secondary)]">为您准备了 {cards.length} 个想法</div>
         <div className="text-[12px] text-[var(--color-text-tertiary)] mt-1">今晚 · 北京 · 阴天 · 精力一般</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
         <AnimatePresence>
           {cards.map((card, i) => (
             <RecommendationCard 
                key={card.id} 
                card={card} 
                index={i} 
                onSkip={() => handleSkip(card.id)}
                onSave={() => saveCard(card)}
                isSaved={!!savedCards.find(c => c.id === card.id)}
                onOpenDetail={() => setActiveCardDetail(card)}
             />
           ))}
         </AnimatePresence>

         {cards.length === 0 && (
           <div className="text-center py-20">
             <div className="text-[var(--color-text-tertiary)] flex justify-center mb-6">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/></svg>
             </div>
             <div className="text-[16px] text-[var(--color-text-secondary)]">没有更多推荐了</div>
             <div className="text-[14px] text-[var(--color-text-tertiary)] mt-2">重新生成试试</div>
           </div>
         )}
      </div>

      <div className="absolute bottom-6 left-0 w-full flex flex-col items-center justify-center pointer-events-none">
         <button onClick={() => { setCards(MOCK_RECOMMENDATIONS); }} className="pointer-events-auto text-[12px] text-[var(--color-text-tertiary)] underline underline-offset-4 hover:text-[var(--color-text-secondary)] mb-1 bg-[var(--color-bg-base)] px-4 py-1 rounded-full">
           重新生成
         </button>
         <span className="text-[12px] text-[var(--color-text-tertiary)] opacity-50 bg-[var(--color-bg-base)] px-2">不满意？换一批</span>
      </div>
    </motion.div>
  );
};

const RecommendationCard = ({ card, index, onSkip, onSave, isSaved, onOpenDetail }: { card: Card, index: number, onSkip: () => void, onSave: () => void, isSaved: boolean, onOpenDetail: () => void }) => {
  const [isDone, setIsDone] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) return;
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);
    onSave();
  };

  const handleDoneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDone(true);
  };

  const handleSkipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSkip();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className={`w-full rounded-[24px] border-[0.5px] p-6 mb-4 shadow-[var(--shadow-card)] relative cursor-pointer overflow-hidden
        ${isDone ? 'bg-[rgba(90,138,106,0.12)] border-transparent' : 'bg-[var(--color-bg-surface)] border-[var(--color-border)]'}
      `}
      onClick={onOpenDetail}
    >
      {isDone && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--color-positive)]" />}

      <div className="flex justify-between items-start mb-4">
        <div className="bg-[rgba(255,255,255,0.06)] rounded-full px-2.5 py-1 text-[12px] text-[var(--color-text-secondary)] flex items-center gap-1">
          <span>{card.categoryEmoji}</span>
          <span>{card.category}</span>
        </div>
        <div className="text-[12px] font-mono text-[var(--color-accent-warm)]">
          {card.duration}
        </div>
      </div>

      <h3 className="text-display text-[20px] text-[var(--color-text-primary)] mb-3 leading-snug flex items-start gap-2">
        {isDone && <Check size={20} className="text-[var(--color-positive)] mt-1 flex-shrink-0" />}
        {card.title}
      </h3>

      <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.65]">
        {card.reason}
      </p>

      <div className="h-[0.5px] bg-[var(--color-border)] my-5" />

      <div className="flex items-center gap-2">
        <motion.button
          onClick={isDone ? undefined : handleDoneClick}
          whileTap={isDone ? undefined : { scale: 0.95 }}
          className={`h-[40px] flex-1 rounded-full flex items-center justify-center text-[14px] transition-colors
            ${isDone ? 'bg-transparent text-[var(--color-positive)] pointer-events-none' : 'bg-[var(--color-accent-warm)] text-[var(--color-text-inverse)]'}
          `}
        >
          {isDone ? '已确认' : '去试试 →'}
        </motion.button>
        
        {!isDone && (
          <motion.button onClick={handleSkipClick} whileTap={{ scale: 0.95 }} className="h-[40px] px-4 rounded-full border-[0.5px] border-[var(--color-border)] text-[12px] text-[var(--color-text-secondary)]">
            换一个
          </motion.button>
        )}

        <motion.button 
          onClick={handleSaveClick}
          whileTap={{ scale: 0.95 }}
          animate={isHeartAnimating ? { scale: [1, 0.8, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="h-[40px] w-[40px] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          <Heart size={20} fill={isSaved ? "var(--color-accent-warm)" : "none"} color={isSaved ? "var(--color-accent-warm)" : "currentColor"} />
        </motion.button>
      </div>
    </motion.div>
  );
};
