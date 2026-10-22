import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Cairo } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { QueryProvider } from "@/components/QueryProvider";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const arabic = Cairo({ subsets: ["arabic", "latin"], variable: "--font-arabic", display: "swap" });

const description =
  "ENDEVOR is an independent digital studio. We combine strategy, design and development to create digital products and experiences that help modern businesses grow, scale and stand out.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "ENDEVOR | Digital Studio",
  description,
  applicationName: "ENDEVOR",
  authors: [{ name: "ENDEVOR" }],
  creator: "ENDEVOR",
  publisher: "ENDEVOR",
  category: "technology",
  keywords: ["ENDEVOR", "digital studio", "web design", "web development", "product design", "UI UX design", "digital products"],
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "ENDEVOR", title: "ENDEVOR | Digital Studio", description },
  twitter: { card: "summary_large_image", title: "ENDEVOR | Digital Studio", description },
    icons: {
    icon: "https://res.cloudinary.com/dsnbjtkts/image/upload/v1792489891/2_yrjkp5.png",
    apple: "https://res.cloudinary.com/dsnbjtkts/image/upload/v1792489891/2_yrjkp5.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfbfb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${sans.variable} ${display.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <QueryProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
