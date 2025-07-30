"use client"

import { ScrollPositionManager } from "@/lib/scroll-manger"
import { useState, useEffect } from "react"

export default function ScrollIndicator() {
  const [isRestoring, setIsRestoring] = useState(false)

  useEffect(() => {
    // Check if we have a stored position on mount
    if (ScrollPositionManager.hasStoredPosition()) {
      setIsRestoring(true)

      // Hide indicator after restoration
      const timer = setTimeout(() => {
        setIsRestoring(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!isRestoring) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Returning to your article...</span>
      </div>
    </div>
  )
}
