import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useAppStore } from './store/useAppStore';

import { Splash } from './screens/Splash';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { Questionnaire } from './screens/Questionnaire';
import { Loading } from './screens/Loading';
import { Recommendations } from './screens/Recommendations';
import { Saved } from './screens/Saved';
import { CardDetail } from './components/ui/CardDetail';

export default function App() {
  const { currentScreen } = useAppStore();

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-[var(--color-bg-base)]">
      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && <Splash key="splash" />}
        {currentScreen === 'onboarding' && <Onboarding key="onboarding" />}
        {currentScreen === 'home' && <Home key="home" />}
        {currentScreen === 'questionnaire' && <Questionnaire key="questionnaire" />}
        {currentScreen === 'loading' && <Loading key="loading" />}
        {currentScreen === 'recommendations' && <Recommendations key="recommendations" />}
        {currentScreen === 'saved' && <Saved key="saved" />}
      </AnimatePresence>

      <CardDetail />
    </div>
  );
}
