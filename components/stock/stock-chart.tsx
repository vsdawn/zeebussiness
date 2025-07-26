"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { fetchStockTimeSeries, type TimeSeriesData } from "@/lib/stock-api"

interface StockChartProps {
  symbol: string
}

export default function StockChart({ symbol }: StockChartProps) {
  const [chartData, setChartData] = useState<TimeSeriesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<"1day" | "1week" | "1month">("1day")

  const loadChartData = async (interval = "1day") => {
    setLoading(true)
    try {
      const outputSize = interval === "1day" ? 30 : interval === "1week" ? 12 : 6
      const data = await fetchStockTimeSeries(symbol, interval, outputSize)
      setChartData(data)
      setError(null)
    } catch (err) {
      setError("Failed to load chart data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChartData(timeframe)
  }, [symbol, timeframe])

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Price Chart</h3>
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-96 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading chart...</div>
        </div>
      </div>
    )
  }

  if (error || !chartData) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Chart</h3>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mb-2">{error}</p>
            <button
              onClick={() => loadChartData(timeframe)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Calculate price change for the period
  const firstPrice = chartData.values[0]?.close || 0
  const lastPrice = chartData.values[chartData.values.length - 1]?.close || 0
  const priceChange = lastPrice - firstPrice
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0
  const isPositive = priceChange >= 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Price Chart</h3>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-sm text-gray-600">
              {chartData.meta.exchange} • {chartData.meta.currency}
            </span>
            <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {isPositive ? "+" : ""}
              {priceChangePercent.toFixed(2)}% ({timeframe})
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: "1day", label: "1D" },
              { key: "1week", label: "1W" },
              { key: "1month", label: "1M" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setTimeframe(option.key as any)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeframe === option.key ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => loadChartData(timeframe)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Refresh chart"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.values}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tick={{ fontSize: 12 }} />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#6b7280"
              fontSize={12}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke={isPositive ? "#059669" : "#dc2626"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: isPositive ? "#059669" : "#dc2626" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500">Period High</p>
          <p className="font-semibold">₹{Math.max(...chartData.values.map((v) => v.high)).toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500">Period Low</p>
          <p className="font-semibold">₹{Math.min(...chartData.values.map((v) => v.low)).toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500">Avg Volume</p>
          <p className="font-semibold">
            {(chartData.values.reduce((sum, v) => sum + v.volume, 0) / chartData.values.length).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-500">Data Points</p>
          <p className="font-semibold">{chartData.values.length}</p>
        </div>
      </div>
    </div>
  )
}
