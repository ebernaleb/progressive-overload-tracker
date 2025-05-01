"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

function GlassmorphicShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export const GlassmorphicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-soft-light" />
      
      {/* Animated Blobs */}
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ 
          x: ["-50%", "-30%", "-50%", "-70%", "-50%"],
          y: ["-50%", "-30%", "-50%", "-30%", "-50%"] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "easeInOut" 
        }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-3xl"
      />
      
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ 
          x: ["-50%", "-70%", "-50%", "-30%", "-50%"],
          y: ["-50%", "-70%", "-50%", "-70%", "-50%"] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 25,
          ease: "easeInOut" 
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
      />
    </div>
  );
};

export const HeroGlassmorphic = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <GlassmorphicBackground />
      {children}
    </div>
  );
}; 