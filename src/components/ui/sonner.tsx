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
        classNames: {
          toast:
            "group overflow-hidden toast group-[.toaster]:bg-white group-[.toaster]:!border-0 group-[.toaster]:p-0 group-[.toaster]:block group-[.toaster]:text-foreground group-[.toaster]:shadow-3xl ",
          description: "group-[.toast]:text-black text-sm/tight",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "!text-black",
          closeButton:
            "text-black dark:text-white [&>svg]:size-[18px] border-0 hover:opacity-70 top-[22px] absolute rtl:left-2 ltr:right-2 ltr:ml-auto rtl:mr-auto",
        },
      }}
      {...props}
    />
  );
};

export { ToastSonner };
