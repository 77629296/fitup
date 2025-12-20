"use client";

import { useI18n } from "locales/client";
import { ExerciseAttributeValueEnum } from "@prisma/client";
import { useQueryState } from "nuqs";

import { useWorkoutStepper } from '../hooks/use-workout-stepper';
import { StepperHeader } from './stepper-header';
import { EquipmentSelection } from './equipment-selection'
import { MuscleSelection } from './muscle-selection';
import { ExercisesSelection } from './exercises-selection';
import { StepperStepProps } from "../types";
import { WorkoutBuilderFooter } from "./workout-stepper-footer";

export function WorkoutStepper() {
  const t = useI18n();
  const [fromSession, setFromSession] = useQueryState("fromSession");
  const {
    currentStep,
    selectedEquipment,
    selectedMuscles,
    exercisesByMuscle,
    isLoadingExercises,
    exercisesError,
    toggleEquipment,
    clearEquipment,
    toggleMuscle,
    nextStep,
    prevStep,
  } = useWorkoutStepper();

  const handleToggleMuscle = (muscle: ExerciseAttributeValueEnum) => {
    toggleMuscle(muscle);
    if (fromSession) setFromSession(null);
  };

  const handleStartWorkout = () => { };
  const canContinue = true;

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
        return (
          <MuscleSelection onToggleMuscle={handleToggleMuscle} selectedEquipment={selectedEquipment} selectedMuscles={selectedMuscles} />
        );
      case 3:
        return (
          <ExercisesSelection
            error={exercisesError}
            exercisesByMuscle={exercisesByMuscle}
            isLoading={isLoadingExercises}
            onAdd={() => { }}
            onDelete={() => { }}
            onPick={() => { }}
            onShuffle={() => { }}
            shufflingExerciseId={() => { }}
          />
        )
      default:
        return null;
    }
  }

  return <div className="w-full max-w-6xl mx-auto h-full">
    <StepperHeader currentStep={currentStep} steps={steps} />
    <div className="px-2 sm:px-6">{renderStepContent()}</div>
    <WorkoutBuilderFooter
      canContinue={canContinue}
      currentStep={currentStep}
      onNext={nextStep}
      onPrevious={prevStep}
      onStartWorkout={handleStartWorkout}
      totalSteps={STEPPER_STEPS.length}
    />
  </div>
}
