import { motion } from 'motion/react';
import { Bookmark } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { IconButton } from '../components/ui/Buttons';
import { useAppStore } from '../store/useAppStore';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '深夜了，';
  if (hour < 12) return '早上好，';
  if (hour < 14) return '午休时间，';
  if (hour < 18) return '下午，';
  if (hour < 21) return '今晚，';
  return '夜里，';
};

export const Home: React.FC = () => {
  const { setScreen, savedCards } = useAppStore();
  const [showBg, setShowBg] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [showWeather, setShowWeather] = useState(false);

  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    // Entrance animations staggered
    const bgTimer = setTimeout(() => setShowBg(true), 0);
    const greetingTimer = setTimeout(() => setShowGreeting(true), 100);
    const ctaTimer = setTimeout(() => setShowCta(true), 250);
    const weatherTimer = setTimeout(() => setShowWeather(true), 400);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(greetingTimer);
      clearTimeout(ctaTimer);
      clearTimeout(weatherTimer);
    };
  }, []);

  const recentSaved = savedCards.length > 0 ? savedCards[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`absolute inset-0 flex flex-col safe-area-pt safe-area-pb transition-opacity duration-400 ${showBg ? 'bg-radial-glow' : 'bg-[var(--color-bg-base)]'}`}
    >
      {/* Top Nav */}
      <div className="h-[48px] flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-2">
           <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="23" stroke="var(--color-accent-warm)" strokeWidth="1" strokeDasharray="3 3"/>
              <circle cx="24" cy="24" r="4" fill="var(--color-accent-warm)"/>
           </svg>
        </div>
        <IconButton onClick={() => setScreen('saved')}>
          <Bookmark size={20} />
        </IconButton>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <motion.div
           initial={{ opacity: 0, y: 12 }}
           animate={showGreeting ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-[32px]"
        >
          <div className="text-[28px] text-[var(--color-text-secondary)] text-display leading-tight">{greeting}</div>
          <div className="text-[32px] text-[var(--color-text-primary)] text-display leading-tight">你有多少时间？</div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={showCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          whileTap={{ scale: 0.98, filter: 'brightness(0.9)', boxShadow: '0 0 48px rgba(212,168,83,0.35)' }}
          transition={{ duration: 0.6 }}
          onClick={() => setScreen('questionnaire')}
          className="w-[220px] h-[60px] rounded-full bg-[var(--color-accent-warm)] text-[var(--color-text-inverse)] text-[16px] font-medium shadow-[var(--shadow-accent)] mb-[16px]"
        >
          现在适合做什么？
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showWeather ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[12px] text-[var(--color-text-tertiary)] py-1 px-3 bg-transparent rounded-full"
        >
          ☁️ 北京 · 14°C · 阴天
        </motion.div>
      </div>

      {/* Bottom Area: Recent Saved */}
      {recentSaved && (
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
           className="px-4 pb-6"
        >
          <button 
             onClick={() => setScreen('saved')}
             className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-full text-left"
          >
             <div className="flex flex-col">
               <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-0.5">最近收藏</span>
               <span className="text-[14px] text-[var(--color-text-primary)] text-display truncate">{recentSaved.title}</span>
             </div>
             <Bookmark size={16} className="text-[var(--color-text-secondary)]" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
