import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
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
  title: "Agodi Technologies — Engineering Africa's Digital Future",
  description:
    "Agodi Technologies is a next-generation African technology company building globally scalable digital ecosystems across AI, entertainment, education, gaming, and digital infrastructure.",
  keywords: [
    "Agodi Technologies",
    "African technology",
    "AI",
    "digital ecosystems",
    "PlayOlu",
    "Oluwami Oladeji",
  ],
  openGraph: {
    title: "Agodi Technologies — Engineering Africa's Digital Future",
    description:
      "African-born digital technology company building globally scalable platforms in AI, entertainment, education, and gaming.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agodi Technologies — Engineering Africa's Digital Future",
    description:
      "African-born digital technology company building globally scalable platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
