"use client";

import { useI18n } from "locales/client";
import { ExerciseAttributeValueEnum } from "@prisma/client";
import { useQueryState } from "nuqs";

import { useWorkoutStepper } from '../hooks/use-workout-stepper';
import { StepperHeader } from './stepper-header';
import { EquipmentSelection } from './equipment-selection'
import { StepperStepProps } from "../types";

export function WorkoutStepper() {
  const t = useI18n();
  const [fromSession, setFromSession] = useQueryState("fromSession");
  const {
    currentStep,
    selectedEquipment,
    toggleEquipment,
    clearEquipment,
  } = useWorkoutStepper();

  const handleToggleEquipment = (equipment: ExerciseAttributeValueEnum) => {
    toggleEquipment(equipment);
    if (fromSession) setFromSession(null);
  }
  const handleClearEquipment = () => {
    clearEquipment();
    if (fromSession) setFromSession(null);
  }

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EquipmentSelection
            onClearEquipment={handleClearEquipment}
            onToggleEquipment={handleToggleEquipment}
            selectedEquipment={selectedEquipment}
          />
        )
      case 2:
        return (2)
      case 3:
        return (3)
      default:
        return null;
    }
  }

  return <div className="w-full max-w-6xl mx-auto h-full">
    <StepperHeader currentStep={currentStep} steps={steps} />
    <div className="px-2 sm:px-6">{renderStepContent()}</div>
  </div>
}
