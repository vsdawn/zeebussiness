"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import NewsGrid from "@/components/news/news-grid"
import LoadingSpinner from "@/components/ui/loading-spinner"
import AdSpace from "@/components/ui/ad-space"
import { fetchNews, type NewsDataArticle } from "@/lib/news-api"

export default function HomePage() {
  const [articles, setArticles] = useState<NewsDataArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const newsData = await fetchNews("business")
        setArticles(newsData)
      } catch (err) {
        console.error("Failed to load business news:", err)
        setError("Failed to load news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentCategory="business" />
      <main className="container-custom py-8">
        {/* Hero Section for Homepage */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-gradient">ZeeBussiness</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Your trusted source for the latest business news, stock market updates, technology trends, sports coverage,
            and political developments
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Live Market Data
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Real-time News
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Expert Analysis
            </span>
          </div>
        </div>

        {/* Top Ad Space */}
        <AdSpace className="mb-8" height="h-24" type="display" slot="1234567890" />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load News</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div>
            {/* Featured Business News Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Business News</h2>
                <a href="/business" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View All Business News
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <NewsGrid articles={articles} category="business" isHomepage={true} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
