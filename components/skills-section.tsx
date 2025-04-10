"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const designSkills = [
  { name: "Adobe Photoshop", level: 90, icon: "fa-image" },
  { name: "Adobe Illustrator", level: 85, icon: "fa-bezier-curve" },
  { name: "Adobe After Effects", level: 75, icon: "fa-film" },
  { name: "Adobe Premiere Pro", level: 80, icon: "fa-video" },
  { name: "Blender 3D", level: 70, icon: "fa-cube" },
]

const otherSkills = [
  { name: "Typography", icon: "fa-font" },
  { name: "Color Theory", icon: "fa-palette" },
  { name: "Branding", icon: "fa-copyright" },
  { name: "Motion Graphics", icon: "fa-layer-group" },
  { name: "Photography", icon: "fa-camera" },
  { name: "Color Grading", icon: "fa-sliders-h" },
  { name: "Poster Design", icon: "fa-image" },
  { name: "Video Editing", icon: "fa-film" },
  { name: "3D Modeling", icon: "fa-cube" },
  { name: "Social Media Ad Campaigns", icon: "fa-ad" },
]

const aiSkills = [
  { name: "Python", level: 65, icon: "fa-code" },
  { name: "Machine Learning", level: 60, icon: "fa-brain" },
  { name: "Data Analysis", level: 70, icon: "fa-chart-bar" },
  { name: "Computer Vision", level: 55, icon: "fa-eye" },
  { name: "Natural Language Processing", level: 50, icon: "fa-comment-alt" },
]

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="skills" ref={ref} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="mb-2">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto">
            Crafting visual and technological excellence with these tools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Design Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Design Expertise</h3>

            <div className="space-y-6 md:space-y-8">
              {designSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 3) }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <i className={`fas ${skill.icon} text-brand-orange mr-2 md:mr-3 text-sm md:text-base`}></i>
                      <span className="text-sm md:text-base">{skill.name}</span>
                    </div>
                    <span className="text-xs md:text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-background/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-orange rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <h4 className="text-lg md:text-xl font-semibold mt-8 md:mt-12 mb-4 md:mb-6">Other Creative Skills</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
              {otherSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 10) }}
                  className="flex items-center p-2 md:p-3 rounded-lg bg-background/40"
                >
                  <i className={`fas ${skill.icon} text-brand-orange mr-2 md:mr-3 text-xs md:text-sm`}></i>
                  <span className="text-xs md:text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI & Tech Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">AI & Technology Skills</h3>

            <div className="space-y-6 md:space-y-8">
              {aiSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 3) }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <i className={`fas ${skill.icon} text-brand-orange mr-2 md:mr-3 text-sm md:text-base`}></i>
                      <span className="text-sm md:text-base">{skill.name}</span>
                    </div>
                    <span className="text-xs md:text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-background/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-orange rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive AI Demo */}
            <div className="mt-8 md:mt-12">
              <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Learn AI with Me</h4>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-4 md:p-6 rounded-xl bg-background/30 border border-brand-orange/20"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1">
                    <h5 className="text-base md:text-lg font-medium mb-2">AI Journey in Progress</h5>
                    <p className="text-xs md:text-sm opacity-80 mb-4">
                      Currently exploring the fascinating world of AI and Data Science, merging it with my design skills
                      to create innovative solutions!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 md:px-3 py-1 text-xs rounded-full bg-brand-orange/20 text-brand-orange">
                        Python
                      </span>
                      <span className="px-2 md:px-3 py-1 text-xs rounded-full bg-brand-orange/20 text-brand-orange">
                        TensorFlow
                      </span>
                      <span className="px-2 md:px-3 py-1 text-xs rounded-full bg-brand-orange/20 text-brand-orange">
                        Data Viz
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex-shrink-0">
                    <i className="fas fa-brain text-4xl md:text-6xl text-brand-orange opacity-80"></i>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
