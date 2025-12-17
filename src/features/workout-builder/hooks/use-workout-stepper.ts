"use client";

import { useWorkoutBuilderStore } from '../model/workout-builder.store';

export function useWorkoutStepper() {
  const {
    currentStep,
    selectedEquipment,
    toggleEquipment,
    clearEquipment,
  } = useWorkoutBuilderStore();
  return {
    // state
    currentStep,
    selectedEquipment,

    // equipment
    toggleEquipment,
    clearEquipment,
  }
}