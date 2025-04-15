"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingCardProps {
  children: ReactNode
  className?: string
}

export function FloatingCard({ children, className = "" }: FloatingCardProps) {
  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  }

  return (
    <motion.div
      className={`ghibli-card ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springTransition}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: springTransition,
      }}
    >
      {children}
    </motion.div>
  )
}
