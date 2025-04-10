"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/providers/theme-provider"

const timelineItems = [
  {
    year: "2022-Present",
    title: "Bachelors of Technology in AI & Data Science",
    subtitle: "Aalim Muhammed Salegh College of Engineering",
  },
  {
    year: "2020-2022",
    title: "Freelance Graphic Designer",
    subtitle: "Creating visual identities for various clients",
  },
  {
    year: "2018-2020",
    title: "Higher Secondary School",
    subtitle: "Fathima Senior Secondary CBSE School",
  },
]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()

  return (
    <section id="about" ref={ref} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 text-center"
        >
          <h2 className="mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto">
            Get to know the person behind the designs and algorithms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">My Journey</h3>

            <div className="space-y-8 md:space-y-12 relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-2 bottom-10 w-0.5 bg-brand-orange/30"></div>

              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 3) }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-background border-2 border-brand-orange flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                  </div>

                  <p className="text-xs md:text-sm text-brand-orange font-medium">{item.year}</p>
                  <h4 className="text-lg md:text-xl font-semibold mt-1">{item.title}</h4>
                  <p className="text-sm md:text-base opacity-75 mt-1">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Who I Am</h3>

            <div className={`prose max-w-none ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              <p className="mb-3 md:mb-4 text-sm md:text-base">
                Hey there! 👋 I'm your friendly neighborhood graphic designer turned AI wizard-in-training! 🎨🤖
              </p>

              <p className="mb-3 md:mb-4 text-sm md:text-base">
                I'm Mohammed Hussain, a passionate and creative graphic designer with a knack for blending trendy
                aesthetics with precise, detail-oriented designs. I love crafting visuals that not only look amazing but
                also tell a story, whether it's through sleek logos, eye-catching posters, or cohesive branding.
              </p>

              <p className="mb-3 md:mb-4 text-sm md:text-base">
                With a sharp eye for color and a deep understanding of how it influences design, I ensure every project
                is perfectly balanced and impactful. Beyond design, I'm all about creating engaging social media
                content, managing brand identities, and even dabbling in video editing to bring ideas to life.
              </p>

              <p className="mb-3 md:mb-4 text-sm md:text-base">
                Currently, I'm pursuing my Bachelor's degree in Artificial Intelligence & Data Science, combining my
                design expertise with cutting-edge technology to create innovative solutions.
              </p>

              <p className="text-sm md:text-base">
                I'm chill, approachable, and always up for a creative challenge. Let's connect and explore how we can
                use design + AI to create something truly extraordinary! 🌐💡
              </p>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-4">
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-camera text-lg md:text-2xl text-brand-orange mb-1 md:mb-2"></i>
                <span className="text-xs md:text-sm">Photography</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-comments text-lg md:text-2xl text-brand-orange mb-1 md:mb-2"></i>
                <span className="text-xs md:text-sm">Communication</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-plane text-lg md:text-2xl text-brand-orange mb-1 md:mb-2"></i>
                <span className="text-xs md:text-sm">Travelling</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-book text-lg md:text-2xl text-brand-orange mb-1 md:mb-2"></i>
                <span className="text-xs md:text-sm">Book-Worm</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <i className="fas fa-video text-lg md:text-2xl text-brand-orange mb-1 md:mb-2"></i>
                <span className="text-xs md:text-sm">Vlogging</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
