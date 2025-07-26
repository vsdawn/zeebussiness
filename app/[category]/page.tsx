"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import NewsGrid from "@/components/news/news-grid"
import StockNewsGrid from "@/components/news/stock-news-grid"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { fetchNews, type NewsDataArticle } from "@/lib/news-api"

const categories = ["business", "sports", "technology", "world", "politics", "indian-stocks"]

export default function CategoryPage() {
  const params = useParams()
  const category = (params?.category as string) || "business"
  const [articles, setArticles] = useState<NewsDataArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categories.includes(category)) {
      setError("Invalid category")
      setLoading(false)
      return
    }

    const loadNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const newsData = await fetchNews(category)
        setArticles(newsData)
      } catch (err) {
        console.error("Failed to load news:", err)
        setError("Failed to load news. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [category])

  if (!categories.includes(category)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentCategory={category} />
        <main className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600">The requested category does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentCategory={category} />
      <main className="container-custom py-8">
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
        ) : category === "indian-stocks" ? (
          <StockNewsGrid articles={articles} />
        ) : (
          <NewsGrid articles={articles} category={category} />
        )}
      </main>
      <Footer />
    </div>
  )
}
