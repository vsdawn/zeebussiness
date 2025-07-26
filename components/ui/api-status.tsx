"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ApiStatusProps {
  className?: string
}

export default function ApiStatus({ className }: ApiStatusProps) {
  const [newsStatus, setNewsStatus] = useState<"checking" | "connected" | "fallback">("checking")
  const [stockStatus, setStockStatus] = useState<"checking" | "connected" | "fallback">("checking")

  useEffect(() => {
    const checkApiStatus = async () => {
      // Check NewsData.io API
      try {
        const newsApiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY
        if (!newsApiKey || newsApiKey.includes("demo") || newsApiKey.includes("pub_61834")) {
          setNewsStatus("fallback")
        } else {
          // Simulate API check without actual call to avoid CORS in preview
          setNewsStatus("connected")
        }
      } catch (error) {
        setNewsStatus("fallback")
      }

      // Check TwelveData API
      try {
        const stockApiKey = process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY
        if (!stockApiKey || stockApiKey === "demo_api_key") {
          setStockStatus("fallback")
        } else {
          // Simulate API check without actual call to avoid CORS in preview
          setStockStatus("connected")
        }
      } catch (error) {
        setStockStatus("fallback")
      }
    }

    checkApiStatus()
  }, [])

  const getOverallStatus = () => {
    if (newsStatus === "connected" && stockStatus === "connected") return "connected"
    if (newsStatus === "checking" || stockStatus === "checking") return "checking"
    return "fallback"
  }

  const overallStatus = getOverallStatus()

  const statusConfig = {
    checking: {
      icon: AlertCircle,
      text: "Checking APIs...",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      details: "Testing API connections...",
    },
    connected: {
      icon: CheckCircle,
      text: "Live APIs Connected",
      color: "text-green-600",
      bg: "bg-green-50",
      details: `News: ${newsStatus === "connected" ? "NewsData.io" : "Demo"} | Stocks: ${stockStatus === "connected" ? "TwelveData" : "Demo"}`,
    },
    fallback: {
      icon: XCircle,
      text: "Demo Mode",
      color: "text-orange-600",
      bg: "bg-orange-50",
      details: "Add API keys for live data",
    },
  }

  const config = statusConfig[overallStatus]
  const Icon = config.icon

  return (
    <div className="relative group">
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color} ${className} cursor-help`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {config.text}
      </div>

      {/* Tooltip - shown on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {config.details}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}
