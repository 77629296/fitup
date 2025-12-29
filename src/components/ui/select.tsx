"use client";

import * as React from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@/shared/lib/utils";

const Select = SelectPrimitive.Root;

Select.displayName = SelectPrimitive.Root.displayName;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    icons?: string;
  }
>(({ className, children, icons, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex w-full items-center justify-between gap-1.5 rounded-lg px-3.5 py-2.5 text-left text-sm/[18px] font-medium text-gray shadow-3xl transition-all placeholder:text-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:text-gray-500 dark:shadow-sm dark:ring-1 dark:ring-white/10 [&>span]:line-clamp-1 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-black dark:[&[data-state=open]>svg]:text-white [&[data-state=open]]:text-black dark:[&[data-state=open]]:text-white",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        {icons === "shorting" ? (
          <>
            <ChevronsUpDown className="size-4 shrink-0 !rotate-0 text-gray transition dark:text-gray-500" />
          </>
        ) : (
          <ChevronsUpDown className="h-4 w-4 text-gray transition dark:text-gray-500" />
        )}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton className={cn("flex cursor-default items-center justify-center py-1", className)} ref={ref} {...props}>
    <ChevronDown className="h-4 w-4 rotate-180" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton className={cn("flex cursor-default items-center justify-center py-1", className)} ref={ref} {...props}>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        "relative z-[1001] max-h-96 w-full overflow-hidden rounded-lg bg-white text-sm/4 font-medium text-gray shadow-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border dark:border-white/10 dark:bg-black-dark dark:text-gray-500 dark:shadow-sm",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} ref={ref} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      "relative mt-px flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-2 pr-2 text-sm/5 font-medium outline-none ring-0 first:mt-0 hover:bg-gray-400 hover:text-black data-[disabled]:pointer-events-none data-[state=checked]:bg-gray-400 data-[state=checked]:text-black data-[disabled]:opacity-50 dark:hover:bg-gray-200/10 dark:hover:text-white dark:data-[state=checked]:bg-gray-200/10 dark:data-[state=checked]:text-white",
      className,
    )}
    ref={ref}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator className={cn("bg-muted -mx-1 my-1 h-px", className)} ref={ref} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
