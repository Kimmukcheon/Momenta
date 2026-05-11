import { motion } from 'motion/react';
import React, { useState } from 'react';
import { PrimaryButton, TopNav } from '../components/ui/Buttons';
import { useAppStore } from '../store/useAppStore';

const STEP_WELCOME = 1;
const STEP_INTERESTS = 2;
const STEP_MBTI = 3;

const INTERESTS = [
  { id: 'coffee', icon: '☕', label: '咖啡探店' },
  { id: 'music', icon: '🎵', label: '听音乐' },
  { id: 'reading', icon: '📖', label: '阅读' },
  { id: 'walk', icon: '🚶', label: '散步' },
  { id: 'gaming', icon: '🎮', label: '游戏' },
  { id: 'art', icon: '🎨', label: '画画' },
  { id: 'food', icon: '🍜', label: '觅食' },
  { id: 'photo', icon: '📷', label: '摄影' },
  { id: 'meditation', icon: '🧘', label: '冥想' },
  { id: 'movie', icon: '🎬', label: '看电影' },
  { id: 'shopping', icon: '🛒', label: '逛街' },
  { id: 'nature', icon: '🌿', label: '自然' },
];

const MBTI_GROUPS = [
  { id: 'nf', label: 'INFP / INFJ 类（内向感受型）' },
  { id: 'nt', label: 'INTJ / INTP 类（内向思考型）' },
  { id: 'sf', label: 'ENFP / ENFJ 类（外向感受型）' },
  { id: 'st', label: 'ENTJ / ENTP 类（外向思考型）' },
];

export const Onboarding: React.FC = () => {
  const [step, setStep] = useState(STEP_WELCOME);
  const { completeOnboarding, setScreen, interests, toggleInterest, setMbti, mbti } = useAppStore();

  const handleFinish = () => {
    completeOnboarding();
    setScreen('home');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute inset-0 flex flex-col bg-[var(--color-bg-base)] safe-area-pt safe-area-pb"
    >
      {step === STEP_WELCOME && (
        <div className="flex-1 flex flex-col px-8 pb-12 pt-[80px]">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <div className="text-[32px] text-display text-[var(--color-text-primary)]">你好，</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="text-[32px] text-display text-[var(--color-text-primary)]">我是 Momenta。</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-[32px]">
              <div className="text-[18px] text-[var(--color-text-secondary)] leading-[1.6]">
                你有空闲时间，<br />
                但不知道做什么？<br />
                我来帮你。
              </div>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
            <PrimaryButton className="w-full" onClick={() => setStep(STEP_INTERESTS)}>
              开始吧 &rarr;
            </PrimaryButton>
          </motion.div>
        </div>
      )}

      {step === STEP_INTERESTS && (
        <React.Fragment>
          <TopNav onBack={() => setStep(STEP_WELCOME)} step="[Step 2/3]" />
          <div className="flex-1 flex flex-col px-6">
            <div className="mt-4 mb-8">
              <h2 className="text-[20px] text-[var(--color-text-primary)] text-display mb-2">你通常喜欢做什么？</h2>
              <p className="text-[14px] text-[var(--color-text-secondary)]">选几个就好，之后随时可以改</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((item) => {
                const isSelected = interests.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-[0.5px] transition-colors text-[14px] ${isSelected ? 'bg-[var(--color-accent-warm-dim)] border-[var(--color-accent-warm)] text-[var(--color-accent-warm)]' : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]'}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div className="px-6 pb-12 pt-6">
            <PrimaryButton 
              className={`w-full transition-opacity ${interests.length > 0 ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => { if(interests.length > 0) setStep(STEP_MBTI) }}
            >
              继续 &rarr;
            </PrimaryButton>
          </div>
        </React.Fragment>
      )}

      {step === STEP_MBTI && (
        <React.Fragment>
          <TopNav onBack={() => setStep(STEP_INTERESTS)} step="[Step 3/3]" />
          <div className="flex-1 flex flex-col px-6 pt-4">
            <h2 className="text-[20px] text-[var(--color-text-primary)] text-display mb-2">你知道自己的 MBTI 吗？</h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] mb-8">不知道也没关系，可以跳过</p>
            
            <div className="flex flex-col gap-4">
              {MBTI_GROUPS.map((group) => {
                 const isSelected = mbti === group.id;
                 return (
                  <motion.button
                    key={group.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMbti(group.id)}
                    className={`text-left p-4 rounded-[16px] border-[0.5px] transition-colors ${isSelected ? 'bg-[var(--color-accent-warm-dim)] border-[var(--color-accent-warm)] text-[var(--color-accent-warm)]' : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-primary)]'}`}
                  >
                    {group.label}
                  </motion.button>
                 );
              })}
            </div>
          </div>
          <div className="px-6 pb-12 pt-6 flex gap-4">
            <button 
              className="flex-1 text-[14px] text-[var(--color-text-secondary)]"
              onClick={handleFinish}
            >
              跳过
            </button>
            <PrimaryButton className="flex-1" onClick={handleFinish}>
              确认 &rarr;
            </PrimaryButton>
          </div>
        </React.Fragment>
      )}
    </motion.div>
  );
}
