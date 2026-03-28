"use client";
import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

import { cn } from "@/shared/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  style,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn("relative h-16 overflow-hidden bg-transparent p-[1px] text-xl hover:cursor-pointer", containerClassName)}
      style={{ borderRadius }}
      {...otherProps}
    >
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div className={cn("w-30 h-20 bg-[radial-gradient(#ff5722_40%,transparent_60%)] opacity-[0.8]", borderClassName)} />
      </MovingBorder>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-orange-800 text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          ...style,
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        className="absolute h-full w-full"
        height="100%"
        preserveAspectRatio="none"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <rect fill="none" height="100%" ref={pathRef} rx={rx} ry={ry} width="100%" />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
