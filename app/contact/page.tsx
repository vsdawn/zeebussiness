// app/contact/page.tsx

import Head from 'next/head';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - ZeeBussiness</title>
        <meta name="description" content="Get in touch with ZeeBussiness for inquiries, support, or feedback." />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
        <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Contact Us
          </h1>

          <section className="mb-8 text-center">
            <p className="text-gray-700 leading-relaxed mb-4">
              We'd love to hear from you! Whether you have a question, feedback, or a bussiness inquiry, please feel free to reach out to us using the information below or by filling out the contact form.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> <a href="mailto:info@zeebussiness.com" className="text-blue-600 hover:underline">info@zeebussiness.com</a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> +91 6307439295
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 3rd floor, 118, 2nd Main Rd, Mico Layout, BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076
              </p>
              <p className="text-gray-700">
                <strong>Bussiness Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (Local Time)
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
