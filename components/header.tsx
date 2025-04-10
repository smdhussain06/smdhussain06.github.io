"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/providers/theme-provider"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "py-2 glass-morphism" : "py-3 md:py-4 bg-transparent"
  }`

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-bold text-gradient">
          SMDHussain
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#portfolio" className="nav-link">
            Portfolio
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 transition-colors touch-target"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun text-brand-orange" />
            ) : (
              <i className="fas fa-moon text-brand-orange" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 transition-colors touch-target"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <i className="fas fa-sun text-brand-orange" />
            ) : (
              <i className="fas fa-moon text-brand-orange" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg touch-target"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-morphism mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <nav className="flex flex-col p-2">
              <a
                href="#"
                className="py-3 px-4 hover:bg-brand-orange/10 rounded-lg touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="py-3 px-4 hover:bg-brand-orange/10 rounded-lg touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#skills"
                className="py-3 px-4 hover:bg-brand-orange/10 rounded-lg touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#portfolio"
                className="py-3 px-4 hover:bg-brand-orange/10 rounded-lg touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="py-3 px-4 hover:bg-brand-orange/10 rounded-lg touch-target"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
