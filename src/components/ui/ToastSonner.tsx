"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const ToastSonner = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      closeButton={true}
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            "group overflow-visible toast group-[.toaster]:bg-white group-[.toaster]:!border-0 group-[.toaster]:p-0 group-[.toaster]:block group-[.toaster]:text-foreground group-[.toaster]:shadow-3xl ",
          description: "group-[.toast]:text-black text-sm/tight",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "!text-black",
          closeButton:
            "text-black dark:text-white [&>svg]:size-[15px] border-0 hover:opacity-70 !top-[12px]  absolute  ml-auto [--toast-close-button-end:2px] ",
        },
      }}
      {...props}
    />
  );
};

export { ToastSonner };
