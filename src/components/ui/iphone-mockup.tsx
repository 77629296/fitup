"use client";

import * as React from "react";
import Image from "next/image";
import iPhone from "@public/images/iphone.png";

import { cn } from "@/shared/lib/utils";

interface IPhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  screenClassName?: string;
  showNotch?: boolean;
  width?: number;
  height?: number;
}

export function IPhoneMockup({ children, className, screenClassName, showNotch = true, width = 298, height = 601 }: IPhoneMockupProps) {
  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {/* iPhone frame image */}
      <Image alt="iPhone mockup frame" className="pointer-events-none select-none" height={height} priority src={iPhone} width={width} />

      {/* Screen content container */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          "flex flex-col items-center",
          // Adjust these values based on your iPhone image
          "bottom-[8%] left-[6%] right-[6%] top-[2%]",
          "h-[96%]",
          "rounded-[30px]",
          screenClassName,
        )}
      >
        {/* Notch - if enabled */}
        {showNotch && <div className="absolute left-1/2 top-0 z-10 h-[4%] w-[30%] -translate-x-1/2 rounded-b-xl bg-black" />}

        {/* Content */}
        <div className="w-full flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
