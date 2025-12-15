"use client";

import { useI18n } from "locales/client";
import { Button } from "@/components/ui/button";
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

  const renderTopBanner = () => {
    if (currentStep === 1) {
      return 1
    }
    if (currentStep === 2) {
      return 2
    }
    if (currentStep === 3) {
      return 3
    }
  }
  return <div className="w-full max-w-6xl mx-auto h-full">
    {renderTopBanner()}
    <StepperHeader currentStep={currentStep} steps={steps} />
  </div>
}