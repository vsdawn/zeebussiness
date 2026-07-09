import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Cookie Policy - ZeeBussiness",
  description: "Read the Cookie Policy of ZeeBussiness to understand how we use cookies and tracking technologies.",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Cookie Policy
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Last Updated: July 26, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ZeeBussiness uses cookies to improve your browsing experience, analyze our website traffic, and display personalized advertisements. We use the following categories of cookies:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> These are required for the website to function properly. For example, we use a cookie to keep track of your preference regarding the sidebar navigation state (`sidebar:state`).
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and see how they move around our website. This helps us improve the way our website works.
              </li>
              <li>
                <strong>Targeting and Advertising Cookies:</strong> These are used to deliver advertisements that are relevant to your interests. In particular, we use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits to our website or other websites on the Internet.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Google AdSense and Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our Site and/or other sites on the Internet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Users may opt out of personalized advertising by visiting Google's <a href="https://settings.google.com/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Controlling Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can choose to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please note that disabling or rejecting cookies may prevent you from taking full advantage of the website features or layout settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our Cookie Policy, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Email: <a href="mailto:privacy@zeebussiness.com" className="text-blue-600 hover:underline">privacy@zeebussiness.com</a>
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
