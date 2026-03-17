import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Swap out Geist for your custom tech fonts
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// 2. Upgraded Metadata for LinkedIn/Twitter previews
export const metadata: Metadata = {
  title: "Henri Jenoudet | Portfolio",
  description: "Growth Marketing Analyst & Data Science Researcher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Force "dark" mode and set the global background color immediately
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#030303] text-zinc-300 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}