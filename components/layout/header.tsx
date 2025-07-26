"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, TrendingUp } from "lucide-react"
import ApiStatus from "../ui/api-status"

const categories = [
  { id: "business", name: "Business" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technology" },
  { id: "world", name: "World" },
  { id: "politics", name: "Politics" },
  { id: "indian-stocks", name: "Indian Stocks" },
]

interface HeaderProps {
  currentCategory?: string
}

export default function Header({ currentCategory = "business" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Live Market Updates
              </span>
              <ApiStatus className="hidden md:inline-flex" />
            </div>
            {/* <div className="hidden md:flex items-center space-x-4">
              <span>NSE: 24,500 (+1.2%)</span>
              <span>BSE: 80,200 (+0.8%)</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/business" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="text-xl font-bold text-gradient">ZeeBussiness</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className={`category-tab ${currentCategory === category.id ? "active" : ""}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-3">
              <ApiStatus />
            </div>
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className={`category-tab ${currentCategory === category.id ? "active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
