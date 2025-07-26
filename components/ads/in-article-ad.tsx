import AdUnit from "./ad-unit"
import { cn } from "@/lib/utils"

interface InArticleAdProps {
  className?: string
  slot: string
}

export default function InArticleAd({ className, slot }: InArticleAdProps) {
  return (
    <AdUnit
      slot={slot}
      className={cn("my-6 py-4", className)}
      layout="in-article"
      responsive={true}
      style={{ minHeight: "200px" }}
    />
  )
}
