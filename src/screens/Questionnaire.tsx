import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { TopNav, PrimaryButton } from '../components/ui/Buttons';
import { useAppStore } from '../store/useAppStore';

const Q1_OPTIONS = [
  { id: '30min', icon: '⏱', label: '30 分钟以内' },
  { id: '1h', icon: '🕐', label: '大约 1 小时' },
  { id: 'halfday', icon: '🌅', label: '半天，有大把时间' },
];

const Q2_OPTIONS = [
  { id: 'relax', icon: '😮‍💨', label: '放松恢复' },
  { id: 'walk', icon: '🚶', label: '出门走走' },
  { id: 'learn', icon: '📚', label: '学点什么' },
  { id: 'alone', icon: '🤫', label: '安静独处' },
  { id: 'nature', icon: '🌿', label: '接触自然' },
  { id: 'surprise', icon: '✨', label: '来个惊喜' },
];

const Q3_OPTIONS = [
  { id: 'tired', icon: '🪫', label: '很累，只想躺着' },
  { id: 'normal', icon: '😐', label: '一般，能动但不想太折腾' },
  { id: 'high', icon: '⚡', label: '精力充沛，想做点事' },
];

export const Questionnaire: React.FC = () => {
  const [step, setStep] = useState(1);
  const { setScreen, timeAvailable, moodNeed, energyLevel, setQuestionAnswer } = useAppStore();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setScreen('home');
    }
  };

  const handleSelect = (question: 'timeAvailable'|'moodNeed'|'energyLevel', value: string) => {
    setQuestionAnswer(question, value);
    if (question !== 'energyLevel') {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const progressWidth = `${(step / 3) * 100}%`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col bg-[var(--color-bg-base)] safe-area-pt safe-area-pb"
    >
      <TopNav onBack={handleBack} step={`[${step} / 3]`} />
      
      {/* Progress Bar */}
      <div className="w-full h-[2px] bg-[var(--color-border)] absolute top-[calc(env(safe-area-inset-top,44px)+56px)] left-0">
        <motion.div 
          className="h-full bg-[var(--color-accent-warm)]"
          initial={{ width: 0 }}
          animate={{ width: progressWidth }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {step === 1 && (
            <motion.div
              key="q1"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="px-6 w-full"
            >
              <div className="mb-[40px]">
                <div className="text-[18px] text-[var(--color-text-secondary)] text-display">你现在</div>
                <div className="text-[28px] text-[var(--color-text-primary)] text-display">有多少空闲时间？</div>
              </div>
              
              <div className="flex flex-col gap-3">
                {Q1_OPTIONS.map(opt => {
                  const isSelected = timeAvailable === opt.id;
                  return (
                    <OptionRow key={opt.id} option={opt} isSelected={isSelected} onClick={() => handleSelect('timeAvailable', opt.id)} />
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="q2"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="px-6 w-full"
            >
              <div className="mb-[40px]">
                <div className="text-[18px] text-[var(--color-text-secondary)] text-display">你现在更想</div>
                <div className="text-[28px] text-[var(--color-text-primary)] text-display">做什么类型的事？</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Q2_OPTIONS.map(opt => {
                  const isSelected = moodNeed === opt.id;
                  return (
                    <OptionGrid key={opt.id} option={opt} isSelected={isSelected} onClick={() => handleSelect('moodNeed', opt.id)} />
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="q3"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="px-6 w-full flex flex-col h-full justify-center pb-20"
            >
              <div className="mb-[40px]">
                <div className="text-[18px] text-[var(--color-text-secondary)] text-display">你现在的</div>
                <div className="text-[28px] text-[var(--color-text-primary)] text-display">精力状态是？</div>
              </div>
              
              <div className="flex flex-col gap-3">
                {Q3_OPTIONS.map(opt => {
                  const isSelected = energyLevel === opt.id;
                  return (
                    <OptionRow key={opt.id} option={opt} isSelected={isSelected} onClick={() => handleSelect('energyLevel', opt.id)} />
                  );
                })}
              </div>

              <div className="absolute w-[calc(100%-48px)] bottom-8 left-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: !!energyLevel ? 1 : 0, y: !!energyLevel ? 0 : 10 }}
                  transition={{ delay: !!energyLevel ? 0.6 : 0, duration: 0.4 }}
                  className="w-full"
                >
                  <PrimaryButton className="w-full" onClick={() => setScreen('loading')}>
                    生成推荐 &rarr;
                  </PrimaryButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const OptionRow = ({ option, isSelected, onClick }: any) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`w-full h-[64px] flex items-center px-5 rounded-[16px] border-[0.5px] transition-colors relative text-left ${isSelected ? 'bg-[var(--color-accent-warm-dim)] border-[rgba(212,168,83,0.4)]' : 'bg-[var(--color-bg-surface)] border-[var(--color-border)]'}`}
  >
    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--color-accent-warm)] rounded-l-[16px]" />}
    <span className="text-[20px] mr-3">{option.icon}</span>
    <span className="text-[16px] text-[var(--color-text-primary)]">{option.label}</span>
  </motion.button>
);

const OptionGrid = ({ option, isSelected, onClick }: any) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`h-[88px] flex flex-col items-center justify-center rounded-[16px] border-[0.5px] transition-colors relative ${isSelected ? 'bg-[var(--color-accent-warm-dim)] border-[rgba(212,168,83,0.4)]' : 'bg-[var(--color-bg-surface)] border-[var(--color-border)]'}`}
  >
    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--color-accent-warm)] rounded-l-[16px]" />}
    <span className="text-[24px] mb-2">{option.icon}</span>
    <span className="text-[14px] text-[var(--color-text-primary)]">{option.label}</span>
  </motion.button>
);
