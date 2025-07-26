import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Clock, User } from "lucide-react"
import type { NewsDataArticle } from "@/lib/news-api"

interface NewsCardProps {
  article: NewsDataArticle
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  return date.toLocaleDateString()
}

export default function NewsCard({ article }: NewsCardProps) {
  const timeAgo = formatTimeAgo(article.pubDate)
  const author = article.creator?.[0] || "Staff Reporter"

  return (
    <article className="news-card group">
      {/* Image */}
      {article.image_url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image_url || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement
              target.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent("News Image")}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {article.source_id}
            </span>
            {article.country && article.country.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                {article.country[0].toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {timeAgo}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>

        {/* Description */}
        {article.description && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>}

        {/* Author */}
        {author && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <User className="w-4 h-4 mr-1" />
            {author}
          </div>
        )}

        {/* Keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Read More */}
        <Link
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          Read full article
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  )
}
