import { WorkoutStepper } from "@/features/workout-builder";

export default async function HomePage() {
  return (
    <div className="bg-background text-foreground relative flex flex-col h-full">
      <WorkoutStepper />
    </div>
  );
}