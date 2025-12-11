import type { ReactElement } from "react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: {
      default: 'title',
      template: `%s | title`,
    },
    description: 'description',
    keywords: 'keywords',
    applicationName: 'fitup',
    manifest: "/manifest.json",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      title: 'title',
      description: 'description',
      siteName: 'title',
      type: "website",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: 'title',
    },
  };
}

export const preferredRegion = ["fra1", "sfo1", "iad1"];

interface RootLayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}

export default async function RootLayout({ params, children }: RootLayoutProps) {
  const { locale } = await params;
  return (
    <>
      <html className="h-full" dir="ltr" lang={locale} suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta content="width=device-width, initial-scale=1, maximum-scale=1 viewport-fit=cover" name="viewport" />

          {/* PWA Meta Tags */}
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="default" name="apple-mobile-web-app-status-bar-style" />
          <meta content="Workout Cool" name="apple-mobile-web-app-title" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#FF5722" name="msapplication-TileColor" />

          {/* Theme color for PWA */}
          <meta content="#FF5722" name="theme-color" />
        </head>

        <body
          suppressHydrationWarning
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-start gap-4 w-full">
              {children}
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
