"use client"

import { useEffect } from "react"

export default function AdSenseScript() {
  useEffect(() => {
    try {
      const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID

      // Only add script if AdSense ID is available and valid
      if (adClient && !adClient.includes("xxxxxxxx")) {
        // Check if script already exists
        const existingScript = document.querySelector(`script[data-ad-client="${adClient}"]`)

        if (!existingScript) {
          const script = document.createElement("script")
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          script.async = true
          script.crossOrigin = "anonymous"
          script.setAttribute("data-ad-client", adClient)

          script.onload = () => {
            console.log("AdSense script loaded successfully")
          }

          script.onerror = () => {
            console.warn("AdSense script failed to load")
          }

          document.head.appendChild(script)
        }
      }
    } catch (error) {
      console.error("Error initializing AdSense:", error)
    }
  }, [])

  return null
}
