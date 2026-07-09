import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Disclaimer - ZeeBussiness",
  description: "Read the financial and general disclaimer for using ZeeBussiness news and stock updates.",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Disclaimer
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Last Updated: July 26, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Financial and Investment Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, news, market data, and stock analysis provided on ZeeBussiness is for general informational and educational purposes only. It does not constitute financial, investment, legal, tax, or other professional advice.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>ZeeBussiness is not a Securities and Exchange Board of India (SEBI) registered investment advisor, broker, or financial planner.</strong> You should not treat any opinion expressed or data provided on this website as a specific inducement to make a particular investment or follow a particular strategy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Investing in stock markets, mutual funds, or other financial instruments involves significant risk of loss. Past performance is not indicative of future results. We strongly recommend that you consult with a qualified, licensed financial professional or conduct your own independent research before making any financial or investment decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Accuracy of Information</h2>
            <p className="text-gray-700 leading-relaxed">
              While we endeavor to keep the information on ZeeBussiness up-to-date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. External Links Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Through this website, you are able to link to other websites which are not under the control of ZeeBussiness. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. We are not responsible for any transactions or content found on external sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Advertising and Affiliate Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              ZeeBussiness displays advertisements served by Google AdSense and other third-party advertising networks. These networks may use tracking cookies to personalize ads based on your visit to this and other websites. We do not control the practices of these advertisers or the exact ads displayed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Disclaimer, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Email: <a href="mailto:support@zeebussiness.com" className="text-blue-600 hover:underline">support@zeebussiness.com</a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Address: 3rd floor, 118, 2nd Main Rd, Mico Layout, BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
