import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HealthGuard | Compliance Triage",
  description: "Operational compliance triage dashboard for medical facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-slate-50 font-sans antialiased`}>
        <TooltipProvider>
          <div className="flex min-h-screen bg-slate-900">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col bg-slate-50">
              <TopBar />
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-6 py-6">{children}</div>
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
