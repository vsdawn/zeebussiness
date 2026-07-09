"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Share2 } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AdSpace from "@/components/ui/ad-space"
import MarketIndices from "@/components/stock/market-indices"
import StockWidget from "@/components/stock/stock-widget"
import { fetchNews, type NewsDataArticle } from "@/lib/news-api"
import SocialShareImproved from "@/components/ui/social-share-improved"

const topStocks = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE", "INFY.BSE"]

export default function ArticlePage() {
  const params = useParams()
  const category = (params?.category as string) || "business"
  const id = params?.id as string

  const [article, setArticle] = useState<NewsDataArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsDataArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadArticleData = async () => {
      try {
        setLoading(true)
        setError(null)
        const articles = await fetchNews(category)
        const foundArticle = articles.find((a) => a.article_id === id)

        if (foundArticle) {
          setArticle(foundArticle)
          // Filter related articles (excluding the current one)
          const related = articles.filter((a) => a.article_id !== id).slice(0, 3)
          setRelatedArticles(related)
        } else {
          setError("Article not found. It might have been updated or archived.")
        }
      } catch (err) {
        console.error("Failed to load article details:", err)
        setError("Failed to load article. Please check your internet connection and try again.")
      } finally {
        setLoading(false)
      }
    }

    loadArticleData()
  }, [category, id])

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  const author = article?.creator?.[0] || "Staff Reporter"
  const formattedDate = article
    ? new Date(article.pubDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Header currentCategory={category} />

      <main className="flex-grow container-custom py-8">
        {/* Back navigation */}
        <Link
          href={`/${category === "indian-stocks" ? "indian-stocks" : category}`}
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to {categoryName}
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error || !article ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto p-8">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Article</h2>
            <p className="text-gray-600 mb-6">{error || "Something went wrong."}</p>
            <Link
              href="/"
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Content column - 3 cols span on desktop */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 uppercase tracking-wider">
                    {category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700">
                    Source: {article.source_id}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  {article.title}
                </h1>

                {/* Author & Date info */}
                <div className="flex flex-wrap items-center justify-between border-y border-gray-100 py-4 mb-6 gap-4">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formattedDate}
                    </span>
                  </div>
                  {/* Share button */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 flex items-center font-medium">
                      <Share2 className="w-3.5 h-3.5 mr-1" /> Share
                    </span>
                    <SocialShareImproved url={article.link} title={article.title} description={article.description} />
                  </div>
                </div>

                {/* Cover Image */}
                {article.image_url && (
                  <div className="relative h-64 md:h-[400px] w-full rounded-xl overflow-hidden mb-8 shadow-sm">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=400&width=800&text=${encodeURIComponent("ZeeBussiness News")}`
                      }}
                    />
                  </div>
                )}

                {/* Advertisement Space */}
                <AdSpace className="mb-8" height="h-28" type="in-article" slot="4567890123" />

                {/* Article Body */}
                <div className="prose max-w-none text-gray-800 text-lg leading-relaxed font-serif space-y-6">
                  {article.content ? (
                    article.content.split("\n\n").map((para, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed font-serif mb-6 text-[18px]">
                        {para.trim()}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed font-serif mb-6 text-[18px] font-semibold italic">
                        {article.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed font-serif mb-6 text-[17px]">
                        The full report on this story is currently developing. Industry experts are reviewing the latest guidelines and statements. We will update this page as more updates, expert commentary, and market analyses become available.
                      </p>
                    </>
                  )}
                </div>

                {/* Link to external original publisher */}
                <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-blue-900 mb-1">Want to read the full context?</h3>
                    <p className="text-sm text-blue-700">You can view the original article directly at the publisher's site.</p>
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10"
                  >
                    Read original article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>

                {/* Social sharing widget */}
                <div className="border-t border-gray-100 mt-8 pt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">Spread the word:</span>
                  <SocialShareImproved url={article.link} title={article.title} description={article.description} />
                </div>
              </div>

              {/* Bottom Ad Space */}
              <AdSpace className="mt-8" height="h-28" type="display" slot="3456789012" />

              {/* Related news section */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((rel) => (
                      <Link
                        key={rel.article_id}
                        href={`/article/${category}/${rel.article_id}`}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                      >
                        {rel.image_url && (
                          <div className="relative h-36 w-full">
                            <Image
                              src={rel.image_url}
                              alt={rel.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                          </div>
                        )}
                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm mb-2">
                            {rel.title}
                          </h4>
                          <span className="text-xs text-gray-400 mt-2 block">{rel.source_id}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column - 1 col span on desktop */}
            <div className="lg:col-span-1 space-y-6">
              {/* Market Indices */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Indices</h3>
                <MarketIndices />
              </div>

              {/* Sidebar Ad Space */}
              <AdSpace height="h-64" type="display" slot="2345678901" />

              {/* Top Stocks list */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Stocks</h3>
                <div className="space-y-4">
                  {topStocks.map((symbol) => (
                    <StockWidget key={symbol} symbol={symbol} />
                  ))}
                </div>
              </div>

              {/* Another Sidebar Ad Space */}
              <AdSpace height="h-48" type="display" slot="2345678901" />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
