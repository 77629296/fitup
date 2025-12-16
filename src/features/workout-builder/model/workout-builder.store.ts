import { create } from 'zustand';

import { WorkoutBuilderStep } from '../types';

interface WorkoutBuilderState {
  currentStep: WorkoutBuilderStep;

  // Actions
  setStep: (step: WorkoutBuilderStep) => void;
}

export const useWorkoutBuilderStore = create<WorkoutBuilderState>((set, get) => ({
  currentStep: 1 as WorkoutBuilderStep,

  setStep: (step) => set({ currentStep: step }),
}))