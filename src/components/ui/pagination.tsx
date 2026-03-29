import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="pagination" className={cn("mx-auto flex w-full justify-end", className)} role="navigation" {...props} />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul
    className={cn("flex flex-row items-center overflow-hidden rounded-lg bg-white shadow-sm dark:bg-black-dark", className)}
    ref={ref}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li className={cn("", className)} ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,

  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "grid size-[30px] place-content-center !rounded-none text-xs text-[#707079] !shadow-none !ring-0 hover:!border-x hover:border-gray-300 dark:border-gray-300/20 dark:hover:border-gray-300/20",
      buttonVariants({
        variant: isActive ? "outline-general" : "outline-general",
      }),
      className,
      isActive &&
        "border-x border-gray-300 bg-[#F7F7F8] text-black hover:bg-[#F7F7F8] dark:border-gray-300/20 dark:bg-black dark:text-white dark:hover:bg-black",
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      "gap-1 rounded-l-lg border-r border-gray-300 pl-2.5 hover:!border-l-0",
      className,
      disabled && "pointer-events-none cursor-not-allowed opacity-50",
    )}
    size="default"
    {...props}
  >
    <ChevronLeft className="size-4 text-black rtl:rotate-180 dark:text-white" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      "gap-1 rounded-r-lg border-l border-gray-300 pr-2.5 hover:!border-r-0",
      className,
      disabled && "pointer-events-none cursor-not-allowed opacity-50",
    )}
    size="default"
    {...props}
  >
    <ChevronRight className="size-4 text-black rtl:rotate-180 dark:text-white" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
