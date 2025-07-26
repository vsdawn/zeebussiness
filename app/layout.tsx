import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AdSenseScript from "./adsense-script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZeeBussiness - Latest News & Stock Market Updates",
  description:
    "Stay updated with the latest news in business, technology, sports, politics and Indian stock market trends.",
  keywords: ["news", "stock market", "business", "technology", "sports", "politics", "India"],
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
    url: "https://zeeBussiness.com",
    title: "ZeeBussiness - Latest News & Stock Market Updates",
    description:
      "Stay updated with the latest news in business, technology, sports, politics and Indian stock market trends.",
    siteName: "ZeeBussiness",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeeBussiness - Latest News & Stock Market Updates",
    description:
      "Stay updated with the latest news in business, technology, sports, politics and Indian stock market trends.",
  },
    generator: 'v0.dev'
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
        {children}
      </body>
    </html>
  )
}
