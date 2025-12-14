"use client";
import { Button } from "@/components/ui/button";
import { useWorkoutStepper } from '../hooks/use-workout-stepper'

export function WorkoutStepper() {
  const {
    currentStep
  } = useWorkoutStepper();
  const renderTopBanner = () => {
    if (currentStep === 1) {
      return 1
    }
    if (currentStep === 2) {
      return 2
    }
    if (currentStep === 3) {
      return 3
    }
  }
  return <div className="w-full max-w-6xl mx-auto h-full">
    {renderTopBanner()}
  </div>
}