import React from "react";
import { BarChart3, GripVertical, Trash2 } from "lucide-react";
import { useCurrentLocale, useI18n } from "locales/client";

import useBoolean from "@/shared/hooks/useBoolean";
import { Button } from "@/components/ui/button";

import { ExerciseVideoModal } from "./exercise-video-modal";
import type { ExerciseWithAttributes } from "../types";

interface ExerciseListItemProps {
  exercise: ExerciseWithAttributes;
  muscle: string;
  onShuffle: (exerciseId: string, muscle: string) => void;
  onPick: (exerciseId: string) => void;
  onDelete: (exerciseId: string, muscle: string) => void;
  isShuffling?: boolean;
}

export const ExerciseListItem = React.memo(function ExerciseListItem({
  exercise,
  muscle,
  onShuffle,
  onDelete,
  isShuffling,
}: Omit<ExerciseListItemProps, "onPick">) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const playVideo = useBoolean();

  const exerciseName = locale === "fr" ? exercise.name : exercise.nameEn;

  return (
    <div
      className={`flex items-center gap-3 p-3`}
    >
      <div>
        <GripVertical className="w-5 h-5 text-slate-400" />
      </div>

      {
        exercise.fullVideoImageUrl && (
          <div>image</div>
        )
      }
      <div
        className={`tooltip`}
      >
        {muscle.charAt(0)}
      </div>
      <div className="">
        <span>{exerciseName}</span>
      </div>
      <Button>
        <span>33</span>
      </Button>
      <button>
        <BarChart3 className="w-4 h-4" />
      </button>
      <button>
        <Trash2 />
      </button>
      {exercise.fullVideoUrl && <ExerciseVideoModal exercise={exercise} onOpenChange={playVideo.toggle} open={playVideo.value} />}
    </div>
  );
});