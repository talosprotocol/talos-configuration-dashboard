import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Talos Security Console",
  description: "Unified Commerce Protocol (UCP) policy and transaction management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "font-sans antialiased bg-slate-950 text-slate-100 min-h-screen flex"
        )}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
