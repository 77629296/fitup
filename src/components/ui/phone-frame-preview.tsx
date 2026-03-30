import React from "react";

import { cn } from "@/shared/lib/utils";

interface PhoneFramePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PhoneFramePreview({ children, className, ...props }: PhoneFramePreviewProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-[9/18] h-auto w-full max-w-[330px] overflow-hidden rounded-[2.5rem] border-[3px] border-black bg-gray-900 shadow-xl",
        className,
      )}
      {...props}
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-[50] h-4 w-28 -translate-x-1/2 rounded-b-lg bg-black"></div>
      {/* Screen Content */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        {children}
        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 z-[50] h-1 w-1/3 -translate-x-1/2 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}
