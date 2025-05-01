"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

interface ActionProps {
  label: string
  href: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface CoachingHeroProps {
  className?: string
  title?: string
  subtitle?: string
  actions?: ActionProps[]
  titleClassName?: string
  subtitleClassName?: string
  actionsClassName?: string
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.8,
      ease: "easeInOut"
    }
  })
}

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative z-0 flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900",
      )}
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-blue-200/30 bg-blue-900/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-300" />
            <span className="text-sm font-medium text-blue-100">Personalized Coaching</span>
          </motion.div>

          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white"
          >
            Expert Fitness Coaching <br />
            For Every Level
          </motion.h1>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full my-2"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl text-blue-100 max-w-[800px] mt-4"
          >
            Transform your body with personalized training programs, expert guidance, and proven results. Join our community of successful clients today.
          </motion.p>
        </div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top-right decorative element */}
        <div className="absolute top-16 right-16 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="2" />
            <circle cx="60" cy="60" r="30" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="60" cy="60" r="20" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Bottom-left decorative element */}
        <div className="absolute bottom-16 left-16 opacity-20">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="100" height="100" stroke="white" strokeWidth="2" />
            <rect x="50" y="50" width="60" height="60" stroke="white" strokeWidth="2" />
            <rect x="70" y="70" width="20" height="20" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  )
} 