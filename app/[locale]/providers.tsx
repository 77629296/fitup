import { I18nProviderClient } from "locales/client";
import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const Providers = ({ children, locale }: PropsWithChildren<{ locale: string }>) => {
  return (
    <>
      <NuqsAdapter>
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
      </NuqsAdapter>
    </>
  )
}