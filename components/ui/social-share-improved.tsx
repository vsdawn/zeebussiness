"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, MessageCircle, Instagram, Facebook, Twitter, Link, Check, X } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function SocialShareImproved({ url, title, description, className }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "top-right" | "top-left">("bottom-right")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedDescription}%0A%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`,
  }

  // Calculate optimal position for dropdown
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Determine horizontal position
      const spaceRight = viewportWidth - buttonRect.right
      const spaceLeft = buttonRect.left

      // Determine vertical position
      const spaceBelow = viewportHeight - buttonRect.bottom
      const spaceAbove = buttonRect.top

      let newPosition: typeof position = "bottom-right"

      if (spaceRight < 220 && spaceLeft > 220) {
        newPosition = spaceBelow > 300 ? "bottom-left" : "top-left"
      } else {
        newPosition = spaceBelow > 300 ? "bottom-right" : "top-right"
      }

      setPosition(newPosition)
    }
  }, [isOpen])

  // Store current scroll position and card position
  const saveScrollPosition = () => {
    if (buttonRef.current) {
      const cardElement = buttonRef.current.closest(".news-card")
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect()
        const scrollY = window.scrollY
        const cardOffsetFromTop = cardRect.top + scrollY

        // Store in sessionStorage for persistence across potential page reloads
        sessionStorage.setItem(
          "shareScrollPosition",
          JSON.stringify({
            scrollY: scrollY,
            cardOffsetFromTop: cardOffsetFromTop,
            cardId: cardElement.getAttribute("data-article-id") || "",
            timestamp: Date.now(),
          }),
        )
      }
    }
  }

  // Restore scroll position after sharing
  const restoreScrollPosition = () => {
    try {
      const savedPosition = sessionStorage.getItem("shareScrollPosition")
      if (savedPosition) {
        const { scrollY, cardOffsetFromTop, cardId, timestamp } = JSON.parse(savedPosition)

        // Only restore if it's recent (within 5 seconds)
        if (Date.now() - timestamp < 5000) {
          // Try to find the card by ID first
          if (cardId) {
            const cardElement = document.querySelector(`[data-article-id="${cardId}"]`)
            if (cardElement) {
              const currentCardRect = cardElement.getBoundingClientRect()
              const currentCardOffsetFromTop = currentCardRect.top + window.scrollY

              // If card position changed, adjust scroll accordingly
              const positionDiff = currentCardOffsetFromTop - cardOffsetFromTop
              window.scrollTo({
                top: scrollY + positionDiff,
                behavior: "smooth",
              })
              return
            }
          }

          // Fallback to original scroll position
          window.scrollTo({
            top: scrollY,
            behavior: "smooth",
          })
        }

        // Clean up
        sessionStorage.removeItem("shareScrollPosition")
      }
    } catch (error) {
      console.error("Error restoring scroll position:", error)
    }
  }

  const handleShare = (platform: string) => {
    saveScrollPosition()

    if (platform === "instagram") {
      copyToClipboard(`${title}\n\n${description}\n\n${url}`)
      // For Instagram, we open in the same tab to maintain context
      const instagramWindow = window.open(shareLinks.instagram, "_blank", "width=600,height=400")

      // Focus back to original window after a short delay
      setTimeout(() => {
        window.focus()
        restoreScrollPosition()
      }, 1000)

      setIsOpen(false)
      return
    }

    // Open share window
    const shareWindow = window.open(
      shareLinks[platform as keyof typeof shareLinks],
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes",
    )

    setIsOpen(false)

    // Monitor when the share window is closed
    if (shareWindow) {
      const checkClosed = setInterval(() => {
        if (shareWindow.closed) {
          clearInterval(checkClosed)
          // Small delay to ensure smooth transition
          setTimeout(() => {
            restoreScrollPosition()
          }, 100)
        }
      }, 1000)

      // Cleanup interval after 5 minutes (in case user never closes the window)
      setTimeout(() => {
        clearInterval(checkClosed)
      }, 300000)
    }
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
    saveScrollPosition()
    copyToClipboard(url)
    setIsOpen(false)

    // Restore position after copy (immediate since no external window)
    setTimeout(() => {
      restoreScrollPosition()
    }, 100)
  }

  const getDropdownClasses = () => {
    const baseClasses =
      "absolute bg-white rounded-lg shadow-2xl border border-gray-200 p-3 min-w-[220px] max-w-[250px] z-[9999]"

    switch (position) {
      case "bottom-right":
        return `${baseClasses} right-0 top-full mt-2`
      case "bottom-left":
        return `${baseClasses} left-0 top-full mt-2`
      case "top-right":
        return `${baseClasses} right-0 bottom-full mb-2`
      case "top-left":
        return `${baseClasses} left-0 bottom-full mb-2`
      default:
        return `${baseClasses} right-0 top-full mt-2`
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-[9998] bg-black/10" onClick={() => setIsOpen(false)} />}

      <div className={`relative ${className}`}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm relative z-10"
          aria-label="Share article"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        {isOpen && (
          <div ref={dropdownRef} className={getDropdownClasses()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-gray-500">Share this article</div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>

            {/* Share Options */}
            <div className="space-y-1">
              {/* WhatsApp */}
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center space-x-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center space-x-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center space-x-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                  <Twitter className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Twitter</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleShare("instagram")}
                className="flex items-center space-x-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors group"
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
                className="flex items-center space-x-3 w-full px-3 py-2.5 text-left hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Link className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-700">{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
