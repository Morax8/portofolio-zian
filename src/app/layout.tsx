import type { Metadata } from "next";
import { Kanit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityazianur.dev"),
  title: "Aditya Zianur — Full-Stack Developer & R&D Lead",
  description:
    "Informatics student at UMN (Class of 2028), Head of R&D Division at HMIF. Full-stack developer specialising in Next.js, Laravel, and real-time web systems.",
  keywords: [
    "Aditya Zianur",
    "full-stack developer",
    "Next.js",
    "Laravel",
    "HMIF UMN",
    "portfolio",
    "web developer Indonesia",
  ],
  authors: [{ name: "Aditya Zianur" }],
  openGraph: {
    type: "website",
    title: "Aditya Zianur — Full-Stack Developer & R&D Lead",
    description:
      "Informatics student at UMN, Head of R&D at HMIF. Building fast, shipping clean, and breaking things — on purpose.",
    siteName: "Aditya Zianur",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aditya Zianur — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Zianur — Full-Stack Developer & R&D Lead",
    description:
      "Informatics student at UMN, Head of R&D at HMIF. Building fast, shipping clean, and breaking things — on purpose.",
    images: ["/og.png"],
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
      className={`${kanit.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
