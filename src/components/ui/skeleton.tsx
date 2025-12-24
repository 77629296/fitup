import React from "react";

import { cn } from "@/shared/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: string;
}

export function Skeleton({ width, height, rounded = "rounded", className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 dark:bg-gray-700", rounded, className)}
      style={{
        width,
        height,
        ...props.style,
      }}
      {...props}
    />
  );
}
