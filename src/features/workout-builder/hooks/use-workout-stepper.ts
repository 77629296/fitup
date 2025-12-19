"use client";

import { useWorkoutBuilderStore } from '../model/workout-builder.store';

export function useWorkoutStepper() {
  const {
    currentStep,
    selectedEquipment,
    selectedMuscles,
    toggleEquipment,
    clearEquipment,
    toggleMuscle,
    nextStep,
    prevStep,
  } = useWorkoutBuilderStore();
  return {
    // state
    currentStep,
    selectedEquipment,
    selectedMuscles,

    // navigation
    nextStep,
    prevStep,

    // equipment
    toggleEquipment,
    clearEquipment,

    // muscles
    toggleMuscle,
  }
}