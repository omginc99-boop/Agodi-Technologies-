import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import IntroGate from "@/components/IntroGate";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agodi Technologies — Building the Digital Infrastructure for the Next Billion People",
  description:
    "Agodi Technologies builds foundational digital infrastructure for identity, trust, work, commerce, education, and entertainment across Africa and beyond.",
  keywords: [
    "Agodi Technologies",
    "African technology",
    "AI",
    "digital ecosystems",
    "PlayOlu",
    "Oluwami Oladeji",
  ],
  openGraph: {
    title: "Agodi Technologies — Building the Digital Infrastructure for the Next Billion People",
    description:
      "African-born digital technology company building globally scalable platforms in AI, entertainment, education, and gaming.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agodi Technologies — Building the Digital Infrastructure for the Next Billion People",
    description:
      "African-born digital technology company building globally scalable platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased min-h-screen">
        <IntroGate />
        {children}
      </body>
    </html>
  );
}
