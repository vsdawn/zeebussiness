"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, TrendingDown, RefreshCw, Clock } from "lucide-react"
import { fetchStockData, type StockData } from "@/lib/stock-api"

interface StockWidgetProps {
  symbol: string
  expanded?: boolean
}

export default function StockWidget({ symbol, expanded = false }: StockWidgetProps) {
  const [stock, setStock] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchStockData(symbol)
      setStock(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError("Failed to load stock data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // Refresh every 2 minutes during market hours, every 5 minutes otherwise
    const interval = stock?.is_market_open ? 120000 : 300000
    const refreshInterval = setInterval(loadData, interval)
    return () => clearInterval(refreshInterval)
  }, [symbol])

  if (loading) {
    return (
      <div className="stock-widget animate-pulse">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-8"></div>
        </div>
        <div className="flex justify-between items-end">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    )
  }

  if (error || !stock) {
    return (
      <div className="stock-widget">
        <div className="text-center text-gray-500 text-sm">
          <RefreshCw className="w-4 h-4 mx-auto mb-1" />
          {error || "No data available"}
          <button onClick={loadData} className="block mx-auto mt-2 text-blue-600 hover:text-blue-700 text-xs">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const isPositive = Number(stock.percent_change) >= 0
  const displaySymbol = stock.symbol.split(".")[0]
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const bgColor = isPositive ? "bg-green-100" : "bg-red-100"

  return (
    <Link href={`/stocks/${displaySymbol}`} className="block">
      <div className="stock-widget hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{displaySymbol}</h3>
              {stock.is_market_open && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  LIVE
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 truncate">{stock.name}</p>
            <p className="text-xs text-gray-500">{stock.exchange}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              loadData()
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-xl font-bold text-gray-900">
              {stock.currency === "INR" ? "₹" : "$"}
              {Number(stock.close).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              {isPositive ? "+" : ""}
              {stock.currency === "INR" ? "₹" : "$"}
              {Math.abs(Number(stock.change)).toFixed(2)}
            </p>
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${bgColor} ${changeColor}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {isPositive ? "+" : ""}
            {Number(stock.percent_change).toFixed(2)}%
          </div>
        </div>

        {lastUpdated && (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Clock className="w-3 h-3 mr-1" />
            Updated {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-gray-500">Open</p>
                <p className="font-medium">
                  {stock.currency === "INR" ? "₹" : "$"}
                  {Number(stock.open).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">High</p>
                <p className="font-medium">
                  {stock.currency === "INR" ? "₹" : "$"}
                  {Number(stock.high).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Low</p>
                <p className="font-medium">
                  {stock.currency === "INR" ? "₹" : "$"}
                  {Number(stock.low).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Volume</p>
                <p className="font-medium">{Number(stock.volume).toLocaleString()}</p>
              </div>
            </div>

            {stock.fifty_two_week && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-700 mb-2">52 Week Range</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Low</p>
                    <p className="font-medium">
                      {stock.currency === "INR" ? "₹" : "$"}
                      {Number(stock.fifty_two_week.low).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">High</p>
                    <p className="font-medium">
                      {stock.currency === "INR" ? "₹" : "$"}
                      {Number(stock.fifty_two_week.high).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
