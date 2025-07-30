"use client"

import { useState } from "react"
import { Share2, MessageCircle, Facebook, Twitter, Link, Check } from "lucide-react"

interface SimpleShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function SimpleShare({ url, title, description, className }: SimpleShareProps) {
  const [showOptions, setShowOptions] = useState(false)
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
    setShowOptions(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setShowOptions(false)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (showOptions) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* WhatsApp */}
        <button
          onClick={() => handleShare("whatsapp")}
          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare("facebook")}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare("twitter")}
          className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          title="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link className="w-4 h-4" />}
        </button>

        {/* Close */}
        <button
          onClick={() => setShowOptions(false)}
          className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
          title="Close"
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowOptions(true)}
      className={`flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm ${className}`}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  )
}
