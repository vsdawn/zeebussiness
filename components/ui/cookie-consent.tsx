"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent has already been given/refused
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Small delay to make it feel smooth
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-6 z-[9999] transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Cookie className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Cookie Consent</h3>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        We use cookies to improve your browsing experience, serve personalized ads, and analyze our traffic. By clicking
        "Accept All", you consent to our use of cookies in accordance with our{" "}
        <Link href="/legal/cookie-policy" className="text-blue-600 hover:underline font-medium">
          Cookie Policy
        </Link>
        .
      </p>

      <div className="flex items-center space-x-3">
        <button
          onClick={handleReject}
          className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Reject All
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          Accept All
        </button>
      </div>
    </div>
  )
}
