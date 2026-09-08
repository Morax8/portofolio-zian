import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityazianur.dev"),
  title: {
    default: "Aditya Zianur // Full-Stack Engineer & ML Researcher",
    template: "%s // Aditya Zianur",
  },
  description:
    "Head of R&D @ HMIF XVI UMN and Lab Supervisor. I build fast, ship clean, and break things on purpose — full-stack web development and applied machine learning.",
  keywords: [
    "Aditya Zianur",
    "Full-Stack Developer",
    "Next.js",
    "Machine Learning",
    "HMIF UMN",
    "Informatika UMN",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Aditya Zianur" }],
  creator: "Aditya Zianur",
  openGraph: {
    type: "website",
    title: "Aditya Zianur // Full-Stack Engineer & ML Researcher",
    description:
      "Head of R&D @ HMIF XVI UMN and Lab Supervisor. Full-stack web development and applied machine learning.",
    siteName: "Aditya Zianur",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Zianur // Full-Stack Engineer & ML Researcher",
    description:
      "Head of R&D @ HMIF XVI UMN and Lab Supervisor. Full-stack web development and applied machine learning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-void font-sans text-metal-grey selection:bg-crimson selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
