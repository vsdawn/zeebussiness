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
        </div>
      </div>
    </div>
  )
}
