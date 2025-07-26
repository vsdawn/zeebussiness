import NewsCard from "./news-card"
import AdSpace from "../ui/ad-space"
import type { NewsDataArticle } from "@/lib/news-api"

interface NewsGridProps {
  articles: NewsDataArticle[]
  category: string
}

export default function NewsGrid({ articles, category }: NewsGridProps) {
  const categoryName = category?.charAt(0)?.toUpperCase() + category?.slice(1) || "Business"

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h2>
        <p className="text-gray-600">No articles available for {categoryName} at the moment.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{categoryName} News</h1>
        <p className="text-gray-600">Stay updated with the latest {category} news and developments</p>
        <div className="mt-2 text-sm text-gray-500">{articles.length} articles • Powered by NewsData.io</div>
      </div>

      {/* Top Ad Space */}
      <AdSpace className="mb-8" height="h-24" type="display" slot="1234567890" />

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={article.article_id}>
            <NewsCard article={article} />
            {/* Insert ad after every 6 articles */}
            {(index + 1) % 6 === 0 && index !== articles.length - 1 && (
              <div className="col-span-full mt-6 mb-6">
                <AdSpace height="h-32" type="feed" slot="6789012345" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Ad Space */}
      <AdSpace className="mt-8" height="h-24" type="display" slot="3456789012" />
    </div>
  )
}
