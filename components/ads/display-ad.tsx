import AdUnit from "./ad-unit"
import { cn } from "@/lib/utils"

interface DisplayAdProps {
  className?: string
  slot: string
  height?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
}

export default function DisplayAd({ className, slot, height = "h-60", format = "auto" }: DisplayAdProps) {
  return (
    <AdUnit
      slot={slot}
      format={format}
      className={cn("rounded-lg", height, className)}
      layout="display"
      responsive={true}
    />
  )
}
