export type WorkoutBuilderStep = 1 | 2 | 3;

export interface StepperStepProps {
    stepNumber: number;
    title: string;
    description: string;
    isActive: boolean;
    isCompleted: boolean;
}