"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here we would normally send the form data to a server
    // But for demo purposes, we'll just simulate a successful submission

    // Simulate loading
    setFormStatus({ message: "Sending message..." })

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon.",
      })

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section id="contact" ref={ref} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 text-center"
        >
          <h2 className="mb-2">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Contact Information</h3>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-brand-orange"></i>
                </div>
                <div className="ml-3 md:ml-4">
                  <h4 className="text-base md:text-lg font-medium">Email</h4>
                  <a
                    href="mailto:s.m.d.hussainjoe@gmail.com"
                    className="text-sm md:text-base opacity-75 hover:text-brand-orange transition-colors"
                  >
                    s.m.d.hussainjoe@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-brand-orange"></i>
                </div>
                <div className="ml-3 md:ml-4">
                  <h4 className="text-base md:text-lg font-medium">Phone</h4>
                  <a
                    href="tel:+919344115330"
                    className="text-sm md:text-base opacity-75 hover:text-brand-orange transition-colors"
                  >
                    +91 93441 15330
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-brand-orange"></i>
                </div>
                <div className="ml-3 md:ml-4">
                  <h4 className="text-base md:text-lg font-medium">Location</h4>
                  <p className="text-sm md:text-base opacity-75">Chennai, India</p>
                </div>
              </div>
            </div>

            <h4 className="text-lg md:text-xl font-semibold mt-8 md:mt-12 mb-4 md:mb-6">Connect with Me</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="https://wa.me/919344115330"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-background/50 hover:bg-brand-orange/20 text-brand-orange transition-colors touch-target"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="https://instagram.com/smdhussain06"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-background/50 hover:bg-brand-orange/20 text-brand-orange transition-colors touch-target"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://github.com/smdhussain06"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-background/50 hover:bg-brand-orange/20 text-brand-orange transition-colors touch-target"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/smdhussain06"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-background/50 hover:bg-brand-orange/20 text-brand-orange transition-colors touch-target"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="contact-form glass-card">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-background/50 border border-brand-orange/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-background/50 border border-brand-orange/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm md:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-background/50 border border-brand-orange/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm md:text-base"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-background/50 border border-brand-orange/20 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange resize-none text-sm md:text-base"
                    placeholder="Hello, I'd like to discuss a project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-1 text-sm md:text-base touch-target"
                >
                  Send Message
                </button>
              </form>

              {formStatus && (
                <div
                  className={`mt-4 md:mt-6 p-3 md:p-4 rounded-lg ${formStatus.success ? "bg-green-500/10 text-green-500" : "bg-brand-orange/10 text-brand-orange"} text-sm md:text-base`}
                >
                  {formStatus.message}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
