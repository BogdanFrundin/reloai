import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./_components/LanguageProvider";
import { AuthProvider } from "./_components/AuthProvider";
import FloatingChatButton from "./_components/FloatingChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReloAI — Moving to Europe, simple",
  description:
    "ReloAI is your AI relocation assistant for moving to Europe. Visas, paperwork, housing, and banking — guided step by step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <LanguageProvider>
            {children}
            <FloatingChatButton />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
