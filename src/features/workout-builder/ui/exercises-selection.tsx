import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { ExerciseWithAttributes } from '../types';
import { useWorkoutStepper } from "../hooks/use-workout-stepper";
import { useI18n } from "locales/client";

interface ExercisesSelectionProps {
  isLoading: boolean;
  exercisesByMuscle: { muscle: string; exercises: ExerciseWithAttributes[] }[];
  error: any;
  onShuffle: (exerciseId: string, muscle: string) => void;
  onPick: (exerciseId: string) => void;
  onDelete: (exerciseId: string, muscle: string) => void;
  onAdd: () => void;
  shufflingExerciseId?: string | null;
}

export const ExercisesSelection = ({
  isLoading,
  exercisesByMuscle,
  error,
  onShuffle,
  onPick: _todo,
  onDelete,
  onAdd,
  shufflingExerciseId,
}: ExercisesSelectionProps) => {
  const t = useI18n();
  const [flatExercises, setFlatExercises] = useState<{ id: string; muscle: string; exercise: ExerciseWithAttributes }[]>([]);
  const { exercisesOrder } = useWorkoutStepper();

  const flatExercisesComputed = useMemo(() => {
    if (exercisesByMuscle.length === 0) return [];
  }, [exercisesByMuscle, exercisesOrder]);

  useEffect(() => {
    setFlatExercises(flatExercisesComputed);
  }, [flatExercisesComputed]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">{t("workout_builder.loading.exercises")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {flatExercises.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          test
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-600 dark:text-red-400">{t("workout_builder.error.loading_exercises")}</p>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-600 dark:text-slate-400">{t("workout_builder.no_exercises_found")}</p>
        </div>
      )}
    </div>
  )
}