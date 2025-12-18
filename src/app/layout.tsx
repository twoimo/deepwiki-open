import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Fix for "localStorage.getItem is not a function" error on server side
if (typeof global !== 'undefined' && (global as any).localStorage) {
  try {
    if (typeof (global as any).localStorage.getItem !== 'function') {
      console.warn('Detected broken global.localStorage. Removing it to prevent errors.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).localStorage;
    }
  } catch (e) {
    console.error('Failed to patch global.localStorage:', e);
  }
}

// Japanese-friendly fonts
const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${notoSansJP.variable} ${notoSerifJP.variable} ${geistMono.variable} antialiased`}
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
