import * as React from "react";

import { cn } from "@/shared/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table className={cn("w-full caption-bottom text-sm", className)} ref={ref} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      className={cn(
        "[&_tr]:border-y [&_tr]:border-gray-300 [&_tr]:hover:bg-white dark:[&_tr]:border-gray dark:[&_tr]:bg-white/[6%] dark:[&_tr]:hover:bg-white/[6%]",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody className={cn("divide-y divide-gray-300 dark:divide-gray-300/10", className)} ref={ref} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot className={cn("bg-muted/50 font-medium", className)} ref={ref} {...props} />,
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    className={cn(
      "bg-white transition-colors hover:bg-gray-200 data-[state=selected]:bg-gray-200 dark:bg-black-dark dark:hover:bg-gray-200/10 dark:data-[state=selected]:bg-gray-200/10",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    className={cn(
      "whitespace-nowrap p-4 align-middle text-xs/tight font-medium ltr:text-left ltr:first:pl-5 ltr:last:pr-5 rtl:text-right rtl:first:pr-5 rtl:last:pl-5 [&:has([role=checkbox])]:w-0 ltr:[&:has([role=checkbox])]:pr-0 rtl:[&:has([role=checkbox])]:pl-0",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td
    className={cn(
      "whitespace-nowrap px-4 py-3.5 align-middle text-xs/tight font-medium text-black last:text-right ltr:first:pl-5 ltr:last:pr-5 rtl:first:pr-5 rtl:last:pl-5 dark:text-white ltr:[&:has([role=checkbox])]:pr-0 rtl:[&:has([role=checkbox])]:pl-0",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption className={cn("text-muted-foreground mt-4 text-sm", className)} ref={ref} {...props} />,
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
