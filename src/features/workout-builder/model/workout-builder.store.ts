import { create } from 'zustand';
import { ExerciseAttributeValueEnum } from '@prisma/client';

import { WorkoutBuilderStep } from '../types';

interface WorkoutBuilderState {
  currentStep: WorkoutBuilderStep;
  selectedEquipment: ExerciseAttributeValueEnum[];

  // Actions
  setStep: (step: WorkoutBuilderStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleEquipment: (equipment: ExerciseAttributeValueEnum) => void;
  clearEquipment: () => void;
}

export const useWorkoutBuilderStore = create<WorkoutBuilderState>((set, get) => ({
  currentStep: 1 as WorkoutBuilderStep,
  selectedEquipment: [],

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) as WorkoutBuilderStep })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as WorkoutBuilderStep })),

  toggleEquipment: (equipment) =>
    set((state) => ({
      selectedEquipment: state.selectedEquipment.includes(equipment)
        ? state.selectedEquipment.filter((e) => e !== equipment)
        : [...state.selectedEquipment, equipment],
    })),
  clearEquipment: () => set({ selectedEquipment: [] }),
}))