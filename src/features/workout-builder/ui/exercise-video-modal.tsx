import { useState } from "react";

import { useCurrentLocale, useI18n } from "locales/client";
import { StatisticsTimeframe } from "@/shared/constants/statistics";
import { getYouTubeEmbedUrl } from "@/shared/lib/youtube";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import type { ExerciseWithAttributes } from "../types";

interface ExerciseVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: ExerciseWithAttributes;
}

export function ExerciseVideoModal({ open, onOpenChange, exercise }: ExerciseVideoModalProps) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [activeTab, setActiveTab] = useState("video");
  const [selectedTimeframe, setSelectedTimeframe] = useState<StatisticsTimeframe>("8weeks");

  const title = locale === "fr" ? exercise.name : exercise.nameEn || exercise.name;
  const introduction = locale === "fr" ? exercise.introduction : exercise.introductionEn || exercise.introduction;
  const description = locale === "fr" ? exercise.description : exercise.descriptionEn || exercise.description;
  const videoUrl = exercise.fullVideoUrl;
  const youTubeEmbedUrl = getYouTubeEmbedUrl(videoUrl ?? "");

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-2xl p-0 max-h-[80vh]">
        <DialogHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2">
          <DialogTitle className="text-lg md:text-xl font-bold flex flex-col gap-2">
            <span className="text-slate-700 dark:text-slate-200 pr-10 text-left">{title}</span>
          </DialogTitle>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  );
}