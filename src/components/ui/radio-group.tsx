"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/shared/lib/utils";
import IconCheckboxCheck from "@/components/svg/IconCheckboxCheck";

const radioGroupVariants = cva(
  "aspect-square size-3 flex  items-center justify-center shrink-0 rounded-full ring-[1.5px] ring-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-transparent",
        outline: "data-[state=checked]:!bg-white",
      },
      color: {
        default: "data-[state=checked]:ring-black dark:data-[state=checked]:ring-white",
        primary: "data-[state=checked]:ring-primary",
        success: "data-[state=checked]:ring-success",
        pending: "data-[state=checked]:ring-warning",
        danger: "data-[state=checked]:ring-danger",
        outlineBlack: "data-[state=checked]:ring-black",
        outlinePrimary: "data-[state=checked]:ring-primary",
        outlineSuccess: "data-[state=checked]:ring-success",
        outlinePending: "data-[state=checked]:ring-warning",
        outlineDanger: "data-[state=checked]:ring-danger",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
);

const radioGroupCircleVariants = cva(
  "size-1.5 rounded-full bg-current text-transparent ring-[3.5px] ring-current disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-black",
        outline: "data-[state=checked]:!bg-white",
      },
      color: {
        default: "ring-black dark:ring-white",
        primary: "ring-primary",
        success: "ring-success",
        pending: "ring-warning",
        danger: "ring-danger",
        outlineBlack: "ring-[3px] ring-white bg-black",
        outlinePrimary: "ring-[3px] ring-white bg-primary",
        outlineSuccess: "ring-[3px] ring-white bg-success",
        outlinePending: "ring-[3px] ring-white bg-warning",
        outlineDanger: "ring-[3px] ring-white bg-danger",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
);

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-4", className)} dir="ltr" {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioGroupVariants>
>(({ className, variant, color, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item className={cn("", radioGroupVariants({ variant, color, className }))} ref={ref} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(radioGroupCircleVariants({ variant, color, className }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupCheck = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square size-3 rounded-full border-[1.5px] border-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-0 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white",
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <IconCheckboxCheck className={cn("size-1.5 text-white dark:text-black")} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupCheck.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, RadioGroupCheck };
