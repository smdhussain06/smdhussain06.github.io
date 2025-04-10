"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const subtitles = ["AI-Powered Design Alchemist", "3D Visualization Maverick", "Data Storytelling Wizard"]

export default function HeroSection() {
  const [currentSubtitle, setCurrentSubtitle] = useState(0)
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsSubtitleVisible(false)

      setTimeout(() => {
        setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
        setIsSubtitleVisible(true)
      }, 1000)
    }, 4000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-circuit-pattern bg-repeat-space"></div>

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-gradient-to-r from-brand-orange/20 to-yellow-500/10 blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          borderRadius: ["70% 30% 50% 50%", "50% 60% 30% 70%", "30% 50% 70% 40%", "60% 40% 30% 70%", "70% 30% 50% 50%"],
          x: [0, 20, -10, 15, 0],
          y: [0, 15, -15, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-l from-brand-orange/15 to-yellow-500/5 blur-3xl opacity-30"
        animate={{
          scale: [1, 0.9, 1.1, 0.8, 1],
          borderRadius: ["50% 50% 30% 70%", "60% 40% 70% 30%", "40% 60% 30% 70%", "70% 30% 60% 40%", "50% 50% 30% 70%"],
          x: [0, -20, 10, -15, 0],
          y: [0, -15, 15, -5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-[40%] right-[25%] w-48 h-48 rounded-full bg-gradient-to-tr from-yellow-500/10 to-brand-orange/20 blur-3xl opacity-20"
        animate={{
          scale: [1, 1.1, 0.9, 1.2, 1],
          borderRadius: ["30% 70% 50% 50%", "50% 50% 70% 30%", "70% 30% 50% 50%", "50% 50% 30% 70%", "30% 70% 50% 50%"],
          x: [0, 30, -20, 10, 0],
          y: [0, -20, 10, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[20%] w-56 h-56 rounded-full bg-gradient-to-br from-brand-orange/15 to-yellow-500/10 blur-3xl opacity-25"
        animate={{
          scale: [1, 0.8, 1.2, 0.9, 1],
          borderRadius: ["50% 50% 70% 30%", "30% 70% 50% 50%", "60% 40% 30% 70%", "40% 60% 70% 30%", "50% 50% 70% 30%"],
          x: [0, -15, 25, -10, 0],
          y: [0, 25, -15, 10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Original floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-16 md:w-24 h-16 md:h-24 bg-brand-orange/20 rounded-full blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 15,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-[20%] w-20 md:w-32 h-20 md:h-32 bg-brand-orange/30 rounded-full blur-xl"
        animate={{
          x: [0, -25, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-container"
        >
          <h1 className="font-bold mb-4 md:mb-6 animate-glow text-gradient glowing-name">Mohammed Hussain</h1>

          <div className="subtitle-carousel h-8 md:h-12 flex items-center justify-center">
            <motion.span
              key={currentSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: isSubtitleVisible ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-lg md:text-2xl lg:text-3xl"
            >
              {subtitles[currentSubtitle]}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 md:mt-16"
          >
            <a
              href="#portfolio"
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-full bg-brand-orange text-white font-medium transition-all hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-1 touch-target"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <i className="fas fa-chevron-down text-xl md:text-2xl text-brand-orange"></i>
      </motion.div>
    </section>
  )
}
