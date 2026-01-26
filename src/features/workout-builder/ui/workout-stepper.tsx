"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "locales/client";
import { ExerciseAttributeValueEnum } from "@prisma/client";
import { useQueryState } from "nuqs";

import useBoolean from "@/shared/hooks/useBoolean";

import { useWorkoutStepper } from '../hooks/use-workout-stepper';
import { useWorkoutSession } from "../../workout-session/model/use-workout-session";
import { StepperHeader } from './stepper-header';
import { EquipmentSelection } from './equipment-selection'
import { MuscleSelection } from './muscle-selection';
import { ExercisesSelection } from './exercises-selection';
import { StepperStepProps } from "../types";
import { WorkoutBuilderFooter } from "./workout-stepper-footer";
import { AddExerciseModal } from "./add-exercise-modal";
import { ExerciseWithAttributes } from "@/entities/exercise/types/exercise.types";

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
    fetchExercises,
    exercisesOrder,
  } = useWorkoutStepper();

  const [flatExercises, setFlatExercises] = useState<{ id: string; muscle: string; exercise: ExerciseWithAttributes }[]>([]);

  useEffect(() => {
    if (exercisesByMuscle.length > 0) {
      const flat = exercisesByMuscle.flatMap((group) =>
        group.exercises.map((exercise: ExerciseWithAttributes) => ({
          id: exercise.id,
          muscle: group.muscle,
          exercise,
        }))
      )
      setFlatExercises(flat);
    }
  }, [exercisesByMuscle])

  useEffect(() => {
    if (currentStep === 3 && !fromSession) {
      fetchExercises();
    }
  }, [currentStep, selectedEquipment, selectedMuscles, fromSession]);

  const { startWorkout } = useWorkoutSession();

  const handleToggleMuscle = (muscle: ExerciseAttributeValueEnum) => {
    toggleMuscle(muscle);
    if (fromSession) setFromSession(null);
  };

  const addExerciseModal = useBoolean();
  const handleAddExercise = () => {
    addExerciseModal.setTrue();
  };

  const orderedExercises = useMemo(() => {
    if (flatExercises.length === 0) return [];

    if (exercisesOrder.length === 0) {
      return flatExercises.map(item => item.exercise);
    }

    const exerciseMap = new Map(flatExercises.map(item => [item.id, item.exercise]))
    const orderedResults = exercisesOrder.map(id => exerciseMap.get(id)).filter(Boolean) as ExerciseWithAttributes[];
    const remainingExercises = flatExercises.filter(item => !exercisesOrder.includes(item.id)).map(item => item.exercise);
    return [...orderedResults, ...remainingExercises];
  }, [flatExercises, exercisesOrder])

  const handleStartWorkout = () => {
    if (orderedExercises.length > 0) {
      startWorkout(orderedExercises, selectedEquipment, selectedMuscles);
    } else {
      console.log('No exercises to start workout with');
    }
  };
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
            onAdd={handleAddExercise}
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
    <AddExerciseModal isOpen={addExerciseModal} />
  </div>
}
