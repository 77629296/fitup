"use client";

import { useWorkoutBuilderStore } from '../model/workout-builder.store';

export function useWorkoutStepper() {
  const {
    currentStep,
    selectedEquipment,
    toggleEquipment,
    clearEquipment,
    nextStep,
    prevStep,
  } = useWorkoutBuilderStore();
  return {
    // state
    currentStep,
    selectedEquipment,

    // navigation
    nextStep,
    prevStep,

    // equipment
    toggleEquipment,
    clearEquipment,
  }
}