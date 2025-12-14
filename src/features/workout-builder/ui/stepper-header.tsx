"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

import { StepperStepProps } from "../types";

interface StepperHeaderProps {
    steps: StepperStepProps[];
    currentStep: number;
    onStepClick?: (stepNumber: number) => void;
}

function StepperStep({
    description,
    isActive,
    isCompleted,
    stepNumber,
    title,
    currentStep,
    onStepClick,
}: StepperStepProps & { currentStep: number; onStepClick?: (stepNumber: number) => void }) {
    const canClick = stepNumber < currentStep || isCompleted;
    const handleClick = () => {
        if (canClick && onStepClick) {
            onStepClick(stepNumber)
        }
    };
    return (
        <>
            {/* Layout mobile - vertical */}
            <div className="flex items-center text-left md:hidden">mobile</div>
            {/* Layout desktop - horizontal */}
            <div className="hidden md:flex flex-col items-center text-center">desktop</div>
        </>
    )
}

export function StepperHeader({ steps, currentStep, onStepClick }: StepperHeaderProps) {
    return (
        <div className={cn("w-full my-8 px-2 sm:px-6")}>
            {/* Layout mobile - vertical */}
            <div className={cn("flex flex-col space-y-6 md:hidden")}>
                {steps.map((step, index) => (
                    <div className="relative" key={step.stepNumber}>
                        <StepperStep {...step} currentStep={currentStep} onStepClick={onStepClick} />
                    </div>
                ))}
            </div>
            {/* Layout desktop - horizontal */}
            <div className="hidden md:flex items-start">
                {steps.map((step, index) => (
                    <React.Fragment key={step.stepNumber}>
                        {/* Etape */}
                        <div className="flex flex-col items-center">
                            <StepperStep {...step} currentStep={currentStep} onStepClick={onStepClick} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}