import * as React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, XCircle, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        error:
          "border-red-500/50 bg-red-50/50 text-red-600 dark:border-red-500/30 dark:bg-red-900/30 dark:text-red-400 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        warning:
          "border-yellow-500/50 bg-yellow-50/50 text-yellow-700 dark:border-yellow-500/30 dark:bg-yellow-900/30 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        success:
          "border-green-500/50 bg-green-50/50 text-green-600 dark:border-green-500/30 dark:bg-green-900/30 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: "border-blue-500/50 bg-blue-50/50 text-blue-600 dark:border-blue-500/30 dark:bg-blue-900/30 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconMap: Record<string, LucideIcon> = {
  error: XCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  default: AlertCircle,
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  icon?: LucideIcon;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, icon: CustomIcon, ...props }, ref) => {
    const Icon = CustomIcon || iconMap[variant || "default"];

    return (
      <div className={cn(alertVariants({ variant }), className)} ref={ref} role="alert" {...props}>
        <Icon className="h-4 w-4" />
        {children}
      </div>
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} ref={ref} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div className={cn("text-sm [&_p]:leading-relaxed", className)} ref={ref} {...props} />,
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
