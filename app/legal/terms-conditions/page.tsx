// app/legal/terms-conditions/page.tsx

import Head from 'next/head';

export default function TermsAndConditionsPage() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - ZeeBussiness</title>
        <meta name="description" content="Read the Terms and Conditions for using the ZeeBussiness website." />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Terms and Conditions
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            Last Updated: July 26, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ZeeBussiness. These Terms and Conditions ("Terms") govern your use of the website <a href="https://zeebussiness-u2vl-vsinghs-projects.vercel.app/bussiness" className="text-blue-600 hover:underline">zeebussiness-u2vl-vsinghs-projects.vercel.app/bussiness</a> (the "Site"). By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By using our Site, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree to these Terms, you must not use our Site. We recommend that you print a copy of these Terms for future reference.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may revise these Terms at any time by amending this page. Please check this page from time to time to take notice of any changes we made, as they are binding on you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Accessing Our Site</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Site is made available free of charge. We do not guarantee that our Site, or any content on it, will always be available or be uninterrupted. Access to our Site is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of our Site without notice. We will not be liable to you if for any reason our Site is unavailable at any time or for any period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Unless otherwise stated, we are the owner or the licensee of all intellectual property rights in our Site and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved. You may print off one copy, and may download extracts, of any page(s) from our Site for your personal use and you may draw the attention of others within your organization to content posted on our Site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. No Reliance on Information</h2>
            <p className="text-gray-700 leading-relaxed">
              The content on our Site is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on our Site. Although we make reasonable efforts to update the information on our Site, we make no representations, warranties or guarantees, whether express or implied, that the content on our Site is accurate, complete or up-to-date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Our Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Nothing in these Terms excludes or limits our liability for death or personal injury arising from our negligence, or our fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law. To the extent permitted by law, we exclude all conditions, warranties, representations or other terms which may apply to our Site or any content on it, whether express or implied. We will not be liable to any user for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mt-4">
              <li>use of, or inability to use, our Site; or</li>
              <li>use of or reliance on any content displayed on our Site.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Viruses</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not guarantee that our Site will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programs and platform in order to access our Site. You should use your own virus protection software.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Where our Site contains links to other sites and resources provided by third parties, these links are provided for your information only. We have no control over the contents of those sites or resources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, their subject matter and their formation, are governed by the laws of [Your Country/State]. You and we both agree that the courts of [Your Country/State] will have exclusive jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              Email: <a href="mailto:terms@zeebussiness.com" className="text-blue-600 hover:underline">terms@zeebussiness.com</a>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Address: 3rd floor, 118, 2nd Main Rd, Mico Layout, BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
