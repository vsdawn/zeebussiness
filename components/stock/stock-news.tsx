"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, Clock } from "lucide-react"

interface NewsItem {
  title: string
  url: string
  source: string
  date: string
}

interface StockNewsProps {
  symbol: string
}

export default function StockNews({ symbol }: StockNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Mock data
        const mockNews: NewsItem[] = [
          {
            title: `${symbol.split(".")[0]} reports strong quarterly earnings with 15% growth`,
            url: "#",
            source: "Economic Times",
            date: new Date().toLocaleDateString(),
          },
          {
            title: `Analysts raise target price for ${symbol.split(".")[0]} to ₹2,500`,
            url: "#",
            source: "Business Standard",
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
          },
          {
            title: `${symbol.split(".")[0]} announces new product launch in Q4`,
            url: "#",
            source: "Money Control",
            date: new Date(Date.now() - 172800000).toLocaleDateString(),
          },
          {
            title: `Institutional investors increase stake in ${symbol.split(".")[0]}`,
            url: "#",
            source: "Mint",
            date: new Date(Date.now() - 259200000).toLocaleDateString(),
          },
        ]

        setTimeout(() => {
          setNews(mockNews)
          setError(null)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to load news")
        setLoading(false)
      }
    }

    fetchNews()
  }, [symbol])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related News</h3>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item, index) => (
            <article key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                <Link href={item.url} target="_blank" rel="noopener" className="flex items-start">
                  <span className="flex-1">{item.title}</span>
                  <ExternalLink className="w-4 h-4 ml-2 mt-0.5 flex-shrink-0" />
                </Link>
              </h4>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">{item.source}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {item.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
