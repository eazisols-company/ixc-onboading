import type { Metadata } from "next";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";
import DebugPanel from "@/components/DebugPanel";

export const metadata: Metadata = {
  title: "IncoXchange - Onboarding",
  description: "Get started with IncoXchange finance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: 'Mona Sans, sans-serif' }} suppressHydrationWarning>
        <ThemeProvider>
          <UserProvider>
            {children}
            <DebugPanel />
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
