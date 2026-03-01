import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'matrix' | 'cyberpunk' | 'hacker';
export type ActiveChallenge = 'none' | 'dsa' | 'system_design';

export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_command: { id: 'first_command', name: 'First Steps', description: 'Typed your first command' },
  dsa_master: { id: 'dsa_master', name: 'Algorithm Master', description: 'Solved the DSA challenge' },
  system_architect: { id: 'system_architect', name: 'System Architect', description: 'Solved the system design challenge' },
  hacker_man: { id: 'hacker_man', name: 'Full Access', description: 'Unlocked all sections' },
  easter_egg: { id: 'easter_egg', name: 'Easter Egg Hunter', description: 'Found a hidden command' },
};

interface PortfolioState {
  isBooting: boolean;
  theme: Theme;
  activeChallenge: ActiveChallenge;
  challengeStep: number;
  sdQuestionIndex: number; // Added to track which question was asked
  unlockedProjects: boolean;
  unlockedContact: boolean;
  commandHistory: string[];
  achievements: string[];
  completeBoot: () => void;
  setTheme: (theme: Theme) => void;
  setActiveChallenge: (challenge: ActiveChallenge) => void;
  setChallengeStep: (step: number) => void;
  setSdQuestionIndex: (index: number) => void;
  unlockProjects: () => void;
  unlockContact: () => void;
  addCommandToHistory: (command: string) => void;
  addAchievement: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      isBooting: true,
      theme: 'matrix',
      activeChallenge: 'none',
      challengeStep: 0,
      sdQuestionIndex: -1,
      unlockedProjects: false,
      unlockedContact: false,
      commandHistory: [],
      achievements: [],
      completeBoot: () => set({ isBooting: false }),
      setTheme: (theme) => set({ theme }),
      setActiveChallenge: (challenge) => set({ activeChallenge: challenge, challengeStep: 0, sdQuestionIndex: -1 }),
      setChallengeStep: (step) => set({ challengeStep: step }),
      setSdQuestionIndex: (index) => set({ sdQuestionIndex: index }),
      unlockProjects: () => set({ unlockedProjects: true }),
      unlockContact: () => set({ unlockedContact: true }),
      addCommandToHistory: (command) =>
        set((state) => ({
          commandHistory: [...state.commandHistory, command].slice(-100),
        })),
      addAchievement: (id) =>
        set((state) => {
          if (!state.achievements.includes(id)) {
            return { achievements: [...state.achievements, id] };
          }
          return state;
        }),
    }),
    {
      name: 'portfolio-terminal-storage',
      partialize: (state) => ({
        theme: state.theme,
        unlockedProjects: state.unlockedProjects,
        unlockedContact: state.unlockedContact,
        commandHistory: state.commandHistory,
        achievements: state.achievements,
      }),
    }
  )
);
