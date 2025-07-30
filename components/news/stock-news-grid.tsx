"use client"

import NewsCard from "./news-card"
import StockWidget from "../stock/stock-widget"
import MarketIndices from "../stock/market-indices"
import AdSpace from "../ui/ad-space"
import type { NewsDataArticle } from "@/lib/news-api"

interface StockNewsGridProps {
  articles: NewsDataArticle[]
}

const topStocks = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE", "INFY.BSE"]

export default function StockNewsGrid({ articles }: StockNewsGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Stock News Available</h2>
        <p className="text-gray-600">Stock market news will appear here when available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Indian Stock Market News</h1>
          <p className="text-gray-600">Latest updates from NSE, BSE and Indian stock markets</p>
          <div className="mt-2 text-sm text-gray-500">{articles.length} articles • Powered by NewsData.io</div>
        </div>

        {/* Top Ad Space */}
        <AdSpace className="mb-8" height="h-24" type="display" slot="1234567890" />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div key={article.article_id}>
              <NewsCard article={article} />
              {/* Insert ad after every 4 articles */}
              {(index + 1) % 4 === 0 && index !== articles.length - 1 && (
                <div className="col-span-full mt-6 mb-6">
                  <AdSpace height="h-32" type="in-article" slot="4567890123" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Market Indices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Indices</h2>
            <MarketIndices />
          </div>

          {/* Ad Space */}
          <AdSpace height="h-64" type="display" slot="2345678901" />

          {/* Top Stocks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Stocks</h2>
            <div className="space-y-4">
              {topStocks.map((symbol) => (
                <StockWidget key={symbol} symbol={symbol} />
              ))}
            </div>
          </div>

          {/* Another Ad Space */}
          <AdSpace height="h-48" type="display" slot="2345678901" />

          {/* Share Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Market News</h3>
            <p className="text-gray-600 text-sm mb-4">
              Stay connected and share the latest stock market updates with your network
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    const shareText = `Check out the latest Indian stock market news on TheNewsHive!\n\n${window.location.href}`
                    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span className="text-sm">WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
