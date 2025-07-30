import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AdSenseScript from "./adsense-script"
import ScrollIndicator from "@/components/ui/scroll-indicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZeeBussiness - Latest Business News & Stock Market Updates",
  description:
    "Stay updated with the latest business news, technology updates, sports coverage, politics, and Indian stock market trends. Your trusted source for comprehensive news coverage.",
  keywords: [
    "business news",
    "stock market",
    "technology",
    "sports",
    "politics",
    "India",
    "NSE",
    "BSE",
    "Sensex",
    "Nifty",
  ],
  authors: [{ name: "ZeeBussiness" }],
  creator: "ZeeBussiness",
  publisher: "ZeeBussiness",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zeebussiness.com",
    title: "ZeeBussiness - Latest Business News & Stock Market Updates",
    description:
      "Stay updated with the latest business news, technology updates, sports coverage, politics, and Indian stock market trends.",
    siteName: "ZeeBussiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeeBussiness - Latest Business News & Stock Market Updates",
    description:
      "Stay updated with the latest business news, technology updates, sports coverage, politics, and Indian stock market trends.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* AdSense verification meta tag */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
        )}
      </head>
      <body className={inter.className}>
        <AdSenseScript />
        <ScrollIndicator />
        {children}
      </body>
    </html>
  )
}
