import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "@/shared/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuPrimitive.Root
      className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center transition-all", className)}
      dir="ltr"
      ref={ref}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
});
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    className={cn(
      "group flex flex-1 list-none flex-col justify-center gap-2.5 space-x-1 rounded-lg bg-white p-2 font-semibold shadow-3xl sm:flex-row sm:items-center sm:px-5 sm:py-3 dark:border dark:border-gray-300/20 dark:bg-black-dark dark:shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group flex w-full items-center justify-center rounded-lg p-2.5 text-sm/[18px] font-semibold data-[state=open]:bg-light-theme dark:data-[state=open]:bg-black data-[state=open]:text-black dark:data-[state=open]:text-white disabled:pointer-events-none disabled:opacity-50 hover:bg-light-theme transition dark:hover:bg-black dark:hover:text-white",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger className={cn(navigationMenuTriggerStyle(), "group relative", className)} ref={ref} {...props}>
    {children}{" "}
    <ChevronDown aria-hidden="true" className="relative top-[1px] size-[18px] group-data-[state=open]:duration-500 ltr:ml-1.5 rtl:mr-1.5" />
    <span className="group-data-[state=open]:zoom-in-90 group-data-[state=open]:after:absolute group-data-[state=open]:after:-bottom-[42px] group-data-[state=open]:after:right-2 group-data-[state=open]:after:hidden group-data-[state=open]:after:size-5 group-data-[state=open]:after:rotate-[36deg] group-data-[state=open]:after:skew-y-12 group-data-[state=open]:after:rounded-tl-md group-data-[state=open]:after:bg-white sm:group-data-[state=open]:after:block dark:group-data-[state=open]:after:bg-black-dark"></span>
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      "left-0 top-0 w-full min-w-max data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    ref={ref}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-1/2 top-full flex -translate-x-1/2 justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-4 h-[var(--radix-navigation-menu-viewport-height)] w-full min-w-max overflow-hidden rounded-lg bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] dark:bg-black-dark",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    ref={ref}
    {...props}
  >
    <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
