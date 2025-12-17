import * as React from 'react';;
import { cn } from "@/shared/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={cn("rounded-lg bg-white shadow-3xl dark:bg-black-dark dark:shadow-sm", className)} ref={ref} {...props} />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={cn("", className)} ref={ref} {...props} ></div>
))
CardContent.displayName = "CardContent";

export { Card, CardContent, };