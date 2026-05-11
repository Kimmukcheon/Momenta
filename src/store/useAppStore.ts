import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Screen = 'splash' | 'onboarding' | 'home' | 'questionnaire' | 'loading' | 'recommendations' | 'saved';

export interface Card {
  id: string;
  title: string;
  category: string;
  categoryEmoji?: string;
  duration: string;
  reason?: string;
  benefits?: string[];
  tip?: string;
  savedAt?: number;
}

interface AppState {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  
  // User Data
  interests: string[];
  setInterests: (interests: string[]) => void;
  toggleInterest: (interest: string) => void;
  
  mbti: string;
  setMbti: (mbti: string) => void;
  
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
  
  // Questionnaire Answers
  timeAvailable: string;
  moodNeed: string;
  energyLevel: string;
  setQuestionAnswer: (key: 'timeAvailable' | 'moodNeed' | 'energyLevel', value: string) => void;
  
  // Saved Data
  savedCards: Card[];
  saveCard: (card: Card) => void;
  removeSavedCard: (id: string) => void;

  // Active state to hold viewed card detail
  activeCardDetail: Card | null;
  setActiveCardDetail: (card: Card | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentScreen: 'splash',
      setScreen: (screen) => set({ currentScreen: screen }),
      
      interests: [],
      setInterests: (interests) => set({ interests }),
      toggleInterest: (interest) =>
        set((state) => ({
          interests: state.interests.includes(interest)
            ? state.interests.filter((i) => i !== interest)
            : [...state.interests, interest],
        })),
        
      mbti: '',
      setMbti: (mbti) => set({ mbti }),
      
      onboardingCompleted: false,
      completeOnboarding: () => set({ onboardingCompleted: true }),
      
      timeAvailable: '',
      moodNeed: '',
      energyLevel: '',
      setQuestionAnswer: (key, value) => set({ [key]: value }),
      
      savedCards: [],
      saveCard: (card) => set((state) => {
        if (state.savedCards.find(c => c.id === card.id)) return state;
        return {
          savedCards: [{ ...card, savedAt: Date.now() }, ...state.savedCards]
        };
      }),
      removeSavedCard: (id) => set((state) => ({
        savedCards: state.savedCards.filter((c) => c.id !== id)
      })),

      activeCardDetail: null,
      setActiveCardDetail: (card) => set({ activeCardDetail: card }),
    }),
    {
      name: 'momenta-storage',
      // Only persist specific fields
      partialize: (state) => ({
        interests: state.interests,
        mbti: state.mbti,
        onboardingCompleted: state.onboardingCompleted,
        savedCards: state.savedCards,
      }),
    }
  )
);
