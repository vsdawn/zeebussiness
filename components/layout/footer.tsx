import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-xl font-bold">ZeeBussiness</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted source for the latest news in business, technology, sports, politics, and Indian stock market
              updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-white transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/politics" className="hover:text-white transition-colors">
                  Politics
                </Link>
              </li>
              <li>
                <Link href="/indian-stocks" className="hover:text-white transition-colors">
                  Indian Stocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              {/* Privacy Policy and Terms of Service will remain at the bottom for legal emphasis */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                contact@zeebussiness.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ZeeBussiness. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/legal/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-conditions" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
