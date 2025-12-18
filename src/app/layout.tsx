import type { Metadata } from "next";
import { Noto_Sans_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Fix for "localStorage.getItem is not a function" error on server side
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof global !== 'undefined' && (global as any).localStorage) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (global as any).localStorage.getItem !== 'function') {
      console.warn('Detected broken global.localStorage. Removing it to prevent errors.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).localStorage;
    }
  } catch (e) {
    console.error('Failed to patch global.localStorage:', e);
  }
}

// Japanese-friendly fonts with preload disabled to avoid unused preload warnings
const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Deepwiki Open Source | Sheing Ng",
  description: "Created by Sheing Ng",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSansJP.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey={undefined}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
