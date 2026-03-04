import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-lg px-3.5 py-3 font-medium leading-tight text-black shadow-3xl outline-none placeholder:font-medium placeholder:text-gray-500/70 focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50 dark:bg-black-dark dark:bg-white/5 dark:text-white dark:shadow-sm dark:ring-1 dark:ring-white/10 dark:placeholder:text-gray-500 focus:dark:ring-white",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
