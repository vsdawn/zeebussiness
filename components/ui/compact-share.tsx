"use client"

import { useState } from "react"
import { Share2, MessageCircle, Facebook, Twitter, Link, Check } from "lucide-react"

interface CompactShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function CompactShare({ url, title, description, className }: CompactShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedDescription}%0A%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  const isNativeShareAvailable = typeof navigator !== "undefined" && "share" in navigator

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Native Share (Mobile) */}
      {isNativeShareAvailable && (
        <button
          onClick={handleNativeShare}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Share article"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp */}
      <button
        onClick={() => handleShare("whatsapp")}
        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare("twitter")}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link className="w-4 h-4" />}
      </button>
    </div>
  )
}
