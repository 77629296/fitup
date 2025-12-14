"use client";

import { useWorkoutBuilderStore } from '../model/workout-builder.store';

export function useWorkoutStepper() {
    const {
        currentStep,
    } = useWorkoutBuilderStore();
    return {
        // state
        currentStep,
    }
}