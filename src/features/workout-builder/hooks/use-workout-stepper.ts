"use client";

import { useWorkoutBuilderStore } from '../model/workout-builder.store';

export function useWorkoutStepper() {
  const {
    currentStep,
    selectedEquipment,
    selectedMuscles,
    exercisesByMuscle,
    isLoadingExercises,
    exercisesError,
    exercisesOrder,
    toggleEquipment,
    clearEquipment,
    toggleMuscle,
    nextStep,
    prevStep,
    fetchExercises,
  } = useWorkoutBuilderStore();
  return {
    // state
    currentStep,
    selectedEquipment,
    selectedMuscles,

    exercisesByMuscle,
    isLoadingExercises,
    exercisesError,

    // navigation
    nextStep,
    prevStep,

    // equipment
    toggleEquipment,
    clearEquipment,

    // muscles
    toggleMuscle,

    exercisesOrder,

    fetchExercises,
  }
}