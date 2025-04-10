"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Portfolio project data
const portfolioItems = [
  {
    id: 1,
    title: "Brand Identity System",
    category: "Graphic Designing",
    image: "/vibrant-flow.png",
    description:
      "Complete brand identity system including logo design, color palette, typography, and brand guidelines.",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Content Creating",
    image: "/vibrant-orange-social-media.png",
    description:
      "Strategic social media campaign with engaging visuals designed to increase brand awareness and engagement.",
  },
  {
    id: 3,
    title: "3D Product Visualization",
    category: "Graphic Designing",
    image: "/abstract-product-display.png",
    description: "Photorealistic 3D product visualization created using Blender for marketing materials.",
  },
  {
    id: 4,
    title: "Logo Design Collection",
    category: "Graphic Designing",
    image: "/minimal-orange-logos.png",
    description: "A collection of modern, minimal logo designs for various clients across different industries.",
  },
  {
    id: 5,
    title: "Motion Graphics Intro",
    category: "Content Creating",
    image: "/geometric-orange-intro.png",
    description: "Dynamic motion graphics intro sequence designed for video content and presentations.",
  },
  {
    id: 6,
    title: "AI Data Visualization",
    category: "AI Projects",
    image: "/ai-data-futuristic-orange.png",
    description: "Interactive data visualization project combining AI insights with compelling visual design.",
  },
]

const categories = ["All", "AI Projects", "Graphic Designing", "Content Creating"]

export default function PortfolioSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioItems)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="portfolio" ref={ref} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="mb-2">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto">
            Showcasing my creative projects and design work
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 relative"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-all touch-target relative z-10 ${
                selectedCategory === category ? "text-white" : "bg-background/50 hover:bg-background/80"
              }`}
            >
              {selectedCategory === category && (
                <motion.span
                  layoutId="categoryBackground"
                  className="absolute inset-0 bg-brand-orange rounded-full -z-10"
                  initial={{ borderRadius: 20 }}
                  animate={{
                    borderRadius: [20, 16, 24, 20],
                    scale: [1, 1.05, 0.98, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    borderRadius: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 2,
                    },
                    scale: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 2.5,
                    },
                  }}
                />
              )}
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 6) + 0.3 }}
              className="project-card group relative overflow-hidden rounded-xl cursor-pointer touch-target"
              onClick={() => setSelectedProject(item)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="glass-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-medium text-brand-orange mb-1 md:mb-2">{item.category}</span>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{item.title}</h3>
                <p className="text-xs md:text-sm text-white/80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video mb-4 md:mb-6">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{selectedProject.title}</h3>
                <span className="inline-block px-2 md:px-3 py-1 text-xs rounded-full bg-brand-orange/20 text-brand-orange mb-3 md:mb-4">
                  {selectedProject.category}
                </span>
                <p className="text-sm md:text-base opacity-80 mb-4 md:mb-6">{selectedProject.description}</p>
                <div className="flex justify-between">
                  <button
                    className="px-3 md:px-4 py-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors text-sm md:text-base touch-target"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    className="px-3 md:px-4 py-2 rounded-lg bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors text-sm md:text-base touch-target"
                    onClick={() => setSelectedProject(null)}
                  >
                    Discuss Project
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
