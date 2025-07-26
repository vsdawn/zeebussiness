"use client"

import { useState, useEffect } from "react"
import StockWidget from "./stock-widget"
import StockChart from "./stock-chart"
import StockNews from "./stock-news"
import AdSpace from "../ui/ad-space"

interface StockDetailProps {
  symbol: string
}

export default function StockDetail({ symbol }: StockDetailProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [symbol])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{symbol.split(".")[0]} Stock Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <StockChart symbol={symbol} />
          </div>

          {/* Ad Space */}
          <AdSpace height="h-24" type="display" slot="1234567890" />

          {/* News */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <StockNews symbol={symbol} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stock Widget */}
          <StockWidget symbol={symbol} expanded />

          {/* Ad Space */}
          <AdSpace height="h-64" type="display" slot="2345678901" />
        </div>
      </div>
    </div>
  )
}
