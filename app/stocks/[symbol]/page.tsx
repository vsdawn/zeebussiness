import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import StockDetail from "@/components/stock/stock-detail"

export default async function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const resolvedParams = await params
  const symbol = resolvedParams.symbol || "RELIANCE"

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
