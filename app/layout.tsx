import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AdSenseScript from "./adsense-script"
import Script from "next/script"

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
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  return (
    <html lang="en">
      {/* <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
        )}
      </head> */}
      <head>
        {/*
          Google AdSense Auto Ads Script
          Only loads if the publisher ID is available.
          Using 'afterInteractive' strategy for optimal performance.
        */}
        {adsensePublisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive" // Loads after the page is interactive
          />
        )}
      </head>

      <body className={inter.className}>
        <AdSenseScript />
        {children}
      </body>
    </html>
  )
}
