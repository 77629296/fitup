import { ExerciseAttributeValueEnum } from "@prisma/client";
import { StaticImageData } from "next/image";

import { ExerciseWithAttributes } from '@/entities/exercise/types/exercise.types';
export type { ExerciseWithAttributes };

export type WorkoutBuilderStep = 1 | 2 | 3;

export interface StepperStepProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface EquipmentItem {
  value: ExerciseAttributeValueEnum;
  label: string;
  icon: StaticImageData;
  description?: string;
  className?: string;
}