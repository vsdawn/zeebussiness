"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AdUnitProps {
  className?: string
  slot: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  style?: React.CSSProperties
  layout?: "in-article" | "display" | "feed"
  fullWidth?: boolean
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  className,
  slot,
  format = "auto",
  responsive = true,
  style,
  layout = "display",
  fullWidth = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [adError, setAdError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Get AdSense ID from environment variable
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-xxxxxxxxxxxxxxxx"

  useEffect(() => {
    setIsClient(true)

    // Don't load ads if no valid AdSense ID
    if (!adClient || adClient.includes("xxxxxxxx")) {
      setAdError(true)
      return
    }

    const loadAd = async () => {
      try {
        // Wait for adsbygoogle to be available
        let attempts = 0
        const maxAttempts = 50 // 5 seconds max wait

        const checkAdSense = () => {
          return new Promise<void>((resolve, reject) => {
            const check = () => {
              if (typeof window !== "undefined" && window.adsbygoogle) {
                resolve()
              } else if (attempts < maxAttempts) {
                attempts++
                setTimeout(check, 100)
              } else {
                reject(new Error("AdSense not loaded"))
              }
            }
            check()
          })
        }

        await checkAdSense()

        // Push the ad
        if (adRef.current && window.adsbygoogle) {
          window.adsbygoogle.push({})
          setAdLoaded(true)
        }
      } catch (error) {
        console.warn("Error loading ad:", error)
        setAdError(true)
      }
    }

    loadAd()
  }, [adClient])

  // Don't render anything on server
  if (!isClient) {
    return (
      <div
        className={cn(
          "bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm min-h-[100px]",
          fullWidth ? "w-full" : "",
          className,
        )}
        style={style}
      >
        Loading ad...
      </div>
    )
  }

  // Show error state or placeholder
  if (adError || !adClient || adClient.includes("xxxxxxxx")) {
    return (
      <div
        className={cn(
          "bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 text-sm min-h-[100px]",
          fullWidth ? "w-full" : "",
          className,
        )}
        style={style}
      >
        <span className="font-medium">Advertisement Space</span>
        <p className="text-xs mt-1">Add NEXT_PUBLIC_ADSENSE_ID for real ads</p>
      </div>
    )
  }

  // Determine ad attributes based on layout type
  const adAttributes: Record<string, any> = {
    "data-ad-client": adClient,
    "data-ad-slot": slot,
  }

  if (layout === "in-article") {
    adAttributes["data-ad-format"] = "fluid"
    adAttributes["data-ad-layout"] = "in-article"
  } else if (layout === "feed") {
    adAttributes["data-ad-format"] = "fluid"
    adAttributes["data-ad-layout-key"] = "-fb+5w+4e-db+86"
  } else {
    // Display ads
    if (responsive) {
      adAttributes["data-ad-format"] = format
      adAttributes["data-full-width-responsive"] = fullWidth ? "true" : "false"
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden min-h-[100px]",
        !adLoaded && "bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-sm",
        className,
      )}
      style={style}
    >
      {!adLoaded && <span>Advertisement</span>}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          minHeight: "100px",
        }}
        ref={adRef}
        {...adAttributes}
      />
    </div>
  )
}
