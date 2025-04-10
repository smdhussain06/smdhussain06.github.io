"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange shadow-lg shadow-brand-orange/30 text-white flex items-center justify-center z-50 hover:scale-110 transition-transform touch-target"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up text-sm md:text-base"></i>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
