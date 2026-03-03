"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/shared/lib/utils";

const switchVariants = cva(
  "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-500/40 outline-none",
  {
    variants: {
      variant: {
        default: "",
        outline: "h-2 w-[22px]",
        large: "h-6 w-12",
      },
      color: {
        default: "data-[state=checked]:ring-black dark:data-[state=checked]:bg-white ",
        primary: "data-[state=checked]:bg-primary",
        success: "data-[state=checked]:bg-success",
        pending: "data-[state=checked]:bg-warning",
        danger: "data-[state=checked]:bg-danger",
        outlineBlack: "data-[state=checked]:bg-black/20 dark:data-[state=checked]:bg-white/50",
        outlinePrimary: "data-[state=checked]:bg-primary/20",
        outlineSuccess: "data-[state=checked]:bg-success/20",
        outlinePending: "data-[state=checked]:bg-warning/20",
        outlineDanger: "data-[state=checked]:bg-danger/20",
        info: "data-[state=checked]:bg-blue-400",
        warning: "data-[state=checked]:bg-yellow-400",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
);

const switchThumbVariants = cva(
  "bg-transparent pointer-events-none block size-3 rounded-full border-[3.6px] border-white shadow-[0_0_2.4px_0_rgba(0,0,0,0.10)]  transition-transform ltr:data-[state=checked]:translate-x-3.5 ltr:data-[state=unchecked]:translate-x-0.5 rtl:data-[state=checked]:-translate-x-3.5 rtl:data-[state=unchecked]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-0 data-[state=unchecked]:-translate-x-0.5 data-[state=checked]:translate-x-3",
        large: "size-5 border-[4px]",
      },
      color: {
        default: "dark:border-black",
        primary: "",
        success: "",
        pending: "",
        danger: "",
        outlineBlack: "data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-500",
        outlinePrimary: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-500",
        outlineSuccess: "data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-500",
        outlinePending: "data-[state=checked]:bg-warning data-[state=unchecked]:bg-gray-500",
        outlineDanger: "data-[state=checked]:bg-danger data-[state=unchecked]:bg-gray-500",
        info: "data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-gray-500",
        warning: "data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-500",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  },
);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & VariantProps<typeof switchVariants>
>(({ className, variant, color, ...props }, ref) => (
  <SwitchPrimitives.Root className={cn(switchVariants({ variant, color, className }))} {...props} ref={ref}>
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ variant, color, className }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const SwitchOutline = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "focus-visible:ring-ring focus-visible:ring-offset-background peer inline-flex h-7 w-[50px] shrink-0 cursor-pointer items-center rounded-full border border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-transparent data-[state=unchecked]:bg-transparent",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-1.5 rounded-full bg-transparent shadow-lg ring-[5px] ring-black transition duration-300 data-[state=checked]:ring-black ltr:data-[state=checked]:translate-x-8 ltr:data-[state=unchecked]:translate-x-2.5 rtl:data-[state=checked]:-translate-x-8 rtl:data-[state=unchecked]:-translate-x-2.5 dark:ring-white dark:data-[state=checked]:ring-white",
      )}
    />
  </SwitchPrimitives.Root>
));
SwitchOutline.displayName = SwitchPrimitives.Root.displayName;

export { Switch, SwitchOutline };
