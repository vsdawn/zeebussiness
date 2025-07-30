"use client"

import { ScrollPositionManager } from "@/lib/scroll-manger"
import { useEffect, useRef } from "react"

export function useScrollPosition() {
  const elementRef = useRef<HTMLElement>(null)

  const savePosition = () => {
    if (elementRef.current) {
      ScrollPositionManager.savePosition(elementRef.current)
    }
  }

  const restorePosition = () => {
    ScrollPositionManager.restorePosition()
  }

  // Auto-restore position on component mount if there's a stored position
  useEffect(() => {
    if (ScrollPositionManager.hasStoredPosition()) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        ScrollPositionManager.restorePosition()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  return {
    elementRef,
    savePosition,
    restorePosition,
  }
}
