import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./_components/LanguageProvider";
import ThemeProvider from "./_components/ThemeProvider";
import { AuthProvider } from "./_components/AuthProvider";
import FloatingChatButtonGate from "./_components/FloatingChatButtonGate";

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
        <script
          // Set the theme before hydration so there's no flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("reloai_theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){}`,
          }}
        />
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
              <FloatingChatButtonGate />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
