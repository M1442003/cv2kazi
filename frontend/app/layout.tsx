import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CV2Kazi — From good CV to getting a job",
    template: "%s · CV2Kazi",
  },
  description:
    "Free AI-powered CV feedback for the Tanzanian job market. Analyze, improve, and build your CV — from good CV to getting a job.",
  applicationName: "CV2Kazi",
  keywords: [
    "CV",
    "kazi",
    "ajira",
    "Tanzania",
    "jobs",
    "AI",
    "CV2Kazi",
    "CV analyzer",
    "CV review",
    "career",
  ],
  authors: [{ name: "CV2Kazi" }],
  creator: "CV2Kazi",
  metadataBase: new URL("https://cv2kazi.tz"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "CV2Kazi — From good CV to getting a job",
    description:
      "Free AI-powered CV feedback for the Tanzanian job market.",
    url: "https://cv2kazi.tz",
    siteName: "CV2Kazi",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CV2Kazi — From good CV to getting a job",
      },
    ],
    locale: "en_TZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV2Kazi — From good CV to getting a job",
    description:
      "Free AI-powered CV feedback for Tanzania. 🇹🇿",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-brand-cream text-slate-900">
        {children}
      </body>
    </html>
  );
}