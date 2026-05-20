'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/theme-provider'
import { Menu, X, Moon, Sun, Search } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="hidden sm:inline">MicroTools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tools" className="text-sm hover:text-primary transition-colors">
            Tools
          </Link>
          <Link href="/ai-tools" className="text-sm hover:text-primary transition-colors font-semibold text-primary">
            AI Tools ✨
          </Link>
          <Link href="/blog" className="text-sm hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-card">
          <div className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/tools" className="text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Tools
            </Link>
            <Link href="/ai-tools" className="text-sm hover:text-primary transition-colors font-semibold text-primary" onClick={() => setIsOpen(false)}>
              AI Tools ✨
            </Link>
            <Link href="/blog" className="text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
