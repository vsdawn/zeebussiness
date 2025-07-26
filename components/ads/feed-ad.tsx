import AdUnit from "./ad-unit"
import { cn } from "@/lib/utils"

interface FeedAdProps {
  className?: string
  slot: string
}

export default function FeedAd({ className, slot }: FeedAdProps) {
  return (
    <AdUnit
      slot={slot}
      className={cn("my-4", className)}
      layout="feed"
      responsive={true}
      style={{ minHeight: "200px" }}
    />
  )
}
