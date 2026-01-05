"use client";

import { I18nProviderClient } from "locales/client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const queryClient = new QueryClient();

export const Providers = ({ children, locale }: PropsWithChildren<{ locale: string }>) => {
  return (
    <>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <I18nProviderClient locale={locale}>
            {children}
          </I18nProviderClient>
        </QueryClientProvider>
      </NuqsAdapter>
    </>
  )
}