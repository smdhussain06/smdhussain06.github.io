import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import { Poppins, Montserrat } from "next/font/google"

// Initialize the fonts with proper configuration
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SMD Hussain | AI-Powered Design Alchemist",
  description: "Mohammed Hussain's portfolio showcasing graphic design excellence and AI innovation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${montserrat.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'