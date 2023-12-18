import type { Metadata } from "next";
import { Epilogue, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/lib/constant";
import { Analytics } from "@vercel/analytics/react";

const inter = Epilogue({
  subsets: ["latin"],
});

const meta = {
  title: `Atharfaz`,
  description:
    "Frontend Developer  || React JS Enthusiast || TypeScript Addict",
  images: `/static/athar.jpg`,
};

export const metadata: Metadata = {
  metadataBase: new URL(`${BASE_URL}`),
  icons: {
    icon: [
      "/static/favicon_io/android-chrome-512x512.png",
      "/static/favicon_io/android-chrome-192x192.png",
    ],
    apple: ["/static/favicon_io/apple-touch-icon.png"],
    shortcut: ["/static/favicon_io/android-chrome-512x512.png"],
  },
  title: {
    default: meta.title,
    template: "%s | AtharFaz",
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    locale: "id",
    siteName: meta.title,
    type: "website",
    images: [
      {
        url: meta.images,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.images,
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${BASE_URL}/id`,
  },
  verification: {
    google: `google-site-verification=${process.env.GOOGLE_ID}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
            <main
              className={cn(
                "min-h-screen w-full",
                "bg-gradient-to-tr from-primary/70 to-background dark:from-primary/70 dark:via-background dark:to-background",
                "text-foreground"
              )}
            >
              <div
                className={cn(
                  "mx-auto",
                  "xs:max-w-xl sm:max-w-xl md:max-w-2xl lg:max-w-7xl h-full",
                  "bg-accent",
                  "p-5"
                )}
              >
                <Navbar></Navbar>
                <div className="px-3 md:px-4 lg:px-12 pb-16 pt-40">
                  {children}
                </div>
                <Footer></Footer>
              </div>
            </main>
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  );
}
