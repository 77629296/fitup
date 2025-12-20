import { ExerciseAttributeNameEnum, ExerciseAttributeValueEnum } from "@prisma/client";

export interface BaseExercise {
  id: string;
  fullVideoUrl?: string | null;
  fullVideoImageUrl?: string | null;
  introduction: string | null;
  introductionEn: string | null;
  name: string;
  nameEn: string | null;
  description: string;
  descriptionEn: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseAttribute {
  id: string;
  exerciseId: string;
  attributeNameId: string;
  attributeValueId: string;
  attributeName: ExerciseAttributeNameEnum | { name: ExerciseAttributeNameEnum; id: string };
  attributeValue: ExerciseAttributeValueEnum | { value: ExerciseAttributeValueEnum; id: string };
}

export interface ExerciseWithAttributes extends BaseExercise {
  attributes: ExerciseAttribute[];
}