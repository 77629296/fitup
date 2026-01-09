"use client";
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
  "shadow-3xl relative w-full rounded-lg px-3.5 py-2.5 text-sm/[10px] font-medium text-black dark:text-white outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-1 focus:ring-black disabled:pointer-events-none disabled:opacity-30 ltr:text-left rtl:text-right",
  {
    variants: {
      variant: {
        default: "",
        Search: "border border-gray-300 py-[7px] pl-8 pr-2 text-xs shadow-sm placeholder:text-black dark:placeholder:text-white",
        "input-form":
          "pr-9 outline-offset-0 focus:outline-[4px] focus:outline-primary/20 focus:ring-1 focus:ring-primary dark:focus:ring-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  small?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, asChild = false, small = false, iconLeft = null, iconRight = null, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    const [fieldType, setFieldType] = React.useState(type);
    const isIconLeft = iconLeft ? "rtl:pr-9 ltr:pl-9" : "";
    const isIconRight = iconLeft ? "rtl:pl-9 ltr:pr-9" : "";

    return (
      <div className="relative">
        <Comp
          className={cn(
            inputVariants({
              variant,
              className,
            }),
            isIconLeft,
            isIconRight,
          )}
          ref={ref}
          type={fieldType}
          {...props}
        />
        {!!iconLeft && (
          <span
            className={cn(
              "text-grey peer-focus:text-dark pointer-events-none absolute top-0 flex h-9 w-9 items-center justify-center ltr:left-0 rtl:right-0",
              small ? "h-[30px] w-[30px]" : "h-9 w-9",
            )}
          >
            {iconLeft}
          </span>
        )}

        {!!iconRight && (
          <span
            className={cn(
              "text-grey peer-focus:text-dark pointer-events-none absolute top-0 flex items-center justify-center ltr:right-0 rtl:left-0",
              small ? "h-[30px] w-[30px]" : "h-9 w-9",
            )}
          >
            {iconRight}
          </span>
        )}

        {type === "password" && (
          <button
            className="text-grey peer-focus:text-dark absolute top-0 flex h-9 w-9 items-center justify-center ltr:right-0 rtl:left-0"
            onClick={() => setFieldType(fieldType === "password" ? "text" : "password")}
            tabIndex={-1}
            type="button"
          >
            {fieldType === "password" ? <EyeIcon height={18} width={18} /> : <EyeOffIcon className="text-grey" height={18} width={18} />}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
