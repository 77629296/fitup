import { useI18n } from "locales/client";

export function MuscleSelection() {
  const t = useI18n();
  return <div className="space-y-6">
    <div className="text-center mb-6">
      <p className="text-slate-600 dark:text-slate-300 text-sm italic">{t("workout_builder.selection.muscle_selection_description")}</p>
    </div>
  </div>
}