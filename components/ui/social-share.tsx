"use client"

import { useState } from "react"
import { Share2, MessageCircle, Instagram, Facebook, Twitter, Link, Check } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function SocialShare({ url, title, description, className }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedDescription}%0A%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
  }

  const handleShare = (platform: string) => {
    if (platform === "instagram") {
      // For Instagram, we'll copy the text and open Instagram
      copyToClipboard(`${title}\n\n${description}\n\n${url}`)
      window.open(shareLinks.instagram, "_blank")
      return
    }

    window.open(shareLinks[platform as keyof typeof shareLinks], "_blank", "width=600,height=400")
    setIsOpen(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleCopyLink = () => {
    copyToClipboard(url)
    setIsOpen(false)
  }

  return (
    <div className={`relative z-10 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
        aria-label="Share article"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />

          {/* Share Menu */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-[101] min-w-[200px] max-w-[250px]">
            <div className="text-xs font-medium text-gray-500 mb-2 px-2">Share this article</div>

            {/* WhatsApp */}
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">WhatsApp</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Twitter className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Twitter</span>
            </button>

            {/* Instagram */}
            <button
              onClick={() => handleShare("instagram")}
              className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">Instagram</span>
                <p className="text-xs text-gray-500">Copy text & open app</p>
              </div>
            </button>

            <div className="border-t border-gray-100 my-2" />

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                {copied ? <Check className="w-4 h-4 text-white" /> : <Link className="w-4 h-4 text-white" />}
              </div>
              <span className="text-sm font-medium text-gray-700">{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
