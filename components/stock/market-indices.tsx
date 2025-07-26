"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, RefreshCw, Clock } from "lucide-react"
import { fetchMarketIndices, type MarketIndicesData } from "@/lib/stock-api"

export default function MarketIndices() {
  const [indexData, setIndexData] = useState<MarketIndicesData>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchMarketIndices()
      setIndexData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to load market indices:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // Refresh every 2 minutes during market hours, every 5 minutes otherwise
    const isMarketOpen = indexData.some((index) => index.isMarketOpen)
    const interval = isMarketOpen ? 120000 : 300000
    const refreshInterval = setInterval(loadData, interval)
    return () => clearInterval(refreshInterval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {indexData.some((index) => index.isMarketOpen) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              MARKET OPEN
            </span>
          )}
        </div>
        <button onClick={loadData} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Refresh indices">
          <RefreshCw className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {indexData.map((index) => {
        const isPositive = Number(index.changePercent) >= 0
        const changeColor = isPositive ? "text-green-600" : "text-red-600"

        return (
          <div key={index.symbol} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{index.name}</h4>
              <p className="text-lg font-bold text-gray-900">{Number(index.value).toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                {isPositive ? "+" : ""}₹{Math.abs(Number(index.change)).toFixed(2)}
              </p>
            </div>
            <div className={`flex items-center ${changeColor} text-sm font-medium`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {isPositive ? "+" : ""}
              {Number(index.changePercent).toFixed(2)}%
            </div>
          </div>
        )
      })}

      {lastUpdated && (
        <div className="flex items-center justify-center text-xs text-gray-500 pt-2">
          <Clock className="w-3 h-3 mr-1" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}
