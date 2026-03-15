"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/shared/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  }
>(({ className, showTooltip = false, tooltipContent, ...props }, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>((props.defaultValue as number[]) ?? (props.value as number[]) ?? [0]);

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true);
    }
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false);
    }
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (value: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        className="text-focus-visible:outline-ring/40 block h-5 w-5 cursor-ew-resize rounded-full border-2 border-primary bg-white transition-colors focus-visible:outline focus-visible:outline-[3px] data-[disabled]:cursor-not-allowed"
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs" side={props.orientation === "vertical" ? "right" : "top"} sideOffset={8}>
            <p>{tooltipContent ? tooltipContent(value) : value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
        className,
      )}
      onValueChange={handleValueChange}
      ref={ref}
      {...props}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-primary/20 data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2">
        <SliderPrimitive.Range className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {internalValue?.map((value, index) => <React.Fragment key={index}>{renderThumb(value)}</React.Fragment>)}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
