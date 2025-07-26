"use client"

import { useParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import StockDetail from "@/components/stock/stock-detail"

export default function StockDetailPage() {
  const params = useParams()
  const symbol = (params?.symbol as string) || "RELIANCE"

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container-custom py-8">
        <StockDetail symbol={symbol} />
      </main>
      <Footer />
    </div>
  )
}
