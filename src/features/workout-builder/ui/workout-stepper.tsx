"use client";

import { useI18n } from "locales/client";
import { useWorkoutStepper } from '../hooks/use-workout-stepper';
import { StepperHeader } from './stepper-header';
import { StepperStepProps } from "../types";

export function WorkoutStepper() {
  const t = useI18n();
  const {
    currentStep,
  } = useWorkoutStepper();

  const STEPPER_STEPS: StepperStepProps[] = [
    {
      stepNumber: 1,
      title: t("workout_builder.steps.equipment.title"),
      description: t("workout_builder.steps.equipment.description"),
      isActive: false,
      isCompleted: false,
    },
    {
      stepNumber: 2,
      title: t("workout_builder.steps.muscles.title"),
      description: t("workout_builder.steps.muscles.description"),
      isActive: false,
      isCompleted: false,
    },
    {
      stepNumber: 3,
      title: t("workout_builder.steps.exercises.title"),
      description: t("workout_builder.steps.exercises.description"),
      isActive: false,
      isCompleted: false,
    },
  ]

  const steps = STEPPER_STEPS.map((step) => ({
    ...step,
    isActive: step.stepNumber === currentStep,
    isCompleted: step.stepNumber < currentStep,
  }));

  return <div className="w-full max-w-6xl mx-auto h-full">
    <StepperHeader currentStep={currentStep} steps={steps} />
  </div>
}