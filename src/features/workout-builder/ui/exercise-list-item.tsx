import React from "react";
import Image from "next/image";
import { BarChart3, GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: exercise.id });

  const exerciseName = locale === "fr" ? exercise.name : exercise.nameEn;

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 select-none ${isDragging ? "shadow-lg" : ""}`}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 1000 : 1,
        position: isDragging ? "relative" : "static",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div
        className="cursor-grab active:cursor-grabbing touch-none select-none p-1 -m-1"
        style={{ touchAction: "none" }}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-slate-400" />
      </div>

      {
        exercise.fullVideoImageUrl && (
          <div
            className="relative h-10 w-10 rounded overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 cursor-pointer border border-slate-200 dark:border-slate-700/50"
          >
            <Image
              alt={exerciseName ?? ""}
              className="w-full h-full object-cover scale-[1.5]"
              height={32}
              loading="lazy"
              src={exercise.fullVideoImageUrl}
              width={32}
            />
          </div>
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