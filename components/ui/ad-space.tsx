"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import DisplayAd from "../ads/display-ad"
import InArticleAd from "../ads/in-article-ad"
import FeedAd from "../ads/feed-ad"

interface AdSpaceProps {
  className?: string
  height?: string
  type?: "display" | "in-article" | "feed"
  slot?: string
}

// Ad slot IDs - replace these with your actual AdSense slot IDs
const AD_SLOTS = {
  display: {
    header: "1234567890",
    sidebar: "2345678901",
    footer: "3456789012",
  },
  inArticle: {
    news: "4567890123",
    stocks: "5678901234",
  },
  feed: {
    newsList: "6789012345",
    stocksList: "7890123456",
  },
}

export default function AdSpace({ className, height = "h-32", type = "display", slot }: AdSpaceProps) {
  const [isClient, setIsClient] = useState(false)
  const [adSlot, setAdSlot] = useState("")

  useEffect(() => {
    setIsClient(true)

    // Determine which slot to use
    if (slot) {
      setAdSlot(slot)
    } else {
      // Default slots based on type
      if (type === "display") {
        setAdSlot(AD_SLOTS.display.sidebar)
      } else if (type === "in-article") {
        setAdSlot(AD_SLOTS.inArticle.news)
      } else {
        setAdSlot(AD_SLOTS.feed.newsList)
      }
    }
  }, [type, slot])

  // Show placeholder on server
  if (!isClient) {
    return (
      <div className={cn("ad-space", height, className)}>
        <span className="font-medium">Advertisement</span>
        <p className="text-xs mt-1">Ad loading...</p>
      </div>
    )
  }

  // Check if AdSense ID is available
  const hasAdSenseId = Boolean(
    process.env.NEXT_PUBLIC_ADSENSE_ID && !process.env.NEXT_PUBLIC_ADSENSE_ID.includes("xxxxxxxx"),
  )

  // Show placeholder if no AdSense ID
  if (!hasAdSenseId) {
    return (
      <div className={cn("ad-space", height, className)}>
        <span className="font-medium">Advertisement Space</span>
        <p className="text-xs mt-1">Add NEXT_PUBLIC_ADSENSE_ID to show real ads</p>
      </div>
    )
  }

  // Render appropriate ad type
  if (type === "in-article") {
    return <InArticleAd slot={adSlot} className={className} />
  } else if (type === "feed") {
    return <FeedAd slot={adSlot} className={className} />
  } else {
    return <DisplayAd slot={adSlot} height={height} className={className} />
  }
}
