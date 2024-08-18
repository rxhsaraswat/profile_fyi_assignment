import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import ClientRoot from "./ClientRoot";
import AppInitializer from "./AppInitializer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile FYI Assignment",
  description: "Assignment submission by Rishabh Saraswat (@rxhsaraswat)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRoot>
          <AppInitializer>
            <Navbar />
            <main className="pointer-events-auto">
              <Toaster position="top-right" />
              {children}
            </main>
          </AppInitializer>
        </ClientRoot>
      </body>
    </html>
  );
}
