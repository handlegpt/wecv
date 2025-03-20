import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import "./globals.css";
import "./font.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "We CV - AI Driven Resume Editor",
  description: "We CV is an open source resume editor, free, privacy-first. No registration required, all data stored locally, support data backup and export, ensuring your resume data is always available.",
  metadataBase: new URL("https://magicv.art"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
